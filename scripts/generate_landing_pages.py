#!/usr/bin/env python3
"""Generate landing page index.html shells from page definitions."""

from __future__ import annotations

import json
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
SITE = "https://calibercarservice.com"
VERCEL_JSON = ROOT / "vercel.json"

sys.path.insert(0, str(Path(__file__).resolve().parent))

from site_routes import MANUAL_SLUG_CATEGORIES, category_for_slug, page_dir  # noqa: E402


def js_obj(obj, indent=4) -> str:
    return json.dumps(obj, indent=indent, ensure_ascii=False).replace("true", "true").replace("false", "false")


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


def schema_service(name: str, service_type: str, description: str, area: str = "Long Island, New York") -> str:
    data = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": name,
        "provider": {
            "@type": "LocalBusiness",
            "name": "Caliber Car Service",
            "telephone": "+15165952391",
            "address": {"@type": "PostalAddress", "addressRegion": "NY", "addressLocality": "Long Island"},
        },
        "serviceType": service_type,
        "areaServed": area,
        "description": description,
    }
    return json.dumps(data, indent=2)


def schema_place(name: str, description: str) -> str:
    data = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": f"Caliber Car Service — {name}",
        "telephone": "+15165952391",
        "description": description,
        "areaServed": name,
        "parentOrganization": {"@type": "LocalBusiness", "name": "Caliber Car Service"},
    }
    return json.dumps(data, indent=2)


def render_page(slug: str, seo: dict, landing: dict, schema: str) -> str:
    canonical = f"{SITE}/{slug}/"
    title = seo["title"]
    desc = seo["description"]
    og_desc = seo.get("ogDescription", desc)
    landing = normalize_hrefs(landing)
    config_js = "window.LANDING_PAGE = " + json.dumps(landing, indent=4, ensure_ascii=False) + ";"

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="stylesheet" href="/css/consent.css" />
  <script src="/js/consent.js"></script>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" type="image/svg+xml" href="/assets/brand/caliber_mark.svg" />
  <title>{title}</title>
  <meta name="description" content="{desc}" />
  <link rel="canonical" href="{canonical}" />
  <meta name="robots" content="index, follow" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{og_desc}" />
  <meta property="og:url" content="{canonical}" />
  <meta property="og:image" content="{SITE}/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="{SITE}/og-image.png" />
  <script type="application/ld+json">
{schema}
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://cdn.jsdelivr.net/npm/@fontsource/bebas-neue@5/index.min.css" rel="stylesheet" media="print" onload="this.media='all'" />
  <link href="https://cdn.jsdelivr.net/npm/@fontsource/dm-sans@5/index.min.css" rel="stylesheet" media="print" onload="this.media='all'" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
  <script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js" defer></script>
  <link rel="stylesheet" href="/css/styles.css" />
  <link rel="stylesheet" href="/css/landing.css" />
  <script src="/js/images.js"></script>
  <script src="/js/config.js"></script>
  <script>
{config_js}
  </script>
</head>
<body>
  <main id="lp-app"></main>
  <script src="/js/nav.js"></script>
  <script src="/js/nav-drawer-touch.js"></script>
  <script src="/js/landing.js"></script>
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


def relocate_manual_pages() -> None:
    """Move legacy public/{slug}/ dirs into pages/{category}/{slug}/ (one-time layout)."""
    from site_routes import MANUAL_SLUG_CATEGORIES

    for slug, cat in MANUAL_SLUG_CATEGORIES.items():
        dest = page_dir(PUBLIC, slug, cat)
        src = PUBLIC / slug
        # Only move a real directory at the site root — never follow or replace symlinks.
        if src.is_dir() and not src.is_symlink():
            try:
                if src.resolve() != dest.resolve():
                    dest.parent.mkdir(parents=True, exist_ok=True)
                    if dest.exists() and not dest.is_symlink():
                        shutil.rmtree(dest)
                    shutil.move(str(src), str(dest))
                    print(f"Relocated {slug} → pages/{cat}/{slug}/")
            except FileNotFoundError:
                pass
        html = dest / "index.html"
        if html.is_file():
            text = html.read_text(encoding="utf-8")
            text = text.replace('src="../', 'src="/').replace("src='../", "src='/")
            html.write_text(text, encoding="utf-8")
            normalize_landing_html(html)
        sync_public_symlink(slug, cat)


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

    relocate_manual_pages()

    for slug, data in ALL_PAGES.items():
        cat = category_for_slug(slug, data["landing"].get("type"))
        sync_public_symlink(slug, cat)
    for slug, cat in MANUAL_SLUG_CATEGORIES.items():
        sync_public_symlink(slug, cat)

    normalized = 0
    for html in PUBLIC.rglob("index.html"):
        if "LANDING_PAGE" in html.read_text(encoding="utf-8") and normalize_landing_html(html):
            normalized += 1
    if normalized:
        print(f"Normalized hrefs in {normalized} landing page(s)")

    clear_vercel_rewrites()
    print("Synced public/{slug} symlinks; removed Vercel rewrites")


if __name__ == "__main__":
    main()
