#!/usr/bin/env python3
"""Convert all site raster assets to WebP and remove legacy formats."""

from __future__ import annotations

import io
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
IMG = ROOT / "public" / "assets" / "images"
WALLPAPERS = ROOT / "public" / "assets" / "wallpapers"
PUBLIC = ROOT / "public"
DESIGN = ROOT / "design"
DESIGN_QR = PUBLIC / "design"

MAX_WIDTH_DEFAULT = 1920
WEBP_QUALITY = 82

# Legacy double-extension WebP → clean name
RENAMES = {
    "escalade-night.jpg.webp": "escalade-night.webp",
    "light-trail.jpg.webp": "light-trail.webp",
}

RASTER_SUFFIXES = {".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG"}


def load_pillow():
    try:
        from PIL import Image

        return Image
    except ImportError:
        print("Install Pillow: python3 -m venv .venv-img && .venv-img/bin/pip install pillow")
        raise SystemExit(1)


def webp_stem(path: Path) -> str:
    """ct4.jpg → ct4; escalade-night.jpg.webp → escalade-night (after rename)."""
    stem = path.stem
    while stem.lower().endswith((".jpg", ".jpeg", ".png")):
        stem = Path(stem).stem
    return stem


def save_webp(Image, src: Path, dest: Path, max_w: int = MAX_WIDTH_DEFAULT, quality: int = WEBP_QUALITY) -> None:
    im = Image.open(src)
    if im.mode in ("RGBA", "P"):
        im = im.convert("RGB")
    elif im.mode != "RGB":
        im = im.convert("RGB")
    w, h = im.size
    if w > max_w:
        im = im.resize((max_w, int(h * max_w / w)), Image.Resampling.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    im.save(dest, "WEBP", quality=quality, method=6)


def convert_raster(Image, src: Path, dest: Path, max_w: int = MAX_WIDTH_DEFAULT, quality: int = WEBP_QUALITY) -> None:
    if src.resolve() == dest.resolve():
        return
    before = src.stat().st_size
    save_webp(Image, src, dest, max_w=max_w, quality=quality)
    after = dest.stat().st_size
    print(f"  {src.name} → {dest.name}: {before // 1024}KB → {after // 1024}KB")


def apply_renames(directory: Path) -> None:
    for old, new in RENAMES.items():
        src = directory / old
        dest = directory / new
        if not src.is_file():
            continue
        if dest.is_file() and src.resolve() != dest.resolve():
            src.unlink()
            print(f"  Removed duplicate {old} ({new} exists)")
        else:
            shutil.move(str(src), str(dest))
            print(f"  Renamed {old} → {new}")


def process_directory(Image, directory: Path, max_w: int = MAX_WIDTH_DEFAULT) -> None:
    if not directory.is_dir():
        return
    apply_renames(directory)
    for src in sorted(directory.iterdir()):
        if not src.is_file():
            continue
        suffix = src.suffix.lower()
        if suffix == ".webp":
            continue
        if suffix not in {s.lower() for s in RASTER_SUFFIXES}:
            continue
        dest = directory / f"{webp_stem(src)}.webp"
        convert_raster(Image, src, dest, max_w=max_w)
        if src.exists() and src.resolve() != dest.resolve():
            src.unlink()


def build_og_webp(Image) -> None:
    svg = DESIGN / "og-image.svg"
    dest = PUBLIC / "og-image.webp"
    if not svg.is_file():
        print(f"Skip OG: missing {svg}")
        return
    try:
        import cairosvg
    except ImportError:
        png = PUBLIC / "og-image.png"
        if png.is_file():
            convert_raster(Image, png, dest, max_w=1200, quality=85)
            png.unlink()
        return

    png_bytes = cairosvg.svg2png(url=str(svg), output_width=1200, output_height=630)
    im = Image.open(io.BytesIO(png_bytes)).convert("RGB")
    im.save(dest, "WEBP", quality=85, method=6)
    legacy = PUBLIC / "og-image.png"
    if legacy.is_file():
        legacy.unlink()
    print(f"  og-image.webp: {dest.stat().st_size // 1024}KB")


def build_qr_webp(Image) -> None:
    for src in (DESIGN / "qr.png", DESIGN_QR / "qr.png"):
        if not src.is_file():
            continue
        dest = DESIGN_QR / "qr.webp"
        save_webp(Image, src, dest, max_w=512, quality=90)
        print(f"  {dest.relative_to(ROOT)}")
        return


def main() -> None:
    Image = load_pillow()
    print("Converting public/assets/images/ …")
    process_directory(Image, IMG)
    # Wallpapers: use `npm run build:wallpapers` (high-quality linear → WebP).
    print("Building og-image.webp …")
    build_og_webp(Image)
    print("Building design QR webp …")
    build_qr_webp(Image)
    print("Done — all site rasters should be WebP.")


if __name__ == "__main__":
    main()
