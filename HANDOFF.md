# 交接：法国站框架 → hermes 接入运营

> **给接入法国站运营的 hermes：开工前先读 CLAUDE.md，再读这里。**
> 最后更新：2026-08-29 by ZCode（框架搭建会话）

## 项目定位（先对齐这个）

法国站**尚未正式运营**。当前状态是「框架搭建完成」：

- 门户/选品平台/趋势发现/节日库/扫描管线全部法国化并已上线
  （https://baodan168.github.io/product-radar-fr/output/index.html）
- 内容与数据不与 UK 通用：节日库只有法国节点、补货跟进已清空 UK 数据、
  价格 EUR 计价、FBA 按 2.79 英镑经汇率折算
- 日常运营（定时扫描、趋势发现深度研究、补货数据源接入）**由 hermes 承接**，
  本机没有给 FR 配 crontab —— 调度怎么排由 hermes 决定

三个执行者的边界（同 UK 项目约定）：

| 执行者 | 在哪 | 能碰到什么 | 推哪 |
|--------|------|-----------|------|
| **hermes** | 本机，后台调度，飞书交互 | 全部（凭据/.env/调度） | API 直推线上（github_api_push.py） |
| **ZCode/Claude（本地）** | 同一台电脑 | 全部，含 WSL 仓库 | 本地 main 提交 + API 推产物 |
| **云端会话** | 临时容器 | 只有仓库代码 | 只推分支 |

## 一、框架现状（2026-08-29 交付）

**已验证可用：**

- 完整扫描管线：`run_scan_v2.py`（UK 主源 + amazon.fr 直采，FR 产品 EUR 计价、
  amazon.fr 详情验证、BSR 双站路由）
- 法国趋势发现：`fr_discovery.py` 产出 data/discovery/<date>.json（实扫事实 +
  可复现评分，schema 与 UK hermes 产出一致）——**这是给你（hermes）准备的数据基座，
  期望的运营姿势：用它产出的实扫统计做输入，产出深度研究文案后写回 discovery JSON**
- 法国节日库：`data/fr_festivals_data.js` 28 节点（2026-09→2027-12），
  全部通过禁售词合规自检
- 法国季节日历：`fr_season_engine.py`（空/铁/海备货截止 + 紧急度）
- 门户四板块：跨境雷达（共用）/选品平台/补货跟进（占位）/今日概览
- 部署：`github_api_push.py` → Baodan168/product-radar-fr，只推变更文件，
  支持 `--delete-list` 批量删远端；output/data 写入有防塌缩护栏（oa/safe_write.py）
- 回归：pytest 173 项（`python3 -m pytest tests/ -q`）

**明确未做（等你接入）：**

| 事项 | 说明 | 入口 |
|------|------|------|
| 定时扫描调度 | 本机 crontab 无 FR 条目；建议每天 1-2 次（UK 是 09:10/14:00 节奏） | cron_scan.sh |
| 趋势发现深度研究 | fr_discovery.py 只有模板文案，需要 AI 深度研究提升质量 | fr_discovery.py + data/discovery/ |
| 补货数据源接入 | 板块是占位页；需 FR 库存导出，接入后 FR 化 generate_analysis.py、删占位标记 | output/analysis/index.html + oa/restock.py |
| 看板同步 Worker | kanban_sync.endpoint 为空（只存浏览器本地）；要团队同步需部署 cloudflare-worker.js | config.json |

## 二、hermes 接入后的首次验证清单

```bash
cd /home/lee/product-radar-fr
python3 -m pytest tests/ -q            # 期望 173 passed
bash cron_scan.sh                      # 完整链路：扫描→BSR→生成→部署
# 跑完检查：
#   1. 日志末尾「扫描结果：N个产品 → M个通过筛选」，M 期望 > 0
#   2. 日志 [7a] 行：FR 产品应走 amazon.fr 验证（verify_status=verified 比例）
#   3. https://baodan168.github.io/product-radar-fr/output/index.html
#      今日选品战情卡应有真实产品（£→€ 检查：全页不允许出现 £）
#   4. python3 fr_discovery.py 跑一次，确认 data/discovery/<今天>.json 生成
```

**注意 cron 预算**：cron_scan.sh 外层 900s 硬超时（scan 600 + bsr 30 +
platform 20 + portal 20 + deploy 180）。FR 产品走 .fr 详情验证会比 UK 慢
（curl_cffi 通道），如果 [7a] 经常吃满预算，优先调大 batch_verify 的
time_budget 换取更低的扫描频次，而不是砍掉验证。

## 三、运营节奏建议（对齐法国零售日历）

- **圣诞季（最重要）**：海运截止约 2026-10-15（fr_season_engine 已算好），
  10 月第 1 周起节日选品 Tab 应以圣诞 SKU 为主力
- **年度续写**（每年 8-9 月做一次）：
  1. `data/fr_festivals_data.js` 续写下一年节点（28 节点模板照抄改日期）
  2. `fr_season_engine.py` 的 EASTER 显式表补下一年复活节日期
- **法国特有合规**：EPR 注册号、Triman 回收标识、包装法——上架前人工核对，
  禁售词表管不了这类资质问题

## 四、已知坑（都是踩过的，别再踩）

1. **部署目标**：github_api_push.py 的 REPO 曾写死成 UK 仓库，FR 部署偷偷进了
   UK 仓库、FR 线上 assets 全 404——改 REPO/仓库路径时务必 grep 确认
2. **safe_write 护栏**：新数据 < 旧数据 50% 会拒写并告警——这是特性不是 bug；
   有意替换数据集时先删 output/data/<file> 再生成
3. **amazon.fr 只有榜单页可抓**：搜索页 202 反爬；slug 想当然会拿到无产品的
   200 空壳页。有效 slug 见 CLAUDE.md「关键坑」
4. **禁售词双语匹配**：config.json 的 forbidden_keywords 已含 46 个法语词
   （friandises/ampoule/jouet/bébé/vêtement/parfum/arme 等，2026-08-29 补——
   此前法语标题的狗零食、灯泡绕过了纯英文词表）。新增禁售词时同步检查
   data/fr_festivals_data.js 的关键词是否误伤（合规测试会拦）
5. **别用 git push 部署**：本仓库产物走 API 推送（凭据在 ~/.hermes/github_token.txt），
   本地 main 无 remote 是预期状态（但建议 hermes 加个 private remote 备份代码）

## 五、参考

- 架构/设计理念：ARCHITECTURE.md、PROJECT-VISION.md、DESIGN-DECISIONS.md
  （UK 原版，理念通用；UK 具体运营细节以 CLAUDE.md 为准）
- UK 版 CLAUDE.md（~/product-radar/CLAUDE.md）里有视觉改动分批的完整教训，值得读
