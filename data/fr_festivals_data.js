// 法国节日数据 — 北半球共享部分节日 + 法国特有节日
const FESTIVALS = [
  // ===== 2027年1月 =====
  {
    id: "new-year-2027",
    name: "元旦",
    nameEn: "New Year",
    icon: "🎆",
    date: "2027-01-01",
    month: 1,
    importance: "A",
    category: "festival",
    themeColor: "#f59e0b",
    products: [
      {
        sku: "新年日历/挂历",
        skuEn: "New Year Calendar 2027",
        category: "gift",
        costRange: "€2-5",
        priceRange: "€6.99-8.99",
        margin: "约50-60%",
        matchScore: 5,
        riskLevel: "低",
        riskNote: "新年刚需；12月备货1月上架",
        keywords: ["calendrier 2027", "new year calendar", "wall planner"],
        sourcing: "1688: 新年日历"
      },
      {
        sku: "新年计划本",
        skuEn: "New Year Planner Notebook",
        category: "gift",
        costRange: "€3-6",
        priceRange: "€6.99-8.99",
        margin: "约50-60%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["planning 2027", "carnet de objectifs", "new year resolution"],
        sourcing: "1688: 计划本"
      }
    ]
  },
  // ===== 2027年2月 =====
  {
    id: "candlemas-2027",
    name: "圣蜡节/燃烛节",
    nameEn: "Candlemas / Chandeleur",
    icon: "🕯️",
    date: "2027-02-02",
    month: 2,
    importance: "B",
    category: "festival",
    themeColor: "#fbbf24",
    products: [
      {
        sku: "薄饼锅(可丽饼)",
        skuEn: "Crepe Pan / Poêle à Crêpe",
        category: "home",
        costRange: "€5-12",
        priceRange: "€7.99-9.99",
        margin: "约45-55%",
        matchScore: 5,
        riskLevel: "低",
        keywords: ["poêle à crêpe", "crepe pan", "galette"],
        sourcing: "1688: 可丽饼锅"
      },
      {
        sku: "可丽饼工具套装",
        skuEn: "Crepe Making Kit",
        category: "home",
        costRange: "€8-15",
        priceRange: "€8.99-9.99",
        margin: "约40-50%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["crêpe maker", "crepe tools", "ustensiles crêpe"],
        sourcing: "1688: 可丽饼工具"
      }
    ]
  },
  // ===== 2027年3月 =====
  {
    id: "easter-2027",
    name: "复活节",
    nameEn: "Easter",
    icon: "🐰",
    date: "2027-03-28",
    month: 3,
    importance: "A",
    category: "festival",
    themeColor: "#a855f7",
    products: [
      {
        sku: "复活节彩蛋装饰",
        skuEn: "Easter Egg Decorations",
        category: "decor",
        costRange: "€2-5",
        priceRange: "€5.99-7.99",
        margin: "约55-65%",
        matchScore: 5,
        riskLevel: "低",
        keywords: ["oeuf de paques", "easter eggs", "decoration paques"],
        sourcing: "1688: 复活节装饰"
      },
      {
        sku: "兔子造型摆件",
        skuEn: "Easter Bunny Figurine",
        category: "gift",
        costRange: "€3-8",
        priceRange: "€6.99-8.99",
        margin: "约50-60%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["lapin paques", "easter bunny", "figurine lapin"],
        sourcing: "1688: 复活节兔子"
      }
    ]
  },
  // ===== 2027年4-5月 =====
  {
    id: "easter-garden-2027",
    name: "园艺季开始",
    nameEn: "Garden Season Start",
    icon: "🌱",
    date: "2027-04-15",
    month: 4,
    importance: "A",
    category: "seasonal",
    themeColor: "#22c55e",
    products: [
      {
        sku: "园艺工具套装",
        skuEn: "Garden Tool Set",
        category: "garden",
        costRange: "€8-15",
        priceRange: "€7.99-9.99",
        margin: "约40-50%",
        matchScore: 5,
        riskLevel: "低",
        keywords: ["outils jardin", "garden tools", "jardinage"],
        sourcing: "1688: 园艺工具"
      },
      {
        sku: "花盆/种植袋",
        skuEn: "Plant Pots / Grow Bags",
        category: "garden",
        costRange: "€3-8",
        priceRange: "€6.99-8.99",
        margin: "约50-60%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["pot fleur", "jardiniere", "grow bag"],
        sourcing: "1688: 花盆"
      }
    ]
  },
  // ===== 2027年6-8月(夏季) =====
  {
    id: "summer-outdoor-2027",
    name: "夏季户外季",
    nameEn: "Summer Outdoor Season",
    icon: "☀️",
    date: "2027-06-15",
    month: 6,
    importance: "A",
    category: "seasonal",
    themeColor: "#f97316",
    products: [
      {
        sku: "折叠桌椅套装",
        skuEn: "Folding Table Chair Set",
        category: "outdoor",
        costRange: "€15-25",
        priceRange: "€8.99-9.99",
        margin: "约35-45%",
        matchScore: 5,
        riskLevel: "低",
        keywords: ["table pliante", "chaise pliante", "mobilier exterieur"],
        sourcing: "1688: 折叠家具"
      },
      {
        sku: "遮阳伞",
        skuEn: "Garden Parasol / Sun Umbrella",
        category: "outdoor",
        costRange: "€10-20",
        priceRange: "€8.99-9.99",
        margin: "约40-50%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["parasol jardin", "ombrelle", "sun umbrella"],
        sourcing: "1688: 遮阳伞"
      },
      {
        sku: "野营装备",
        skuEn: "Camping Equipment",
        category: "outdoor",
        costRange: "€10-20",
        priceRange: "€8.99-9.99",
        margin: "约40-50%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["camping", "equipment camping", "sac de couchage"],
        sourcing: "1688: 野营装备"
      },
      {
        sku: "灭蚊灯/驱蚊器",
        skuEn: "Mosquito Lamp / Repeller",
        category: "outdoor",
        costRange: "€5-12",
        priceRange: "€6.99-8.99",
        margin: "约50-60%",
        matchScore: 5,
        riskLevel: "低",
        keywords: ["moustique", "anti-moustique", "lamp anti-moustique"],
        sourcing: "1688: 灭蚊灯"
      }
    ]
  },
  // ===== 2027年9-11月(秋季) =====
  {
    id: "autumn-home-2027",
    name: "秋季家居季",
    nameEn: "Autumn Home Season",
    icon: "🍂",
    date: "2027-09-15",
    month: 9,
    importance: "B",
    category: "seasonal",
    themeColor: "#d97706",
    products: [
      {
        sku: "保暖毯/盖毯",
        skuEn: "Throw Blanket",
        category: "home",
        costRange: "€8-15",
        priceRange: "€7.99-9.99",
        margin: "约45-55%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["couverture canapé", "throw blanket", "gigot"],
        sourcing: "1688: 毛毯"
      }
    ]
  },
  // ===== 2027年10-12月(冬季/圣诞季) =====
  {
    id: "christmas-2027",
    name: "圣诞节",
    nameEn: "Christmas",
    icon: "🎄",
    date: "2027-12-25",
    month: 12,
    importance: "A",
    category: "festival",
    themeColor: "#dc2626",
    products: [
      {
        sku: "圣诞树装饰灯串",
        skuEn: "Christmas Tree Lights",
        category: "decor",
        costRange: "€5-12",
        priceRange: "€6.99-9.99",
        margin: "约50-60%",
        matchScore: 5,
        riskLevel: "低",
        keywords: ["guirlande noel", "lights christmas", "decoration sapin"],
        sourcing: "1688: 圣诞灯串"
      },
      {
        sku: "圣诞袜/挂饰",
        skuEn: "Christmas Stocking / Ornament",
        category: "decor",
        costRange: "€2-6",
        priceRange: "€5.99-7.99",
        margin: "约55-65%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["chausson noel", "ornement noel", "christmas stocking"],
        sourcing: "1688: 圣诞装饰"
      },
      {
        sku: "圣诞礼品袋/包装纸",
        skuEn: "Christmas Gift Bags / Wrapping Paper",
        category: "gift",
        costRange: "€2-5",
        priceRange: "€5.99-7.99",
        margin: "约55-65%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["sac cadeau noel", "papier cadeau", "gift bag"],
        sourcing: "1688: 礼品包装"
      }
    ]
  },
  {
    id: "new-year-eve-2027",
    name: "跨年夜",
    nameEn: "New Year's Eve",
    icon: "🎉",
    date: "2027-12-31",
    month: 12,
    importance: "A",
    category: "festival",
    themeColor: "#1e40af",
    products: [
      {
        sku: "派对装饰套装",
        skuEn: "Party Decorations Kit",
        category: "decor",
        costRange: "€5-10",
        priceRange: "€6.99-8.99",
        margin: "约50-60%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["decoration nouvelle annee", "party decorations", "confetti"],
        sourcing: "1688: 派对装饰"
      },
      {
        sku: "新年倒计时用品",
        skuEn: "New Year Countdown Supplies",
        category: "gift",
        costRange: "€3-8",
        priceRange: "€5.99-7.99",
        margin: "约55-65%",
        matchScore: 3,
        riskLevel: "低",
        keywords: ["countdown", "new year party", "noel nouvel an"],
        sourcing: "1688: 新年用品"
      }
    ]
  }
];
