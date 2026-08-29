#!/usr/bin/env python3
"""
Season Engine — France seasonal event prediction for product sourcing.

对齐 UK season_engine.py 的输出结构（event_name/date/days_until/
recommended_categories/sourcing_deadline_air/rail/sea/sourcing_urgency/notes），
保证 oa/dashboard.py 和 generate_platform.py 不需要分叉逻辑。

法国日历特点（区别于 UK）：
- Soldes（冬季/夏季大减价）是法律规定的全国性促销期，流量高峰堪比黑五
- La Rentrée（开学季/返工季）是法国第二大购物节点
- Fête des Mères 是「五月的最后一个周日」（若与圣灵降临节重叠则顺延一周）
- 移动节日（复活节等）用 2026-2028 显式日期表

Usage:
    python3 fr_season_engine.py                  # upcoming events (90 days)
    python3 fr_season_engine.py --days 120       # next 120 days
    python3 fr_season_engine.py --keywords       # current seasonal keywords
    python3 fr_season_engine.py --json           # JSON output
"""
import json, sys
from datetime import datetime, timedelta, date
from pathlib import Path

BASE = Path(__file__).parent
CONFIG = json.loads((BASE / "config.json").read_text())

# ── France Seasonal Events Calendar ───────────────────────────────────
# 依据 Amazon FR 类目节奏 + 法国零售日历（Soldes/Rentrée 为法定商业节点）

