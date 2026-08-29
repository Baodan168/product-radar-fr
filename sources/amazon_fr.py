#!/usr/bin/env python3
"""Amazon France data fetcher - 基于UK版适配"""
import json, subprocess, re, sys, random, os, time, urllib.parse
from pathlib import Path

BASE = Path(__file__).parent.parent
CONFIG = json.loads((BASE / "config.json").read_text())

# Amazon FR URLs
AMAZON_FR_URLS = {
    "Kitchen|new_releases": "https://www.amazon.fr/gp/new-releases/kitchen/",
    "Garden|new_releases": "https://www.amazon.fr/gp/new-releases/garden/",
    "DIY|new_releases": "https://www.amazon.fr/gp/new-releases/diy-outillage/",
    "Sports|new_releases": "https://www.amazon.fr/gp/new-releases/sports-loisirs/",
    "Bathroom|new_releases": "https://www.amazon.fr/gp/new-releases/sante-soins-personnels/",
    "Cleaning|new_releases": "https://www.amazon.fr/gp/new-releases/maison-cuisine/",
    "Office|new_releases": "https://www.amazon.fr/gp/new-releases/bureautique/",
    "Storage|new_releases": "https://www.amazon.fr/gp/new-releases/maison-cuisine/rangements/",
    "Crafts|new_releases": "https://www.amazon.fr/gp/new-releases/diy-outillage/art-craft/",
    "Home|new_releases": "https://www.amazon.fr/gp/new-releases/maison/",
}

EUR_COOKIES = "lc-main=fr_FR; i18n-prefs=EUR"
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"

CHANNEL_NAMES = {
    "new_releases": "Amazon新品榜",
    "bsr": "Amazon畅销榜",
}

CATEGORY_VALIDATORS = {
    "Kitchen": ["cuisine", "cuisine", "cuisson", "ustensile", "gadget", "épice", "mug", "tasse", "poêle", "casserole", "coupe", "épluche", "tranche", "râpe", "mesure", "minuteur", "plateau", "bol", "assiette", "café", "thé", "fourneau", "four", "vaisselle", "couverts"],
    "Garden": ["jardin", "extérieur", "plante", "fleur", "terrasse", "bbq", "grill", "solaire", "oiseau", "_arrosoir", "gazon", "haie", "graine", "pot", "terreau", "compost", "clôture", "dalles"],
    "DIY": ["outillage", "outil", "perceuse", "vis", "clou", "marteau", "clé", "pince", "mètre", "niveau", "scie", "étau", "tournevis", "foret"],
    "Sports": ["sport", "fitness", "yoga", "gym", "exercice", "résistance", "tapis", "haltère", "kettlebell", "élastique", "corde", " Grip", "roller", "course", "vélo", "natation", "camping", "randonnée", "ballon"],
    "Bathroom": ["salle de bain", "douche", "toilette", "serviette", "savon", "miroir", "bain", "rasoir", "crochet", "organisateur", "dispensateur"],
    "Cleaning": ["nettoyage", "balai", "poussoir", "brosse", "éponge", "aspirateur", "chiffon", "lave-vitre", "serpillère"],
    "Office": ["bureau", "bureautique", "stationnaire", "stylo", "carnet", "organisateur", "ordinateur portable", "souris", "clavier", "support"],
    "Storage": ["rangement", "organisateur", "boîte", "panier", "étagère", "tiroir", "conteneur", "sac", "pochette", "étagère murale"],
    "Crafts": ["bricolage", "art", "peinture", "pinceau", "autocollant", "ruban", " couture", "tricot", "aiguille", "fil", "tissu", "ciseaux", "perle"],
    "Home": ["maison", "décoration", "mur", "bougie", "vase", "cadre", "horloge", "tapis", "rideau", "store"],
}


