"""URL slug → filesystem category under public/pages/. Shared by generator and dev server."""

from __future__ import annotations

TYPE_TO_CATEGORY = {
    "airport": "airports",
    "service": "services",
    "borough": "boroughs",
    "town": "towns",
    "hub": "hubs",
    "about": "about",
    "area": "regions",
}

# Hand-maintained shells (not in ALL_PAGES yet)
MANUAL_SLUG_CATEGORIES = {
    "jfk": "airports",
    "lga": "airports",
    "ewr": "airports",
    "hpn": "airports",
}


def category_for_slug(slug: str, page_type: str | None = None) -> str:
    if slug in MANUAL_SLUG_CATEGORIES:
        return MANUAL_SLUG_CATEGORIES[slug]
    if page_type:
        return TYPE_TO_CATEGORY.get(page_type, "other")
    return "other"


def internal_url(slug: str, category: str) -> str:
    if slug == "about" and category == "about":
        return "/pages/about"
    return f"/pages/{category}/{slug}"


def page_dir(root, slug: str, category: str):
    from pathlib import Path

    base = Path(root) / "pages"
    if slug == "about" and category == "about":
        return base / "about"
    return base / category / slug


def vercel_rewrites(slug: str, category: str) -> list[dict]:
    dest = internal_url(slug, category)
    return [
        {"source": f"/{slug}", "destination": dest},
        {"source": f"/{slug}/", "destination": f"{dest}/"},
    ]


def collect_rewrites(pages: dict) -> list[dict]:
    rules: list[dict] = []
    seen: set[str] = set()
    for slug, data in pages.items():
        landing = data.get("landing", {})
        cat = category_for_slug(slug, landing.get("type"))
        if slug in seen:
            continue
        seen.add(slug)
        rules.extend(vercel_rewrites(slug, cat))
    for slug, cat in MANUAL_SLUG_CATEGORIES.items():
        if slug in seen:
            continue
        seen.add(slug)
        rules.extend(vercel_rewrites(slug, cat))
    return rules
