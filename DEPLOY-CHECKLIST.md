# 部署与验收清单 — Amazon FR

> 旧的 UK 分支工作流清单已废弃（那轮 UI 升级 2026-07-31 已在 UK 仓库收尾）。
> 这里是 FR 站的部署步骤与验收项。接入背景见 [HANDOFF.md](./HANDOFF.md)。

## 部署前（只读体检）

```bash
cd /home/lee/product-radar-fr
python3 -m pytest tests/ -q          # 期望 173 passed, 0 failed
git status --short                   # 确认没有意外未提交改动混入
python3 tools/preflight.py 2>/dev/null || echo "（preflight 为 UK 遗留工具，FR 暂缺，可忽略）"
```

## 部署（三种场景）

### A. 只改了代码/文档（无数据变化）

```bash
git add -A && git commit -m "..."    # 本地 main（无 remote，API 部署的是产物）
python3 generate_platform.py && python3 generate_portal.py
python3 github_api_push.py "deploy: <说明>"
```

### B. 完整扫描链路（日常运营）

```bash
bash cron_scan.sh                    # scan→bsr→platform→portal→deploy 一条龙
```

- 外层 900s 硬超时；日志在 logs/cron_*.log，机器可读状态在 logs/last_run.json
- **改过扫描/解析代码后务必走一遍 B**，别只跑生成器

### C. 需要删除线上文件时

```bash
# 单个文件
python3 github_api_push.py "msg" --delete-file output/analysis/xxx.html
# 批量（每行一个远端路径）
python3 github_api_push.py "msg" --delete-list /tmp/remote_delete.txt
```

## 线上验收（部署后 5 项）

线上基址：https://baodan168.github.io/product-radar-fr/output/index.html

| # | 检查 | 期望 |
|---|------|------|
| 1 | 门户四板块可达 | portal / platform.html / analysis/ 全 200（Pages 构建约 1 分钟） |
| 2 | 今日概览·战情卡 | 有真实产品，价格为 €；**全页不允许出现 £** |
| 3 | 今日概览·节日卡 | 法国节点（Rentrée/Toussaint/Soldes 等），带空运截止日 |
| 4 | 选品平台·趋势发现 Tab | 法语关键词，价格 € |
| 5 | 补货跟进 | 未接入时显示占位页与"不与 UK 通用"，无 UK SKU |

## 已知陷阱

- **CDN 缓存 600s**：部署完看不到变化先等 10 分钟再排查
- **safe_write 拒写**：日志出现「拒绝写入 xxx.js」= 新数据比旧数据少 50%+，
  先查数据源（多半是抓取挂了），不要强删护栏
- **git push 无效**：本仓库部署只认 github_api_push.py（API），git remote 不存在是预期的
- **REPO 指向**：github_api_push.py 的 `REPO` 必须是 `Baodan168/product-radar-fr`
  （2026-08-29 之前写错成 UK 仓库出过事故）
