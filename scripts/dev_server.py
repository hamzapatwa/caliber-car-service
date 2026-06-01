#!/usr/bin/env python3
"""Local static server with the same slug → pages/{category}/ rewrites as Vercel."""

from __future__ import annotations

import sys
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from urllib.parse import parse_qs, urlparse

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
PORT = 3001

sys.path.insert(0, str(Path(__file__).resolve().parent))


def build_rewrite_map() -> dict[str, str]:
    from landing_page_data import ALL_PAGES
    from site_routes import category_for_slug, internal_url

    out: dict[str, str] = {}
    for slug, data in ALL_PAGES.items():
        landing = data.get("landing", {})
        cat = category_for_slug(slug, landing.get("type"))
        out[f"/{slug}"] = f"{internal_url(slug, cat)}/index.html"
    return out


REWRITE_MAP = build_rewrite_map()


class DevHandler(SimpleHTTPRequestHandler):
  def __init__(self, *args, **kwargs):
    super().__init__(*args, directory=str(PUBLIC), **kwargs)

  def do_GET(self):
    parsed = urlparse(self.path)
    path = parsed.path
    query = f"?{parsed.query}" if parsed.query else ""

    if path != "/" and not path.endswith("/") and "." not in Path(path).name:
      key = path
      if key in REWRITE_MAP:
        self.send_response(301)
        self.send_header("Location", path + "/" + query)
        self.end_headers()
        return

    key = path.rstrip("/") or "/"
    target = REWRITE_MAP.get(key) if key != "/" else None
    if target:
      self.path = target + query
    return super().do_GET()


def main():
  server = ThreadingHTTPServer(("", PORT), DevHandler)
  print(f"Serving {PUBLIC} at http://localhost:{PORT} (with page rewrites)")
  server.serve_forever()


if __name__ == "__main__":
  main()
