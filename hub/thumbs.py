#!/usr/bin/env python3
"""The card plates. Serves the world on a local port, screenshots every card
with headless Chrome through shot.mjs, and lays them down as JPEG at 720px.
    python3 hub/thumbs.py            # all
    python3 hub/thumbs.py kit world  # just those
"""
import subprocess, sys, time, os, socket
from pathlib import Path
HUB = Path(__file__).resolve().parent; ROOT = HUB.parent; OUT = HUB / "thumbs"; OUT.mkdir(exist_ok=True)
PORT = 8741
L = f"http://127.0.0.1:{PORT}"
SHOTS = {
  "directions": (f"{L}/directions/index.html", {}),
  "gilded": (f"{L}/directions/gilded-archive.html", {}),
  "dots": (f"{L}/directions/ninety-nine-dots.html", {}),
  "noor": (f"{L}/directions/noor.html", {}),
  "world": (f"{L}/world/index.html", {}),
  "world-p2": (f"{L}/world/index.html", {"scroll": 1600}),
  "world-p3": (f"{L}/world/index.html", {"scroll": 3600}),
  "world-p4": (f"{L}/world/index.html", {"scroll": 6000}),
  "logo": (f"{L}/logo/contact-sheet.html", {}),
  "kit": (f"{L}/social/index.html", {}),
  "kit-p2": (f"{L}/social/03-name-of-the-week.html", {"w": 1080, "h": 1350}),
  "kit-p3": (f"{L}/social/07-dawn-to-night.html", {"w": 1080, "h": 1350}),
  "kit-p4": (f"{L}/social/14-send-a-name.html", {"w": 1080, "h": 1350}),
  "kit-p5": (f"{L}/social/19-carousel-cover.html", {"w": 1080, "h": 1350}),
  "kit-p6": (f"{L}/social/27-story-name.html", {"w": 1080, "h": 1920}),
  "captions": (f"{L}/social/captions.html", {}),
  "thirty": (f"{L}/social/thirty/index.html#day-01", {"wait": 4500}),
  "quiet": (f"{L}/social/quiet/index.html#2026-10-19", {"wait": 4500}),
  "app": (f"{L}/app-design/index.html", {"scroll": 700}),
  "app-p2": (f"{L}/app-design/index.html", {"scroll": 2200}),
  "app-p3": (f"{L}/app-design/index.html", {"scroll": 3700}),
  "site": ("https://99names-site.vercel.app", {"wait": 7000}),
}
def free(port):
    with socket.socket() as s: return s.connect_ex(("127.0.0.1", port)) != 0
def main():
    want = sys.argv[1:] or list(SHOTS)
    server = None
    if free(PORT):
        server = subprocess.Popen([sys.executable, "-m", "http.server", str(PORT), "--bind", "127.0.0.1"], cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL); time.sleep(1)
    try:
        for name in want:
            url, o = SHOTS[name]; png = OUT / f"{name}.png"; jpg = OUT / f"{name}.jpg"
            args = ["node", str(HUB / "shot.mjs"), str(png), url, "--w", str(o.get("w", 1440)), "--h", str(o.get("h", 900)), "--wait", str(o.get("wait", 3500))]
            if o.get("scroll"): args += ["--scroll", str(o["scroll"])]
            r = subprocess.run(args, capture_output=True, text=True); print(f"  {name:12} {r.stdout.strip()[:90]}")
            if png.exists():
                subprocess.run(["sips", "-s", "format", "jpeg", "-s", "formatOptions", "82", "--resampleWidth", "720", str(png), "--out", str(jpg)], capture_output=True); png.unlink()
    finally:
        if server: server.terminate()
if __name__ == "__main__": main()
