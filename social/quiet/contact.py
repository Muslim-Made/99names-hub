#!/usr/bin/env python3
"""Contact sheets from _check/export: the profile grid on 13 December (newest first, every tile cropped
to 3:4 as the profile shows it; a reel shows the centre 3:4 of its cover), every carousel in order, and
every story. grid.jpg is also written next to the playbook, which shows it.
    python3 contact.py"""
import re
from pathlib import Path
from PIL import Image
HERE = Path(__file__).resolve().parent; EX = HERE / "_check" / "export"; OUT = HERE / "_check"
def tile(p, w):
    im = Image.open(p).convert("RGB")
    if im.height / im.width > 1.6:   # a reel cover: the grid shows its centre 1080 × 1440
        top = (im.height - 1440) // 2; im = im.crop((0, top, 1080, top + 1440))
    else:                            # a 4:5 post: the grid crops 34px from each side
        cw = int(im.height * 3 / 4); im = im.crop(((im.width - cw) // 2, 0, (im.width + cw) // 2, im.height))
    return im.resize((w, int(w * 4 / 3)), Image.LANCZOS)
dates = sorted({re.match(r"(\d{4}-\d\d-\d\d)", p.name).group(1) for p in EX.glob("*.png")})
tiles = []
for d in dates:
    for k in ("slide01", "post", "cover"):
        f = EX / f"{d}-{k}.png"
        if f.exists(): tiles.append(f); break
tiles.reverse()
W, G = 300, 4; H = int(W * 4 / 3)
grid = Image.new("RGB", (3 * W + 2 * G, (len(tiles) + 2) // 3 * (H + G) - G), (244, 238, 228))
for i, p in enumerate(tiles): grid.paste(tile(p, W), ((i % 3) * (W + G), (i // 3) * (H + G)))
grid.save(OUT / "grid.jpg", quality=86)
small = grid.resize((grid.width // 2, grid.height // 2), Image.LANCZOS); small.save(HERE / "grid.jpg", quality=84)
print("grid.jpg", len(tiles), "tiles")
for d in dates:
    sl = sorted(EX.glob(f"{d}-slide*.png"))
    if sl:
        w = 240; im = Image.new("RGB", (len(sl) * (w + 6), 300), (244, 238, 228))
        for i, p in enumerate(sl): im.paste(Image.open(p).convert("RGB").resize((w, 300), Image.LANCZOS), (i * (w + 6), 0))
        im.save(OUT / f"carousel-{d}.jpg", quality=86)
st = sorted(EX.glob("*-story*.png")); w = 160; h = int(w * 16 / 9)
im = Image.new("RGB", (12 * (w + 6), ((len(st) + 11) // 12) * (h + 6)), (244, 238, 228))
for i, p in enumerate(st): im.paste(Image.open(p).convert("RGB").resize((w, h), Image.LANCZOS), ((i % 12) * (w + 6), (i // 12) * (h + 6)))
im.save(OUT / "stories.jpg", quality=84); print("stories.jpg", len(st))
