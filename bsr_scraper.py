#!/usr/bin/env python3
"""
BSR Scraper using Playwright — free, no API key needed.
Scrapes Amazon UK product pages for BSR, reviews, rating, image.
Usage:
  python3 bsr_scraper.py --asin B0GYXR8P84 B0H2CZRB48
  python3 bsr_scraper.py --enrich  (enrich latest radar data)
"""

import argparse
import asyncio
import json
import glob
import os
import re
import sys
from datetime import datetime

DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data", "channels")


def estimate_daily_sales(bsr: int, category: str = "general") -> int:
    """Estimate daily sales from BSR rank (Amazon UK)."""
    MULTIPLIERS = {
        "kitchen": 1.2, "garden": 0.8, "pets": 1.0,
        "automotive": 0.7, "lighting": 0.9, "crafts": 0.6,
        "sports": 0.8, "diy": 0.7, "home": 1.0, "general": 1.0,
    }
    mult = MULTIPLIERS.get(category.lower(), 1.0)
    if bsr < 100:
        base = 1500 + (100 - bsr) * 20
    elif bsr <= 50000:
        base = 150000 / bsr
    else:
        base = max(1, 150000 / bsr)
    return max(1, int(base * mult))


async def scrape_product(page, asin: str, domain: str = "co.uk") -> dict:
    """Scrape a single Amazon product page for BSR and details.

    FR 站扫描混合 UK/FR 两地 ASIN：按 domain 路由到对应站点，
    FR ASIN 在 .co.uk 上查不到，反之亦然。
    """
    url = f"https://www.amazon.{domain}/dp/{asin}"
    result = {
        "asin": asin,
        "domain": domain,
        "bsr_rank": None,
        "bsr_category": None,
        "bsr_sub_rank": None,
        "bsr_sub_category": None,
        "reviews": None,
        "rating": None,
        "image_url": None,
        "title": None,
        "price": None,
        "scraped_at": datetime.now().isoformat(),
    }

    try:
        await page.goto(url, wait_until="domcontentloaded", timeout=25000)

        # Wait for BSR section to load (JavaScript rendered)
        try:
            await page.wait_for_selector(
                '#productDetails_detailBullets_sections1, #detailBullets_feature_div, #prodDetails',
                timeout=8000
            )
        except:
            pass
        await page.wait_for_timeout(1000)

        content = await page.content()

        # --- BSR ---
        bsr_match = re.search(r'Best Sellers? Rank.*?</tr>', content, re.DOTALL | re.IGNORECASE)
        if bsr_match:
            bsr_text = re.sub(r'<[^>]+>', ' ', bsr_match.group())
            bsr_text = re.sub(r'&amp;', '&', bsr_text)
            bsr_text = re.sub(r'\s+', ' ', bsr_text).strip()

            # Extract rank: split by parens to avoid "Top 100" matches
            parts = re.split(r'[()]', bsr_text)
            ranks = []
            for part in parts:
                if "Top" in part:
                    continue
                matches = re.findall(r'([\d,]+)\s+in\s+(.+?)(?:\s*$|\s*\()', part)
                ranks.extend(matches)
            if ranks:
                result["bsr_rank"] = int(ranks[0][0].replace(",", ""))
                result["bsr_category"] = ranks[0][1].strip()
                if len(ranks) > 1:
                    result["bsr_sub_rank"] = int(ranks[1][0].replace(",", ""))
                    result["bsr_sub_category"] = ranks[1][1].strip()

        # --- Reviews ---
        review_match = re.search(r'(\d[\d,]*)\s*(?:global\s*)?ratings?', content, re.IGNORECASE)
        if review_match:
            result["reviews"] = int(review_match.group(1).replace(",", ""))

        # --- Rating ---
        rating_match = re.search(r'(\d+\.?\d?)\s*out of\s*5\s*stars', content, re.IGNORECASE)
        if rating_match:
            result["rating"] = float(rating_match.group(1))

        # --- Image ---
        img_match = re.search(
            r'(https?://m\.media-amazon\.com/images/I/[^\s"\']+\._AC_[^\s"\']+)',
            content
        )
        if img_match:
            result["image_url"] = img_match.group(1)

        # --- Title ---
        title_el = page.locator('#productTitle').first
        try:
            title_text = await title_el.inner_text()
            result["title"] = title_text.strip()
        except:
            pass

        # --- Price ---
        price_match = re.search(r'£(\d+\.?\d*)', content)
        if price_match:
            result["price"] = float(price_match.group(1))

        status = "✅"
    except Exception as e:
        status = f"❌ {str(e)[:50]}"

    return result, status


