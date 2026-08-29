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
