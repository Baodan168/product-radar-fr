#!/usr/bin/env python3
"""
Season Engine — France seasonal event prediction for product sourcing.

Built-in calendar of France consumer events (Jan-Dec) with:
- Event dates and recommended product categories
- Sourcing deadlines (air freight: -45 days, sea freight: -75 days)
- Seasonal search keyword generation (French + English)

Usage:
    python3 fr_season_engine.py                  # upcoming events (90 days)
    python3 fr_season_engine.py --days 120       # next 120 days
    python3 fr_season_engine.py --keywords       # current seasonal keywords
    python3 fr_season_engine.py --json           # JSON output
"""
import json, sys
from datetime import datetime, timedelta
from pathlib import Path

BASE = Path(__file__).parent
CONFIG = json.loads((BASE / "config.json").read_text())

# ── France Seasonal Events Calendar ───────────────────────────────────
# Based on Amazon FR bestseller trends + Leclerc/Monoprix seasonal reports 2026

MONTHLY_SEASONAL_KEYWORDS = {
    1: [  # 深冬 + 节后清理 + 新年计划
        "rangeur maison", "organiseur bureau", "boîte rangement",
        "ustensiles cuisine", "gadgets cuisine nouveau an", "gants thermiques",
        "couverture chauffante", "joint porte", "articles hiver"],
    2: [  # 初春准备 + 情人节
        "cadeau valentine", "idée cadeau amoureux", "accessoires voyage",
        "décoration maison", "emballage cadeau", "rangement jardin",
        "houssmeuble extérieur", "jardinière fenêtre"],
    3: [  # 春季 + 母亲节 + 园艺季开始
        "outils nettoyage printemps", "outils jardin", "gadgets cuisine",
        "décoration intérieure", "solutions rangement", "cadeau mère",
        "pot fleur", "gants jardinage", "kit entretien pelouse"],
    4: [  # 春季高峰 + 复活节
        "accessoires jardin", "décoration pâques", "outils extérieur",
        "gadgets cuisine", "fournitures fête", "accessoires nettoyage",
        "mangem	oiseau", "jardin amical faune", "kit culture herbes"],
    5: [  # 初夏 + 母亲节周末 + 园艺高峰
        "outils jardin", "accessoires BBQ", "décoration jardin",
        "pot fleur", "accessoires pique-nique", "coussin extérieur",
        "éclairage jardin", "boîte rangement extérieur", "housse chauffette patio"],
    6: [  # 夏季 + 父亲节 + 学校假期准备
        "accessoires voyage", "nettoyage voiture", "gadgets extérieur",
        "bouteille eau", "kit pique-nique", "accessoires camping",
        "cadeau père", "tuyau jardin", "tapis extérieur"],
    7: [  # 盛夏 + 真空期 + 夏季促销
        "accessoires extérieur", "outils BBQ", "gadgets voyage",
        "accessoires voiture", "équipement camping", "accessoires plage",
        "ventilateur portable", "voile ombrage"],
    8: [  # 夏末 + 返校季
        "accessoires voyage", "fournitures retour école", "boîte déjeuner",
        "organiseur bureau", "rangement", "refroidissement extérieur",
        "boîte rangement jardin", "rangement coussin extérieur"],
    9: [  # 秋季 + 返校后 + 花园整理
        "gadgets cuisine", "décoration automne", "accessoires bureau",
        "organiseur rangement", "bougie", "articles université",
        "accessoire souffleur", "organisateur outils jardin"],
    10: [  # 深秋 + 万圣节 + 花园越冬准备
        "décoration halloween", "outils jardin automne", "fournitures fête",
        "bougie", "mangeoire oiseau", "accessoires oiseau",
        "chauffe serre", "houss plante", "sac déchets jardin"],
    11: [  # 初冬 + 黑色星期五 + 圣诞准备
        "décoration Noël", "idée cadeau", "guirlandes guirlande",
        "fournitures fête", "gadgets cuisine", "jetée canapé",
        "affaires black friday", "éclairage extérieur Noël", "accessoires sapin"],
    12: [  # 深冬 + 圣诞 + 新年派对
        "cadeaux Noël", "fournitures fête", "organiseur rangement",
        "gadgets cuisine", "accessoires voyage", "décoration maison",
        "jetée chauffante", "entretien jardin hiver", "accessoires foyer"],
}