def _is_valid_response(html):
    """Check if Amazon FR response contains real product data."""
    if not html:
        return False
    low = html.lower()
    if "captcha" in low or "api-services-support@amazon" in low:
        return False
    if "data-asin" not in html:
        return False
    return True


def _fetch_page(url):
    """Fetch a page using curl with FR locale."""
    try:
        result = subprocess.run(
            ["curl", "-s", "-L", "--compressed",
             "--connect-timeout", "10", "--max-time", "30",
             "-H", f"User-Agent: {USER_AGENT}",
             "-H", "Accept-Language: fr-FR,fr;q=0.9,en;q=0.8",
             "-b", EUR_COOKIES,
             url],
            capture_output=True, text=True, timeout=45
        )
        if _is_valid_response(result.stdout):
            print(f"  ✅ curl OK (len={len(result.stdout)})", file=sys.stderr)
            return result.stdout
    except Exception as e:
        print(f"  ❌ curl error: {e}", file=sys.stderr)
    
    # Fallback: try with proxy
    proxy = os.environ.get('http_proxy', '') or os.environ.get('https_proxy', '')
    if proxy:
        try:
            result = subprocess.run(
                ["curl", "-s", "-L", "--compressed",
                 "--connect-timeout", "10", "--max-time", "30",
                 "-x", proxy,
                 "-H", f"User-Agent: {USER_AGENT}",
                 "-H", "Accept-Language: fr-FR,fr;q=0.9,en;q=0.8",
                 "-b", EUR_COOKIES,
                 url],
                capture_output=True, text=True, timeout=45
            )
            if _is_valid_response(result.stdout):
                print(f"  ✅ curl+proxy OK (len={len(result.stdout)})", file=sys.stderr)
                return result.stdout
        except Exception as e:
            print(f"  ❌ curl+proxy error: {e}", file=sys.stderr)
    
    return ""


def _parse_amazon_fr_page(html, category, channel_type):
    """Parse Amazon FR page HTML for products."""
    products = []
    if not html or len(html) < 1000:
        return products
    
    import html as htmlmod
    
    # Split HTML by data-asin blocks
    blocks = re.split(r'data-asin="([A-Z0-9]{10})"', html)
    
    seen_asins = set()
    for i in range(1, len(blocks) - 1, 2):
        asin = blocks[i]
        block = blocks[i + 1]
        
        if asin in seen_asins or not asin:
            continue
        seen_asins.add(asin)
        
        # Extract title
        title_match = re.search(r'<img[^>]*alt="([^"]{15,300})"', block)
        title = htmlmod.unescape(title_match.group(1)).strip() if title_match else ""
        title = re.sub(r'\s+', ' ', title).strip()
        
        # Extract image URL
        img_url = ""
        img_match = re.search(r'<img[^>]*src="(https?://[^"]*amazon\.(fr|com)/images/I/[^"]+\.(?:jpg|jpeg|png|webp)[^"]*)"', block, re.I)
        if not img_match:
            img_match = re.search(r'<img[^>]*src="(https?://[^"]*amazon\.(fr|com)/images/I/[^"]+_AC_[^"]*)"', block)
        if img_match:
            img_url = img_match.group(1)
        
        # Extract price - handle EUR format
        price = 0
        # Format 1: € symbol
        price_match = re.search(r'[€£]$([\d,.]+)', block)
        # Format 2: data-csa-c-price-to-pay
        if not price_match:
            price_match = re.search(r'data-csa-c-price-to-pay="([\d.]+)"', block)
        # Format 3: a-offscreen span
        if not price_match:
            price_match = re.search(r'class="a-offscreen"[^>]*>([€£][\d.]+)', block)
        
        if price_match:
            price_str = price_match.group(1).replace('€', '').replace('£', '').replace(',', '').strip()
            try:
                price = float(price_str)
            except ValueError:
                price = 0
        
        # Extract review count
        review_match = re.search(r'>(\d[\d,]*)</span>\s*</a>', block)
        if not review_match:
            review_match = re.search(r'(\d[\d,]+)\s*(?:notes?|avis?)', block, re.I)
        review_count = int(review_match.group(1).replace(",", "")) if review_match else 0
        
        # Extract rating
        rating_match = re.search(r'(\d+\.?\d?)\s*out of\s*5', block)
        if not rating_match:
            rating_match = re.search(r'(\d+\.?\d?)\s*/\s*5', block)
        rating = float(rating_match.group(1)) if rating_match else 0
        
        if title and price > 0:
            # Validate category
            title_lower = title.lower()
            validators = CATEGORY_VALIDATORS.get(category, [])
            if validators and not any(kw in title_lower for kw in validators):
                continue
            
            products.append({
                "asin": asin,
                "name": title[:120],
                "price": price,
                "reviews": review_count,
                "rating": rating,
                "rank": len(products) + 1,
                "category": category,
                "channel": channel_type,
                "channel_name": CHANNEL_NAMES.get(channel_type, channel_type),
                "review_info": f"{review_count} avis, {rating}★" if rating else f"{review_count} avis",
                "amazon_url": f"https://www.amazon.fr/dp/{asin}",
                "image_url": img_url,
                "currency": "EUR",
                "platform": "Amazon-FR",
            })
    
    return products


