#!/usr/bin/env python3
"""Generate landing page index.html shells from page definitions."""

from __future__ import annotations

import html as html_module
import json
import re
import shutil
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
SITE = "https://calibercarservice.com"
VERCEL_JSON = ROOT / "vercel.json"

sys.path.insert(0, str(Path(__file__).resolve().parent))

from favicon_html import FAVICON_HEAD  # noqa: E402
from site_routes import category_for_slug, page_dir  # noqa: E402

SITEMAP_PRIORITIES = {
    "": 1.0,
    "jfk": 0.9,
    "lga": 0.9,
    "ewr": 0.9,
    "hpn": 0.9,
    "nyc": 0.85,
    "manhattan": 0.85,
    "brooklyn": 0.85,
    "queens": 0.85,
    "bronx": 0.85,
    "staten-island": 0.85,
    "about": 0.7,
    "areas": 0.7,
}


def _esc(text: str) -> str:
    return html_module.escape(text, quote=True)


_HREF_SKIP = ("http://", "https://", "tel:", "mailto:", "#")


def normalize_href(h: str) -> str:
    """Root-absolute internal path (e.g. jfk/ or ../lga/ → /jfk/, /lga/)."""
    if not h or any(h.startswith(p) for p in _HREF_SKIP):
        return h
    cleaned = re.sub(r"^(\.\./)+", "", h)
    if cleaned.startswith("/"):
        if cleaned.endswith("/") or "#" in cleaned:
            return cleaned
        return cleaned + "/"
    return "/" + cleaned.strip("/") + "/"


def normalize_hrefs(obj):
    if isinstance(obj, dict):
        return {
            k: normalize_href(v) if k == "href" and isinstance(v, str) else normalize_hrefs(v)
            for k, v in obj.items()
        }
    if isinstance(obj, list):
        return [normalize_hrefs(x) for x in obj]
    return obj


def normalize_landing_html(html_path: Path) -> bool:
    """Normalize href values inside inline window.LANDING_PAGE configs."""
    text = html_path.read_text(encoding="utf-8")
    original = text

    def fix_quoted(m: re.Match) -> str:
        quote, val = m.group(1), m.group(2)
        return f"href: {quote}{normalize_href(val)}{quote}"

    text = re.sub(
        r'href:\s*(["\'])([^"\']+)\1',
        fix_quoted,
        text,
    )
    text = re.sub(
        r'"href"\s*:\s*"([^"]+)"',
        lambda m: f'"href": "{normalize_href(m.group(1))}"',
        text,
    )
    if text != original:
        html_path.write_text(text, encoding="utf-8")
        return True
    return False


def default_breadcrumb(landing: dict) -> list[dict]:
    page_type = landing.get("type", "")
    name = landing.get("name", "")
    crumbs = [{"label": "Home", "href": "/"}]
    if page_type == "airport":
        crumbs.append({"label": "Airport Service"})
    elif page_type == "borough":
        crumbs.append({"label": "New York City", "href": "/nyc/"})
    elif page_type not in ("about", "hub"):
        crumbs.append({"label": "Services" if page_type == "service" else "Service Areas", "href": "/areas/"})
    crumbs.append({"label": name})
    return crumbs


def faq_schema_json(faq: list) -> str | None:
    if not faq:
        return None
    data = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": item["q"],
                "acceptedAnswer": {"@type": "Answer", "text": item["a"]},
            }
            for item in faq
        ],
    }
    return json.dumps(data, indent=2)


def breadcrumb_schema_json(landing: dict) -> str | None:
    crumbs = landing.get("breadcrumb") or default_breadcrumb(landing)
    seo_url = landing.get("seo", {}).get("url", "")
    items = []
    for i, c in enumerate(crumbs):
        if c.get("href"):
            href = normalize_href(c["href"])
            item_url = href if href.startswith("http") else SITE + (href if href.startswith("/") else "/" + href)
        elif i == len(crumbs) - 1 and seo_url:
            item_url = seo_url
        else:
            item_url = SITE + "/"
        items.append({
            "@type": "ListItem",
            "position": i + 1,
            "name": c["label"],
            "item": item_url,
        })
    return json.dumps({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items,
    }, indent=2)


def static_prerender_html(landing: dict) -> str:
    hero = landing.get("hero", {})
    h1 = f"{hero.get('line1', '')} {hero.get('line2', '')}".strip()
    sub = hero.get("sub", "")
    faq = landing.get("faq", [])
    faq_block = ""
    if faq:
        items = "".join(
            f"<details><summary>{_esc(item['q'])}</summary><p>{_esc(item['a'])}</p></details>"
            for item in faq
        )
        faq_block = f'<section class="lp-static-faq" aria-label="Frequently asked questions">{items}</section>'
    return (
        f'<div id="lp-static-prerender" class="lp-static-prerender">'
        f'<header class="lp-static-hero"><h1>{_esc(h1)}</h1><p>{_esc(sub)}</p></header>'
        f"{faq_block}"
        f"</div>"
    )


