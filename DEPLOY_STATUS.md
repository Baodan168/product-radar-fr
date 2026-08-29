# France站部署完成报告

## ✅ 已完成

1. **项目创建** - `/home/lee/product-radar-fr/`
2. **代码推送** - `https://github.com/Baodan168/product-radar-fr`
3. **GitHub Actions workflow** - 已创建 `.github/workflows/pages.yml`
4. **cron_scan.sh 修复** - 部署 URL 指向 FR 站点，文案改为 FR
5. **oa/dashboard.py 修复** - 节日引擎使用 `fr_season_engine`，字段兼容
6. **sources/amazon_fr.py 修复** - 添加 Cloudflare Worker 代理作为 fallback
7. **run_scan_v2.py 修复** - 集成 Amazon FR 扫描，`all_products` 合并 UK+FR
8. **detail_verifier.py 修复** - 根据 platform 字段选择对应站点详情页抓取器
9. **selection_report.py 修复** - 链接指向 FR 站点
10. **discovery_feishu_push.py 修复** - 添加 SITE_NAME/SITE_URL 常量

## ⚠️ 需要手动操作

### 启用 GitHub Pages

1. 打开 https://github.com/Baodan168/product-radar-fr/settings/pages
2. 在 "Source" 下拉选择 **Deploy from a branch**
3. 选择 **main** 分支，根目录 `/`
4. 点击 **Save**

等待约1-2分钟，然后访问：
**https://baodan168.github.io/product-radar-fr/**

---

## 🔧 下一步（可选）

### 1. 配置 Hermes cron 任务

法国站扫描需在 Hermes 中添加独立定时任务（07:30 和 20:30 北京时间）：

```bash
# 在 Hermes 中添加 cron 任务
cd /home/lee/product-radar-fr && python3 run_scan_v2.py >> logs/fr_scan.log 2>&1
```

### 2. 首次扫描测试

```bash
cd /home/lee/product-radar-fr
python3 sources/amazon_fr.py          # 单独测试 FR 爬虫
python3 run_scan_v2.py                # 完整扫描
python3 generate_portal.py            # 生成门户
python3 -m http.server 8082           # 本地预览
```

---

## 📊 配置参数（已自动设置）

| 参数 | UK值 | FR值 |
|------|------|------|
| 价格带 | £5.99-12.99 | **€6.99-10.99** |
| FBA费用 | £1.46 | **€2.79** |
| 佣金率 | 15% | 15%（家居12%，宠物8%） |
| VAT | 20% | **20%** |
| 抓取源 | amazon.co.uk | **amazon.fr** |
| 节日数据 | UK节日 | **合并FR专属+UK通用** |
| 季节引擎 | season_engine | **fr_season_engine** |

---

## 📝 已知限制

### 1. 爬虫稳定性
- Amazon FR 直连返回 0 产品（可能是 GFW 干扰或反爬）
- Cloudflare Worker 代理尚未确认可用性
- **建议**：开启 FlClash 代理后手动测试

### 2. 补货数据
- 补货告警来自 UK 站点（007/027店），与法国站独立
- 法国站启动后需配置独立补货数据源

### 3. cron 任务
- 目前无法国站独立 cron，需手动添加