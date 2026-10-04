#!/usr/bin/env node
/* ============================================================
   99NAMES SOCIAL — _generate.js
   Emits the 30 post templates as standalone, hand-editable HTML.
   Run `node _generate.js` from social/ to regenerate all of them
   (it will overwrite — edit posts in place OR edit the specs here,
   not both).
   ============================================================ */
const fs = require("fs");
const path = require("path");

/* pull the 99 from the kit (generated from site/lib/names.ts) */
const g = {};
new Function("window", fs.readFileSync(path.join(__dirname, "kit/names.js"), "utf8"))(g);
const NAMES = g.NAMES99, arNum = g.arNum, hourForName = g.hourForName;
const N = (n) => NAMES[n - 1];

const CHROME_TOP = (label) => `
    <div class="k-top">
      <span class="k-brand"><span class="mark99" data-size="52"></span>99names</span>
      <span class="k-label k-label--sm" data-edit>${label}</span>
    </div>`;
const CHROME_FOOT = `
    <div class="k-foot">
      <b data-fact="url"></b>
      <span data-fact="tagline"></span>
      <span data-fact="handle"></span>
    </div>`;

/* miniature deck card, filled live when the template uses a name */
const CARD = (n, w = 620, live = true) => {
  const h = hourForName(n.n);
  return `
      <div class="k-card k-card--${h}" ${live ? "data-hour-from-name" : ""} style="width:${w}px;aspect-ratio:5/7;margin:0 auto">
        <span class="rays99" data-r1="105" data-r2="200" data-w="1.4" style="inset:-30%;width:160%;height:160%;opacity:.25"></span>
        <div class="k-card-top"><span>99names</span><span>No. <span ${live ? 'data-n="nn"' : ""}>${String(n.n).padStart(2, "0")}</span></span></div>
        <div class="k-card-mid">
          <div class="k-ar" ${live ? 'data-n="ar"' : ""} style="font-size:${w * 0.21}px">${n.ar}</div>
          <div class="k-disp" ${live ? 'data-n="en"' : ""} style="font-style:italic;font-size:${w * 0.085}px;margin-top:10px">${n.en}</div>
          <div class="k-label k-label--sm" ${live ? 'data-n="tr"' : ""} style="margin-top:22px">${n.tr}</div>
        </div>
        <div class="k-card-top"><span ${live ? 'data-n="hour"' : ""}>${h}</span><span ${live ? 'data-n="arnum"' : ""}>${arNum(n.n)}</span></div>
      </div>`;
};

const wrap = (num, slug, title, { size = "feed", hour = "fajr", nameTemplate = false, body, label = "The 99 Names", foot = true, chrome = true, cover = false }) => `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<link rel="stylesheet" href="kit/kit.css">
</head>
<body data-name="99names-${num}-${slug}"${nameTemplate ? " data-name-template" : ""}>
<div class="stage"><div class="stage-inner">
  <div class="canvas canvas--${size}${cover ? " k-cover" : " pad"}" data-hour="${hour}"${nameTemplate ? " data-hour-from-name" : ""}>
${chrome ? CHROME_TOP(label) : ""}
${body}
${foot ? CHROME_FOOT : ""}
  </div>
</div></div>
<script src="kit/names.js"></script>
<script src="kit/kit.js"></script>
</body></html>
`;

const nur = N(93), rahman = N(1), salam = N(5), latif = N(30), wadud = N(47), sabur = N(99);