async def scrape_batch(targets, concurrency: int = 3) -> list[dict]:
    """Scrape multiple ASINs with controlled concurrency.

    targets: list[str]（默认 UK 站）或 list[tuple[asin, domain]]，
    domain 形如 'co.uk' / 'fr'。
    """
    from playwright.async_api import async_playwright

    # 归一化为 (asin, domain)
    norm = [(t, "co.uk") if isinstance(t, str) else (t[0], t[1]) for t in targets]

    results = []
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=True,
            executable_path="/home/lee/.cloakbrowser/chromium-146.0.7680.177.5/chrome"
        )
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
            locale="fr-FR",
        )
        # Set cookies to bypass Amazon consent dialog（双站点都预置）
        await context.add_cookies([
            {"name": "sp-cc", "value": "1", "domain": ".amazon.co.uk", "path": "/"},
            {"name": "lc-main", "value": "en_GB", "domain": ".amazon.co.uk", "path": "/"},
            {"name": "i18n-prefs", "value": "GBP", "domain": ".amazon.co.uk", "path": "/"},
            {"name": "sp-cc", "value": "1", "domain": ".amazon.fr", "path": "/"},
            {"name": "lc-main", "value": "fr_FR", "domain": ".amazon.fr", "path": "/"},
            {"name": "i18n-prefs", "value": "EUR", "domain": ".amazon.fr", "path": "/"},
        ])

        # Process in batches to control concurrency
        for i in range(0, len(norm), concurrency):
            batch = norm[i:i + concurrency]
            pages = []
            for asin, domain in batch:
                page = await context.new_page()
                pages.append((page, asin, domain))

            tasks = [scrape_product(page, asin, domain) for page, asin, domain in pages]
            batch_results = await asyncio.gather(*tasks, return_exceptions=True)

            for result in batch_results:
                if isinstance(result, Exception):
                    print(f"  ❌ Error: {result}", file=sys.stderr)
                else:
                    data, status = result
                    asin = data["asin"]
                    bsr = data["bsr_rank"]
                    reviews = data["reviews"]
                    print(f"  {status} {asin}(.{data.get('domain', 'co.uk')}): BSR={bsr} reviews={reviews}", file=sys.stderr)
                    results.append(data)

            # Close pages
            for page, _, _ in pages:
                await page.close()

            # Small delay between batches
            if i + concurrency < len(norm):
                await asyncio.sleep(1)

        await browser.close()

    return results


def enrich_radar_data(radar_path: str, bsr_data: list[dict]) -> dict:
    """Merge BSR data into radar products."""
    with open(radar_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    bsr_map = {r["asin"]: r for r in bsr_data}
    enriched = 0

    for p in data.get("products", []):
        asin = p.get("asin", "")
        if asin in bsr_map:
            bsr = bsr_map[asin]
            if bsr["bsr_rank"]:
                p["bsr_rank"] = bsr["bsr_rank"]
                p["bsr_category"] = bsr["bsr_category"]
                p["bsr_sub_rank"] = bsr.get("bsr_sub_rank")
                p["bsr_sub_category"] = bsr.get("bsr_sub_category")

                # Calculate daily sales estimate
                category = p.get("category", "general").lower()
                daily = estimate_daily_sales(bsr["bsr_rank"], category)
                price = p.get("price", 0) or bsr.get("price", 0) or 0
                p["estimated_daily_sales"] = daily
                p["monthly_revenue_est"] = round(daily * price * 30, 2)
                enriched += 1

            # Update reviews/rating if we got better data
            if bsr["reviews"] and (not p.get("reviews") or p["reviews"] == 0):
                p["reviews"] = bsr["reviews"]
            if bsr["rating"] and (not p.get("rating") or p["rating"] == 0):
                p["rating"] = bsr["rating"]
            # Update image if missing
            if bsr["image_url"] and not p.get("image_url"):
                p["image_url"] = bsr["image_url"]

    print(f"  Enriched {enriched}/{len(data.get('products', []))} products with BSR data")
    return data


def main():
    parser = argparse.ArgumentParser(description="BSR Scraper using Playwright")
    parser.add_argument("--asin", nargs="+", help="ASINs to scrape")
    parser.add_argument("--enrich", action="store_true", help="Enrich latest radar data")
    parser.add_argument("--output", help="Output JSON path")
    args = parser.parse_args()

    if args.asin:
        # Scrape specific ASINs
        results = asyncio.run(scrape_batch(args.asin))
        print(json.dumps(results, indent=2, ensure_ascii=False))

    elif args.enrich:
        # Enrich latest radar data
        files = sorted(glob.glob(os.path.join(DATA_DIR, "*.json")))
        files = [f for f in files if "rejected" not in f and "trends" not in f and "bsr_data" not in f]
        if not files:
            print("No radar data found.")
            return

        latest = files[-1]
        print(f"Enriching: {os.path.basename(latest)}")

        with open(latest, "r", encoding="utf-8") as f:
            data = json.load(f)

        # 按 amazon_url 域名路由（FR 产品去 .fr 查，UK 产品去 .co.uk 查）
        targets = []
        for p_ in data.get("products", []):
            if not p_.get("asin"):
                continue
            au = (p_.get("amazon_url") or "").lower()
            domain = "fr" if ("amazon.fr" in au or p_.get("platform") == "Amazon-FR") else "co.uk"
            targets.append((p_["asin"], domain))
        print(f"Scraping {len(targets)} products "
              f"(fr={sum(1 for _, d in targets if d == 'fr')}, "
              f"uk={sum(1 for _, d in targets if d == 'co.uk')})...")

        bsr_data = asyncio.run(scrape_batch(targets))
        enriched_data = enrich_radar_data(latest, bsr_data)

        # Save
        with open(latest, "w", encoding="utf-8") as f:
            json.dump(enriched_data, f, ensure_ascii=False, indent=2)
        print(f"  ✅ Saved to {latest}")

        # Also save raw BSR data
        bsr_path = os.path.join(DATA_DIR, "bsr_data.json")
        with open(bsr_path, "w", encoding="utf-8") as f:
            json.dump(bsr_data, f, ensure_ascii=False, indent=2)
        print(f"  ✅ BSR raw data saved to {bsr_path}")

    else:
        parser.print_help()


if __name__ == "__main__":
    main()
