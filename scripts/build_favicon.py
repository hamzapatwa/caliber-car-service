#!/usr/bin/env python3
"""Render circular favicon assets from public/assets/brand/favicon.svg."""

from __future__ import annotations

import io
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SVG = ROOT / "public" / "assets" / "brand" / "favicon.svg"
PUBLIC = ROOT / "public"


def main() -> None:
    try:
        import cairosvg
        from PIL import Image
    except ImportError as exc:
        raise SystemExit("Install cairosvg and pillow in .venv-og") from exc

    if not SVG.is_file():
        raise SystemExit(f"Missing {SVG}")

    def render(size: int) -> Image.Image:
        png_bytes = cairosvg.svg2png(url=str(SVG), output_width=size, output_height=size)
        return Image.open(io.BytesIO(png_bytes)).convert("RGBA")

    sizes = (16, 32, 48)
    images = [render(s) for s in sizes]

    ico_path = PUBLIC / "favicon.ico"
    images[0].save(
        ico_path,
        format="ICO",
        sizes=[(s, s) for s in sizes],
        append_images=images[1:],
    )
    print(f"Wrote {ico_path}")

    apple = render(180)
    apple_path = PUBLIC / "apple-touch-icon.png"
    apple.save(apple_path, "PNG", optimize=True)
    print(f"Wrote {apple_path}")

    for size, name in ((32, "icon-32.png"), (16, "icon-16.png")):
        out = PUBLIC / "assets" / "brand" / name
        render(size).save(out, "PNG", optimize=True)
        print(f"Wrote {out}")


if __name__ == "__main__":
    main()
