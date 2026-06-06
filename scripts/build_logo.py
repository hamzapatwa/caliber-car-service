#!/usr/bin/env python3
"""Render logo SVGs → public/assets/brand/*.jpg (2000×2000)."""

from __future__ import annotations

import io
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUBLIC_BRAND = ROOT / "public" / "assets" / "brand"
SIZE = 2000

EXPORTS = (
    (ROOT / "design" / "logo-square.svg", PUBLIC_BRAND / "logo-2000.jpg"),
    (ROOT / "design" / "logo-mark-square.svg", PUBLIC_BRAND / "logo-mark-2000.jpg"),
)


def render_jpg(svg: Path, out: Path) -> None:
    import cairosvg
    from PIL import Image

    png_bytes = cairosvg.svg2png(url=str(svg), output_width=SIZE, output_height=SIZE)
    im = Image.open(io.BytesIO(png_bytes)).convert("RGB")
    out.parent.mkdir(parents=True, exist_ok=True)
    im.save(out, "JPEG", quality=92, optimize=True, subsampling=0)
    print(f"Wrote {out} ({SIZE}x{SIZE}, {out.stat().st_size // 1024}KB)")


def main() -> None:
    try:
        import cairosvg  # noqa: F401
        from PIL import Image  # noqa: F401
    except ImportError as exc:
        raise SystemExit("Install cairosvg and pillow in .venv-og") from exc

    for svg, out in EXPORTS:
        if not svg.is_file():
            raise SystemExit(f"Missing {svg}")
        render_jpg(svg, out)


if __name__ == "__main__":
    main()
