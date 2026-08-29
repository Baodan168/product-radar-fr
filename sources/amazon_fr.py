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
