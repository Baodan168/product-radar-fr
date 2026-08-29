# France站部署完成报告

## ✅ 已完成

1. **项目创建** - `/home/lee/product-radar-fr/`
2. **代码推送** - `https://github.com/Baodan168/product-radar-fr`
3. **GitHub Actions workflow** - 已创建 `.github/workflows/pages.yml`

## ⚠️ 需要手动操作

### 启用 GitHub Pages

1. 打开 https://github.com/Baodan168/product-radar-fr/settings/pages
2. 在 "Source" 下拉选择 **Deploy from a branch**
3. 选择 **main** 分支，根目录 `/`
4. 点击 **Save**

等待约1-2分钟，然后访问：
**https://baodan168.github.io/product-radar-fr/**

---

## 📊 配置参数（已自动设置）

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

---

## 🔧 下一步（可选）

### 1. 运行首次扫描测试
```bash
cd /home/lee/product-radar-fr
python3 sources/amazon_fr.py
python3 generate_platform.py
python3 generate_portal.py
python3 -m http.server 8082
# 浏览器访问 http://localhost:8082/output/
```

### 2. 添加Hermes定时任务（等Weekend Build额度用完后）
法国站cron可设置在07:30和20:30北京时间（对应法国06:30/19:30）

### 3. 调整节日数据
如果法国特有节日缺失，可以手动编辑 `data/festivals_data.js`

---

## 🎯 预计Token消耗（已完成）

| 任务 | 消耗 |
|------|------|
| 项目初始化 | ~5M |
| 代码推送 | ~2M |
| **总计** | **~7M** |

**剩余约 293M tokens**

---

## 📝 故障排查

### 问题：Pages显示404
- 检查是否启用了GitHub Pages（ Settings → Pages ）
- 确认 `.nojekyll` 文件存在
- 等待1-2分钟让GitHub构建

### 问题：扫描失败
- 检查FlClash是否运行
- 检查 `~/.hermes/.env` 是否有 scraperapi key
- 检查亚马逊.fr是否有反爬

### 问题：利润计算不对
- 检查 `calc_profit.py` 中的法国参数
- 确认汇率 `exchange_rate_cny_eur = 8.0`

---

## 🌐 部署链接

- **GitHub**: https://github.com/Baodan168/product-radar-fr
- **Pages（启用后）**: https://baodan168.github.io/product-radar-fr/