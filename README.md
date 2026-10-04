# 99names — Noor, the world

The Noor identity built out as working files, behind its own door. No build
step: every page is plain HTML. Deploys as the Vercel project `99names-brand`
(brand.99names.net).

## Structure

```
index.html            The World: the hub. Five rooms (Directions, World, Kit, App,
                      Site), the sky behind the title tinted to the hour, a hour dial
                      in the bar, the ledger, colour tokens that copy on click, and a
                      ⌘K palette that finds anything including any of the 30 posts.
gate.html             The Threshold: the login. Name `99names`, key `noor`. Ninety-nine
                      rays rise out of the horizon; the right key floods the light.
middleware.js         Vercel Edge Middleware. Cookie session (HMAC signed, 30 days).
                      GET /gate, POST /gate, /leave. Runs nowhere locally.
hub/                  hub.css · hub.js · view.html + view.js (the Passage, one work
                      inside the world's chrome) · back.js (the return on every page)
                      · passage.py (injects it) · thumbs.py + shot.mjs (card plates)
directions/           the three directions and their index (23 Aug 2026)
world/index.html      Noor, the full world
logo/                 SVG + PNG masters, contact sheet; gen.mjs regenerates
social/               the 30 templates, kit/, captions.md + captions.html
social/thirty/        The First Thirty: the launch month, day by day, with reels
app-design/           the 20 phone screens (copy of ../app-design, the spec of record)
```

## Local

```bash
python3 -m http.server 8741        # from this folder; the threshold opens with any key
python3 hub/passage.py             # after adding pages
python3 hub/thumbs.py              # regenerate card plates (headless Chrome)
```

## Deploy

```bash
npx vercel --prod                  # project 99names-brand
```
