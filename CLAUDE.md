# 99names hub · The World of Noor

This repo is the brand hub for 99names (the 99 Names of Allah, one a week), served at
**brand.99names.net** behind a simple gate (`middleware.js`). Pushing to `main` deploys to
production through Vercel's GitHub integration (Vercel team `muslim-made`, project `99names-brand`).
No build step: plain HTML, CSS and JS served as they are. The website lives in the separate
repo `Muslim-Made/99names-website` (noor.99names.net, later 99names.net).

## The brand (keep every change inside it)

- Direction **Noor**: "Light, by name." Six hour palettes, fajr → isha (tokens in
  `social/thirty/thirty.css`). Fraunces + DM Sans + Scheherazade New (Arabic).
- The mark is a ring of **exactly 99 rays with nothing in the centre**. No crescents, no lanterns,
  no black or gold foil, no faces or AI people.
- Voice: gentle, present tense, no urgency, no streaks, no guilt. Placeholder people are Amaar
  (from) and Nayla (to).
- Credit line: Brandium Lab. Never "Bloom Brands".

## Social: the plan in use is the Quiet Months

`social/quiet/`, Monday 5 October to Sunday 13 December 2026: four posts a week (Monday name
carousel 06:30 WAT, Wednesday reel 19:00, Friday Jumu'ah carousel 11:00, Sunday set 16:00) and
stories six days a week. `social/thirty/` (the First Thirty) is **archived**; don't extend it.

- `data.js` holds everything (posts, stories, captions, alt text). Weekly names must match the
  site's rotation (`weeklyIndex` in the website repo: 42 Al-Karim on 19 Oct …).
- **Rule: no text ever sits on a drawn thing** (rays, cards, dots, envelope). `check.mjs` proves it
  pixel by pixel, plus Instagram safe zones (stories 250px top / 340px bottom; reels x 84–936,
  y 250–1500), a 22px type floor and contrast.
- Verses come from api.alquran.cloud (`quran-uthmani`), never typed from memory. Hadith carry a
  collection and number that has been checked on sunnah.com.
- Five hashtags at most. Captions open with the searchable phrase and end with a reason to send
  the post to one person.
- After changing `data.js`: `node check.mjs` → `python3 contact.py` → (`node reels.mjs <date>` if
  a reel changed) → `node schedule.mjs`, then commit. `out/media/` is what Metricool publishes from
  (the one path `middleware.js` leaves open); `out/metricool-NN.csv` are the import files.
- These scripts need Google Chrome (headless, via CDP), Python with Pillow and numpy, and ffmpeg.
  `check.mjs` and `reels.mjs` look for Chrome at the macOS path; on another machine, point them
  at the local Chrome or Chromium binary first.

## Hub mechanics

- New pages get a card in `index.html` and the return link (`python3 hub/passage.py`).
- Card plates: `python3 hub/thumbs.py <name>` (headless Chrome).
- `.vercelignore` keeps generated check exports and reel frames out of the deploy;
  `.gitignore` keeps them out of the repo.