MONTHLY_SEASONAL_KEYWORDS = {
    1: [  # 深冬 + Soldes d'hiver + 节后整理
        "rangeur maison", "organiseur bureau", "boîte rangement",
        "ustensiles cuisine", "gadgets cuisine nouveau an", "gants thermiques",
        "couverture chauffante", "joint porte", "articles hiver"],
    2: [  # Chandeleur + Saint-Valentin
        "poêle crêpe", "moule galette des rois", "idée cadeau amoureux",
        "décoration maison", "emballage cadeau", "rangement jardin",
        "housse meuble extérieur", "jardinière fenêtre"],
    3: [  # 春季 + 园艺季开始
        "outils nettoyage printemps", "outils jardin", "gadgets cuisine",
        "décoration intérieure", "solutions rangement", "cadeau mère",
        "pot fleur", "gants jardinage", "kit entretien pelouse"],
    4: [  # Pâques + 春季高峰
        "accessoires jardin", "décoration pâques", "outils extérieur",
        "gadgets cuisine", "fournitures fête", "accessoires nettoyage",
        "mangeoire oiseau", "jardin amical faune", "kit culture herbes"],
    5: [  # Fête des Mères + 园艺高峰
        "outils jardin", "accessoires BBQ", "décoration jardin",
        "pot fleur", "accessoires pique-nique", "coussin extérieur",
        "éclairage jardin", "boîte rangement extérieur", "housse mobilier jardin"],
    6: [  # Fête des Pères + Soldes d'été + 假期准备
        "accessoires voyage", "nettoyage voiture", "gadgets extérieur",
        "bouteille eau", "kit pique-nique", "accessoires camping",
        "cadeau père", "tuyau jardin", "tapis extérieur"],
    7: [  # 盛夏假期
        "accessoires extérieur", "outils BBQ", "gadgets voyage",
        "accessoires voiture", "équipement camping", "accessoires plage",
        "ventilateur portable", "voile ombrage"],
    8: [  # 夏末 + La Rentrée（开学季）
        "accessoires voyage", "fournitures rentrée scolaire", "boîte déjeuner",
        "organiseur bureau", "rangement", "refroidissement extérieur",
        "boîte rangement jardin", "rangement coussin extérieur"],
    9: [  # Rentrée 后 + 秋季花园
        "gadgets cuisine", "décoration automne", "accessoires bureau",
        "organiseur rangement", "bougie", "articles université",
        "organisateur outils jardin", "tapis entrée maison"],
    10: [  # Halloween + 花园越冬
        "décoration halloween", "outils jardin automne", "fournitures fête",
        "bougie", "mangeoire oiseau", "accessoires oiseau",
        "chauffage serre", "housse plante", "sac déchets jardin"],
    11: [  # Black Friday + 圣诞准备
        "décoration Noël", "idée cadeau", "guirlande lumineuse",
        "fournitures fête", "gadgets cuisine", "plaid canapé",
        "offres black friday", "éclairage extérieur Noël", "accessoires sapin"],
    12: [  # Noël + Réveillon du Nouvel An
        "cadeaux Noël", "fournitures fête", "organiseur rangement",
        "gadgets cuisine", "accessoires voyage", "décoration maison",
        "couverture chauffante", "entretien jardin hiver", "accessoires foyer"],
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

# ── 移动节日日期表（显式维护，2026-2028）───────────────────────────────
# Easter (Pâques): 2026-04-05, 2027-03-28, 2028-04-16
EASTER = {2026: date(2026, 4, 5), 2027: date(2027, 3, 28), 2028: date(2028, 4, 16)}


def _easter(year):
    if year in EASTER:
        return EASTER[year]
    # 匿名格里高利算法兜底（超出显式表的年份）
    a = year % 19
    b, c = divmod(year, 100)
    d, e = divmod(b, 4)
    f = (b + 8) // 25
    g = (b - f + 1) // 3
    h = (19 * a + b - d - g + 15) % 30
    i, k = divmod(c, 4)
    l = (32 + 2 * e + 2 * i - h - k) % 7
    m = (a + 11 * h + 22 * l) // 451
    month = (h + l - 7 * m + 114) // 31
    day = ((h + l - 7 * m + 114) % 31) + 1
    return date(year, month, day)


def _nth_weekday(year, month, weekday, n):
    """第 n 个星期X（weekday: 0=Monday..6=Sunday），n=-1 表示最后一个。"""
    d = date(year, month, 1)
    offset = (weekday - d.weekday()) % 7
    d = d + timedelta(days=offset + 7 * (n - 1))
    if n < 0:  # 最后一个星期X：从下月1号往回推
        nm_year, nm_month = (year + 1, 1) if month == 12 else (year, month + 1)
        last_of_month = date(nm_year, nm_month, 1) - timedelta(days=1)
        offset = (last_of_month.weekday() - weekday) % 7
        d = last_of_month - timedelta(days=offset)
    return d


def _fr_events_for_year(year):
    """构建某年的法国事件表（返回 list[dict]，date 为 date 对象）。"""
    easter = _easter(year)
    # Fête des Mères：五月最后一个周日；若当天是圣灵降临节（复活节后第49天）
    # 则顺延至六月第一个周日（法国惯例）
    mothers = _nth_weekday(year, 5, 6, -1)
    if mothers == easter + timedelta(days=49):
        mothers = _nth_weekday(year, 6, 6, 1)  # 六月第一个周日

    return [
        # ── January ──
        {
            "event_name": "Soldes d'hiver（冬季大减价）",
            "date": _nth_weekday(year, 1, 2, 2),  # 一月第二个周三（法定）
            "recommended_categories": ["rangement", "organiseur maison", "décoration",
                                       "articles hiver", "boîte rangement"],
            "notes": "法定全国促销期（约6周），清仓+流量高峰，适合家居收纳类引流",
        },
        {
            "event_name": "Épiphanie / Galette des Rois",
            "date": date(year, 1, 6),
            "recommended_categories": ["moule galette", "ustensiles cuisine", "couronne papier"],
            "notes": "国王饼季节：烘焙模具/纸皇冠（食品本身禁售）",
        },
        # ── February ──
        {
            "event_name": "Chandeleur（圣蜡节·可丽饼）",
            "date": date(year, 2, 2),
            "recommended_categories": ["poêle crêpe", "spatule", "ustensiles cuisine"],
            "notes": "全民摊可丽饼：厨具小件峰值",
        },
        {
            "event_name": "Saint-Valentin（情人节）",
            "date": date(year, 2, 14),
            "recommended_categories": ["emballage cadeau", "porte-bougie", "décoration coeur",
                                       "accessoires voyage"],
            "notes": "避免化妆品/香水（禁售），主推礼品包装与家居装饰",
        },
        # ── March / April ──
        {
            "event_name": "Pâques（复活节）",
            "date": easter,
            "recommended_categories": ["décoration pâques", "panier oeufs", "moule chocolat",
                                       "mangeoire oiseau", "décoration table"],
            "notes": "法国第二大糖果/装饰节点：装饰+模具+野餐用品",
        },
        {
            "event_name": "Jardinage de printemps（春耕园艺季）",
            "date": date(year, 3, 20),
            "recommended_categories": ["outils jardin", "gants jardinage", "pot fleur",
                                       "arrosoir", "graine kit"],
            "notes": "3-5月园艺类目持续走强，早布局吃满整个春天",
        },
        # ── May ──
        {
            "event_name": "Fête du Travail / Muguet（劳动节·铃兰）",
            "date": date(year, 5, 1),
            "recommended_categories": ["pot fleur", "vase muguet", "jardin", "décoration"],
            "notes": "送铃兰习俗：花器/花园配件（植物本身需资质）",
        },
        {
            "event_name": "Fête des Mères（母亲节）",
            "date": mothers,
            "recommended_categories": ["emballage cadeau", "décoration maison", "porte bijoux",
                                       "accessoires sac"],
            "notes": "五月最后一个周日（与圣灵降临节重叠则顺延），礼品包装+家居饰品",
        },
        {
            "event_name": "Barbecue & Jardin d'été（烧烤庭院季）",
            "date": date(year, 5, 15),
            "recommended_categories": ["accessoires BBQ", "grill", "coussin extérieur",
                                       "éclairage jardin"],
            "notes": "5-7月庭院类目高峰起点",
        },
        # ── June ──
        {
            "event_name": "Fête des Pères（父亲节）",
            "date": _nth_weekday(year, 6, 6, 3),  # 六月第三个周日
            "recommended_categories": ["accessoires voiture", "gadgets cuisine", "accessoires BBQ",
                                       "emballage cadeau"],
            "notes": "车品/厨房小件/户外礼品",
        },
        {
            "event_name": "Fête de la Musique（音乐节）",
            "date": date(year, 6, 21),
            "recommended_categories": ["décoration fête", "guirlande décoration", "accessoires fête"],
            "notes": "全民街头音乐节：派对装饰（电子设备禁售，只做配件）",
        },
        {
            "event_name": "Soldes d'été（夏季大减价）",
            "date": _nth_weekday(year, 6, 2, -1),  # 六月最后一个周三（法定）
            "recommended_categories": ["accessoires plage", "voyage", "rangement",
                                       "gadgets extérieur"],
            "notes": "法定全国促销期（约6周）",
        },
        # ── July ──
        {
            "event_name": "Fête Nationale（国庆·7月14日）",
            "date": date(year, 7, 14),
            "recommended_categories": ["décoration fête", "accessoires pique-nique",
                                       "éclairage jardin"],
            "notes": "烟花/聚会带动户外用品",
        },
        {
            "event_name": "Grandes Vacances（暑期出行季）",
            "date": date(year, 7, 5),
            "recommended_categories": ["accessoires voyage", "équipement camping",
                                       "accessoires plage", "refroidisseur glaciaire"],
            "notes": "7-8月全法度假：旅行配件/露营/海滩",
        },
        # ── August ──
        {
            "event_name": "Assomption（圣母升天节）",
            "date": date(year, 8, 15),
            "recommended_categories": ["décoration maison", "bougie"],
            "notes": "公共假日，家庭聚会用品小幅走强",
        },
        {
            "event_name": "La Rentrée scolaire（开学季）",
            "date": date(year, 8, 20),
            "recommended_categories": ["fournitures rentrée", "boîte déjeuner", "organiseur bureau",
                                       "sac rangement", "accessoires desk"],
            "notes": "法国第二大购物节点（仅次于 Noël）：文具/收纳/午餐盒",
        },
        # ── October / November ──
        {
            "event_name": "Halloween",
            "date": date(year, 10, 31),
            "recommended_categories": ["décoration halloween", "fournitures fête",
                                       "citrouille décoration", "guirlande"],
            "notes": "近年在法国增长最快的装饰类节点",
        },
        {
            "event_name": "Toussaint（诸圣节）",
            "date": date(year, 11, 1),
            "recommended_categories": ["bougie", "lanterne", "porte-fleurs", "galet décoration"],
            "notes": "扫墓点烛习俗：蜡烛/灯/花器（连假前2周备货）",
        },
        {
            "event_name": "Beaujolais Nouveau（博若莱新酒节）",
            "date": _nth_weekday(year, 11, 3, 3),  # 十一月第三个周四
            "recommended_categories": ["accessoires vin", "sous-bock", "casier bouteilles"],
            "notes": "酒类本身禁售，只做酒具配件",
        },
        {
            "event_name": "Black Friday",
            "date": _nth_weekday(year, 11, 3, 4) + timedelta(days=1),  # 第四个周五
            "recommended_categories": ["toutes catégories", "gadgets cuisine", "rangement",
                                       "décoration"],
            "notes": "全年最大流量节点，提前2-3周布局广告",
        },
        {
            "event_name": "Cyber Monday",
            "date": _nth_weekday(year, 11, 3, 4) + timedelta(days=4),  # 黑五后的周一
            "recommended_categories": ["accessoires bureau", "organiseur", "gadgets"],
            "notes": "黑五延长流量，办公室/小件配件（无电子整机）",
        },
        # ── December ──
        {
            "event_name": "Marchés de Noël（圣诞市集季）",
            "date": date(year, 12, 1),
            "recommended_categories": ["décoration Noël", "guirlande lumineuse", "bougie",
                                       "emballage cadeau"],
            "notes": "斯特拉斯堡等市集从11月底启动，装饰类全年峰值",
        },
        {
            "event_name": "Réveillon de Noël / Noël（圣诞节）",
            "date": date(year, 12, 25),
            "recommended_categories": ["décoration table", "emballage cadeau", "accessoires sapin",
                                       "gadgets cuisine"],
            "notes": "全年最大节点，海运窗口在10月中旬前",
        },
        {
            "event_name": "Réveillon du Nouvel An（跨年夜）",
            "date": date(year, 12, 31),
            "recommended_categories": ["fournitures fête", "décoration table", "ballons fête"],
            "notes": "派对用品短平快节点",
        },
    ]


# 备货物流窗口（对齐 uk-festival-planner + festival_engine.py，与 config.kanban_injection 一致）
# Air: 生产3+运输13=16d，Rail: 3+30=33d，Sea: 3+60=63d；缓冲 +14d（FBA入库+安全库存）
LEAD_AIR, LEAD_RAIL, LEAD_SEA, BUFFER = 16, 33, 63, 14


def get_upcoming_events(days_ahead=90):
    """获取即将到来的法国季节性事件（与 UK season_engine 输出结构一致）。"""
    today = datetime.now().date()
    cutoff = today + timedelta(days=days_ahead)

    events = []
    # 当前年 + 下一年（跨年窗口，如12月查1月的 Soldes d'hiver）
    for year in (today.year, today.year + 1):
        for ev in _fr_events_for_year(year):
            event_date = ev["date"]
            if event_date < today or event_date > cutoff:
                continue
            days_until = (event_date - today).days

            air_deadline = event_date - timedelta(days=LEAD_AIR + BUFFER)
            rail_deadline = event_date - timedelta(days=LEAD_RAIL + BUFFER)
            sea_deadline = event_date - timedelta(days=LEAD_SEA + BUFFER)

            if air_deadline < today:
                urgency = "OVERDUE"
            elif rail_deadline < today:
                urgency = "AIR_ONLY"
            elif sea_deadline < today:
                urgency = "RAIL_OR_AIR"
            elif (air_deadline - today).days <= 7:
                urgency = "URGENT"
            else:
                urgency = "OK"

            events.append({
                "event_name": ev["event_name"],
                "date": event_date.strftime("%Y-%m-%d"),
                "days_until": days_until,
                "recommended_categories": ev["recommended_categories"],
                "sourcing_deadline_air": air_deadline.strftime("%Y-%m-%d"),
                "sourcing_deadline_rail": rail_deadline.strftime("%Y-%m-%d"),
                "sourcing_deadline_sea": sea_deadline.strftime("%Y-%m-%d"),
                "sourcing_urgency": urgency,
                "notes": ev.get("notes", ""),
            })

    events.sort(key=lambda e: e["date"])
    return events


def get_seasonal_keywords(days_ahead=90):
    """获取未来N天的季节性关键词（覆盖跨年月份）。"""
    now = datetime.now()
    keywords = []
    m = now.month
    for _ in range(6):  # 当前月起6个月，自动跨年
        keywords.extend(MONTHLY_SEASONAL_KEYWORDS.get(m, []))
        m = 1 if m >= 12 else m + 1
    return list(dict.fromkeys(keywords))[:30]  # 保序去重并限制数量


def _current_season_key():
    """获取当前季节的key"""
    month = datetime.now().month
    for key, info in SEASONS.items():
        if month in info["months"]:
            return key
    return "spring"


def get_seasonal_sourcing_alert():
    """当前最紧迫的备货告警（供 cron/推送用）。"""
    events = get_upcoming_events(days_ahead=60)
    for ev in events:
        if ev["sourcing_urgency"] in ("OVERDUE", "AIR_ONLY", "URGENT"):
            return ev
    return events[0] if events else None


if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser(description='France Seasonal Events Engine')
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
            print(f"\n📅 {e['event_name']} ({e['date']}, {e['days_until']}天后)")
            print(f"  备货: 空运截止 {e['sourcing_deadline_air']} | 铁路 {e['sourcing_deadline_rail']} | 海运 {e['sourcing_deadline_sea']} [{e['sourcing_urgency']}]")
            print(f"  类目: {', '.join(e['recommended_categories'])}")
            if e['notes']:
                print(f"  备注: {e['notes']}")
