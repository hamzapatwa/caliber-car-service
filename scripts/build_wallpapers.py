#!/usr/bin/env python3
"""Render banding-free 4K Caliber logo wallpapers."""

from __future__ import annotations

import io
from dataclasses import dataclass
from pathlib import Path

import cairosvg
import numpy as np
import png
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "assets" / "wallpapers"
MARK_SVG = ROOT / "design/wallpapers/caliber-mark.svg"

SUPERSAMPLE = 2

VIGNETTE_CENTER = np.array([0x16, 0x14, 0x12], dtype=np.float64)
VIGNETTE_MID = np.array([0x0B, 0x0B, 0x0A], dtype=np.float64)
VIGNETTE_EDGE = np.array([0x04, 0x04, 0x04], dtype=np.float64)
GOLD = np.array([0xB8, 0x96, 0x3E], dtype=np.float64)


@dataclass(frozen=True)
class WallpaperSpec:
    name: str
    width: int
    height: int
    mark_scale: float
    vignette_radius: float
    glow_radius: float
    glow_peak: float


SPECS = (
    WallpaperSpec(
        name="caliber-wallpaper-4k-landscape",
        width=3840,
        height=2160,
        mark_scale=3.55,
        vignette_radius=2100,
        glow_radius=900,
        glow_peak=0.008,
    ),
    WallpaperSpec(
        name="caliber-wallpaper-4k-portrait",
        width=2160,
        height=3840,
        mark_scale=4.2,
        vignette_radius=2400,
        glow_radius=1020,
        glow_peak=0.008,
    ),
)


def srgb_to_linear(channel: np.ndarray) -> np.ndarray:
    channel = channel / 255.0
    return np.where(
        channel <= 0.04045,
        channel / 12.92,
        ((channel + 0.055) / 1.055) ** 2.4,
    )


def linear_to_srgb16(channel: np.ndarray) -> np.ndarray:
    channel = np.where(
        channel <= 0.0031308,
        channel * 12.92,
        1.055 * (np.maximum(channel, 0.0) ** (1.0 / 2.4)) - 0.055,
    )
    return np.clip(channel * 65535.0, 0.0, 65535.0)


def smoothstep(edge0: float, edge1: float, x: np.ndarray) -> np.ndarray:
    t = np.clip((x - edge0) / (edge1 - edge0), 0.0, 1.0)
    return t * t * (3.0 - 2.0 * t)


def hash_noise(y: np.ndarray, x: np.ndarray) -> np.ndarray:
    """Deterministic dither in [-0.5, 0.5]."""
    value = np.sin(x * 12.9898 + y * 78.233) * 43758.5453
    return value - np.floor(value) - 0.5


def lerp_linear(a: np.ndarray, b: np.ndarray, t: np.ndarray) -> np.ndarray:
    a_lin = srgb_to_linear(a)
    b_lin = srgb_to_linear(b)
    return a_lin * (1.0 - t)[..., None] + b_lin * t[..., None]


def build_background_linear(
    width: int,
    height: int,
    cx: float,
    cy: float,
    vignette_radius: float,
    glow_radius: float,
    glow_peak: float,
) -> np.ndarray:
    yy, xx = np.mgrid[0:height, 0:width].astype(np.float64)
    dist = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2)

    vignette_t = np.clip(dist / vignette_radius, 0.0, 1.0)
    inner_t = np.clip(vignette_t / 0.38, 0.0, 1.0)
    outer_t = np.clip((vignette_t - 0.38) / 0.62, 0.0, 1.0)

    inner_color = lerp_linear(VIGNETTE_CENTER, VIGNETTE_MID, inner_t)
    outer_color = lerp_linear(VIGNETTE_MID, VIGNETTE_EDGE, outer_t)
    background = np.where(vignette_t[..., None] <= 0.38, inner_color, outer_color)

    glow_t = np.clip(dist / glow_radius, 0.0, 1.0)
    glow_alpha = (1.0 - smoothstep(0.0, 1.0, glow_t)) ** 2.4 * glow_peak
    gold_lin = srgb_to_linear(GOLD)
    return background * (1.0 - glow_alpha[..., None]) + gold_lin * glow_alpha[..., None]


