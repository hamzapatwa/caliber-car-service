#!/usr/bin/env python3
"""Render design/og-image.svg → public/og-image.webp for social meta tags."""

from __future__ import annotations

import io
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SVG = ROOT / "design" / "og-image.svg"
OUT = ROOT / "public" / "og-image.webp"
LEGACY_PNG = ROOT / "public" / "og-image.png"


def main() -> None:
    try:
        import cairosvg
        from PIL import Image
    except ImportError as exc:
        raise SystemExit("Install cairosvg and pillow in .venv-og") from exc

    if not SVG.is_file():
        raise SystemExit(f"Missing {SVG}")

    png_bytes = cairosvg.svg2png(url=str(SVG), output_width=1200, output_height=630)
    im = Image.open(io.BytesIO(png_bytes)).convert("RGB")
    im.save(OUT, "WEBP", quality=85, method=6)
    if LEGACY_PNG.is_file():
        LEGACY_PNG.unlink()
    print(f"Wrote {OUT} ({OUT.stat().st_size // 1024}KB)")


if __name__ == "__main__":
    main()
