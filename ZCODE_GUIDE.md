# ZCode执行指南 — Amazon France选品平台

## 前置条件
- ZCode桌面已登录，Weekend Build额度有效（至8月31日9:00）
- 已安装Python 3.12+和node.js

## 执行步骤

### 第一步：打开ZCode并导航到项目目录

1. 打开ZCode桌面应用
2. 点击左下角"打开文件夹"或按 `Ctrl+O`
3. 输入路径：`\\wsl.localhost\home\lee\product-radar-fr`
4. 等待ZCode加载完成

### 第二步：执行初始化脚本

在ZCode终端中输入：

```bash
cd /home/lee/product-radar-fr
bash setup.sh
```

等待脚本执行完成（约2-3分钟）。

### 第三步：运行Python生成器

```bash
cd /home/lee/product-radar-fr
python3 generate_platform.py
python3 generate_portal.py
```

### 第四步：本地预览验证

```bash
python3 -m http.server 8082
```

然后打开浏览器访问：`http://localhost:8082/output/`

检查：
- 选品平台是否正常显示
- 节日数据是否正确加载
- 利润计算是否使用法国参数

### 第五步：创建GitHub仓库并推送

```bash
cd /home/lee/product-radar-fr
git remote add origin https://github.com/Baodan168/product-radar-fr.git
git branch -M main
git push -u origin main
```

**注意**：如果提示需要认证，使用你的GitHub PAT token（存储在 `~/.hermes/github_token.txt`）

### 第六步：启用GitHub Actions

1. 打开 https://github.com/Baodan168/product-radar-fr/actions
2. 点击" I understand my workflows, go ahead and enable them"
3. 等待首次运行完成

### 第七步：验证部署

访问：https://baodan168.github.io/product-radar-fr/

检查：
- 门户页是否正常显示
- 选品平台是否正常加载
- 数据是否正确渲染

## 预计Token消耗

| 任务 | 预计消耗 |
|------|----------|
| 项目初始化 | ~5M tokens |
| 页面生成验证 | ~3M tokens |
| GitHub推送 | ~1M tokens |
| 问题修复 | ~5M tokens |
| **总计** | **~14M tokens** |

剩余约286M tokens可用于后续优化。

## 后续任务（可选）

1. **添加节日数据**：如果Festival数据不完整，让ZCode补充法国特有节日
2. **优化抓取源**：根据实际抓取结果调整亚马逊FR URL
3. **设置Hermes cron**：添加定时任务每日自动扫描
4. **联调领星ERP**：如果法国店已开通，连接ERP数据

## 故障排查

### 问题：Python导入错误
```bash
pip install browser-use playwright
playwright install chromium
```

### 问题：Git推送失败
检查token权限：
```bash
cat ~/.hermes/github_token.txt
# 确保token有repo权限
```

### 问题：页面空白
检查浏览器控制台错误：
- 网络标签看JS文件是否加载成功
- Console标签看具体错误信息

## 重要提示

1. **不要修改UK/ AU项目**：所有操作在product-radar-fr目录内进行
2. **节日数据复用**：法国与UK同属北半球，直接复用UK节日数据
3. **价格带验证**：生成后检查利润计算是否正确（€6.99-10.99区间）
4. **脱敏检查**：部署前运行 `python3 desensitize_analysis.py` 确保毛利率不泄露