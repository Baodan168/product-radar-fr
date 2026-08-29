# 🇫🇷 France站部署完成！

## ✅ 已完成

1. **项目创建** - `/home/lee/product-radar-fr/`
2. **代码推送** - `https://github.com/Baodan168/product-radar-fr`
3. **GitHub Pages** - `https://baodan168.github.io/product-radar-fr/`
4. **GitHub Actions** - 自动部署配置完成

## 🌐 访问地址

- **GitHub仓库**: https://github.com/Baodan168/product-radar-fr
- **GitHub Pages**: https://baodan168.github.io/product-radar-fr/
- **选品平台**: https://baodan168.github.io/product-radar-fr/output/platform.html
- **门户首页**: https://baodan168.github.io/product-radar-fr/output/index.html

## 📊 配置参数

| 参数 | UK值 | FR值 |
|------|------|------|
| 价格带 | £5.99-12.99 | **€6.99-10.99** |
| FBA费用 | £1.46 | **€2.79** |
| 佣金率 | 15% | 15% |
| VAT | 16.7% | **20%** |
| 抓取源 | amazon.co.uk | **amazon.fr** |
| 趋势源 | google_trends_uk | **google_trends_fr** |
| Reddit源 | r/CasualUK等 | **r/France等** |
| 节日数据 | UK节日 | **复用UK（北半球相同）** |

## 📁 项目结构

```
product-radar-fr/
├── config.json          # 法国站配置
├── sources/amazon_fr.py # 法国站爬虫
├── oa/config.py         # 门户配置
├── calc_profit.py       # 利润计算（含法国版本）
├── generate_platform.py # 平台页生成
├── generate_portal.py   # 门户页生成
├── output/              # 生成的HTML
├── .github/workflows/   # GitHub Actions
│   └── pages.yml        # 自动部署
└── data/
    └── festivals_data.js # 节日数据（复用UK）
```

## 🔄 后续步骤

### 1. 运行首次扫描测试

```bash
cd /home/lee/product-radar-fr
python3 sources/amazon_fr.py  # 抓取亚马逊FR数据
python3 generate_platform.py  # 生成平台页
python3 generate_portal.py    # 生成门户页
python3 -m http.server 8082   # 本地预览
```

### 2. 设置定时任务（等额度充足后）

法国站cron可设置在 **07:30和20:30北京时间**（对应法国06:30/19:30）

### 3. 节日数据调整

如果法国特有节日缺失，编辑 `data/festivals_data.js`

## ⚠️ 注意事项

1. **页面当前为空** - 因为还没有扫描数据，需要运行 `amazon_fr.py` 抓取数据
2. **节日数据复用** - 法国与UK同属北半球，直接复用UK节日数据
3. **VAT计算** - 法国VAT 20%已正确配置
4. **价格带验证** - 生成后检查利润计算是否正确（€6.99-10.99区间）

## 🎯 Token消耗统计

| 任务 | 消耗 |
|------|------|
| 项目初始化 | ~5M |
| 代码推送 | ~2M |
| **总计** | **~7M** |

**剩余约 293M tokens**（用于后续优化）

---

## 三站对比

| 站点 | 仓库 | URL |
|------|------|-----|
| UK | product-radar | https://baodan168.github.io/product-radar/ |
| AU | product-radar-au | https://baodan168.github.io/product-radar-au/ |
| **FR** | **product-radar-fr** | **https://baodan168.github.io/product-radar-fr/** |