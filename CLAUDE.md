# Product Radar FR — Amazon 法国站选品运营 OA

## 一句话定位

**Amazon 法国站（amazon.fr，EUR 计价）** 的选品运营门户，3+1 混合架构：
本仓库（product-radar-fr）管今日概览/选品平台/补货跟进三个核心板块，
kj-news-radar 独立仓库管跨境雷达。

**当前状态（2026-08-29）：框架搭建完成，尚未正式运营。** 内容已全面法国化
（节日/趋势发现/扫描源/EUR 计价），日常扫描调度与趋势发现深度研究
**留给 hermes 接入**（见 HANDOFF.md）。交接文档以本文件 + HANDOFF.md 为准；
ARCHITECTURE/PROJECT-VISION/DESIGN-DECISIONS 三份是 UK 原版设计遗产，
架构理念通用，涉及 UK 具体运营细节的以本文为准。

线上：https://baodan168.github.io/product-radar-fr/output/index.html

## 怎么跑起来

```bash
cd /home/lee/product-radar-fr

# 扫描 → 生成 → 部署（完整链路）
bash cron_scan.sh

# 或分步
python3 run_scan_v2.py         # 扫描引擎（UK+FR 双源，FR 产品走 amazon.fr）
python3 generate_platform.py   # 生成选品平台 HTML + output/data/*.js
python3 generate_portal.py     # 生成门户页（今日概览服务端渲染，必须重跑才刷新）
python3 github_api_push.py "msg"  # API 推送到 Baodan168/product-radar-fr（不是 git push）

# 趋势发现（法国数据，hermes 深度研究的数据基座）
python3 fr_discovery.py        # 实扫 amazon.fr 榜单 → data/discovery/<date>.json

# 本地预览
python3 -m http.server 8080    # http://localhost:8080/output/
```

## 关键文件（FR 特有部分）