def render_page(slug: str, seo: dict, landing: dict, schema: str) -> str:
    canonical = f"{SITE}/{slug}/"
    title = seo["title"]
    desc = seo["description"]
    og_desc = seo.get("ogDescription", desc)
    landing = normalize_hrefs(landing)
    config_js = "window.LANDING_PAGE = " + json.dumps(landing, indent=4, ensure_ascii=False) + ";"

    extra_schemas = []
    faq_json = faq_schema_json(landing.get("faq", []))
    if faq_json:
        extra_schemas.append(faq_json)
    crumb_json = breadcrumb_schema_json(landing)
    if crumb_json:
        extra_schemas.append(crumb_json)
    extra_ld = "".join(
        f'\n  <script type="application/ld+json">\n{block}\n  </script>'
        for block in extra_schemas
    )

    prerender = static_prerender_html(landing)

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="stylesheet" href="/css/consent.css" />
  <script src="/js/consent.js"></script>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
{FAVICON_HEAD}
  <title>{_esc(title)}</title>
  <meta name="description" content="{_esc(desc)}" />
  <link rel="canonical" href="{canonical}" />
  <meta name="robots" content="index, follow" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="{_esc(title)}" />
  <meta property="og:description" content="{_esc(og_desc)}" />
  <meta property="og:url" content="{canonical}" />
  <meta property="og:image" content="{SITE}/og-image.webp" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{_esc(title)}" />
  <meta name="twitter:description" content="{_esc(og_desc)}" />
  <meta name="twitter:image" content="{SITE}/og-image.webp" />
  <script type="application/ld+json">
{schema}
  </script>{extra_ld}
  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin />
  <link href="https://cdn.jsdelivr.net/npm/@fontsource/bebas-neue@5/index.min.css" rel="stylesheet" media="print" onload="this.media='all'" />
  <link href="https://cdn.jsdelivr.net/npm/@fontsource/dm-sans@5/index.min.css" rel="stylesheet" media="print" onload="this.media='all'" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js" defer></script>
  <link rel="stylesheet" href="/css/styles.css" />
  <link rel="stylesheet" href="/css/landing.css" />
  <script src="/js/site-shared.js"></script>
  <script src="/js/images.js"></script>
  <script src="/js/config.js"></script>
  <script>
{config_js}
  </script>
</head>
<body>
  <a class="skip-link" href="#lp-app">Skip to main content</a>
  <main id="lp-app">{prerender}</main>
  <script src="/js/nav.js"></script>
  <script src="/js/nav-drawer-touch.js"></script>
  <script src="/js/landing.js" defer></script>
</body>
</html>
"""


def page_output_dir(slug: str, landing: dict) -> Path:
    cat = category_for_slug(slug, landing.get("type"))
    return page_dir(PUBLIC, slug, cat)


def sync_public_symlink(slug: str, category: str) -> None:
    """public/{slug}/ → pages/{category}/{slug}/ so /jfk/ works without Vercel rewrites."""
    dest = page_dir(PUBLIC, slug, category)
    if not dest.is_dir():
        return
    rel = dest.relative_to(PUBLIC)
    link = PUBLIC / slug
    if link.is_symlink():
        try:
            if link.resolve() == dest.resolve():
                return
        except OSError:
            pass
        link.unlink()
    elif link.exists():
        if link.resolve() == dest.resolve():
            return
        shutil.rmtree(link) if link.is_dir() else link.unlink()

    link.symlink_to(rel, target_is_directory=True)


def clear_vercel_rewrites() -> None:
    data = json.loads(VERCEL_JSON.read_text(encoding="utf-8"))
    data.pop("rewrites", None)
    VERCEL_JSON.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")


def sitemap_priority(slug: str, page_type: str | None) -> float:
    if slug in SITEMAP_PRIORITIES:
        return SITEMAP_PRIORITIES[slug]
    if page_type == "airport":
        return 0.9
    if page_type in ("borough", "hub"):
        return 0.85
    if page_type in ("service", "town", "area"):
        return 0.8
    return 0.7


def generate_sitemap(pages: dict) -> None:
    today = date.today().isoformat()
    urls = [
        {
            "loc": f"{SITE}/",
            "priority": "1.0",
        }
    ]
    for slug, data in sorted(pages.items()):
        landing = data["landing"]
        ptype = landing.get("type")
        urls.append({
            "loc": f"{SITE}/{slug}/",
            "priority": f"{sitemap_priority(slug, ptype):.1f}",
        })

    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    for entry in urls:
        lines.extend([
            "  <url>",
            f"    <loc>{entry['loc']}</loc>",
            f"    <lastmod>{today}</lastmod>",
            "    <changefreq>monthly</changefreq>",
            f"    <priority>{entry['priority']}</priority>",
            "  </url>",
        ])
    lines.append("</urlset>")
    (PUBLIC / "sitemap.xml").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote sitemap.xml ({len(urls)} URLs)")


def main():
    from landing_page_data import ALL_PAGES  # noqa: F401

    for slug, data in ALL_PAGES.items():
        landing = data["landing"]
        out_dir = page_output_dir(slug, landing)
        out_dir.mkdir(parents=True, exist_ok=True)
        html = render_page(slug, data["seo"], landing, data["schema"])
        (out_dir / "index.html").write_text(html, encoding="utf-8")
        cat = category_for_slug(slug, landing.get("type"))
        sync_public_symlink(slug, cat)
        print(f"Wrote pages/{cat}/{slug}/index.html")

    for slug, data in ALL_PAGES.items():
        cat = category_for_slug(slug, data["landing"].get("type"))
        sync_public_symlink(slug, cat)

    normalized = 0
    for html_path in PUBLIC.rglob("index.html"):
        if "LANDING_PAGE" in html_path.read_text(encoding="utf-8") and normalize_landing_html(html_path):
            normalized += 1
    if normalized:
        print(f"Normalized hrefs in {normalized} landing page(s)")

    generate_sitemap(ALL_PAGES)
    clear_vercel_rewrites()
    print("Synced public/{slug} symlinks; removed Vercel rewrites")


if __name__ == "__main__":
    main()