# 北半球季节映射（法国与UK相同）
SEASONS = {
    "spring": {"label": "春季", "en": "Spring", "icon": "🌸", "months": (3, 4, 5), "color": "var(--oa-green)"},
    "summer": {"label": "夏季", "en": "Summer", "icon": "☀️", "months": (6, 7, 8), "color": "var(--oa-orange)"},
    "autumn": {"label": "秋季", "en": "Autumn", "icon": "🍂", "months": (9, 10, 11), "color": "#b45309"},
    "winter": {"label": "冬季", "en": "Winter", "icon": "❄️", "months": (12, 1, 2), "color": "var(--oa-blue)"},
}

SEASON_AIR_FREIGHT_LEAD = 47  # 空运备货提前天数

# 区域气候标签：法国温带海洋性气候（西部）+ 地中海气候（南部）
SEASON_REGION_TAGS = {
    "spring": {"months": (3, 4, 5), "north": "标准春(3-5月)", "south": "早春(2-4月)"},
    "summer": {"months": (6, 7, 8), "north": "标准夏(6-8月)", "south": "盛夏(5-9月)"},
    "autumn": {"months": (9, 10, 11), "north": "标准秋(9-11月)", "south": "晚秋(10-12月)"},
    "winter": {"months": (12, 1, 2), "north": "标准冬(12-2月)", "south": "暖冬(11-2月)"},
}


def get_seasonal_keywords(days_ahead=90):
    """获取未来N天的季节性关键词"""
    now = datetime.now()
    end_date = now + timedelta(days=days_ahead)
    
    keywords = []
    current_month = now.month
    
    # 当前月及未来几个月的关键词
    for month in range(current_month, min(current_month + 6, 13)):
        m = month if month <= 12 else month - 12
        if m in MONTHLY_SEASONAL_KEYWORDS:
            keywords.extend(MONTHLY_SEASONAL_KEYWORDS[m])
    
    return list(set(keywords))[:30]  # 去重并限制数量


def get_upcoming_events(days_ahead=90):
    """获取即将到来的季节性事件"""
    now = datetime.now()
    end_date = now + timedelta(days=days_ahead)
    
    events = []
    
    # 基于季节添加事件
    current_season = _current_season_key()
    
    # 当前季节的关键词
    if current_season in SEASONS:
        season_info = SEASONS[current_season]
        month = now.month
        if month in MONTHLY_SEASONAL_KEYWORDS:
            events.append({
                "type": "season",
                "name": f"{season_info['label']}选品季",
                "name_en": f"{season_info['en']} Season",
                "icon": season_info['icon'],
                "date": now.strftime('%Y-%m-%d'),
                "keywords": MONTHLY_SEASONAL_KEYWORDS[month][:10],
                "region_tag": SEASON_REGION_TAGS[current_season]["north"]
            })
    
    return events


def _current_season_key():
    """获取当前季节的key"""
    month = datetime.now().month
    for key, info in SEASONS.items():
        if month in info["months"]:
            return key
    return "spring"


if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser(description='France Seasonal Keywords Generator')
    parser.add_argument('--days', type=int, default=90, help='Days ahead')
    parser.add_argument('--keywords', action='store_true', help='Output keywords only')
    parser.add_argument('--json', action='store_true', help='JSON output')
    args = parser.parse_args()
    
    if args.keywords:
        kws = get_seasonal_keywords(args.days)
        print('\n'.join(kws))
    elif args.json:
        events = get_upcoming_events(args.days)
        print(json.dumps(events, ensure_ascii=False, indent=2))
    else:
        print(f"=== France Seasonal Events (next {args.days} days) ===")
        events = get_upcoming_events(args.days)
        for e in events:
            print(f"\n{e['icon']} {e['name']} ({e['date']})")
            print(f"  Region: {e.get('region_tag', 'N/A')}")
            print(f"  Keywords: {', '.join(e['keywords'][:5])}")