| 文件 | 作用 |
|------|------|
| `oa/config.py` | **门户板块配置（加新板块改这里）** |
| `oa/dashboard.py` | 今日概览四张卡（价格符号走 config.currency） |
| `oa/health.py` | 数据新鲜度（data 目录为空时从 output/data/*.js 内容兜底） |
| `oa/restock.py` | 补货解析（占位页 `data-restock-status="empty"` → 显示"未接入"） |
| `config.json` | 主配置（EUR 价格带/禁售词含法 brands/`_fba_note`：FBA 按 2.79 GBP 计价） |
| `scanner.py` | 过滤规则 + `calc_profit`（FBA 2.79 GBP×7.3/8.0≈2.55€ 折算计入） |
| `sources/amazon_fr.py` | **amazon.fr 抓取核心**（curl_cffi 通道、法语价格/评分解析、BSR 渠道） |
| `sources/anysearch_trends.py` | 多源趋势（查询词已法国化：France/Dealabs） |
| `keyword_scanner.py` | 关键词扫描（目标 amazon.fr，fr-FR/EUR 环境） |
| `bsr_scraper.py` | BSR 抓取（按产品 amazon_url 双站路由 FR/UK） |
| `detail_verifier.py` | 详情页尺寸验证（法语规格表 Poids de l'article/逗号小数） |
| `fr_season_engine.py` | **法国季节日历**（24 节点 + 空/铁/海备货截止，字段对齐 UK 引擎） |
| `fr_discovery.py` | 法国趋势发现生成器（实扫事实 + 可复现评分，无虚构声明） |
| `festival_engine.py` | 节日引擎（**只认 data/fr_festivals_data.js，无 UK 回退**） |
| `data/fr_festivals_data.js` | 法国节日库（28 节点，2026-09→2027-12，年度续写位置） |
| `github_api_push.py` | API 推送（REPO=product-radar-fr；支持 `--delete-list` 批量删远端） |
| `oa/safe_write.py` | 数据文件写入防塌缩（新数据 < 旧数据 50% 拒写并告警） |
| `tests/` | pytest 回归（**173 项**） |

## 架构

```
门户 (generate_portal.py) → iframe 聚合
  ├─ 📡 跨境雷达 (kj-news-radar 独立仓库，iframe 直链，UK/FR 共用)
  ├─ 🎯 选品平台 (本仓库 platform.html，4 Tab：雷达/发现/节日/看板)
  └─ 📦 补货跟进 (本仓库 output/analysis/ —— FR 独立数据源，当前未接入)
```

- 门户壳与 UK 仓库逐字共享（templates/assets/shared），UK 那边的壳改动可以搬过来
- 混合扫描：run_scan_v2 以 Amazon UK 为主源（跨境信号）+ amazon.fr 为 FR 直采；
  FR 产品带 `"platform": "Amazon-FR"`，EUR 计价，链接/验证/BSR 全走 .fr

## 操作禁忌（继承自 UK 项目，一样有效）

- ❌ **结构改动必须先讨论** — 板块独立/合并/URL 变更先出方案
- ❌ **改数据不直接改 HTML** — 改数据源 JSON，重新生成
- ❌ **改样式不走内联 CSS** — 走 shared/oa-theme.css
- ❌ **别手写 output/data/*.js** — 由 generate_platform.py 生成，且 safe_write 有防塌缩护栏：
  新数据条数 < 旧数据 50% 时**拒绝写入**（数据源挂掉的兜底）。确实要替换旧数据集时，
  先删旧文件再生成（2026-08-29 UK→FR 数据切换就是这么做的）
- ✅ **加新板块只改 `oa/config.py` 的 MODULES 数组**
- ✅ **改门户交互改 `assets/portal.js`，改结构改 `templates/portal.html`**
- ✅ **视觉改动分批**：结构批（类名/令牌）与审美批（:root 令牌值）分开提交，
  审美批先出截图（tools/snapshot.py）再上——UK 项目拿真钱买来的教训，全文见 UK 仓库 CLAUDE.md

## 关键坑（FR 实测）

- **amazon.fr 抓取只有 curl_cffi 通道稳定**（TLS 指纹伪装）；直连 curl 被墙、
  搜索页 `s?k=` 返回 202 反爬（**只有榜单页 new-releases/bestsellers 可抓**）、
  Cloudflare Worker 代理当前超时不可用。改抓取逻辑前先看 `sources/amazon_fr.py`
  的 `_fetch_page` 通道顺序
- **类目 slug 不能想当然**：amazon.fr 的 new-releases/bestsellers slug 经实测只有
  kitchen/lawn-garden/sports/officeproduct/hpc/pet-supplies/automotive 有效
  （从 `/gp/bestsellers/` 总目录提取验证过），瞎写 slug 会拿到 200 但无产品的空壳页
- **法语价格是逗号小数**（`9,99 €`）、评分是 `4,5 sur 5 étoiles`、千分位是空格——
  解析已集中处理（`_parse_fr_price`），新增解析别绕过它
- **禁售词是双语词面匹配**：config.json 含英文词（vacuum/seat/wardrobe/bulb/
  light/mug、≥5件套装）和 46 个法语词（friandises/ampoule/jouet/bébé/vêtement/
  parfum 等，2026-08-29 补——端到端扫描曾发现法语标题的狗零食和灯泡绕过纯英文
  词表）。新 SKU/关键词是否合规，跑 `python3 -m pytest tests/test_platform.py -q` 即验
- 补货跟进与 UK **不通用**：占位页带 `data-restock-status="empty"`，dashboard/新鲜度
  据此显示"未接入"而不是报错；接入数据源后删标记、跑 generate_analysis.py（需 FR 化）
- `output/*`、`data/channels|discovery|history/` 不入 git（走 API 部署），
  仓库里改它们 git 看不见

## 本地运行（WSL，与 UK 同机）

这个项目只能在 `/home/lee/product-radar-fr` 完整跑起来（凭据绑死本机）。
**Python 3.12+**（festival_engine 曾因嵌套 f-string 需要 PEP 701）。

| 依赖 | 路径 | 缺了会怎样 |
|------|------|-----------|
| 凭据 | `~/.hermes/.env`、`~/.hermes/github_token.txt` | 抓不到数据、推不上 GitHub |
| 抓取浏览器 | `~/.cloakbrowser/chromium-*` | BSR 抓取降级（不影响主流程） |
| curl_cffi | 系统python3（已 `pip3 install --break-system-packages curl_cffi`） | amazon.fr 完全抓不到 |
| pytest | 已装（同上方式） | 跑不了回归 |

**已废弃的 UK 依赖（FR 不再需要）**：`~/uk-festival-planner/`（节日库已法国化，
festival_engine 不再读它）、`~/product-analysis/`（补货占位中，接入 FR 数据源时再议）。

## 数据安全

- GitHub Pages 公开部署：补货页若恢复，沿用 `oa/desensitize.py` 发布边界脱敏
  （毛利率/销量 → 档位标签，`desensitize_analysis.py --check` 门禁）
- FR 新增事实边界：趋势发现的需求信号只写**实扫可复现的数字**（榜单实扫统计、
  日历日期、利润模型输出），不虚构市场声明——fr_discovery.py 注释里有约定

## 当前状态与待办

- 框架就绪，等待 hermes 接入运营（扫描调度、趋势发现深度研究、补货数据源接入）
- 待办清单与接入步骤见 `HANDOFF.md`
- 已知遗留：Cloudflare Worker 代理不可用（curl_cffi 单通道风险）；
  Kitchen 类目解析率偏低（30 块只出 3 个，疑另一种页面布局）
