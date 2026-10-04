/* ============================================================
   99NAMES · NOOR · THE FIRST THIRTY · thirty.js
   Pick a day, see the post, download it. Every sheet is drawn from
   data.js in the kit's canvas grammar at true size, scaled to fit,
   and exported as a PNG in the browser. The month is one day: five
   posts per hour, fajr to isha, so the feed reads as one sky.
   ============================================================ */
(function () {
  const F = window.THIRTY_FACTS || window.NOOR_FACTS, DAYS = window.THIRTY_DAYS, BANDS = window.THIRTY_BANDS;
  const NAMES = window.NAMES99, arNum = window.arNum, hourOf = window.hourForName;
  const N = (n) => NAMES[n - 1];
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (s) => String(s == null ? "" : s).replace(/&(?!#?\w+;)/g, "&amp;").replace(/</g, "&lt;");
  const START = new Date(2026, 8, 14); // Monday 14 September 2026, day one
  const DAYNAME = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const HOURNAME = { fajr: "Fajr", morning: "Morning", dhuhr: "Dhuhr", asr: "Asr", maghrib: "Maghrib", isha: "Isha" };

  /* ---------------------------------------------------------------- pieces */
  function raysSVG(r1, r2, w) {
    let l = "";
    for (let i = 0; i < 99; i++) {
      const a = (i / 99) * Math.PI * 2 - Math.PI / 2;
      l += `<line x1="${(200 + Math.cos(a) * r1).toFixed(1)}" y1="${(200 + Math.sin(a) * r1).toFixed(1)}" x2="${(200 + Math.cos(a) * r2).toFixed(1)}" y2="${(200 + Math.sin(a) * r2).toFixed(1)}"/>`;
    }
    return `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g stroke="currentColor" stroke-width="${w}" stroke-linecap="round" fill="none">${l}</g></svg>`;
  }
  const RING = (s, w) => `<span class="ring" style="width:${s}px;height:${s}px">${raysSVG(104, 192, w || 7)}</span>`;
  const HALO = (op, extra) => `<span class="halo" style="${op != null ? `opacity:${op};` : ""}${extra || ""}">${raysSVG(112, 198, 1.4)}</span>`;
  const ARROW = '<svg class="arr" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 12h17M14 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  const DOWN = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v17M5 13l7 7 7-7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  const SAVE = '<svg viewBox="0 0 24 24" style="width:56px;height:56px;fill:none;stroke:currentColor;stroke-width:1.4"><path d="M6 3h12v18l-6-4.5L6 21z"/></svg>';
  const SEND = '<svg viewBox="0 0 24 24" style="width:56px;height:56px;fill:none;stroke:currentColor;stroke-width:1.4"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg>';

  const ktop = (label) => `<div class="k-top"><span class="k-brand">${RING(52)}99names</span><span class="lbl">${esc(label || "")}</span></div>`;
  const kfoot = (c) => `<div class="k-foot"><b>${F.url}</b><span class="c">${esc(c == null ? F.tagline : c)}</span><span>${F.handle}</span></div>`;
  const nnum = (n) => String(n).padStart(2, "0");

  function card(n, w, opts) {
    const x = N(n), h = hourOf(n), o = opts || {};
    const arS = Math.round(w * 0.21), enS = Math.round(w * 0.078);
    return `<div class="card card--${h}" style="width:${w}px;${o.style || ""}">${HALO(null, "color:currentColor")}
      <div class="ct"><span>99names</span><span>No. ${nnum(n)}</span></div>
      <div class="cm"><div class="ar" style="font-size:${arS}px">${x.ar}</div><div class="en" style="font-size:${enS}px">${esc(x.en)}</div><div class="tr">${esc(x.tr)}</div></div>
      <div class="ct"><span>${HOURNAME[h]}</span><span>${arNum(n)}</span></div></div>`;
  }
  function envelope(n, to, state, w) {
    w = w || 760;
    return `<div class="env ${state || "open"}" style="width:${w}px"><div class="env-body"></div><div class="env-card">${card(n, Math.round(w * 0.47))}</div>
      <div class="env-pocket"><div class="env-to"><span>For</span><em>${esc(to)}</em></div><div class="env-stamp">${RING(60, 9)}</div></div><div class="env-flap"></div></div>`;
  }
  const PH = { fajr: ["#F6DCCF", "#EFD9B8", "#C9DBE6"], morning: ["#F4EEE4", "#F3E3C2", "#EFD9B8"], dhuhr: ["#F4EEE4", "#EFD9B8", "#F2CFC0"], asr: ["#EFD9B8", "#CFD9C4", "#A9BFA6"], maghrib: ["#8A4F3F", "#6E5468", "#2A2F44"], isha: ["#2A2F44", "#1F2334", "#171A26"] };
  function phone(s, w) {
    const x = N(s.n), h = s.screen || hourOf(s.n), dark = h === "maghrib" || h === "isha", [a, b, c] = PH[h];
    const mid = s.mode === "quiz"
      ? `<div class="mid" style="gap:8px"><div class="ar">${x.ar}</div><div class="l" style="margin-bottom:12px">Which name is this?</div>${s.opts.map((o, i) => `<div class="opt ${i === s.ok ? "ok" : ""}" style="width:100%">${esc(o)}</div>`).join("")}</div>`
      : `<div class="mid"><div class="ar">${x.ar}</div><div class="m">${esc(x.en)}</div><div class="l">${esc(x.tr)} · No. ${nnum(s.n)}</div>${s.breath ? '<div class="dot" style="margin-top:34px"></div>' : ""}</div>`;
    return `<div class="phone" style="${w ? `width:${w}px` : ""}"><div class="sc ${dark ? "dark" : ""}" style="--p1:${a};--p2:${b};--p3:${c}">
      <div class="st"><span>${esc(s.time)}</span><span>${esc(s.right || "Week " + s.week)}</span></div>
      ${s.greet ? `<div class="h">${s.greet}</div>` : ""}${mid}
      <div class="tab"><span class="${s.tab === 0 ? "on" : ""}">Today</span><span class="${s.tab === 1 ? "on" : ""}">Names</span><span class="${s.tab === 2 ? "on" : ""}">Remember</span><span class="${s.tab === 3 ? "on" : ""}">Send</span></div></div></div>`;
  }
  const HOURS = ["fajr", "morning", "dhuhr", "asr", "maghrib", "isha"];
  const OPENER = { fajr: 1, morning: 18, dhuhr: 35, asr: 51, maghrib: 67, isha: 83 };
  const HOURTIME = { fajr: "04 – 07", morning: "07 – 11", dhuhr: "11 – 15", asr: "15 – 18", maghrib: "18 – 20", isha: "20 – 04" };
  function bands(compact) {
    return `<div class="bands ${compact ? "compact" : ""}">${HOURS.map((h) => { const x = N(OPENER[h]); return `<div class="band band--${h}"><span class="n">${HOURNAME[h]}<br><span style="opacity:.8;letter-spacing:.14em">${HOURTIME[h]}</span></span><span class="ar">${x.ar}</span><span class="t">${esc(x.tr)}</span></div>`; }).join("")}</div>`;
  }
  function wall(on) {
    const set = new Set(on || []);
    return `<div class="wall">${NAMES.map((x) => `<span class="w ${set.has(x.n) ? "on" : ""}">${x.ar}</span>`).join("")}</div>`;
  }
  function dots(on) { let h = ""; for (let i = 0; i < 99; i++) h += `<i class="${i < on ? "on" : ""}"></i>`; return `<div class="dots">${h}</div>`; }
  const dispS = (s, d) => `<div class="disp" style="font-size:${s.d || d}px;${s.max ? `max-width:${s.max}px;` : ""}">${s.disp}</div>`;

  /* ---------------------------------------------------------------- feed sheets */
  const FEED = {
    statement(s) {
      return `<div class="canvas canvas--feed pad" data-hour="${s.hour}">${s.halo !== false ? HALO() : ""}${ktop(s.kicker)}
        <div class="v-center center gap-md">${s.ring ? RING(s.ring, 7) : ""}${dispS(s, 132)}${s.sub ? `<div class="body" style="max-width:${s.subw || 720}px">${s.sub}</div>` : ""}</div>${kfoot(s.foot)}</div>`;
    },
    name(s) {
      const x = N(s.n);
      return `<div class="canvas canvas--feed pad" data-hour="${s.hour}">${HALO()}${ktop(s.kicker || "This week")}
        <div class="v-center center gap-sm">
          <div class="lbl">No. ${nnum(s.n)} of 99</div>
          <div class="ar" style="font-size:${s.arS || 300}px;line-height:1.25">${x.ar}</div>
          <div class="disp" style="font-size:${s.enS || 104}px;font-style:italic;font-weight:400">${esc(x.en)}</div>
          <div class="lbl" style="margin-top:8px">${esc(x.tr)}</div>
          <div class="body" style="max-width:780px;margin-top:22px">${esc(s.line || x.line)}</div>
        </div>${kfoot(s.foot)}</div>`;
    },
    card(s) {
      return `<div class="canvas canvas--feed pad" data-hour="${s.hour}">${ktop(s.kicker)}
        <div class="v-center center gap-md">${card(s.n, s.w || 620, { style: s.tilt ? `transform:rotate(${s.tilt}deg)` : "" })}${s.sub ? `<div class="body" style="max-width:760px;margin-top:10px">${s.sub}</div>` : ""}</div>${kfoot(s.foot)}</div>`;
    },
    fan(s) {
      const [a, b, c] = s.ns;
      return `<div class="canvas canvas--feed pad" data-hour="${s.hour}">${ktop(s.kicker)}
        <div class="v-center gap-md" style="align-items:center">
          <div class="fan" style="height:${s.h || 780}px">${card(a, 450, { style: "transform:translate(-50%,-50%) rotate(-16deg) translate(-190px,36px)" })}${card(c, 450, { style: "transform:translate(-50%,-50%) rotate(16deg) translate(190px,36px)" })}${card(b, 450, { style: "transform:translate(-50%,-50%)" })}</div>
          <div class="disp center" style="font-size:${s.d || 74}px;text-align:center;max-width:900px">${s.disp}</div>${s.sub ? `<div class="body" style="max-width:760px;text-align:center">${s.sub}</div>` : ""}
        </div>${kfoot(s.foot)}</div>`;
    },
    env(s) {
      return `<div class="canvas canvas--feed pad" data-hour="${s.hour}">${ktop(s.kicker)}
        <div class="v-center center gap-md">${envelope(s.n, s.to, s.state, 620)}${dispS(s, 76)}${s.sub ? `<div class="body" style="max-width:760px">${s.sub}</div>` : ""}</div>${kfoot(s.foot)}</div>`;
    },
    phone(s) {
      return `<div class="canvas canvas--feed pad" data-hour="${s.hour}">${ktop(s.kicker)}
        <div class="v-center" style="flex-direction:row;align-items:center;gap:60px">
          <div class="col gap-md" style="flex:1;min-width:0">${dispS(s, 84)}${s.sub ? `<div class="body">${s.sub}</div>` : ""}</div>${phone(s)}
        </div>${kfoot(s.foot)}</div>`;
    },
    wall(s) {
      return `<div class="canvas canvas--feed pad" data-hour="${s.hour}">${ktop(s.kicker)}
        <div class="v-center gap-md">${wall(s.on)}<div class="disp" style="font-size:${s.d || 64}px;text-align:center">${s.disp}</div></div>${kfoot(s.foot)}</div>`;
    },
    bands(s) {
      return `<div class="canvas canvas--feed pad" data-hour="${s.hour}">${ktop(s.kicker)}
        <div class="v-center gap-md">${dispS(s, 76)}${bands()}${s.sub ? `<div class="body">${s.sub}</div>` : ""}</div>${kfoot(s.foot)}</div>`;
    },
    steps(s) {
      return `<div class="canvas canvas--feed pad" data-hour="${s.hour}">${ktop(s.kicker)}
        <div class="v-center gap-md">${dispS(s, 76)}<div class="steps">${s.steps.map(([n, t, x]) => `<div class="step"><div class="n">${n}</div><div><div class="t">${t}</div><div class="s">${esc(x)}</div></div></div>`).join("")}</div></div>${kfoot(s.foot)}</div>`;
    },
    quiz(s) {
      const x = N(s.n);
      return `<div class="canvas canvas--feed pad" data-hour="${s.hour}">${ktop(s.kicker)}
        <div class="v-center center gap-md"><div class="lbl">${esc(s.q || "Which name is this?")}</div><div class="ar" style="font-size:230px;line-height:1.25">${x.ar}</div>
          <div class="opts" style="max-width:720px">${s.opts.map((o, i) => `<div class="opt ${i === s.ok ? "ok" : ""}">${esc(o)}</div>`).join("")}</div>
          ${s.sub ? `<div class="body" style="max-width:760px;margin-top:6px">${s.sub}</div>` : ""}</div>${kfoot(s.foot)}</div>`;
    },
    dots(s) {
      return `<div class="canvas canvas--feed pad" data-hour="${s.hour}">${ktop(s.kicker)}
        <div class="v-center gap-md">${dispS(s, 82)}${dots(s.on)}${s.sub ? `<div class="body">${s.sub}</div>` : ""}</div>${kfoot(s.foot)}</div>`;
    },
    ayah(s) {
      return `<div class="canvas canvas--feed pad" data-hour="${s.hour}">${HALO()}${ktop(s.kicker)}
        <div class="v-center center gap-md"><div class="ar" style="font-size:${s.arS || 92}px;line-height:1.7;max-width:900px">${s.ar}</div><div class="rule-s"></div>
          <div class="line" style="font-size:${s.d || 54}px;max-width:860px">${s.en}</div><div class="lbl">${esc(s.ref)}</div></div>${kfoot(s.foot)}</div>`;
    },
    question(s) {
      return `<div class="canvas canvas--feed pad" data-hour="${s.hour}">${ktop(s.kicker)}
        <div class="v-center center gap-md"><div class="qmark">?</div>${dispS(s, 92)}${s.sub ? `<div class="body" style="max-width:740px">${s.sub}</div>` : ""}</div>${kfoot(s.foot)}</div>`;
    },
    quote(s) {
      const x = N(s.n);
      return `<div class="canvas canvas--feed pad" data-hour="${s.hour}">${HALO()}${ktop(s.kicker)}
        <div class="v-center gap-lg"><div class="line" style="font-size:${s.d || 96}px;max-width:900px">${esc(s.line || x.line)}</div>
          <div class="row gap-md" style="justify-content:space-between"><div class="ar" style="font-size:90px;line-height:1.2">${x.ar}</div><div class="lbl" style="text-align:right">${esc(x.tr)}<br><span style="opacity:.85">${esc(x.en)}</span></div></div></div>${kfoot(s.foot)}</div>`;
    },
    count(s) {
      return `<div class="canvas canvas--feed pad" data-hour="${s.hour}">${ktop(s.kicker)}
        <div class="v-center center gap-sm"><div class="disp" style="font-size:${s.bigS || 380}px;line-height:.9;color:var(--accent)">${s.big}</div>${dispS(s, 70)}${s.sub ? `<div class="body" style="max-width:760px;margin-top:14px">${s.sub}</div>` : ""}</div>${kfoot(s.foot)}</div>`;
    },
    cover(s) {
      const obj = s.obj === "ring" ? RING(300, 4) : s.obj === "breath" ? '<div class="breath"></div>' : s.obj === "bands" ? `<div style="width:600px">${bands(true)}</div>` : s.obj === "env" ? envelope(s.n || 9, s.to || "Nayla", "closed", 700) : "";
      return `<div class="canvas canvas--feed pad" data-hour="${s.hour}">${ktop(s.kicker)}
        <div class="v-center center gap-md">${obj}${dispS(s, 92)}${s.sub ? `<div class="body" style="max-width:720px">${s.sub}</div>` : ""}<div class="play" style="margin-top:8px"></div></div>${kfoot("Reel · sound on")}</div>`;
    },
  };

  /* ---------------------------------------------------------------- carousel slides */
  const role = (l, r) => `<div class="role"><span>${l}</span><span>${r}</span></div>`;
  const idx = (i, n, extra) => `<div class="idx"><span>${i} / ${n}</span><span>${extra || ""}</span></div>`;
  const SLIDE = {
    "c-hook"(s, i, n) {
      return `<div class="canvas canvas--feed cslide" data-hour="${s.hour}">${HALO()}${idx(i, n, "99names")}<div class="z">${dispS(s, 112)}${s.sub ? `<div class="body" style="margin-top:30px;max-width:800px">${s.sub}</div>` : ""}</div>${role(F.handle, `Swipe ${ARROW}`)}</div>`;
    },
    "c-text"(s, i, n) {
      return `<div class="canvas canvas--feed cslide" data-hour="${s.hour}">${idx(i, n, s.tag)}<div class="z">${s.num ? `<div class="num">${s.num}</div>` : ""}${dispS(s, 78)}${s.sub ? `<div class="body" style="margin-top:30px;max-width:840px">${s.sub}</div>` : ""}</div>${role(esc(s.role || ""), ARROW)}</div>`;
    },
    "c-name"(s, i, n) {
      const x = N(s.n);
      return `<div class="canvas canvas--feed cslide" data-hour="${s.hour}">${idx(i, n, `No. ${nnum(s.n)}`)}
        <div class="z col" style="gap:14px">${s.num ? `<div class="num" style="font-size:110px">${s.num}</div>` : ""}<div class="ar" style="font-size:${s.arS || 200}px;line-height:1.3;text-align:left">${x.ar}</div>
          <div class="disp" style="font-size:80px;font-style:italic;font-weight:400">${esc(x.en)}</div><div class="lbl">${esc(x.tr)}</div>
          <div class="body" style="margin-top:22px;max-width:860px">${esc(s.line || x.line)}</div></div>${role(esc(s.role || ""), ARROW)}</div>`;
    },
    "c-hour"(s, i, n) {
      const x = N(OPENER[s.hour]);
      return `<div class="canvas canvas--feed cslide" data-hour="${s.hour}">${idx(i, n, HOURTIME[s.hour])}
        <div class="z col" style="gap:14px"><div class="lbl">${HOURNAME[s.hour]} · opens with</div><div class="ar" style="font-size:190px;line-height:1.3;text-align:left">${x.ar}</div>
          <div class="disp" style="font-size:78px;font-style:italic;font-weight:400">${esc(x.en)}</div><div class="lbl">${esc(x.tr)} · No. ${nnum(x.n)}</div>
          <div class="body" style="margin-top:22px;max-width:860px">${s.sub || esc(x.line)}</div></div>${role(esc(s.role || ""), ARROW)}</div>`;
    },
    "c-card"(s, i, n) {
      return `<div class="canvas canvas--feed cslide" data-hour="${s.hour}">${idx(i, n, s.tag)}<div class="z center col" style="gap:34px;align-items:center">${card(s.n, 520)}${s.disp ? `<div class="disp" style="font-size:${s.d || 60}px;text-align:center;max-width:860px">${s.disp}</div>` : ""}</div>${role(esc(s.role || ""), ARROW)}</div>`;
    },
    "c-env"(s, i, n) {
      return `<div class="canvas canvas--feed cslide" data-hour="${s.hour}">${idx(i, n, s.tag)}<div class="z col center" style="gap:34px;align-items:center">${envelope(s.n, s.to, s.state, 700)}${dispS(s, 62)}</div>${role(esc(s.role || ""), ARROW)}</div>`;
    },
    "c-end"(s, i, n) {
      return `<div class="canvas canvas--feed cslide" data-hour="${s.hour}">${HALO()}${idx(i, n, "99names")}<div class="z col" style="gap:44px">${dispS(s, 84)}<div style="display:flex;gap:44px;align-items:center;color:var(--fg)">${SAVE}${SEND}</div></div>${role(esc(s.role || "Save this · send it on"), `<b>${F.url}</b>`)}</div>`;
    },
  };

  /* ---------------------------------------------------------------- stories */
  const stop = (label) => `<div class="k-top"><span class="k-brand">${RING(52)}99names</span><span class="lbl">${esc(label || "")}</span></div>`;
  const STORY = {
    "s-name"(s) {
      const x = N(s.n);
      return `<div class="canvas canvas--story pad" data-hour="${s.hour}">${HALO()}${stop(s.kicker)}
        <div class="v-center center gap-sm"><div class="lbl">No. ${nnum(s.n)} of 99</div><div class="ar" style="font-size:280px;line-height:1.25">${x.ar}</div>
          <div class="disp" style="font-size:96px;font-style:italic;font-weight:400">${esc(x.en)}</div><div class="lbl">${esc(x.tr)}</div>
          <div class="body" style="max-width:760px;margin-top:26px">${esc(s.sub || x.line)}</div>${s.cta ? `<div class="linkpill" style="margin-top:44px">${esc(s.cta)} ${ARROW}</div>` : ""}</div>${kfoot()}</div>`;
    },
    "s-fact"(s) {
      return `<div class="canvas canvas--story pad" data-hour="${s.hour}">${s.halo !== false ? HALO() : ""}${stop(s.kicker)}
        <div class="v-center center gap-md">${s.ring ? RING(s.ring, 6) : ""}${dispS(s, 100)}${s.sub ? `<div class="body" style="max-width:760px">${s.sub}</div>` : ""}${s.cta ? `<div class="linkpill" style="margin-top:30px">${esc(s.cta)} ${ARROW}</div>` : ""}</div>${kfoot()}</div>`;
    },
    "s-poll"(s) {
      return `<div class="canvas canvas--story pad" data-hour="${s.hour}">${stop(s.kicker)}
        <div class="v-center center gap-md">${dispS(s, 88)}<div class="poll" style="margin-top:20px">${s.opts.map((o) => `<div>${esc(o)}</div>`).join("")}</div></div>${kfoot("Sticker over the boxes")}</div>`;
    },
    "s-question"(s) {
      return `<div class="canvas canvas--story pad" data-hour="${s.hour}">${stop(s.kicker)}
        <div class="v-center center gap-md">${dispS(s, 84)}<div class="qbox" style="margin-top:20px"><div class="q">${esc(s.q)}</div><div class="a">Type your answer</div></div></div>${kfoot("Sticker over the box")}</div>`;
    },
    "s-breath"(s) {
      const x = s.n ? N(s.n) : null;
      return `<div class="canvas canvas--story pad" data-hour="${s.hour}">${stop(s.kicker)}
        <div class="v-center center gap-lg"><div class="breath"></div>${dispS(s, 84)}${x ? `<div class="row gap-md" style="justify-content:center"><div class="ar" style="font-size:88px;line-height:1.2">${x.ar}</div><div class="lbl" style="text-align:left">${esc(x.tr)}<br><span style="opacity:.85">${esc(x.en)}</span></div></div>` : ""}${s.sub ? `<div class="body" style="max-width:720px">${s.sub}</div>` : ""}</div>${kfoot()}</div>`;
    },
    "s-swipe"(s) {
      return `<div class="canvas canvas--story pad" data-hour="${s.hour}">${HALO()}${stop(s.kicker)}
        <div class="v-center center gap-md">${s.obj === "env" ? envelope(s.n, s.to || "you", "closed", 600) : s.obj === "card" ? card(s.n, 480) : s.obj === "phone" ? phone(s.ph, 360) : s.obj === "ring" ? RING(260, 5) : ""}${dispS(s, 84)}${s.sub ? `<div class="body" style="max-width:740px">${s.sub}</div>` : ""}<div class="linkpill" style="margin-top:26px">${esc(s.cta || "Link at the top")} ${ARROW}</div></div>${kfoot()}</div>`;
    },
    "s-quiz"(s) {
      const x = N(s.n);
      return `<div class="canvas canvas--story pad" data-hour="${s.hour}">${stop(s.kicker)}
        <div class="v-center center gap-md"><div class="lbl">${esc(s.q || "Which name is this?")}</div><div class="ar" style="font-size:240px;line-height:1.25">${x.ar}</div>
          <div class="opts" style="max-width:760px;margin-top:10px">${s.opts.map((o, i) => `<div class="opt ${i === s.ok ? "ok" : ""}">${esc(o)}</div>`).join("")}</div>${s.sub ? `<div class="note" style="margin-top:20px">${esc(s.sub)}</div>` : ""}</div>${kfoot(s.sticker ? "Sticker over the options" : undefined)}</div>`;
    },
    "s-reel"(s) {
      return `<div class="canvas canvas--story pad" data-hour="${s.hour}">${HALO()}${stop(s.kicker || "New reel")}
        <div class="v-center center gap-md"><div class="play"></div>${dispS(s, 88)}${s.sub ? `<div class="body" style="max-width:720px">${s.sub}</div>` : ""}<div class="linkpill" style="margin-top:26px">${esc(s.cta || "Watch")} ${ARROW}</div></div>${kfoot("Add the reel sticker over the play mark")}</div>`;
    },
  };

  /* ---------------------------------------------------------------- shared with the months after
     The Quiet Months (../quiet/) draw with these same pieces and add their own kinds. Without a
     month of days on the page there is nothing more to do here. */
  window.NOOR = { F, N, esc, nnum, raysSVG, RING, HALO, ARROW, DOWN, SAVE, SEND, ktop, kfoot, card, envelope, phone, bands, wall, dots, dispS, FEED, SLIDE, STORY, HOURS, HOURNAME, OPENER, HOURTIME, renderOne: (sheet) => renderOne(sheet) };
  if (!DAYS) return;

  /* ---------------------------------------------------------------- the day */
  function dateOf(d) { const t = new Date(START); t.setDate(START.getDate() + d.n - 1); return t; }
  const short = (d) => { const t = dateOf(d); return `${DAYNAME[t.getDay()].slice(0, 3)} ${nnum(t.getDate())} ${MON[t.getMonth()]}`; };
  const long = (d) => { const t = dateOf(d); return `${DAYNAME[t.getDay()]} ${t.getDate()} ${MONTH[t.getMonth()]} 2026`; };
  const folder = (d) => `Day ${nnum(d.n)} - ${short(d)} - ${d.title.replace(/<[^>]+>/g, "").replace(/[^\w\s'-]+/g, "").replace(/\s+/g, " ").trim()}`;
  const withHour = (s, h) => Object.assign({}, s, { hour: s.hour || h });

  function sheetHTML(html, w, h, cls, name, label) {
    return `<div class="sheet ${cls}" data-w="${w}" data-h="${h}" data-name="${esc(name)}"><div class="fit"><div class="inner">${html}</div></div>
      <div class="cap"><span>${label}</span><button type="button" data-dl-one>PNG</button></div></div>`;
  }
  function renderDay(d) {
    const f = d.feed, isCar = f.kind === "carousel";
    let sheets = "", label;
    if (isCar) {
      const n = f.slides.length;
      sheets = f.slides.map((s, i) => sheetHTML(SLIDE[s.kind](withHour(s, d.hour), i + 1, n), 1080, 1350, "slide", `${folder(d)} - slide ${i + 1} of ${n}`, `${i + 1} of ${n}`)).join("");
      label = `Carousel · ${n} slides · 1080 × 1350`;
    } else {
      sheets = sheetHTML(FEED[f.kind](withHour(f, d.hour)), 1080, 1350, "one", `${folder(d)} - post`, f.kind === "cover" ? "Reel cover · the grid tile" : "Feed post");
      label = `${f.kind === "cover" ? "Reel cover" : "Feed post"} · 1080 × 1350`;
    }
    const stories = (d.stories || []).map((s, i) => sheetHTML(STORY[s.kind](withHour(s, d.hour)), 1080, 1920, "story", `${folder(d)} - story ${i + 1}`, `Story ${i + 1}`)).join("");
    const stick = (d.stories || []).map((s) => s.kind === "s-poll" ? `Poll sticker: ${s.opts.join(" / ")}` : s.kind === "s-question" ? `Question sticker: “${s.q}”` : s.kind === "s-quiz" && s.sticker ? `Quiz sticker: ${s.opts.join(" / ")} (answer ${s.opts[s.ok]})` : s.kind === "s-name" || s.kind === "s-swipe" ? `Link sticker → ${s.link || F.url}` : s.kind === "s-reel" ? "Reel sticker over the play mark" : null).filter(Boolean);
    const reel = d.reel ? `<div class="board reel"><div class="head"><span class="lblh">The reel · 1080 × 1920 · ${d.reel.len}s · original sound</span>
        <div class="acts"><a class="btn dl" href="reels/day-${nnum(d.n)}.mp4" download="${esc(folder(d))} - reel.mp4">${DOWN} Download reel</a></div></div>
        <div class="rrow"><video src="reels/day-${nnum(d.n)}.mp4" controls playsinline preload="metadata" loop></video>
        <div class="script">${d.reel.script.map((l) => `<div><b>${esc(l[0])}</b> ${esc(l[1])}</div>`).join("")}<div class="note-p" style="margin-top:14px">Upload the sheet above as the cover so the grid stays in step. Text is inside Instagram's safe area; the sound is ours.</div></div></div></div>` : "";
    const t = dateOf(d), today = new Date(); today.setHours(0, 0, 0, 0);
    const rel = Math.round((t - today) / 864e5);
    const when = rel === 0 ? "<b>Today</b>" : rel === 1 ? "<b>Tomorrow</b>" : rel > 1 ? `In ${rel} days` : `${-rel} day${rel === -1 ? "" : "s"} ago`;
    const band = BANDS.find((b) => b.hour === d.hour);
    $("#day").innerHTML = `
      <div class="dayhd"><div class="no">${nnum(d.n)}</div>
        <div><div class="ti">${d.title}</div><div class="meta">${long(d)} · post at <b>${esc(d.at)} WAT</b> · ${when}<br>${HOURNAME[d.hour]} · ${esc(band.name)}</div></div>
        <div class="fmt">${label}<br>${(d.stories || []).length} stor${(d.stories || []).length === 1 ? "y" : "ies"}${d.reel ? " · reel" : ""}</div></div>
      <div class="board post"><div class="head"><span class="lblh">${isCar ? "The carousel, in order" : "The post"}</span>
          <div class="acts"><button class="btn dl" type="button" data-dl-post>${DOWN} ${isCar ? `Download all ${f.slides.length} slides` : "Download post"}</button><button class="btn" type="button" data-copy>Copy caption</button></div></div>
        <div class="sheets">${sheets}</div></div>
      <div class="two">
        <div class="board caption"><div class="head"><span class="lblh">The caption</span><div class="acts"><button class="btn" type="button" data-copy>Copy caption</button></div></div>
          <pre>${esc(d.caption.trim())}</pre>
          ${d.why ? `<div class="note-p">Why this post: ${esc(d.why)}</div>` : ""}
          ${stick.length ? `<div class="note-p">On the stories: ${esc(stick.join(" · "))}</div>` : ""}
          <div class="note-p">Post at ${esc(d.at)} WAT. Stories go up after the post, in order.</div></div>
        <div class="stack">${stories ? `<div class="board"><div class="head"><span class="lblh">Stories · 1080 × 1920</span><div class="acts"><button class="btn dl" type="button" data-dl-stories>${DOWN} Download ${(d.stories || []).length > 1 ? "all stories" : "story"}</button></div></div><div class="sheets" style="justify-content:flex-start">${stories}</div></div>` : ""}${reel}</div>
      </div>`;
    fitAll(); bind(d);
    $$(".wk a").forEach((a) => a.classList.toggle("cur", +a.dataset.n === d.n));
    $$(".hourpip i").forEach((i) => i.classList.toggle("on", i.dataset.h === d.hour));
  }

  function fitAll() {
    $$(".sheet").forEach((sh) => { const w = +sh.dataset.w, h = +sh.dataset.h, fit = $(".fit", sh), W = fit.clientWidth || w, s = W / w; fit.style.height = Math.round(h * s) + "px"; $(".inner", fit).style.transform = `scale(${s})`; });
  }
  addEventListener("resize", fitAll);

  /* ---------------------------------------------------------------- export */
  async function renderOne(sheet) {
    const c = $(".canvas", sheet);
    await document.fonts.ready;
    return Promise.race([
      htmlToImage.toPng(c, { width: c.offsetWidth, height: c.offsetHeight, canvasWidth: c.offsetWidth, canvasHeight: c.offsetHeight, pixelRatio: 1, skipAutoScale: true, cacheBust: false }),
      new Promise((_, bad) => setTimeout(() => bad(new Error("render timed out")), 90000)),
    ]);
  }
  function save(url, name) { const a = document.createElement("a"); a.download = name; a.href = url; document.body.appendChild(a); a.click(); a.remove(); }
  async function exportMany(sheets, zipName, btn) {
    const label = btn.innerHTML; btn.disabled = true;
    try {
      if (sheets.length > 1 && window.JSZip) {
        const zip = new JSZip();
        for (let i = 0; i < sheets.length; i++) { btn.textContent = `Rendering ${i + 1} of ${sheets.length}`; zip.file(sheets[i].dataset.name + ".png", (await renderOne(sheets[i])).split(",")[1], { base64: true }); }
        btn.textContent = "Packing"; save(URL.createObjectURL(await zip.generateAsync({ type: "blob" })), zipName + ".zip");
      } else {
        for (let i = 0; i < sheets.length; i++) { btn.textContent = sheets.length > 1 ? `Rendering ${i + 1} of ${sheets.length}` : "Rendering"; save(await renderOne(sheets[i]), sheets[i].dataset.name + ".png"); await new Promise((r) => setTimeout(r, 400)); }
      }
      toast("Saved. Check your downloads.");
    } catch (e) { console.error(e); toast("Export failed. Keep this window in front and try again."); }
    btn.disabled = false; btn.innerHTML = label;
  }
  function bind(d) {
    $$("[data-dl-one]").forEach((b) => b.addEventListener("click", () => exportMany([b.closest(".sheet")], "", b)));
    const p = $("[data-dl-post]"); if (p) p.addEventListener("click", () => exportMany($$(".post .sheet"), `${folder(d)} - post`, p));
    const st = $("[data-dl-stories]"); if (st) st.addEventListener("click", () => exportMany($$(".sheet.story"), `${folder(d)} - stories`, st));
    $$("[data-copy]").forEach((b) => b.addEventListener("click", async () => {
      const text = d.caption.trim();
      try { await navigator.clipboard.writeText(text); } catch (e) { const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove(); }
      toast("Caption copied");
    }));
  }
  let toastT; function toast(m) { const t = $("#toast"); t.textContent = m; t.classList.add("on"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("on"), 2200); }

  /* ---------------------------------------------------------------- the picker, the month */
  const sel = $("#pick");
  sel.innerHTML = BANDS.map((b) => `<optgroup label="${HOURNAME[b.hour]} · ${esc(b.name)}">` + DAYS.filter((d) => d.hour === b.hour).map((d) => `<option value="${d.n}">Day ${nnum(d.n)} · ${short(d)} · ${d.title.replace(/<[^>]+>/g, "")}</option>`).join("") + "</optgroup>").join("");
  $("#weeks").innerHTML = BANDS.map((b) => `<div class="wk"><div class="h"><i class="hourpip"><i class="${b.hour}" style="opacity:1"></i></i>${HOURNAME[b.hour]} · ${HOURTIME[b.hour]}</div><div class="n">${b.name}</div>` +
    DAYS.filter((d) => d.hour === b.hour).map((d) => `<a href="#day-${nnum(d.n)}" data-n="${d.n}"><span>${short(d).slice(4)}</span>${d.title.replace(/<[^>]+>/g, "")}</a>`).join("") + "</div>").join("");
  const GP = { fajr: "linear-gradient(165deg,#F6DCCF,#EFD9B8 35%,#CFD9C4 70%,#C9DBE6)", morning: "linear-gradient(165deg,#F4EEE4,#F3E3C2 35%,#F1D9A6 70%,#EFD9B8)", dhuhr: "linear-gradient(165deg,#F4EEE4,#EFD9B8 35%,#F6DCCF 70%,#F2CFC0)", asr: "linear-gradient(165deg,#EFD9B8,#DCDCBE 35%,#CFD9C4 70%,#A9BFA6)", maghrib: "linear-gradient(170deg,#8A4F3F,#6E5468 32%,#3E3A58 66%,#2A2F44)", isha: "linear-gradient(165deg,#2A2F44,#1F2334 35%,#171A26)" };
  $("#gridpre").innerHTML = DAYS.slice().reverse().map((d) => `<i class="${d.hour === "maghrib" || d.hour === "isha" ? "dark" : ""}" style="background:${GP[d.hour]}" title="Day ${d.n}"><b>${nnum(d.n)}</b></i>`).join("");

  let cur = 1;
  function todayN() { const t = new Date(); t.setHours(0, 0, 0, 0); const n = Math.round((t - START) / 864e5) + 1; return n >= 1 && n <= DAYS.length ? n : null; }
  function go(n, push) {
    n = Math.min(DAYS.length, Math.max(1, n)); cur = n; sel.value = String(n);
    $("#prev").disabled = n === 1; $("#next").disabled = n === DAYS.length;
    renderDay(DAYS[n - 1]);
    const hash = `#day-${nnum(n)}`;
    if (push !== false && location.hash !== hash) history.replaceState(null, "", hash);
    if (push === "scroll") $("#day").scrollIntoView({ behavior: "smooth", block: "start" });
  }
  sel.addEventListener("change", () => go(+sel.value));
  $("#prev").addEventListener("click", () => go(cur - 1)); $("#next").addEventListener("click", () => go(cur + 1));
  const tn = todayN(), tb = $("#todayBtn"); if (tn) tb.addEventListener("click", () => go(tn)); else tb.hidden = true;
  addEventListener("hashchange", () => { const m = location.hash.match(/day-(\d+)/); if (m && +m[1] !== cur) go(+m[1], false); });
  addEventListener("keydown", (e) => { if (e.target.matches("input,textarea,select")) return; if (e.key === "ArrowLeft") go(cur - 1); if (e.key === "ArrowRight") go(cur + 1); });
  const m = location.hash.match(/day-(\d+)/);
  go(m ? +m[1] : (tn || 1), false);
  window.THIRTY = { go, renderOne, days: DAYS, current: () => cur, folder };
})();
