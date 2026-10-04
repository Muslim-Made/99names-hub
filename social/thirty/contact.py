#!/usr/bin/env python3
"""Contact sheets from _check/export: the profile grid as it will look after
day thirty (newest first, 3:4 crop as Instagram now crops it), every carousel
in order, and every story. For reviewing what the client will download.
    python3 contact.py"""
import re, glob
from pathlib import Path
from PIL import Image, ImageDraw
HERE = Path(__file__).resolve().parent; EX = HERE / "_check" / "export"; OUT = HERE / "_check"
def load(p, w, h=None):
    im = Image.open(p).convert("RGB")
    if h:  # centre crop to 3:4 like the profile grid
        cw = int(im.height * 3 / 4); im = im.crop(((im.width - cw) // 2, 0, (im.width + cw) // 2, im.height))
    return im.resize((w, h or int(im.height * w / im.width)), Image.LANCZOS)
posts = sorted(EX.glob("d*-post.png")) + [sorted(EX.glob(f"d{n:02d}-slide01.png"))[0] for n in range(1, 31) if list(EX.glob(f"d{n:02d}-slide01.png"))]
posts = sorted(posts, key=lambda p: int(re.search(r"d(\d+)", p.name).group(1)), reverse=True)
W, H, G = 300, 400, 4
grid = Image.new("RGB", (3 * W + 2 * G, (len(posts) + 2) // 3 * (H + G) - G), (244, 238, 228))
for i, p in enumerate(posts):
    grid.paste(load(p, W, H), ((i % 3) * (W + G), (i // 3) * (H + G)))
grid.save(OUT / "grid.jpg", quality=86); print("grid.jpg", len(posts), "tiles")
for n in range(1, 31):
    sl = sorted(EX.glob(f"d{n:02d}-slide*.png"))
    if sl:
        w = 240; im = Image.new("RGB", (len(sl) * (w + 6), 300), (244, 238, 228))
        for i, p in enumerate(sl): im.paste(load(p, w), (i * (w + 6), 0))
        im.save(OUT / f"carousel-d{n:02d}.jpg", quality=86); print(f"carousel-d{n:02d}.jpg", len(sl))
st = sorted(EX.glob("d*-story*.png")); w = 160
im = Image.new("RGB", (10 * (w + 6), ((len(st) + 9) // 10) * (int(w * 16 / 9) + 6)), (244, 238, 228))
for i, p in enumerate(st): im.paste(load(p, w), ((i % 10) * (w + 6), (i // 10) * (int(w * 16 / 9) + 6)))
im.save(OUT / "stories.jpg", quality=84); print("stories.jpg", len(st))
ps = sorted(EX.glob("d*-post.png")); w = 216
im = Image.new("RGB", (6 * (w + 6), ((len(ps) + 5) // 6) * (int(w * 1.25) + 6)), (244, 238, 228))
for i, p in enumerate(ps): im.paste(load(p, w), ((i % 6) * (w + 6), (i // 6) * (int(w * 1.25) + 6)))
im.save(OUT / "posts.jpg", quality=86); print("posts.jpg", len(ps))
