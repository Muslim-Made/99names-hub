# The Quiet Months

Two months of finished social content for 99names, Wednesday 14 October to
Sunday 13 December 2026: Jumada al-Ula and Jumada al-Akhirah 1448, ending as
Rajab opens sixty days before Ramadan. It follows the First Thirty and posts
**four times a week** instead of daily. Open `index.html`, click a day in the
calendar, and everything for that day is drawn at exact size: the post or the
reel, its caption and alt text, its stories, and which of them Metricool
publishes alone and which carry a sticker you add by hand. `playbook.html` is
the reasoning: what Instagram rewards in October 2026, which format to use
when, the safe zones, the week in three timezones, and the Metricool setup.

## The week

| Day | WAT | Palette | Post | Stories |
|---|---|---|---|---|
| Monday | 06:30 | Fajr | The name of the week, carousel, 6 slides | the name; a poll |
| Tuesday | | | | a quiz on last week's name |
| Wednesday | 19:00 | Maghrib | The reel, 18 to 26 s | a line; an emoji slider |
| Thursday | | | | a breath before sleep |
| Friday | 11:00 | Dhuhr | Jumu'ah, carousel, 3 slides | Jumu'ah Mubarak; the last hour at 15:00 |
| Sunday | 16:00 | Asr | A set of five names, carousel or dealt reel | a line; a link to Send-a-Name; at 20:00 a Reveal of next week's name |

Every post wears the hour it goes up at. Exceptions follow the calendar:
GivingTuesday moves the reel to Tuesday 1 December; the Thursday before Black
Friday carries the season's one single image ("Nothing is on sale"); 1 Rajab is
a story. In all: 35 posts (22 carousels, 12 reels, 1 single) and 96 stories
(52 auto, 44 with a sticker).

## The rule

**No word ever sits on a drawn thing.** Every sheet is a page of an almanac:
a running head, a body laid on a grid, a foot carrying the line of ninety-nine
(one dot per name, the ones met so far in ink, this week's lit). Rays, cards,
envelopes, dots and the hour dial each get a cell of their own.

## Files

- `data.js` · the season: weeks, days, posts, stories, captions, alt text. The
  four formats are builders (`theName`, `jumuah`, `set`, `deal`) so every week
  is built the same way. Edit here.
- `quiet.js` · draws the sheets in the almanac grammar, using the First
  Thirty's pieces (`window.NOOR` from `../thirty/thirty.js`), and runs the page
- `quiet.css` · the almanac grammar and the calendar; loads after `thirty.css`
- `check.mjs` · the safety net (below); `contact.py` · grid and contact sheets
- `reel.html` + `reels.mjs` + `audio.py` · the twelve reels, frame by frame
- `schedule.mjs` · JPEGs, reels and the Metricool CSVs into `out/`
- `playbook.html` · the research and the rules; `grid.jpg` is its grid preview

## Checking and building

```
node check.mjs                  # every sheet: DOM, safe zones, text-on-drawing, contrast; exports to _check/export
python3 contact.py              # _check/grid.jpg, carousels, stories.jpg, and grid.jpg for the playbook
node reels.mjs                  # the 12 reels into reels/ (about two minutes each); refuses any that fail
node schedule.mjs               # out/media (JPEG + MP4), out/metricool-NN.csv, out/manifest.json, out/metricool.zip
```

`check.mjs` adds three tests to the First Thirty's: every word in a story or
reel cover stays inside Instagram's bars (250px from the top, 340px from the
bottom); nothing meant to be read is under 22px; and the text-on-drawing test:
the sheet is rasterised twice with every word hidden, once as drawn and once
with every drawn thing hidden too, and under every line of free text the two
pictures must match. `reels.mjs` checks every fifth frame: each visible word
inside x 84–936, y 250–1500 and clear of every shape the frame declares.

## Metricool

Starter plan, Business account connected through Facebook, brand timezone
**Africa/Lagos**. Import `out/metricool-01.csv` onward (50 rows or fewer each).
Sticker stories come in as drafts at their minute: open, add the sticker the
planner names, share. Media are served from `/social/quiet/out/media/`, the
one path `middleware.js` leaves open so Metricool can fetch it. If Metricool's
own template header differs, `node schedule.mjs --template that.csv` fills by
column name. The Metricool MCP (`https://ai.metricool.com/mcp`) can drive the
same schedule from a Claude session.

Hijri dates follow Umm al-Qura and may differ by a day from local sighting.

Brandium Lab, 2026.
