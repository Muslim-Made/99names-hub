# 99names — social kit

**The First Thirty** (`thirty/`) is the launch month, finished: 14 September
to 13 October 2026, one day at a time. Open `thirty/index.html`, pick the
date, download the post, copy the caption, post. See `thirty/README.md`.
The templates below are for every week after.

30 Instagram templates as plain HTML. No build step, no design app —
open a file in your browser and it's the canvas.

## Use

Open `index.html` for the gallery, or any numbered post directly.
Each post has a toolbar at the bottom:

- **click any text** to edit it in place
- **hour dots** — re-tint the whole post with any of the six prayer-time
  palettes (fajr → isha), same gradients as the site and the deck
- **name dropdown** (on posts badged *name* in the gallery) — pick any of
  the 99; the Arabic, English, transliteration, number, reflection line and
  the post's palette all refill. You can also load `03-name-of-the-week.html?n=47`.
  With no `?n=`, name posts default to **the current week's name** —
  the same weekly rotation as the site.
- **png** — downloads the post at exact size (feed 1080×1350,
  square 1080×1080, story 1080×1920). Needs internet for the fonts and a
  visible browser window.

Captions for every post live in `captions.md`.

## The profile

Templates 31–43 are not posts: **31 is the profile picture** and **32–43 are
twelve highlight covers** (Start here, Names, Hours, The Deck, Send, Shop,
App, Remember, Breathe, Jumu'ah, Readers, Ramadan). Instagram crops each
to a circle; on screen the corners are dimmed to show that crop, the export
is the full 1080×1080 square and Instagram does the cropping. The rim on
every cover is the mark enlarged until only its inner edge shows; one thing
sits in the middle, sized to read at 77px. Night objects on light skies,
dawn objects on night skies.

**Ready to upload: `covers/`.** One PNG per cover, the profile picture at
dawn and at night, and `contact-sheet.png` showing the profile as Instagram
draws it. To re-tint a cover or change its glyph, open the template, use the
dots, click the glyph, hit **png**.

## Files

- `NN-slug.html` — the 30 posts and the 13 profile pieces, standalone and hand-editable
- `covers/` — the profile picture and highlight covers as finished PNGs
- `kit/kit.css` — palettes, type, components (shared by all posts)
- `kit/kit.js` — facts, name filling, toolbar, PNG export
- `kit/names.js` — the 99 names, generated from `site/lib/names.ts`
- `_generate.js` — wrote the 43 pages; `node _generate.js` regenerates
  them **overwriting local edits**, so edit posts in place *or* edit the
  specs in the generator, not both

## One place for facts

Handle, URL, tagline and deck price live in `window.FACTS` at the top of
`kit/kit.js`. Change them there and every post updates.
