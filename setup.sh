#!/bin/bash
# France站初始化脚本 v2 — 精简版，只复制必要文件

set -e

echo "🇫🇷 开始创建Amazon France选品平台..."

PROJECT_DIR="/home/lee/product-radar-fr"
mkdir -p "$PROJECT_DIR"

echo "📂 复制到: $PROJECT_DIR"

# 复制核心文件（不包括data/）
rsync -av --exclude='data' --exclude='output' --exclude='.git' \
    /home/lee/product-radar/ "$PROJECT_DIR/" 2>/dev/null || \
cp -r /home/lee/product-radar/{*.py,*.sh,*.md,config.json,oa/,sources/,templates/,assets/,tests/,tools/,shared/,*.js} "$PROJECT_DIR/"

cd "$PROJECT_DIR"

echo "✅ 文件复制完成"

# 修改config.json
python3 << 'PYEOF'
import json

with open('config.json', 'r') as f:
    config = json.load(f)

config['platform'] = 'Amazon-FR'
config['price_range'] = {'min': 6.99, 'max': 10.99}
config['currency'] = 'EUR'
config['exchange_rate_cny_eur'] = 8.0

config['cost_structure'] = {
    'vat_rate': 0.20,
    'commission_rate': 0.15,
    'commission_home': 0.12,
    'commission_pets': 0.08,
    'ad_rate': 0.10,
    'return_rate': 0.02,
    'fba_small_standard': 2.79,
    'fba_large_standard': 4.29,
    'sourcing_cost': 0.80
}

# 添加法国禁售词
fr_forbidden = [
    'cigarette', 'vape', 'e-cigarette',
    'alcool', 'wine', 'beer', 'spirit',
    'medicament', 'drug', 'pharmacy',
    'arme', 'weapon', 'knife',
    'fake', 'contrefaçon', 'copycat',
    'lego', 'pokemon', 'disney', 'marvel',
    'nike', 'adidas', 'gucci',
    'batterie', 'rechargeable', 'chargeur',
]
config['forbidden_keywords'].extend(fr_forbidden)

# 修改抓取源
config['sources']['amazon_fr'] = {
    'enabled': True,
    'priority': 'new_releases',
    'categories': config['sources']['amazon_uk']['categories'][:10],
    'urls': {
        'new_releases': 'https://www.amazon.fr/gp/new-releases/{cat}',
        'bestsellers': 'https://www.amazon.fr/gp/bestsellers/{cat}',
        'movers_shakers': 'https://www.amazon.fr/gp/movers-and-shakers/{cat}'
    }
}
config['sources'].pop('amazon_uk', None)

config['sources']['google_trends_fr'] = {
    'enabled': True,
    'priority': 'high',
    'geo': 'FR'
}
config['sources'].pop('google_trends_uk', None)

config['sources']['reddit_demand_fr'] = {
    'enabled': True,
    'subreddits': ['r/France', 'r/Paris', 'r/france']
}
config['sources'].pop('reddit_demand', None)

with open('config.json', 'w') as f:
    json.dump(config, f, indent=2, ensure_ascii=False)

print("✅ config.json 已更新")
PYEOF

# 修改oa/config.py
python3 << 'PYEOF'
with open('oa/config.py', 'r') as f:
    content = f.read()

content = content.replace(
    "SYSTEM_NAME = 'Amazon-UK项目运营'",
    "SYSTEM_NAME = 'Amazon-FR项目运营'"
)
content = content.replace(
    "SITE_BASE = f'{SITE_ORIGIN}/product-radar'",
    "SITE_BASE = f'{SITE_ORIGIN}/product-radar-fr'"
)

with open('oa/config.py', 'w') as f:
    f.write(content)

print("✅ oa/config.py 已更新")
PYEOF

# 创建amazon_fr.py
cat > sources/amazon_fr.py << 'PYEOF'
#!/usr/bin/env python3
"""Amazon France 爬虫 - 复刻UK版"""
import asyncio
from pathlib import Path
from browseract_fetcher import BrowserActFetcher

BASE = Path(__file__).parent.parent

class AmazonFRFetcher(BrowserActFetcher):
    BASE_URL = "https://www.amazon.fr"
    PLATFORM = "Amazon-FR"
    CURRENCY = "EUR"
    LOCALE = "fr_FR"
    
    async def fetch_new_releases(self, category, max_items=50):
        url = f"https://www.amazon.fr/gp/new-releases/{category}"
        return await self._fetch_and_parse(url, category, max_items)
    
    async def fetch_bestsellers(self, category, max_items=50):
        url = f"https://www.amazon.fr/gp/bestsellers/{category}"
        return await self._fetch_and_parse(url, category, max_items)
    
    def _get_product_data(self, item, category):
        data = {
            'asin': item.get('asin', ''),
            'title': item.get('title', ''),
            'price': item.get('price', ''),
            'price_float': item.get('price_float', 0),
            'rating': item.get('rating', 0),
            'reviews': item.get('reviews', 0),
            'image_url': item.get('image', ''),
            'url': item.get('url', ''),
            'category': category,
            'platform': self.PLATFORM,
            'currency': self.CURRENCY,
        }
        return data