const POSTS = [
  /* ---------------- brand ---------------- */
  ["01", "launch", {
    hour: "fajr", label: "A beginning",
    body: `
    <div class="v-center center gap-md">
      <span class="rays99 rays99--halo" data-r1="120" data-r2="200" data-w="1.2"></span>
      <span class="mark99" data-size="180"></span>
      <h1 class="k-disp" style="font-size:150px" data-edit>Light, <em>by name.</em></h1>
      <p class="k-body" style="max-width:640px" data-edit>The 99 Names of Allah — one a week, dawn to night. Cards, an app, and a quiet place to remember.</p>
    </div>`,
  }],
  ["02", "the-mark", {
    hour: "isha", label: "The mark",
    body: `
    <div class="v-center center gap-md">
      <span class="rays99 rays99--halo" data-r1="130" data-r2="198" data-w="1.6" style="opacity:.45"></span>
      <h1 class="k-disp k-h1" data-edit>Ninety-nine <em>rays.</em></h1>
      <p class="k-body" style="max-width:620px" data-edit>Our mark has exactly 99 rays. One for every name. Count them — we'll wait.</p>
    </div>`,
  }],

  /* ---------------- name templates (the workhorses) ---------------- */
  ["03", "name-of-the-week", {
    nameTemplate: true, hour: hourForName(nur.n), label: "This week",
    body: `
    <div class="v-center center gap-sm">
      <span class="rays99 rays99--halo" data-r1="128" data-r2="200" data-w="1.2"></span>
      <p class="k-label" data-edit>No. <span data-n="nn">${String(nur.n).padStart(2, "0")}</span> of 99</p>
      <div class="k-ar" data-n="ar" style="font-size:330px;line-height:1.2">${nur.ar}</div>
      <h1 class="k-disp" data-n="en" style="font-size:110px;font-style:italic">${nur.en}</h1>
      <p class="k-label" data-n="tr" style="margin-top:14px">${nur.tr}</p>
      <p class="k-body" data-n="line" style="max-width:760px;margin-top:26px" data-edit>${nur.line}</p>
    </div>`,
  }],
  ["04", "name-card", {
    nameTemplate: true, hour: hourForName(rahman.n), label: "One of ninety-nine",
    body: `
    <div class="v-center">
      ${CARD(rahman, 640)}
    </div>`,
  }],
  ["05", "name-reflection", {
    nameTemplate: true, hour: hourForName(latif.n), label: "Sit with this",
    body: `
    <div class="v-center gap-md">
      <div class="k-disp" data-n="line" style="font-size:96px;font-style:italic;max-width:860px" data-edit>${latif.line}</div>
      <div class="row gap-sm" style="margin-top:40px">
        <div class="k-ar" data-n="ar" style="font-size:76px">${latif.ar}</div>
        <div style="margin-right:auto"></div>
        <p class="k-label"><span data-n="tr">${latif.tr}</span> · <span data-n="en">${latif.en}</span></p>
      </div>
    </div>`,
  }],
  ["06", "name-meaning", {
    nameTemplate: true, hour: hourForName(wadud.n), label: "What it means",
    body: `
    <div class="v-center gap-md">
      <div class="row" style="justify-content:space-between;align-items:flex-end">
        <div>
          <p class="k-label" data-edit>No. <span data-n="nn">${String(wadud.n).padStart(2, "0")}</span> · <span data-n="tr">${wadud.tr}</span></p>
          <h1 class="k-disp" data-n="en" style="font-size:104px;margin-top:18px">${wadud.en}</h1>
        </div>
        <div class="k-ar" data-n="ar" style="font-size:130px">${wadud.ar}</div>
      </div>
      <div class="k-panel">
        <p class="k-body" data-n="meaning" data-edit>${wadud.meaning}</p>
      </div>
      <p class="k-note" data-edit>Root · <span class="k-ar" style="font-size:30px" data-n="root">${wadud.root}</span></p>
    </div>`,
  }],

  /* ---------------- the system ---------------- */
  ["07", "dawn-to-night", {
    hour: "fajr", label: "The whole day",
    body: `
    <div class="v-center gap-md">
      <h1 class="k-disp" style="font-size:96px" data-edit>Dawn <em>to night.</em></h1>
      <p class="k-body" data-edit>The 99 run from Ar-Rahman at Fajr to As-Sabur at Isha. Every name has its hour.</p>
      <div class="k-bands">
        <div class="k-band k-band--fajr"><span class="k-label">Fajr · 1–17</span><span class="k-ar">${rahman.ar}</span></div>
        <div class="k-band k-band--morning"><span class="k-label">Morning · 18–34</span><span class="k-ar">${N(19).ar}</span></div>
        <div class="k-band k-band--dhuhr"><span class="k-label">Dhuhr · 35–50</span><span class="k-ar">${N(47).ar}</span></div>
        <div class="k-band k-band--asr"><span class="k-label">Asr · 51–66</span><span class="k-ar">${N(62).ar}</span></div>
        <div class="k-band k-band--maghrib"><span class="k-label">Maghrib · 67–82</span><span class="k-ar">${N(80).ar}</span></div>
        <div class="k-band k-band--isha"><span class="k-label">Isha · 83–99</span><span class="k-ar">${nur.ar}</span></div>
      </div>
    </div>`,
  }],
  ["08", "one-a-week", {
    hour: "morning", label: "The pace",
    body: `
    <div class="v-center center gap-md">
      <h1 class="k-disp" style="font-size:170px" data-edit>One<br><em>a week.</em></h1>
      <p class="k-body" style="max-width:640px" data-edit>At that pace you'll know all 99 in under two years. Slower is fine. This isn't a race.</p>
    </div>`,
  }],
  ["09", "quran-ayah", {
    hour: "isha", label: "Al-A'raf · 7:180",
    body: `
    <div class="v-center center gap-md">
      <span class="rays99 rays99--halo" data-r1="130" data-r2="200" data-w="1.1"></span>
      <div class="k-nasta" style="font-size:92px;max-width:880px" data-edit>وَلِلَّهِ الْأَسْمَاءُ الْحُسْنَىٰ فَادْعُوهُ بِهَا</div>
      <p class="k-body" style="max-width:700px;margin-top:30px" data-edit>"And to Allah belong the best names, so invoke Him by them."</p>
    </div>`,
  }],
  ["10", "hadith", {
    hour: "fajr", label: "The promise",
    body: `
    <div class="v-center gap-md">
      <div class="k-disp" style="font-size:76px;line-height:1.15" data-edit>"Allah has ninety-nine names. Whoever <em>preserves them</em> enters Paradise."</div>
      <p class="k-label" data-edit>Sahih al-Bukhari &amp; Muslim</p>
      <p class="k-body" data-edit>Not memorises — preserves. Knows them, lives beside them, calls with them.</p>
    </div>`,
  }],
  ["11", "how-it-works", {
    hour: "dhuhr", label: "How it works",
    body: `
    <div class="v-center gap-md">
      <h1 class="k-disp" style="font-size:100px" data-edit>Slowly, <em>then surely.</em></h1>
      <div class="col gap-sm">
        <div class="k-panel row gap-md"><span class="k-disp" style="font-size:60px;opacity:.5">01</span><p class="k-body" data-edit><b>Meet one name a week.</b> Read it, hear it, sit with it.</p></div>
        <div class="k-panel row gap-md"><span class="k-disp" style="font-size:60px;opacity:.5">02</span><p class="k-body" data-edit><b>Keep it near.</b> A card on the nightstand. A breath at its hour.</p></div>
        <div class="k-panel row gap-md"><span class="k-disp" style="font-size:60px;opacity:.5">03</span><p class="k-body" data-edit><b>Send it on.</b> Someone you love needs this week's name too.</p></div>
      </div>
    </div>`,
  }],

  /* ---------------- product ---------------- */
  ["12", "the-deck", {
    hour: "maghrib", label: "The Deck",
    body: `
    <div class="v-center center gap-md">
      <div style="position:relative;height:760px;width:100%">
        <div style="position:absolute;left:50%;top:50%;transform:translate(-78%,-46%) rotate(-9deg)">${CARD(rahman, 430, false)}</div>
        <div style="position:absolute;left:50%;top:50%;transform:translate(-22%,-54%) rotate(8deg)">${CARD(nur, 430, false)}</div>
        <div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)">${CARD(wadud, 460, false)}</div>
      </div>
      <h1 class="k-disp" style="font-size:96px" data-edit>Ninety-nine, <em>in your hand.</em></h1>
      <p class="k-body" data-edit><span data-fact="deckLine"></span> <b data-fact="deckPrice"></b> · ships worldwide.</p>
    </div>`,
  }],
  ["13", "deck-detail", {
    size: "square", hour: "morning", label: "The Deck",
    body: `
    <div class="v-center row gap-lg" style="flex-direction:row;align-items:center">
      ${CARD(salam, 480, false)}
      <div class="col gap-sm" style="flex:1">
        <h1 class="k-disp" style="font-size:84px" data-edit>Soft-touch.<br><em>All 99.</em></h1>
        <p class="k-body" data-edit>Dawn-tinted to night-tinted, numbered and rooted. Keep one out where you'll see it.</p>
        <span class="k-pill" style="align-self:flex-start;margin-top:20px" data-edit>The Deck · <span data-fact="deckPrice"></span></span>
      </div>
    </div>`,
  }],
  ["14", "send-a-name", {
    hour: "fajr", label: "Send a name",
    body: `
    <div class="v-center center gap-md">
      <h1 class="k-disp" style="font-size:104px" data-edit>For whoever<br><em>needs it this week.</em></h1>
      <div style="transform:rotate(-4deg)">${CARD(salam, 460, false)}</div>
      <p class="k-body" style="max-width:680px" data-edit>Pick a name. Write who it's for. Send a link — or a real card in the post.</p>
    </div>`,
  }],
  ["15", "remember", {
    hour: "asr", label: "Remember",
    body: `
    <div class="v-center center gap-md">
      <p class="k-label" data-edit>Do you remember this one?</p>
      <div class="k-ar" style="font-size:250px;line-height:1.25" data-edit>${N(62).ar}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;width:100%;max-width:780px">
        <div class="k-panel center" style="padding:32px"><span class="k-disp" style="font-size:40px" data-edit>The Generous</span></div>
        <div class="k-panel center" style="padding:32px;background:var(--fg);color:var(--g2)"><span class="k-disp" style="font-size:40px" data-edit>The Ever-Living</span></div>
        <div class="k-panel center" style="padding:32px"><span class="k-disp" style="font-size:40px" data-edit>The Opener</span></div>
        <div class="k-panel center" style="padding:32px"><span class="k-disp" style="font-size:40px" data-edit>The Light</span></div>
      </div>
      <p class="k-note" data-edit>A quiet ten-question round, no timer, no shame. Link in bio.</p>
    </div>`,
  }],
  ["16", "the-app", {
    hour: "isha", label: "The app",
    body: `
    <div class="v-center row gap-lg" style="flex-direction:row;align-items:center">
      <div class="col gap-sm" style="flex:1">
        <h1 class="k-disp" style="font-size:92px" data-edit>It knows<br>what <em>time it is.</em></h1>
        <p class="k-body" data-edit>Blush at Fajr. Navy at Isha. One name on the screen, one breath to take it in.</p>
      </div>
      <div style="width:400px;height:830px;border-radius:64px;background:#fff;padding:12px;box-shadow:0 70px 130px -50px rgba(0,0,0,.6)">
        <div style="height:100%;border-radius:54px;background:linear-gradient(165deg,#F6DCCF,#EFD9B8 40%,#CFD9C4 75%,#C9DBE6);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;color:#2A2622">
          <span class="k-label k-label--sm" style="color:inherit;opacity:.7" data-edit>Fajr · No. 01</span>
          <span class="k-ar" style="font-size:110px">${rahman.ar}</span>
          <span class="k-disp" style="font-size:40px;font-style:italic">${rahman.en}</span>
          <span style="width:26px;height:26px;border-radius:50%;background:#E8A64B;margin-top:26px"></span>
        </div>
      </div>
    </div>`,
  }],
  ["17", "no-streaks", {
    hour: "morning", label: "A gentler app",
    body: `
    <div class="v-center gap-sm">
      <h1 class="k-disp" style="font-size:130px" data-edit>No streaks.<br>No badges.<br><em>No guilt.</em></h1>
      <p class="k-body" style="max-width:700px;margin-top:30px" data-edit>Miss a day and nothing breaks. The name is still there, still yours, still patient — like the One it points to.</p>
    </div>`,
  }],
  ["18", "testimonial", {
    hour: "dhuhr", label: "From a reader",
    body: `
    <div class="v-center gap-md">
      <div class="k-disp" style="font-size:80px;font-style:italic;line-height:1.15" data-edit>"I put Al-Latif on my desk on a Monday. By Friday my sister asked for her own."</div>
      <p class="k-label" data-edit>— Amina · Abuja</p>
    </div>`,
  }],

  /* ---------------- carousel ---------------- */
  ["19", "carousel-cover", {
    nameTemplate: true, hour: hourForName(sabur.n), label: "This week · swipe",
    body: `
    <div class="v-center center gap-sm">
      <span class="rays99 rays99--halo" data-r1="128" data-r2="200" data-w="1.2"></span>
      <p class="k-label" data-edit>The name of the week</p>
      <div class="k-ar" data-n="ar" style="font-size:300px;line-height:1.25">${sabur.ar}</div>
      <h1 class="k-disp" data-n="en" style="font-size:100px;font-style:italic">${sabur.en}</h1>
      <p class="k-label" style="margin-top:40px" data-edit>swipe →</p>
    </div>`,
  }],
  ["20", "carousel-meaning", {
    nameTemplate: true, hour: hourForName(sabur.n), label: "This week · 2 of 3",
    body: `
    <div class="v-center gap-md">
      <div class="row" style="justify-content:space-between">
        <p class="k-label"><span data-n="tr">${sabur.tr}</span> · No. <span data-n="nn">99</span></p>
        <div class="k-ar" data-n="ar" style="font-size:84px">${sabur.ar}</div>
      </div>
      <div class="k-panel" style="padding:64px">
        <p class="k-body" style="font-size:38px" data-n="meaning" data-edit>${sabur.meaning}</p>
      </div>
      <div class="k-disp" data-n="line" style="font-size:64px;font-style:italic" data-edit>${sabur.line}</div>
    </div>`,
  }],
  ["21", "carousel-cta", {
    hour: "fajr", label: "This week · keep it",
    body: `
    <div class="v-center center gap-md">
      <span class="mark99" data-size="140"></span>
      <h1 class="k-disp" style="font-size:110px" data-edit>Keep it.<br><em>Send it on.</em></h1>
      <p class="k-body" style="max-width:640px" data-edit>Hear it recited, read the root, send it to whoever needs it — all at the link in bio.</p>
      <div class="row gap-sm" style="margin-top:16px">
        <span class="k-pill" data-edit>Read this name</span>
        <span class="k-pill k-pill--o" data-edit>Send a name</span>
      </div>
    </div>`,
  }],

  /* ---------------- moments ---------------- */
  ["22", "jumuah", {
    hour: "maghrib", label: "Friday",
    body: `
    <div class="v-center center gap-md">
      <span class="rays99 rays99--halo" data-r1="126" data-r2="200" data-w="1.3" style="opacity:.35"></span>
      <div class="k-nasta" style="font-size:120px" data-edit>جمعة مباركة</div>
      <h1 class="k-disp" style="font-size:88px" data-edit>Jumu'ah <em>Mubarak.</em></h1>
      <p class="k-body" style="max-width:640px" data-edit>An hour of this day holds an answer. Ask by His names.</p>
    </div>`,
  }],
  ["23", "ramadan", {
    hour: "isha", label: "Coming",
    body: `
    <div class="v-center center gap-md">
      <span class="rays99 rays99--halo" data-r1="130" data-r2="200" data-w="1.1"></span>
      <p class="k-label" data-edit>Ramadan Edition</p>
      <h1 class="k-disp" style="font-size:120px" data-edit>Thirty nights,<br><em>thirty names.</em></h1>
      <p class="k-body" style="max-width:660px" data-edit>A night-tinted set for the month of mercy. Joining the shop before the moon does.</p>
    </div>`,
  }],
  ["24", "names-wall", {
    hour: "fajr", label: "All of them",
    body: `
    <div class="v-center gap-md">
      <div class="k-ar" style="font-size:44px;line-height:2.1;text-align:center;color:var(--fg2)">
        ${NAMES.map((n) => `<span style="margin:0 14px;white-space:nowrap">${n.ar}</span>`).join("\n        ")}
      </div>
      <p class="k-label" style="text-align:center" data-edit>Ninety-nine. How many do you know?</p>
    </div>`,
  }],
  ["25", "quote-peace", {
    hour: "asr", label: "As-Salam",
    body: `
    <div class="v-center center gap-md">
      <div class="k-ar" style="font-size:170px" data-edit>${salam.ar}</div>
      <div class="k-disp" style="font-size:110px;font-style:italic;max-width:860px" data-edit>Peace isn't found.<br>It's given.</div>
      <p class="k-label" style="margin-top:20px" data-edit>As-Salam · The Source of Peace</p>
    </div>`,
  }],
  ["26", "question", {
    size: "square", hour: "morning", label: "Tell us",
    body: `
    <div class="v-center center gap-md">
      <h1 class="k-disp" style="font-size:104px" data-edit>Which name do you<br><em>return to?</em></h1>
      <p class="k-body" style="max-width:640px" data-edit>The one you reach for when the day is heavy. Tell us in the comments — someone below you needs it.</p>
    </div>`,
  }],

  /* ---------------- stories ---------------- */
  ["27", "story-name", {
    size: "story", nameTemplate: true, hour: hourForName(nur.n), label: "This week",
    body: `
    <div class="v-center center gap-sm">
      <span class="rays99 rays99--halo" data-r1="128" data-r2="200" data-w="1.2"></span>
      <p class="k-label" data-edit>No. <span data-n="nn">93</span> of 99</p>
      <div class="k-ar" data-n="ar" style="font-size:340px;line-height:1.25">${nur.ar}</div>
      <h1 class="k-disp" data-n="en" style="font-size:110px;font-style:italic">${nur.en}</h1>
      <p class="k-label" data-n="tr" style="margin-top:16px">${nur.tr}</p>
      <p class="k-body" data-n="line" style="max-width:760px;margin-top:40px" data-edit>${nur.line}</p>
      <span class="k-pill" style="margin-top:70px" data-edit>Hear it · link up here ↑</span>
    </div>`,
  }],
  ["28", "story-breath", {
    size: "story", hour: "isha", label: "Tonight",
    body: `
    <div class="v-center center gap-lg">
      <p class="k-label" data-edit>Before you sleep</p>
      <span class="k-breath" style="width:130px;height:130px;box-shadow:0 0 130px 30px rgba(232,166,75,.4)"></span>
      <h1 class="k-disp" style="font-size:110px" data-edit>One breath.<br><em>One name.</em></h1>
      <p class="k-body" style="max-width:640px" data-edit>In for four. Out for four. As-Sabur — the Infinitely Patient — is not in a hurry with you.</p>
    </div>`,
  }],
  ["29", "story-quiz", {
    size: "story", hour: "fajr", label: "Quick one",
    body: `
    <div class="v-center center gap-md">
      <p class="k-label" data-edit>Do you know this one?</p>
      <div class="k-ar" style="font-size:330px;line-height:1.3" data-edit>${wadud.ar}</div>
      <div class="k-panel center" style="width:100%;max-width:720px;padding:120px 56px">
        <p class="k-note" data-edit>· poll sticker goes here ·</p>
      </div>
      <p class="k-body" data-edit>Answer drops in tomorrow's story.</p>
    </div>`,
  }],
  ["30", "highlight-cover", {
    size: "square", hour: "isha", chrome: false, foot: false,
    body: `
    <div class="v-center center">
      <span class="rays99 rays99--halo" data-r1="118" data-r2="200" data-w="1.4" style="opacity:.3"></span>
      <span class="mark99" data-size="360"></span>
    </div>`,
  }],

  /* ---------------- the profile: picture + highlight covers ----------------
     Instagram crops each to a circle. The rim is the mark enlarged until only
     its inner edge shows; the centre holds one thing, big enough to read at
     77px. Night objects on light skies, dawn objects on night skies. */
  ["31", "profile-picture", {
    size: "square", hour: "fajr", chrome: false, foot: false, cover: true,
    body: `
    <span class="mark99" data-size="760"></span>`,
  }],
  ["32", "highlight-start-here", {
    size: "square", hour: "fajr", chrome: false, foot: false, cover: true,
    body: `
    <span class="rays99 rays99--rim" data-r1="104" data-r2="192" data-w="2.4"></span>
    <div class="k-cov"><div class="k-glyph" style="font-size:600px" data-edit>99</div></div>`,
  }],
  ["33", "highlight-names", {
    size: "square", hour: "morning", chrome: false, foot: false, cover: true,
    body: `
    <span class="rays99 rays99--rim" data-r1="104" data-r2="192" data-w="2.4"></span>
    <div class="k-cov"><div class="k-ar" style="font-size:440px;line-height:1" data-edit>${nur.ar}</div></div>`,
  }],
  ["34", "highlight-hours", {
    size: "square", hour: "fajr", chrome: false, foot: false, cover: true,
    body: `
    <div class="k-cov-bands"><i class="k-band k-band--fajr"></i><i class="k-band k-band--morning"></i><i class="k-band k-band--dhuhr"></i><i class="k-band k-band--asr"></i><i class="k-band k-band--maghrib"></i><i class="k-band k-band--isha"></i></div>`,
  }],
  ["35", "highlight-deck", {
    size: "square", hour: "isha", chrome: false, foot: false, cover: true,
    body: `
    <span class="rays99 rays99--rim" data-r1="104" data-r2="192" data-w="2.4"></span>
    <div class="k-cov"><div class="k-cov-deck">
      <div class="k-cov-card k-card--morning k-cov-shadow" style="transform:rotate(11deg) translate(72px,-4px)"></div>
      <div class="k-cov-card k-card--fajr k-cov-shadow" style="transform:rotate(-8deg) translate(-44px,16px)"><span class="k-ar">٩٩</span></div>
    </div></div>`,
  }],
  ["36", "highlight-send", {
    size: "square", hour: "fajr", chrome: false, foot: false, cover: true,
    body: `
    <span class="rays99 rays99--rim" data-r1="104" data-r2="192" data-w="2.4"></span>
    <div class="k-cov"><div class="k-cov-env k-night k-cov-shadow"><svg viewBox="0 0 480 330" aria-hidden="true"><path d="M-4 8 L240 196 L484 8" fill="none" stroke="#F4EEE4" stroke-width="13" stroke-linejoin="round" stroke-linecap="round" opacity=".9"/></svg></div></div>`,
  }],
  ["37", "highlight-shop", {
    size: "square", hour: "morning", chrome: false, foot: false, cover: true,
    body: `
    <span class="rays99 rays99--rim" data-r1="104" data-r2="192" data-w="2.4"></span>
    <div class="k-cov"><div class="k-cov-box k-night k-cov-shadow"><span class="mark99" data-size="300"></span></div></div>`,
  }],
  ["38", "highlight-app", {
    size: "square", hour: "isha", chrome: false, foot: false, cover: true,
    body: `
    <span class="rays99 rays99--rim" data-r1="104" data-r2="192" data-w="2.4"></span>
    <div class="k-cov"><div class="k-cov-phone k-cov-shadow"><div class="screen"><span class="k-ar">${nur.ar}</span><span class="k-breath" style="width:34px;height:34px"></span></div></div></div>`,
  }],
  ["39", "highlight-remember", {
    size: "square", hour: "asr", chrome: false, foot: false, cover: true,
    body: `
    <span class="rays99 rays99--rim" data-r1="104" data-r2="192" data-w="2.4"></span>
    <div class="k-cov"><div class="k-glyph" style="font-size:720px" data-edit>?</div></div>`,
  }],
  ["40", "highlight-breathe", {
    size: "square", hour: "isha", chrome: false, foot: false, cover: true,
    body: `
    <span class="rays99 rays99--rim" data-r1="104" data-r2="192" data-w="2.4"></span>
    <div class="k-cov"><span class="k-cov-sun"></span></div>`,
  }],
  ["41", "highlight-jumuah", {
    size: "square", hour: "maghrib", chrome: false, foot: false, cover: true,
    body: `
    <span class="rays99 rays99--rim" data-r1="104" data-r2="192" data-w="2.4"></span>
    <div class="k-cov"><div class="k-nasta" style="font-size:360px;line-height:1.3" data-edit>جمعة</div></div>`,
  }],
  ["42", "highlight-readers", {
    size: "square", hour: "dhuhr", chrome: false, foot: false, cover: true,
    body: `
    <span class="rays99 rays99--rim" data-r1="104" data-r2="192" data-w="2.4"></span>
    <div class="k-cov"><div class="k-glyph" style="font-size:900px;transform:translateY(22%)" data-edit>“</div></div>`,
  }],
  ["43", "highlight-ramadan", {
    size: "square", hour: "isha", chrome: false, foot: false, cover: true,
    body: `
    <span class="rays99 rays99--rim" data-r1="104" data-r2="192" data-w="2.4"></span>
    <div class="k-cov"><div class="k-nasta" style="font-size:320px;line-height:1.3" data-edit>رمضان</div></div>`,
  }],
];

let made = 0;
for (const [num, slug, spec] of POSTS) {
  const file = path.join(__dirname, `${num}-${slug}.html`);
  fs.writeFileSync(file, wrap(num, slug, `99names social ${num} — ${slug}`, spec));
  made++;
}
console.log(`wrote ${made} posts`);
