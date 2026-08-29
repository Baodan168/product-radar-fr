#!/usr/bin/env python3
"""统一利润计算 CLI — 选品雷达和选品发现共用。

真正的实现在 scanner.calc_profit（读 config.json cost_structure，
FBA 2.79 GBP 经 CNY 汇率折 EUR，见 config._fba_note）。
本文件只是命令行入口，别在这里再写第二套成本模型——
2026-08-29 清理：旧的 GBP 硬编码 COST 表和无人调用的 calc_profit_fr 已删。

用法: python3 calc_profit.py <price_eur> [category]
输出: JSON格式的利润明细
"""
import json
import sys
from pathlib import Path

BASE = Path(__file__).parent
sys.path.insert(0, str(BASE))

from scanner import calc_profit

if __name__ == "__main__":
    price = float(sys.argv[1]) if len(sys.argv) > 1 else 7.50
    category = sys.argv[2] if len(sys.argv) > 2 else "general"
    result = calc_profit(price, category)
    print(json.dumps(result, ensure_ascii=False, indent=2))