def render_mark(size: int) -> Image.Image:
    buf = io.BytesIO()
    cairosvg.svg2png(
        url=str(MARK_SVG),
        write_to=buf,
        output_width=size,
        output_height=size,
    )
    return Image.open(buf).convert("RGBA")


def composite_mark_linear(
    background: np.ndarray,
    mark: Image.Image,
    center_x: int,
    center_y: int,
) -> np.ndarray:
    mark_arr = np.array(mark, dtype=np.float64)
    mark_lin = srgb_to_linear(mark_arr[..., :3])
    mark_alpha = mark_arr[..., 3:4] / 255.0

    mark_h, mark_w = mark_arr.shape[:2]
    left = center_x - mark_w // 2
    top = center_y - mark_h // 2
    right = left + mark_w
    bottom = top + mark_h

    canvas_h, canvas_w = background.shape[:2]
    dst_left = max(0, left)
    dst_top = max(0, top)
    dst_right = min(canvas_w, right)
    dst_bottom = min(canvas_h, bottom)

    if dst_left >= dst_right or dst_top >= dst_bottom:
        return background

    src_left = dst_left - left
    src_top = dst_top - top
    src_right = src_left + (dst_right - dst_left)
    src_bottom = src_top + (dst_bottom - dst_top)

    region_bg = background[dst_top:dst_bottom, dst_left:dst_right]
    region_mark = mark_lin[src_top:src_bottom, src_left:src_right]
    region_alpha = mark_alpha[src_top:src_bottom, src_left:src_right]

    background[dst_top:dst_bottom, dst_left:dst_right] = (
        region_bg * (1.0 - region_alpha) + region_mark * region_alpha
    )
    return background


def downscale_linear(image: np.ndarray, width: int, height: int) -> np.ndarray:
    channels = []
    for channel_index in range(3):
        channel = Image.fromarray(image[..., channel_index].astype(np.float32), mode="F")
        channel = channel.resize((width, height), Image.Resampling.LANCZOS)
        channels.append(np.array(channel, dtype=np.float64))
    return np.stack(channels, axis=-1)


def save_png16(path: Path, image: np.ndarray) -> None:
    height, width, _ = image.shape
    yy, xx = np.mgrid[0:height, 0:width].astype(np.float64)
    dither = hash_noise(yy, xx)[..., None]

    rgb16 = linear_to_srgb16(image)
    rgb16 = np.clip(rgb16 + dither, 0.0, 65535.0).astype(np.uint16)

    rows = [
        np.column_stack((rgb16[y, :, 0], rgb16[y, :, 1], rgb16[y, :, 2]))
        .reshape(-1)
        .tolist()
        for y in range(height)
    ]
    with path.open("wb") as handle:
        writer = png.Writer(width=width, height=height, bitdepth=16, greyscale=False)
        writer.write(handle, rows)


def render_wallpaper(spec: WallpaperSpec) -> None:
    render_w = spec.width * SUPERSAMPLE
    render_h = spec.height * SUPERSAMPLE
    cx = render_w / 2.0
    cy = render_h / 2.0

    background = build_background_linear(
        render_w,
        render_h,
        cx,
        cy,
        spec.vignette_radius * SUPERSAMPLE,
        spec.glow_radius * SUPERSAMPLE,
        spec.glow_peak,
    )

    mark_size = int(round(200 * spec.mark_scale * SUPERSAMPLE))
    mark = render_mark(mark_size)
    composed = composite_mark_linear(background, mark, int(cx), int(cy))

    if SUPERSAMPLE > 1:
        composed = downscale_linear(composed, spec.width, spec.height)

    out_path = OUT / f"{spec.name}.png"
    save_png16(out_path, composed)
    print(f"Wrote {out_path} ({spec.width}x{spec.height}, 16-bit RGB)")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for spec in SPECS:
        render_wallpaper(spec)


if __name__ == "__main__":
    main()