async def main():
    import json
    from datetime import datetime
    from config_loader import load_config
    
    CONFIG = load_config()
    categories = CONFIG.get('sources', {}).get('amazon_fr', {}).get('categories', [])
    fetcher = AmazonFRFetcher()
    
    all_products = []
    scan_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    date_str = datetime.now().strftime('%Y-%m-%d')
    
    print(f"🇫🇷 开始扫描Amazon France... ({scan_time})")
    
    for category in categories[:5]:
        print(f"  扫描类别: {category}")
        try:
            result = await fetcher.fetch_new_releases(category, max_items=30)
            if result:
                all_products.extend(result)
                print(f"    ✅ 获取 {len(result)} 个产品")
        except Exception as e:
            print(f"    ❌ 错误: {e}")
    
    output_dir = BASE / 'data' / 'channels'
    output_dir.mkdir(parents=True, exist_ok=True)
    
    output_file = output_dir / f'{date_str}_fr_raw.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump({
            'scan_date': date_str,
            'scan_time': scan_time,
            'platform': 'Amazon-FR',
            'products': all_products,
            'stats': {'total': len(all_products)},
        }, f, ensure_ascii=False, indent=2)
    
    print(f"✅ 法国站扫描完成: {len(all_products)} 个产品")

if __name__ == '__main__':
    asyncio.run(main())
PYEOF

# 添加法国利润计算到calc_profit.py
python3 << 'PYEOF'
with open('calc_profit.py', 'r') as f:
    content = f.read()

if 'calc_profit_fr' not in content:
    content += '''

def calc_profit_fr(price_eur, category="general"):
    """France profit calculator"""
    vat_rate = 0.20
    commission_rate = 0.15
    cat_lower = category.lower()
    if "home" in cat_lower or "kitchen" in cat_lower:
        commission_rate = 0.12
    elif "pet" in cat_lower:
        commission_rate = 0.08
    
    fba_fee = 2.79
    ad_rate = 0.10
    return_rate = 0.02
    sourcing_cost = 0.80
    
    vat = price_eur * vat_rate
    commission = price_eur * commission_rate
    ads = price_eur * ad_rate
    returns = price_eur * return_rate
    
    total_cost = vat + commission + fba_fee + ads + returns + sourcing_cost
    net_profit = price_eur - total_cost
    margin = net_profit / price_eur if price_eur > 0 else 0
    
    return {
        "net_profit": round(net_profit, 2),
        "margin": round(margin, 3),
        "margin_pct": f"{margin*100:.1f}%",
        "breakdown": {
            "vat": round(vat, 2),
            "commission": round(commission, 2),
            "fba": fba_fee,
            "ads": round(ads, 2),
            "returns": round(returns, 2),
            "sourcing": round(sourcing_cost, 2),
            "total_cost": round(total_cost, 2),
        }
    }
'''
    with open('calc_profit.py', 'w') as f:
        f.write(content)
    print("✅ calc_profit.py 已更新")
PYEOF

# 创建GitHub workflow
mkdir -p .github/workflows
cat > .github/workflows/update.yml << 'EOF'
name: Update France Radar

on:
  schedule:
    - cron: '30 7 * * *'
    - cron: '30 20 * * *'
  workflow_dispatch:

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install browser-use playwright
          playwright install chromium
      - name: Generate pages
        run: |
          python3 generate_platform.py
          python3 generate_portal.py
      - name: Commit and push
        run: |
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add .
          git commit -m "Auto-update $(date +%Y-%m-%d)" || echo "No changes"
          git push
EOF

# 创建README
cat > README.md << 'EOF'
# Product Radar FR — Amazon France 选品平台

Amazon France 选品与运营门户，独立部署。

## 快速开始

```bash
cd /home/lee/product-radar-fr
python3 generate_platform.py
python3 generate_portal.py
python3 -m http.server 8082
```

## 配置

编辑 `config.json`：
- 价格带: €6.99-10.99
- FBA费用: €2.79
- 佣金率: 15%
- VAT: 20%

## 部署

- GitHub: Baodan168/product-radar-fr
- Pages: https://baodan168.github.io/product-radar-fr/
EOF

# Git初始化
git init 2>/dev/null || true
git add . 2>/dev/null || true
git commit -m "Initial France site setup" 2>/dev/null || true

echo ""
echo "=========================================="
echo "✅ France站项目创建完成！"
echo "=========================================="
echo ""
echo "📁 项目路径: $PROJECT_DIR"
echo "🌐 本地预览: python3 -m http.server 8082"
echo "📦 GitHub: Baodan168/product-radar-fr"
echo ""
echo "下一步："
echo "1. python3 generate_platform.py && python3 generate_portal.py"
echo "2. git remote add origin https://github.com/Baodan168/product-radar-fr.git"
echo "3. git push -u origin main"
echo ""