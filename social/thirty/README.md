# The First Thirty

Thirty days of finished social content for 99names, Monday 14 September to
Tuesday 13 October 2026, one day at a time. Open `index.html`, pick the date,
and the post for that day is drawn at exact size in the kit's own canvases
with its caption, its stories, its posting time and, on Wednesdays, its reel.
Download, copy the caption, post.

## The idea

The month is one day. Five posts at each hour, fajr to isha, in the brand's
six palettes, so the profile grid after day thirty reads as one sky: night at
the top, dawn at the bottom. Name of the week lands every Monday at dawn and
matches the site's rotation (37 Al-Kabir, 38 Al-Hafiz, 39 Al-Muqit,
40 Al-Hasib, 41 Al-Jalil). Jumu'ah every Friday at 11:00 WAT. Every caption
ends with a reason to send it to one person, because sends per reach is the
signal Instagram ranks on and because sending a name is the product.

## Files

- `index.html` · the page: a day picker grouped by hour, previous / next, Today,
  `#day-NN` deep links, the grid preview, the month at a glance
- `data.js` · the month: every sheet, story, reel script and caption. Edit here.
- `thirty.js` · draws the sheets (15 feed kinds, 7 slide kinds, 8 story kinds)
  and exports PNGs through html-to-image; carousels and story sets zip
- `thirty.css` · the canvas grammar and the page. Maghrib is an ember here, not
  a sun, so sand type clears 4.5:1 everywhere; the sun sits at the foot where
  nothing is written
- `fonts.css` · Fraunces, DM Sans, Scheherazade New embedded, so an export
  never waits on the network
- `reel.html` + `reels.mjs` + `audio.py` · the four reels, frame by frame
  through headless Chrome, sound from the site's own hour chords, joined by
  ffmpeg into `reels/day-NN.mp4`
- `check.mjs` · the safety net; `contact.py` · contact sheets from its exports

## Checking

```
node check.mjs                 # DOM + contrast + export to _check/export
python3 contact.py             # grid.jpg, posts.jpg, stories.jpg, carousel-*.jpg
node reels.mjs                 # the four reels (about a minute each)
```

`check.mjs` opens the page in headless Chrome over CDP (no npm), walks the
thirty days and reads each sheet back: fonts resolved, nothing outside its
sheet, no headline wrapped past its written breaks, nothing under 18px, no
overlapping blocks, no wall name wider than its cell. Then the contrast test:
every text element is hidden, the sheet is rasterised, and the pixels under
each text box are sampled cell by cell against the text colour. 4.5:1
everywhere, 3:1 from 32px up. Then every sheet is exported exactly as the
download button exports it, so what is reviewed is what gets posted. Never
trust the hidden Browser pane for this.

## Two things to do before posting

1. Four story kinds draw a poll, a question box or quiz options; place the real
   Instagram sticker over the drawing. The sticker text is on the day's page.
2. Add the link sticker to any story that shows a link pill.

Brandium Lab, 2026.