def fetch(max_per_channel=3):
    """Fetch Amazon FR data from New Releases."""
    all_products = []
    seen_asins = set()
    
    # Rotate categories
    rotation_file = BASE / "data" / "last_categories_fr.json"
    last_cats = {}
    if rotation_file.exists():
        try:
            last_cats = json.loads(rotation_file.read_text())
        except:
            pass
    
    categories = list(AMAZON_FR_URLS.keys())
    uncovered = [c for c in categories if c.split("|")[0] not in last_cats.get("new_releases", [])]
    
    if len(uncovered) >= max_per_channel:
        picked = random.sample(uncovered, max_per_channel)
    else:
        picked = uncovered[:]
    
    last_cats["new_releases"] = [p.split("|")[0] for p in picked]
    
    # Save rotation
    rotation_file.parent.mkdir(parents=True, exist_ok=True)
    rotation_file.write_text(json.dumps(last_cats))
    
    print(f"🇫🇷 开始扫描Amazon FR... ({len(picked)} 个类别)", file=sys.stderr)
    
    for key in picked:
        cat, channel = key.split("|")
        url = AMAZON_FR_URLS[key]
        print(f"  扫描: {cat} ({channel})", file=sys.stderr)
        
        html = _fetch_page(url)
        if not html:
            print(f"    ⚠️ 获取失败", file=sys.stderr)
            continue
        
        products = _parse_amazon_fr_page(html, cat, channel)
        for p in products:
            if p['asin'] not in seen_asins:
                seen_asins.add(p['asin'])
                all_products.append(p)
        
        print(f"    ✅ 获取 {len(products)} 个产品", file=sys.stderr)
        time.sleep(1)  # Rate limiting
    
    print(f"✅ 扫描完成: {len(all_products)} 个产品", file=sys.stderr)
    return all_products


def main():
    """Main entry point."""
    import asyncio
    from datetime import datetime
    
    products = fetch()
    
    # Save results
    output_dir = BASE / 'data' / 'channels'
    output_dir.mkdir(parents=True, exist_ok=True)
    
    date_str = datetime.now().strftime('%Y-%m-%d')
    scan_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    
    output_file = output_dir / f'{date_str}_fr_raw.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump({
            'scan_date': date_str,
            'scan_time': scan_time,
            'platform': 'Amazon-FR',
            'products': products,
            'stats': {
                'total': len(products),
                'categories': len(AMAZON_FR_URLS),
            }
        }, f, ensure_ascii=False, indent=2)
    
    print(f"✅ 结果已保存: {output_file}")
    return products


if __name__ == '__main__':
    main()
