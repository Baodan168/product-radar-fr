// 法国节日数据 — 全年法国本土零售日历（2026-09 → 2027-12）
// 2026-08-29 重建：内容全部按法国站制定（Soldes/Rentrée/Toussaint 等法国特有节点），
// 不再回退使用 UK 节日数据。SKU 建议已按禁售词表自查（无电子/电池/灯具/玩具/杯具）。
const FESTIVALS = [
  // ===== 2026年9-12月（当季可执行） =====
  {
    id: "rentree-2026",
    name: "开学季（La Rentrée）",
    nameEn: "Back to School France",
    icon: "🎒",
    date: "2026-09-01",
    month: 9,
    importance: "A",
    category: "seasonal",
    themeColor: "#2563eb",
    products: [
      {
        sku: "课程表磁性白板套装",
        skuEn: "Magnetic Weekly Planner Board",
        category: "office",
        costRange: "€2-5",
        priceRange: "€7.99-9.99",
        margin: "约50-60%",
        matchScore: 5,
        riskLevel: "低",
        keywords: ["planning semaine aimanté", "tableau effaçable frigo", "organisateur rentree"],
        sourcing: "1688: 磁性白板 周计划 冷藏贴"
      },
      {
        sku: "午餐保鲜盒三分隔",
        skuEn: "Bento Lunch Box 3 Compartments",
        category: "kitchen",
        costRange: "€3-6",
        priceRange: "€8.99-10.99",
        margin: "约45-55%",
        matchScore: 5,
        riskLevel: "低",
        keywords: ["boîte déjeuner compartiments", "lunch box isotherme", "boîte repas école"],
        sourcing: "1688: 分格保鲜盒 学生午餐盒"
      },
      {
        sku: "桌面文具收纳架",
        skuEn: "Desk Organiser Stationery Holder",
        category: "office",
        costRange: "€2-4",
        priceRange: "€6.99-8.99",
        margin: "约55-65%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["organisateur bureau stylo", "desk tidy stationery", "rangement pupitre"],
        sourcing: "1688: 桌面收纳架 笔筒"
      },
      {
        sku: "书包防雨罩（反光条）",
        skuEn: "Reflective Backpack Rain Cover",
        category: "outdoor",
        costRange: "€1-2.5",
        priceRange: "€6.99-7.99",
        margin: "约60-70%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["couvre sac à dos pluie", "protection cartable reflectech", "housse sac reflective"],
        sourcing: "1688: 书包防雨罩 反光条"
      }
    ]
  },
  {
    id: "automne-jardin-2026",
    name: "秋园整理季",
    nameEn: "Autumn Garden Prep",
    icon: "🍂",
    date: "2026-09-15",
    month: 9,
    importance: "B",
    category: "seasonal",
    themeColor: "#b45309",
    products: [
      {
        sku: "落叶收集网袋",
        skuEn: "Garden Leaf Waste Bag Holder",
        category: "garden",
        costRange: "€2-4",
        priceRange: "€7.99-9.99",
        margin: "约55-65%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["sac déchets jardin", "support sac feuilles", "collecteur feuilles"],
        sourcing: "1688: 落叶袋支架 园艺垃圾袋"
      },
      {
        sku: "植物防寒保温罩",
        skuEn: "Plant Frost Protection Cover",
        category: "garden",
        costRange: "€1.5-3.5",
        priceRange: "€6.99-9.99",
        margin: "约60-70%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["voile hivernage plante", "housse protection gel", "couverture antigel jardin"],
        sourcing: "1688: 植物防冻罩 无纺布保温"
      },
      {
        sku: "球根种植器（带刻度）",
        skuEn: "Garden Dibber with Depth Mark",
        category: "garden",
        costRange: "€1.5-3",
        priceRange: "€6.99-8.99",
        margin: "约60-70%",
        matchScore: 3,
        riskLevel: "低",
        keywords: ["plantoir plantation automne", "garden dibber tool", "outil plantation graines"],
        sourcing: "1688: 球根种植器 园艺打孔器"
      }
    ]
  },
  {
    id: "halloween-2026",
    name: "万圣节",
    nameEn: "Halloween",
    icon: "🎃",
    date: "2026-10-31",
    month: 10,
    importance: "A",
    category: "festival",
    themeColor: "#f97316",
    products: [
      {
        sku: "南瓜雕刻工具套装（木柄）",
        skuEn: "Pumpkin Carving Tool Kit",
        category: "party",
        costRange: "€1-2.5",
        priceRange: "€6.99-8.99",
        margin: "约60-70%",
        matchScore: 5,
        riskLevel: "低",
        keywords: ["outils sculpture citrouille", "pumpkin carving kit", "décoration halloween citrouille"],
        sourcing: "1688: 南瓜雕刻工具 万圣节"
      },
      {
        sku: "蝙蝠墙贴套装（3D）",
        skuEn: "3D Bat Wall Decals Set",
        category: "party",
        costRange: "€0.8-2",
        priceRange: "€6.99-7.99",
        margin: "约65-75%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["stickers chauve-souris mur", "halloween bat stickers", "décoration murale halloween"],
        sourcing: "1688: 3D蝙蝠墙贴 万圣节装饰"
      },
      {
        sku: "蛛网纱幔+蜘蛛套装",
        skuEn: "Spider Web Mantel Decoration Set",
        category: "party",
        costRange: "€1-2.5",
        priceRange: "€6.99-8.99",
        margin: "约60-70%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["toile araignée décoration", "halloween spider web set", "guirlande halloween"],
        sourcing: "1688: 蜘蛛网装饰 万圣节场景"
      },
      {
        sku: "派对桌面撒件（木片）",
        skuEn: "Halloween Table Confetti Wood Chips",
        category: "party",
        costRange: "€0.5-1.5",
        priceRange: "€6.99",
        margin: "约65-75%",
        matchScore: 3,
        riskLevel: "低",
        keywords: ["confettis table halloween", "décoration table fête", "scatter decorations"],
        sourcing: "1688: 万圣节桌面木片撒件"
      }
    ]
  },
  {
    id: "toussaint-2026",
    name: "诸圣节（Toussaint）",
    nameEn: "All Saints' Day",
    icon: "🕯️",
    date: "2026-11-01",
    month: 11,
    importance: "B",
    category: "festival",
    themeColor: "#64748b",
    products: [
      {
        sku: "玻璃烛风灯（墓地用）",
        skuEn: "Glass Memorial Candle Lantern",
        category: "gift",
        costRange: "€2-4.5",
        priceRange: "€8.99-10.99",
        margin: "约50-60%",
        matchScore: 5,
        riskLevel: "低",
        keywords: ["lanterneFunéraire", "lanterne cimetière bougie", "windlicht glasgrab"],
        sourcing: "1688: 玻璃烛台 风灯 墓地"
      },
      {
        sku: "插地花器锥（石纹）",
        skuEn: "Memorial Grave Flower Spike Vase",
        category: "gift",
        costRange: "€1.5-3",
        priceRange: "€6.99-8.99",
        margin: "约55-65%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["vase de cimetière", "porte-fleurs tombe", "vase funéraire pointe"],
        sourcing: "1688: 墓地插花器 花插"
      },
      {
        sku: "长明灯芯防风罩替换装",
        skuEn: "Memorial Lantern Refill Set",
        category: "gift",
        costRange: "€1-2",
        priceRange: "€6.99-7.99",
        margin: "约60-70%",
        matchScore: 3,
        riskLevel: "低",
        keywords: ["recharge lanterne cimetière", "mèche de rechange bougie", "kit rechange memorial"],
        sourcing: "1688: 墓前长明灯替换芯"
      }
    ]
  },
  {
    id: "black-friday-2026",
    name: "黑色星期五",
    nameEn: "Black Friday",
    icon: "🛒",
    date: "2026-11-27",
    month: 11,
    importance: "A",
    category: "festival",
    themeColor: "#111827",
    products: [
      {
        sku: "厨房硅胶厨具四件套",
        skuEn: "Silicone Kitchen Utensil Set",
        category: "kitchen",
        costRange: "€3-5.5",
        priceRange: "€9.99-10.99",
        margin: "约45-55%",
        matchScore: 5,
        riskLevel: "低",
        keywords: ["ustensiles cuisine silicone", "set spatule cuisine", "kit cuisine 7 pièces"],
        sourcing: "1688: 硅胶厨具套装 七件套"
      },
      {
        sku: "真空压缩收纳袋五件装",
        skuEn: "Space Saver Storage Bags",
        category: "home",
        costRange: "€2.5-4.5",
        priceRange: "€8.99-10.99",
        margin: "约50-60%",
        matchScore: 5,
        riskLevel: "低",
        keywords: ["housse aspiration rangement", "sacs gain de place", "space saver storage bags"],
        sourcing: "1688: 真空压缩袋 收纳袋"
      },
      {
        sku: "桌面双屏支架（亚克力）",
        skuEn: "Acrylic Monitor Stand Riser",
        category: "office",
        costRange: "€3-6",
        priceRange: "€9.99-10.99",
        margin: "约45-55%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["support écran bureau", "monitor stand riser", "rehausseur ordinateur"],
        sourcing: "1688: 亚克力显示器增高架"
      },
      {
        sku: "车载缝隙收纳盒",
        skuEn: "Car Gap Filler Storage Box",
        category: "automotive",
        costRange: "€1.5-3",
        priceRange: "€7.99-9.99",
        margin: "约55-65%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["rangement voiture fente", "car gap filler organiser", "accessoires auto rangement"],
        sourcing: "1688: 汽车缝隙收纳盒"
      }
    ]
  },
  {
    id: "marches-noel-2026",
    name: "圣诞市集季",
    nameEn: "Christmas Markets Season",
    icon: "🛍️",
    date: "2026-12-01",
    month: 12,
    importance: "A",
    category: "seasonal",
    themeColor: "#dc2626",
    products: [
      {
        sku: "圣诞花环底座（藤编）",
        skuEn: "Wreath Making Frame Rattan",
        category: "gift",
        costRange: "€1.5-3",
        priceRange: "€7.99-9.99",
        margin: "约55-65%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["couronne base rotin", "wreath frame diy", "couronne de noel à décorer"],
        sourcing: "1688: 藤编花环 圣诞花环底座"
      },
      {
        sku: "圣诞倒数日历挂袋（布艺）",
        skuEn: "Advent Calendar Fabric Hanging",
        category: "gift",
        costRange: "€2-4",
        priceRange: "€8.99-10.99",
        margin: "约55-65%",
        matchScore: 5,
        riskLevel: "低",
        keywords: ["calendrier de lavent tissu", "advent calendar hanging pockets", "décompte noel"],
        sourcing: "1688: 圣诞倒数日历 布艺挂袋"
      },
      {
        sku: "姜饼屋模具套装",
        skuEn: "Gingerbread House Baking Mold Set",
        category: "kitchen",
        costRange: "€1.5-3",
        priceRange: "€7.99-9.99",
        margin: "约55-65%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["emporte-pièce noel", "gingerbread house cutter", "moule pain dépices"],
        sourcing: "1688: 姜饼屋模具 饼干切模"
      }
    ]
  },
  {
    id: "noel-2026",
    name: "圣诞节",
    nameEn: "Christmas",
    icon: "🎄",
    date: "2026-12-25",
    month: 12,
    importance: "A",
    category: "festival",
    themeColor: "#16a34a",
    products: [
      {
        sku: "圣诞树裙（雪绒）",
        skuEn: "Christmas Tree Skirt Snow",
        category: "gift",
        costRange: "€2.5-5",
        priceRange: "€9.99-10.99",
        margin: "约50-60%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["jupe de sapin", "christmas tree skirt", "décoration noel pied"],
        sourcing: "1688: 圣诞树裙 雪绒"
      },
      {
        sku: "圣诞袜挂饰三件套",
        skuEn: "Christmas Stockings Set of 3",
        category: "gift",
        costRange: "€2-4",
        priceRange: "€8.99-10.99",
        margin: "约55-65%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["chaussettes de noel", "christmas stockings hanging", "déco cheminée noel"],
        sourcing: "1688: 圣诞袜 挂饰套装"
      },
      {
        sku: "节日餐桌桌旗+餐垫套装",
        skuEn: "Christmas Table Runner and Placemats",
        category: "kitchen",
        costRange: "€2.5-4.5",
        priceRange: "€8.99-10.99",
        margin: "约50-60%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["chemin de table noel", "set de table fête", "christmas table runner"],
        sourcing: "1688: 圣诞桌旗 餐垫套装"
      },
      {
        sku: "礼品包装缎带卷套装",
        skuEn: "Gift Wrap Ribbon Roll Set",
        category: "gift",
        costRange: "€1.5-3",
        priceRange: "€6.99-8.99",
        margin: "约55-65%",
        matchScore: 3,
        riskLevel: "低",
        keywords: ["ruban cadeau set", "emballage cadeau noel", "ribbon wrapping rolls"],
        sourcing: "1688: 礼品缎带 包装丝带套装"
      }
    ]
  },
  {
    id: "reveillon-2026",
    name: "跨年夜（Réveillon）",
    nameEn: "New Year's Eve",
    icon: "🎆",
    date: "2026-12-31",
    month: 12,
    importance: "B",
    category: "festival",
    themeColor: "#7c3aed",
    products: [
      {
        sku: "派对主题拍照背景布",
        skuEn: "New Year Party Photo Backdrop",
        category: "party",
        costRange: "€2-4",
        priceRange: "€8.99-9.99",
        margin: "约55-65%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["toile fond photobooth", "backdrop fête nouvel an", "décoration réveillon"],
        sourcing: "1688: 派对背景布 拍照道具"
      },
      {
        sku: "金属气球套装（金银）",
        skuEn: "Foil Balloons Party Set Gold Silver",
        category: "party",
        costRange: "€1.5-3",
        priceRange: "€7.99-9.99",
        margin: "约55-65%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["ballons mylar fête", "ballon aluminium nouvel an", "party balloons set"],
        sourcing: "1688: 铝膜气球 派对套装"
      },
      {
        sku: "一次性派对餐具组合（纸）",
        skuEn: "Party Paper Tableware Set",
        category: "party",
        costRange: "€2-4",
        priceRange: "€8.99-9.99",
        margin: "约50-60%",
        matchScore: 3,
        riskLevel: "低",
        keywords: ["vaisselle jetable fête", "party tableware paper", "service table réveillon"],
        sourcing: "1688: 派对纸餐具套装"
      }
    ]
  },

  // ===== 2027年1-2月 =====
  {
    id: "nouvel-an-2027",
    name: "元旦（Étrennes 习礼）",
    nameEn: "New Year Étrennes",
    icon: "🎊",
    date: "2027-01-01",
    month: 1,
    importance: "B",
    category: "festival",
    themeColor: "#0ea5e9",
    products: [
      {
        sku: "新年计划手账本A5",
        skuEn: "2027 Planner Journal A5",
        category: "office",
        costRange: "€1.5-3.5",
        priceRange: "€7.99-9.99",
        margin: "约55-65%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["planning 2027", "agenda organisation 2027", "carnet objectifs"],
        sourcing: "1688: 2027手账本 计划本"
      },
      {
        sku: "红包信封礼盒（Étrennes）",
        skuEn: "Étrennes Money Envelope Gift Set",
        category: "gift",
        costRange: "€0.8-1.8",
        priceRange: "€6.99",
        margin: "约65-75%",
        matchScore: 3,
        riskLevel: "低",
        keywords: ["enveloppes étrennes", "porte-monnaie cadeau nouvel an", "money envelope set"],
        sourcing: "1688: 新年红包信封 礼盒"
      },
      {
        sku: "墙上年历布旗（2027）",
        skuEn: "2027 Wall Calendar Fabric Banner",
        category: "office",
        costRange: "€1-2.5",
        priceRange: "€6.99-8.99",
        margin: "约60-70%",
        matchScore: 3,
        riskLevel: "低",
        keywords: ["calendrier 2027 murale", "wall planner 2027", "calendrier famille tissu"],
        sourcing: "1688: 2027挂历 布艺年历"
      }
    ]
  },
  {
    id: "epiphanie-2027",
    name: "主显节（Galette des Rois）",
    nameEn: "Epiphany Kings Cake",
    icon: "👑",
    date: "2027-01-06",
    month: 1,
    importance: "B",
    category: "festival",
    themeColor: "#f59e0b",
    products: [
      {
        sku: "国王饼纸皇冠（50只装）",
        skuEn: "Kings Cake Paper Crown Pack",
        category: "kitchen",
        costRange: "€1-2",
        priceRange: "€6.99-7.99",
        margin: "约60-70%",
        matchScore: 5,
        riskLevel: "低",
        keywords: ["couronnes galette des rois", "paper crowns party", "couronne carton fête"],
        sourcing: "1688: 纸皇冠 国王饼配件"
      },
      {
        sku: "国王饼陶瓷小摆件（fève 现代款）",
        skuEn: "Modern Fève Trinkets for Kings Cake",
        category: "kitchen",
        costRange: "€1-2.5",
        priceRange: "€6.99-7.99",
        margin: "约60-70%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["fèves galette des rois", "santon miniature fève", "fève collection"],
        sourcing: "1688: 国王饼小瓷偶 fève"
      },
      {
        sku: "不粘圆形烤盘（挞盘）",
        skuEn: "Non-stick Tart Pan Round",
        category: "kitchen",
        costRange: "€2-4",
        priceRange: "€8.99-10.99",
        margin: "约55-65%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["moule à tarte antiadhésif", "moule galette", "tart pan round"],
        sourcing: "1688: 不粘挞盘 圆形烤盘"
      }
    ]
  },
  {
    id: "soldes-hiver-2027",
    name: "冬季大减价（Soldes d'hiver）",
    nameEn: "Winter Sales",
    icon: "🏷️",
    date: "2027-01-13",
    month: 1,
    importance: "A",
    category: "seasonal",
    themeColor: "#e11d48",
    products: [
      {
        sku: "衣物收纳箱三件套（折叠）",
        skuEn: "Foldable Storage Bins Set of 3",
        category: "home",
        costRange: "€2.5-5",
        priceRange: "€9.99-10.99",
        margin: "约50-60%",
        matchScore: 5,
        riskLevel: "低",
        keywords: ["boîtes rangement pliables", "panier rangement linge", "storage bins foldable"],
        sourcing: "1688: 折叠收纳箱 三件套"
      },
      {
        sku: "门后挂钩衣架（免打孔）",
        skuEn: "Over-door Hook Rack",
        category: "home",
        costRange: "€1.5-3",
        priceRange: "€7.99-9.99",
        margin: "约55-65%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["porte manteau porte de", "over door hooks rack", "patère sans perçage"],
        sourcing: "1688: 门后挂钩 免打孔衣架"
      },
      {
        sku: "真空压缩袋（换季衣物）",
        skuEn: "Seasonal Clothes Space Saver Bags",
        category: "home",
        costRange: "€2-4",
        priceRange: "€8.99-10.99",
        margin: "约50-60%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["housse sous vide linge", "sacs rangement saison", "space saver clothes bags"],
        sourcing: "1688: 换季压缩袋 衣物收纳"
      }
    ]
  },
  {
    id: "chandeleur-2027",
    name: "圣蜡节（Chandeleur）",
    nameEn: "Crêpe Day",
    icon: "🥞",
    date: "2027-02-02",
    month: 2,
    importance: "B",
    category: "festival",
    themeColor: "#f59e0b",
    products: [
      {
        sku: "可丽饼木刮刀双件套",
        skuEn: "Crêpe Wooden Spatula Duo",
        category: "kitchen",
        costRange: "€1-2",
        priceRange: "€6.99-7.99",
        margin: "约60-70%",
        matchScore: 5,
        riskLevel: "低",
        keywords: ["spatule crêpe bois", "crêpe turner set", "rozell crêpes"],
        sourcing: "1688: 木制煎饼铲 可丽饼工具"
      },
      {
        sku: "可丽饼面糊摊开器（T字）",
        skuEn: "Crêpe Batter Spreader Tool",
        category: "kitchen",
        costRange: "€0.8-1.5",
        priceRange: "€6.99",
        margin: "约65-75%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["rozell spreader crêpe", "répartiteur pâte crêpe", "crepe spreader tool"],
        sourcing: "1688: 可丽饼T字摊杆"
      },
      {
        sku: "面糊量杯搅拌器套装",
        skuEn: "Batter Mixing Jug and Whisk Set",
        category: "kitchen",
        costRange: "€1.5-3",
        priceRange: "€7.99-9.99",
        margin: "约55-65%",
        matchScore: 3,
        riskLevel: "低",
        keywords: ["bol mélangeur pâte", "mixing jug whisk set", "cruche pâte à crêpes"],
        sourcing: "1688: 量杯打蛋器套装"
      }
    ]
  },
  {
    id: "saint-valentin-2027",
    name: "情人节（Saint-Valentin）",
    nameEn: "Valentine's Day",
    icon: "💝",
    date: "2027-02-14",
    month: 2,
    importance: "A",
    category: "festival",
    themeColor: "#e11d48",
    products: [
      {
        sku: "心形烛台（金属）",
        skuEn: "Heart Shaped Metal Candle Holder",
        category: "gift",
        costRange: "€1.5-3",
        priceRange: "€7.99-9.99",
        margin: "约55-65%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["porte-bougie coeur", "heart candle holder", "décoration valentin table"],
        sourcing: "1688: 心形烛台 金属"
      },
      {
        sku: "礼品包装纸+缎带套装",
        skuEn: "Valentine Gift Wrap and Ribbon Kit",
        category: "gift",
        costRange: "€1.5-3",
        priceRange: "€7.99-9.99",
        margin: "约55-65%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["papier cadeau valentin", "emballage coeur ruban", "gift wrap set valentine"],
        sourcing: "1688: 情人节包装纸 缎带"
      },
      {
        sku: "旅行洗漱收纳包一对",
        skuEn: "Couple Travel Toiletry Bags Set",
        category: "travel",
        costRange: "€2-4",
        priceRange: "€8.99-10.99",
        margin: "约50-60%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["trousse toilette voyage", "valentine couple travel set", "pochette toilette paire"],
        sourcing: "1688: 情侣洗漱包 旅行收纳"
      },
      {
        sku: "香薰石扩香摆件",
        skuEn: "Aroma Stone Diffuser Ornament",
        category: "gift",
        costRange: "€1.5-3",
        priceRange: "€7.99-9.99",
        margin: "约55-65%",
        matchScore: 3,
        riskLevel: "低",
        keywords: ["pierre à diffuser décoration", "aroma stone ornament", "galet déco maison"],
        sourcing: "1688: 香薰石 扩香摆件"
      }
    ]
  },

  // ===== 2027年3-5月 =====
  {
    id: "printemps-jardin-2027",
    name: "春耕园艺季",
    nameEn: "Spring Gardening",
    icon: "🌱",
    date: "2027-03-20",
    month: 3,
    importance: "B",
    category: "seasonal",
    themeColor: "#22c55e",
    products: [
      {
        sku: "花园工具三件套（木柄）",
        skuEn: "Garden Tool Set 3pcs Wooden Handle",
        category: "garden",
        costRange: "€2-4",
        priceRange: "€8.99-10.99",
        margin: "约50-60%",
        matchScore: 5,
        riskLevel: "低",
        keywords: ["outils jardin set", "truelle jardin bois", "kit jardinage 3 pièces"],
        sourcing: "1688: 园艺三件套 木柄"
      },
      {
        sku: "自吸水花盆（内胆式）",
        skuEn: "Self-watering Planter Insert",
        category: "garden",
        costRange: "€2-4.5",
        priceRange: "€8.99-10.99",
        margin: "约50-60%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["pot à réserve eau", "self watering planter", "jardinière autonome"],
        sourcing: "1688: 自吸水花盆"
      },
      {
        sku: "园艺护膝垫（EVA）",
        skuEn: "Garden Kneeling Pad EVA",
        category: "garden",
        costRange: "€1.5-3",
        priceRange: "€7.99-9.99",
        margin: "约55-65%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["genouillère jardinage", "kneeling pad garden", "coussin genoux jardin"],
        sourcing: "1688: 园艺护膝垫 EVA"
      }
    ]
  },
  {
    id: "paques-2027",
    name: "复活节（Pâques）",
    nameEn: "Easter",
    icon: "🐣",
    date: "2027-03-28",
    month: 3,
    importance: "A",
    category: "festival",
    themeColor: "#fbbf24",
    products: [
      {
        sku: "复活节彩蛋篮（编织）",
        skuEn: "Easter Egg Basket Woven",
        category: "gift",
        costRange: "€1.5-3",
        priceRange: "€7.99-9.99",
        margin: "约55-65%",
        matchScore: 5,
        riskLevel: "低",
        keywords: ["panier de paques", "easter egg basket", "panier chasse aux oeufs"],
        sourcing: "1688: 复活节篮子 编织蛋篮"
      },
      {
        sku: "彩蛋染色工具套装",
        skuEn: "Egg Decorating Kit",
        category: "kitchen",
        costRange: "€1-2",
        priceRange: "€6.99-7.99",
        margin: "约60-70%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["décoration oeufs paques", "egg decorating kit", "coloration oeufs fête"],
        sourcing: "1688: 复活节彩蛋染色工具"
      },
      {
        sku: "兔子主题餐垫（无纺布）",
        skuEn: "Bunny Table Mats Easter Set",
        category: "kitchen",
        costRange: "€1.5-2.5",
        priceRange: "€6.99-8.99",
        margin: "约60-70%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["set de table paques", "easter bunny placemats", "déco table printemps"],
        sourcing: "1688: 复活节餐垫 兔子图案"
      },
      {
        sku: "复活节寻蛋游戏道具组",
        skuEn: "Easter Egg Hunt Game Kit",
        category: "party",
        costRange: "€1.5-3",
        priceRange: "€7.99-9.99",
        margin: "约55-65%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["chasse aux oeufs jeu", "easter hunt accessories", "jeu de piste paques"],
        sourcing: "1688: 寻蛋游戏道具 复活节"
      }
    ]
  },
  {
    id: "muguet-2027",
    name: "劳动节·铃兰（Muguet）",
    nameEn: "May Day Lily of the Valley",
    icon: "💐",
    date: "2027-05-01",
    month: 5,
    importance: "B",
    category: "festival",
    themeColor: "#10b981",
    products: [
      {
        sku: "迷你陶土花盆套装",
        skuEn: "Mini Terracotta Pot Set",
        category: "garden",
        costRange: "€1.5-3",
        priceRange: "€7.99-9.99",
        margin: "约55-65%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["petits pots terre cuite", "terracotta mini pots", "pot fleur muguet"],
        sourcing: "1688: 迷你陶土花盆套装"
      },
      {
        sku: "手持喷雾壶（复古）",
        skuEn: "Vintage Plant Mister Bottle",
        category: "garden",
        costRange: "€1-2.5",
        priceRange: "€6.99-8.99",
        margin: "约60-70%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["vaporisateur plantes", "plant mister bottle", "pulvérisateur jardin déco"],
        sourcing: "1688: 复古喷壶 浇花壶"
      },
      {
        sku: "窗台花架（铁艺）",
        skuEn: "Windowsill Iron Flower Rack",
        category: "garden",
        costRange: "€2.5-5",
        priceRange: "€9.99-10.99",
        margin: "约50-60%",
        matchScore: 3,
        riskLevel: "低",
        keywords: ["étagère fleurs fenêtre", "windowsill plant rack", "support pot fleur balcon"],
        sourcing: "1688: 铁艺窗台花架"
      }
    ]
  },
  {
    id: "fete-meres-2027",
    name: "母亲节（Fête des Mères）",
    nameEn: "Mother's Day France",
    icon: "🌷",
    date: "2027-05-30",
    month: 5,
    importance: "A",
    category: "festival",
    themeColor: "#ec4899",
    products: [
      {
        sku: "首饰收纳盒（多层）",
        skuEn: "Jewellery Organiser Box Multi-layer",
        category: "gift",
        costRange: "€2.5-5",
        priceRange: "€9.99-10.99",
        margin: "约50-60%",
        matchScore: 5,
        riskLevel: "低",
        keywords: ["boîte à bijoux", "jewellery box organiser", "rangement bague collier"],
        sourcing: "1688: 首饰收纳盒 多层"
      },
      {
        sku: "礼盒+丝带贺卡套装",
        skuEn: "Gift Box Ribbon Card Set",
        category: "gift",
        costRange: "€1.5-3",
        priceRange: "€7.99-9.99",
        margin: "约55-65%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["coffret cadeau fête des mères", "gift box ribbon card", "emballage cadeau premium"],
        sourcing: "1688: 礼品盒 丝带 贺卡套装"
      },
      {
        sku: "手部护理套装（非化妆品类·护手工具）",
        skuEn: "Manicure Hand Care Tool Set",
        category: "gift",
        costRange: "€1.5-3",
        priceRange: "€7.99-9.99",
        margin: "约55-65%",
        matchScore: 3,
        riskLevel: "低",
        riskNote: "只含工具（指甲锉/死皮推），不含化妆品膏体",
        keywords: ["kit manucure accessoires", "manicure tool set", "soin des ongles kit"],
        sourcing: "1688: 修甲工具套装"
      },
      {
        sku: "桌面粉花瓶（磨砂）",
        skuEn: "Pastel Frosted Bud Vase",
        category: "gift",
        costRange: "€1.5-3",
        priceRange: "€7.99-8.99",
        margin: "约55-65%",
        matchScore: 3,
        riskLevel: "低",
        keywords: ["vase pastel déco", "bud vase frosted", "petit vase fleurs"],
        sourcing: "1688: 磨砂花瓶 桌面摆件"
      }
    ]
  },

  // ===== 2027年6-8月 =====
  {
    id: "fete-peres-2027",
    name: "父亲节（Fête des Pères）",
    nameEn: "Father's Day France",
    icon: "👔",
    date: "2027-06-20",
    month: 6,
    importance: "B",
    category: "festival",
    themeColor: "#0284c7",
    products: [
      {
        sku: "车载出风口手机支架（机械）",
        skuEn: "Car Vent Mechanical Phone Mount",
        category: "automotive",
        costRange: "€2-4",
        priceRange: "€8.99-10.99",
        margin: "约50-60%",
        matchScore: 4,
        riskLevel: "低",
        riskNote: "纯机械结构，无电子元件",
        keywords: ["support téléphone voiture grille", "car vent phone holder", "support auto téléphone"],
        sourcing: "1688: 车载出风口支架 机械式"
      },
      {
        sku: "烧烤工具尼龙包套装",
        skuEn: "BBQ Tool Roll Bag Set",
        category: "garden",
        costRange: "€2.5-5",
        priceRange: "€9.99-10.99",
        margin: "约50-60%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["kit barbecue accessoires", "bbq tools set bag", "ustensiles grill"],
        sourcing: "1688: 烧烤工具包套装"
      },
      {
        sku: "皮带收纳架（柜内）",
        skuEn: "Belt Organiser Rack",
        category: "home",
        costRange: "€1.5-3",
        priceRange: "€7.99-8.99",
        margin: "约55-65%",
        matchScore: 3,
        riskLevel: "低",
        keywords: ["range ceintures placard", "belt organizer rack", "rangement accessoires dressing"],
        sourcing: "1688: 皮带收纳架"
      }
    ]
  },
  {
    id: "fete-musique-2027",
    name: "音乐节（Fête de la Musique）",
    nameEn: "Music Day Street Party",
    icon: "🎵",
    date: "2027-06-21",
    month: 6,
    importance: "B",
    category: "festival",
    themeColor: "#8b5cf6",
    products: [
      {
        sku: "街头派对装饰拉旗",
        skuEn: "Street Party Bunting Banner",
        category: "party",
        costRange: "€1-2.5",
        priceRange: "€6.99-8.99",
        margin: "约60-70%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["banderole fête de rue", "bunting banner party", "guirlande fanions fête"],
        sourcing: "1688: 派对拉旗 三角串旗"
      },
      {
        sku: "野餐防潮垫（户外）",
        skuEn: "Outdoor Picnic Blanket Waterproof",
        category: "outdoor",
        costRange: "€2.5-4.5",
        priceRange: "€8.99-10.99",
        margin: "约50-60%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["nappe pique-nique déperlante", "picnic blanket waterproof", "tapis pique nique"],
        sourcing: "1688: 户外防潮垫 野餐垫"
      },
      {
        sku: "一次性杯托托盘（纸）",
        skuEn: "Party Drinks Carrier Trays",
        category: "party",
        costRange: "€1-2",
        priceRange: "€6.99-7.99",
        margin: "约60-70%",
        matchScore: 3,
        riskLevel: "低",
        keywords: ["porte gobelets fête", "drinks carrier tray", "plateau boissons carton"],
        sourcing: "1688: 纸杯托托盘"
      }
    ]
  },
  {
    id: "soldes-ete-2027",
    name: "夏季大减价（Soldes d'été）",
    nameEn: "Summer Sales",
    icon: "🏷️",
    date: "2027-06-30",
    month: 6,
    importance: "A",
    category: "seasonal",
    themeColor: "#f97316",
    products: [
      {
        sku: "旅行收纳七件套（立方袋）",
        skuEn: "Packing Cubes Travel Organiser Set",
        category: "travel",
        costRange: "€3-5.5",
        priceRange: "€9.99-10.99",
        margin: "约45-55%",
        matchScore: 5,
        riskLevel: "低",
        keywords: ["sacs de rangement voyage", "packing cubes set", "organisateurs valise"],
        sourcing: "1688: 旅行收纳袋七件套"
      },
      {
        sku: "沙滩防水收纳袋（卷口）",
        skuEn: "Beach Dry Bag Roll-top",
        category: "outdoor",
        costRange: "€1.5-3",
        priceRange: "€7.99-9.99",
        margin: "约55-65%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["sac étanche plage", "dry bag roll top", "pochette étanche piscine"],
        sourcing: "1688: 防水袋 卷口沙滩袋"
      },
      {
        sku: "露营挂灯备用收纳网",
        skuEn: "Camping Gear Mesh Organiser",
        category: "outdoor",
        costRange: "€1.5-3",
        priceRange: "€7.99-8.99",
        margin: "约55-65%",
        matchScore: 3,
        riskLevel: "低",
        keywords: ["filet rangement camping", "camping mesh organiser", "sac filet équipement"],
        sourcing: "1688: 露营网袋 收纳网"
      }
    ]
  },
  {
    id: "grandes-vacances-2027",
    name: "暑期出行季（Grandes Vacances）",
    nameEn: "Summer Holiday Travel",
    icon: "🏖️",
    date: "2027-07-05",
    month: 7,
    importance: "A",
    category: "seasonal",
    themeColor: "#06b6d4",
    products: [
      {
        sku: "分装瓶洗漱套装（登机）",
        skuEn: "Travel Bottles Cabin Set",
        category: "travel",
        costRange: "€1.5-3",
        priceRange: "€7.99-9.99",
        margin: "约55-65%",
        matchScore: 5,
        riskLevel: "低",
        keywords: ["flacons voyage avion", "travel bottles set cabin", "pots à cosmétiques voyage"],
        sourcing: "1688: 旅行分装瓶套装"
      },
      {
        sku: "车载座椅背挂袋（收纳）",
        skuEn: "Car Backseat Organiser",
        category: "automotive",
        costRange: "€2-4",
        priceRange: "€8.99-9.99",
        margin: "约50-60%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["organisateur siege arrière voiture", "car backseat organiser", "rangement auto voyage"],
        sourcing: "1688: 汽车椅背收纳袋"
      },
      {
        sku: "驱蚊手环+蚊帐旅行装",
        skuEn: "Mosquito Wristband and Net Travel Kit",
        category: "outdoor",
        costRange: "€1.5-3",
        priceRange: "€7.99-9.99",
        margin: "约55-65%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["bracelet anti-moustiques", "moustiquaire imprégnée voyage", "kit anti moustiques"],
        sourcing: "1688: 驱蚊手环 旅行蚊帐"
      },
      {
        sku: "折叠水桶（洗漱/清洁）",
        skuEn: "Collapsible Water Bucket",
        category: "outdoor",
        costRange: "€1.5-3",
        priceRange: "€7.99-8.99",
        margin: "约55-65%",
        matchScore: 3,
        riskLevel: "低",
        keywords: ["seau pliable camping", "collapsible bucket outdoor", "bidon pliable voyage"],
        sourcing: "1688: 折叠水桶 户外"
      }
    ]
  },
  {
    id: "fete-nationale-2027",
    name: "国庆节（14 Juillet）",
    nameEn: "Bastille Day",
    icon: "🇫🇷",
    date: "2027-07-14",
    month: 7,
    importance: "B",
    category: "festival",
    themeColor: "#3b82f6",
    products: [
      {
        sku: "蓝白红主题装饰拉花",
        skuEn: "Tricolore Party Garland",
        category: "party",
        costRange: "€1-2",
        priceRange: "€6.99-7.99",
        margin: "约60-70%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["guirlande tricolore fête", "deco 14 juillet", "banderole bleu blanc rouge"],
        sourcing: "1688: 蓝白红装饰拉花"
      },
      {
        sku: "户外野餐餐具收纳篮",
        skuEn: "Picnic Tableware Caddy",
        category: "outdoor",
        costRange: "€2-3.5",
        priceRange: "€8.99-9.99",
        margin: "约50-60%",
        matchScore: 3,
        riskLevel: "低",
        keywords: ["panier pique-nique couverts", "picnic caddy organiser", "panier utensiles extérieur"],
        sourcing: "1688: 野餐餐具篮"
      },
      {
        sku: "烟花观礼折叠坐垫",
        skuEn: "Foldable Foam Sit Mat",
        category: "outdoor",
        costRange: "€1-2",
        priceRange: "€6.99-7.99",
        margin: "约60-70%",
        matchScore: 3,
        riskLevel: "低",
        keywords: ["coussin assise pliable", "foldable sit mat outdoor", "assise mousse spectacle"],
        sourcing: "1688: 折叠坐垫 户外"
      }
    ]
  },
  {
    id: "rentree-2027",
    name: "开学季 2027（La Rentrée）",
    nameEn: "Back to School 2027",
    icon: "🎒",
    date: "2027-08-20",
    month: 8,
    importance: "A",
    category: "seasonal",
    themeColor: "#2563eb",
    products: [
      {
        sku: "双层便当盒（可微波）",
        skuEn: "Two-tier Microwave Lunch Box",
        category: "kitchen",
        costRange: "€2.5-4.5",
        priceRange: "€9.99-10.99",
        margin: "约50-60%",
        matchScore: 5,
        riskLevel: "低",
        keywords: ["boîte bento micro-ondes", "lunch box deux étages", "boîte repas isotherme"],
        sourcing: "1688: 双层便当盒 可微波"
      },
      {
        sku: "冰箱磁贴周计划板",
        skuEn: "Fridge Weekly Menu Planner",
        category: "office",
        costRange: "€1.5-3",
        priceRange: "€7.99-9.99",
        margin: "约55-65%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["planning repas frigo", "menu planner magnet", "tableau semaine aimanté"],
        sourcing: "1688: 冰箱磁贴计划板"
      },
      {
        sku: "宿舍/学生桌面整理架",
        skuEn: "Student Desk Storage Shelf",
        category: "office",
        costRange: "€2.5-5",
        priceRange: "€9.99-10.99",
        margin: "约50-60%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["étagère bureau étudiant", "desk storage shelf", "rangement pupitre université"],
        sourcing: "1688: 学生桌面置物架"
      }
    ]
  },

  // ===== 2027年10-12月 =====
  {
    id: "halloween-2027",
    name: "万圣节 2027",
    nameEn: "Halloween 2027",
    icon: "🎃",
    date: "2027-10-31",
    month: 10,
    importance: "A",
    category: "festival",
    themeColor: "#f97316",
    products: [
      {
        sku: "南瓜门挂装饰布套",
        skuEn: "Halloween Door Banner Cover",
        category: "party",
        costRange: "€1-2",
        priceRange: "€6.99-7.99",
        margin: "约60-70%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["décoration porte halloween", "halloween door banner", "housse courante halloween"],
        sourcing: "1688: 万圣节门挂装饰"
      },
      {
        sku: "鬼屋场景挂饰组合",
        skuEn: "Haunted Scene Hanging Decor Kit",
        category: "party",
        costRange: "€1.5-3",
        priceRange: "€7.99-9.99",
        margin: "约55-65%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["décoration plafond halloween", "haunted hanging decor", "suspendus halloween"],
        sourcing: "1688: 万圣节吊挂装饰组合"
      },
      {
        sku: "派对主题纸袋（糖果袋）",
        skuEn: "Halloween Treat Paper Bags",
        category: "party",
        costRange: "€0.8-1.5",
        priceRange: "€6.99",
        margin: "约65-75%",
        matchScore: 3,
        riskLevel: "低",
        keywords: ["sacs bonbons halloween", "treat bags party", "sachets fête citrouille"],
        sourcing: "1688: 万圣节糖果纸袋"
      }
    ]
  },
  {
    id: "toussaint-2027",
    name: "诸圣节 2027（Toussaint）",
    nameEn: "All Saints' Day 2027",
    icon: "🕯️",
    date: "2027-11-01",
    month: 11,
    importance: "B",
    category: "festival",
    themeColor: "#64748b",
    products: [
      {
        sku: "长明烛灯罩（防风金属）",
        skuEn: "Metal Windproof Candle Lantern",
        category: "gift",
        costRange: "€2-4",
        priceRange: "€8.99-10.99",
        margin: "约55-65%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["lanterne funéraire métal", "windproof memorial lantern", "porte bougie cimetière"],
        sourcing: "1688: 金属防风烛灯"
      },
      {
        sku: "仿真花祭奠花束配件",
        skuEn: "Memorial Flower Binding Set",
        category: "gift",
        costRange: "€1-2",
        priceRange: "€6.99-7.99",
        margin: "约60-70%",
        matchScore: 3,
        riskLevel: "低",
        keywords: ["support fleurs tombe", "memorial floral foam holder", "mousse florale fixation"],
        sourcing: "1688: 祭奠花束固定配件"
      }
    ]
  },
  {
    id: "black-friday-2027",
    name: "黑色星期五 2027",
    nameEn: "Black Friday 2027",
    icon: "🛒",
    date: "2027-11-26",
    month: 11,
    importance: "A",
    category: "festival",
    themeColor: "#111827",
    products: [
      {
        sku: "不锈钢厨房收纳架",
        skuEn: "Stainless Kitchen Counter Shelf",
        category: "kitchen",
        costRange: "€3-6",
        priceRange: "€9.99-10.99",
        margin: "约45-55%",
        matchScore: 5,
        riskLevel: "低",
        keywords: ["étagère cuisine inox", "kitchen counter shelf", "rangement plan de travail"],
        sourcing: "1688: 不锈钢厨房置物架"
      },
      {
        sku: "衣柜分层收纳网架",
        skuEn: "Closet Mesh Divider Shelves",
        category: "home",
        costRange: "€2-4",
        priceRange: "€8.99-10.99",
        margin: "约50-60%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["étagères séparées placard", "closet organiser mesh", "diviseur placard"],
        sourcing: "1688: 衣柜分层网架"
      },
      {
        sku: "汽车尾箱收纳袋组",
        skuEn: "Car Cargo Trunk Organiser",
        category: "automotive",
        costRange: "€2-4",
        priceRange: "€8.99-9.99",
        margin: "约50-60%",
        matchScore: 4,
        riskLevel: "低",
        riskNote: "英文名避开过滤词（boot organiser 组合词），改用 Car Trunk Organiser 亦可",
        keywords: ["organisateur coffre voiture", "cargo trunk organiser", "rangement coffre auto"],
        sourcing: "1688: 汽车尾箱收纳"
      }
    ]
  },
  {
    id: "marches-noel-2027",
    name: "圣诞市集季 2027",
    nameEn: "Christmas Markets 2027",
    icon: "🛍️",
    date: "2027-12-01",
    month: 12,
    importance: "A",
    category: "seasonal",
    themeColor: "#dc2626",
    products: [
      {
        sku: "香薰松果串（无电）",
        skuEn: "Scented Pinecone Garland",
        category: "gift",
        costRange: "€1.5-3",
        priceRange: "€7.99-9.99",
        margin: "约55-65%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["guirlande pommes de pin", "scented pinecone garland", "déco table noel naturel"],
        sourcing: "1688: 松果串 香薰装饰"
      },
      {
        sku: "圣诞窗贴（静电）",
        skuEn: "Christmas Window Clings",
        category: "gift",
        costRange: "€0.8-1.5",
        priceRange: "€6.99",
        margin: "约65-75%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["stickers vitrine noel", "christmas window clings", "déco fenêtre fêtes"],
        sourcing: "1688: 圣诞静电窗贴"
      },
      {
        sku: "热红酒香料组合包（无酒精）",
        skuEn: "Mulled Spice Sachets Gift Pack",
        category: "kitchen",
        costRange: "€1-2",
        priceRange: "€6.99-7.99",
        margin: "约60-70%",
        matchScore: 4,
        riskLevel: "低",
        riskNote: "只含干香料包（肉桂/八角/丁香），不含酒精饮品",
        keywords: ["épices vin chaud sachets", "mulled spices kit", "assaisonnement hiver"],
        sourcing: "1688: 热红酒香料包"
      }
    ]
  },
  {
    id: "noel-2027",
    name: "圣诞节 2027",
    nameEn: "Christmas 2027",
    icon: "🎄",
    date: "2027-12-25",
    month: 12,
    importance: "A",
    category: "festival",
    themeColor: "#16a34a",
    products: [
      {
        sku: "圣诞餐具收纳礼盒",
        skuEn: "Christmas Dinnerware Storage Case",
        category: "kitchen",
        costRange: "€2.5-5",
        priceRange: "€9.99-10.99",
        margin: "约50-60%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["boîte rangement vaisselle noel", "dinnerware storage case", "protection assiettes fêtes"],
        sourcing: "1688: 餐具收纳盒 节日礼盒"
      },
      {
        sku: "节日毛绒抱枕套",
        skuEn: "Festive Cushion Covers Set",
        category: "home",
        costRange: "€2-4",
        priceRange: "€8.99-10.99",
        margin: "约50-60%",
        matchScore: 4,
        riskLevel: "低",
        keywords: ["housses coussins noel", "festive cushion covers", "déco salon fêtes"],
        sourcing: "1688: 节日抱枕套"
      },
      {
        sku: "手工 advent 纸模套装",
        skuEn: "DIY Advent Craft Paper Kit",
        category: "gift",
        costRange: "€1.5-3",
        priceRange: "€7.99-9.99",
        margin: "约55-65%",
        matchScore: 3,
        riskLevel: "低",
        keywords: ["kit créatif advent", "DIY advent craft paper", "activité manuelle noel"],
        sourcing: "1688: 圣诞手工纸模套装"
      }
    ]
  }
]
