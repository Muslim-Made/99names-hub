/* ============================================================
   99NAMES · NOOR · THE QUIET MONTHS · quiet.js
   Pick a day in the calendar, see what goes up, download it. The
   sheets are drawn from data.js in the almanac grammar at true size,
   with the thirty's own pieces (ring, card, envelope, phone) taken
   from window.NOOR, and exported as PNGs through html-to-image.

   Every post wears the hour it goes up at: Monday 06:30 is Fajr,
   Wednesday 19:00 is Maghrib, Friday 11:00 is Dhuhr, Sunday 16:00
   is Asr. Text never sits on a drawn thing.
   ============================================================ */
(function () {
  const Q = window.NOOR, F = Q.F, N = Q.N, esc = Q.esc, nnum = Q.nnum, RING = Q.RING, ARROW = Q.ARROW, DOWN = Q.DOWN;
  const D = window.QUIET;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const HN = Q.HOURNAME;
  const DAYNAME = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const SAVE = '<svg viewBox="0 0 24 24" style="width:64px;height:64px;fill:none;stroke:currentColor;stroke-width:1.3"><path d="M6 3h12v18l-6-4.5L6 21z"/></svg>';
  const SEND = '<svg viewBox="0 0 24 24" style="width:64px;height:64px;fill:none;stroke:currentColor;stroke-width:1.3"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg>';
  const dateOf = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const hijri = (s) => { try { return new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", { day: "numeric", month: "long", year: "numeric" }).format(dateOf(s)).replace(" AH", "").replace(/ʻ/g, "'"); } catch (e) { return ""; } };
  const short = (s) => { const t = dateOf(s); return `${DAYNAME[t.getDay()].slice(0, 3)} ${t.getDate()} ${MON[t.getMonth()]}`; };
  const long = (s) => { const t = dateOf(s); return `${DAYNAME[t.getDay()]} ${t.getDate()} ${MONTH[t.getMonth()]} 2026`; };
  const plain = (h) => String(h || "").replace(/<br>/g, " ").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  const isDark = (h) => h === "maghrib" || h === "isha";

  /* ---------------------------------------------------------------- the chrome */
  // the week a post belongs to decides which dots are lit: 37 onward have been met, this week's is lit
  let CTX = { now: 41 };
  function l99() {
    let h = "";
    for (let i = 1; i <= 99; i++) h += `<i class="${i === CTX.now ? "now" : i >= 37 && i < CTX.now ? "met" : ""}"></i>`;
    return `<div class="l99" aria-hidden="true">${h}</div>`;
  }
  const head = (label) => `<div class="q-head"><span class="k-brand">${RING(48)}99names</span><span class="lbl">${label || ""}</span></div>`;
  const foot = (l, r) => `<div class="q-foot"><div class="meta"><span>${l == null ? `<b>${F.url}</b>` : l}</span><span>${r == null ? F.tagline : r}</span></div>${l99()}</div>`;
  const sheet = (size, hour, inner, extra) => `<div class="canvas canvas--${size} q ${extra || ""}" data-hour="${hour}">${inner}</div>`;
  const enSize = (t, big) => { const l = plain(t).length; return big ? (l <= 14 ? 120 : l <= 18 ? 104 : 90) : (l <= 14 ? 88 : l <= 18 ? 78 : 68); };
  const swipe = `Swipe ${ARROW}`;
  const pos = (i, n, what) => `${i} / ${n}${what ? " · " + what : ""}`;

  function nameBlock(n, o) {
    const x = N(n), a = o || {};
    return `<div class="col" style="gap:${a.gap || 8}px;align-items:${a.align || "center"};text-align:${a.align === "flex-start" ? "left" : "center"}">
      <div class="q-ar" style="font-size:${a.ar || 260}px;line-height:1.28">${x.ar}</div>
      <div class="q-en" style="font-size:${a.en || enSize(x.en)}px">${esc(x.en)}</div>
      <div class="q-tr" style="margin-top:10px">${esc(x.tr)} · No. ${nnum(n)}</div></div>`;
  }
  function dotsGrid(on) {
    let h = "";
    for (let i = 1; i <= 99; i++) h += `<i class="${i === CTX.now ? "on" : i >= 37 && i < CTX.now ? "met" : ""}"></i>`;
    return `<div class="g99" aria-hidden="true">${h}</div>`;
  }
  function object(o, scale) {
    if (!o) return "";
    const s = scale || 1;
    if (o.kind === "ring") return `<div class="cell">${RING(Math.round((o.size || 300) * s), o.w || 4)}</div>`;
    if (o.kind === "card") return `<div class="cell">${Q.card(o.n, Math.round((o.w || 420) * s), { style: o.tilt ? `transform:rotate(${o.tilt}deg)` : "" })}</div>`;
    // three cards fanned; the cell is as tall as the turned cards reach, so nothing spills out of it
    // drawn at a full 380px so the printed labels keep their room, then scaled as a whole
    if (o.kind === "fan") { const w = Math.round(300 * s * (o.scale || 1)), B = 380, k = (w / B).toFixed(4), dx = Math.round(B * 0.46), dy = Math.round(B * .06); return `<div class="cell fanq" style="height:${Math.round(w * 2)}px;width:100%;position:relative">${Q.card(o.ns[0], B, { style: `position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) scale(${k}) rotate(-14deg) translate(-${dx}px,${dy}px)` })}${Q.card(o.ns[2], B, { style: `position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) scale(${k}) rotate(14deg) translate(${dx}px,${dy}px)` })}${Q.card(o.ns[1], B, { style: `position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) scale(${k})` })}</div>`; }
    if (o.kind === "env") return `<div class="cell">${Q.envelope(o.n, o.to, o.state || "closed", Math.round((o.w || 640) * s))}</div>`;
    if (o.kind === "phone") return `<div class="cell">${Q.phone(o.ph, Math.round((o.w || 380) * s))}</div>`;
    if (o.kind === "breath") return `<div class="cell" style="height:${Math.round(420 * s)}px"><div class="breath"></div></div>`;
    if (o.kind === "dots") return `<div class="cell" style="width:100%">${dotsGrid()}</div>`;
    if (o.kind === "dial") return `<div class="col" style="gap:16px;width:100%"><div class="dial">${Q.HOURS.map((h) => `<i class="${h} ${h === o.on ? "on" : ""}"></i>`).join("")}</div><div class="dial-l">${Q.HOURS.map((h) => `<span class="${h === o.on ? "on" : ""}">${HN[h]}</span>`).join("")}</div></div>`;
    if (o.kind === "months") return `<div class="months">${o.rows.map(([l, n, on]) => `<div class="m"><div class="lbl">${l}</div><div class="d">${Array.from({ length: n }, (_, i) => `<i class="${i < on ? "on" : ""}"></i>`).join("")}</div></div>`).join("")}</div>`;
    return "";
  }

  /* ---------------------------------------------------------------- feed sheets (1080 × 1350) */
  const FEED = {
    // Jumu'ah: the verse that carries the week's name, Arabic right, English left, the name lit in both
    verse(s) {
      const x = N(s.n);
      return sheet("feed", s.hour, `${head(s.kicker || "Jumu'ah")}
        <div class="q-body"><div class="verse">
          ${s.lead ? `<div class="q-lead" style="font-size:${s.ld || 64}px">${s.lead}</div>` : ""}
          <div class="q-ar" style="font-size:${s.arS || 92}px;line-height:1.6">${s.ar}</div>
          <div class="rule"></div>
          <div class="q-trans" style="font-size:${s.enS || 54}px">${s.en}</div>
          <div class="ref"><span class="lbl">${esc(s.ref)}</span><span class="lbl">${esc(x.tr)} · No. ${nnum(s.n)}</span></div>
        </div></div>${foot(null, s.foot || "Jumu'ah Mubarak")}`);
    },
    // an index: situations on the left, the name on the right. Built to be sent.
    index(s) {
      return sheet("feed", s.hour, `${head(s.kicker)}
        <div class="q-body" style="gap:40px">${s.disp ? `<div class="q-lead" style="font-size:${s.d || 76}px">${s.disp}</div>` : ""}
          <div class="idx-list">${s.rows.map(([t, n]) => { const x = N(n); return `<div><div class="s">${t}</div><div class="n"><div class="a">${x.ar}</div><div class="tr">${esc(x.tr)}</div></div></div>`; }).join("")}</div>
        </div>${foot(null, s.foot)}`);
    },
    // a statement with an object in a cell of its own, above or below
    statement(s) {
      const obj = object(s.obj), txt = `<div class="col" style="gap:30px;${s.center ? "align-items:center;text-align:center" : ""}"><div class="q-lead" style="font-size:${s.d || 112}px;line-height:1.02">${s.disp}</div>${s.sub ? `<div class="body" style="max-width:${s.subw || 860}px">${s.sub}</div>` : ""}</div>`;
      return sheet("feed", s.hour, `${head(s.kicker)}
        <div class="q-body" style="gap:${s.gap || 64}px;justify-content:${s.justify || "center"}">${s.objFirst ? obj + txt : txt + obj}</div>${foot(null, s.foot)}`);
    },
    // the line of ninety-nine as a grid: what has been met, what is lit
    count(s) {
      return sheet("feed", s.hour, `${head(s.kicker)}
        <div class="q-body" style="gap:56px"><div class="q-lead" style="font-size:${s.d || 100}px;line-height:1.02">${s.disp}</div>${dotsGrid()}${s.sub ? `<div class="body">${s.sub}</div>` : ""}</div>${foot(null, s.foot)}`);
    },
    // two names the Qur'an keeps together, two hours on one page
    pair(s) {
      const half = (n, h, label, top) => { const x = N(n); return `<div class="canvas half" data-hour="${h}">${top ? head(label) : `<div class="q-head" style="border:0;padding:0"><span class="lbl">${label}</span><span class="lbl">${esc(s.ref || "")}</span></div>`}
        <div class="mid"><div class="l"><div class="q-en" style="font-size:${enSize(x.en)}px">${esc(x.en)}</div><div class="q-tr">${esc(x.tr)} · No. ${nnum(n)}</div></div><div class="q-ar" style="font-size:190px;line-height:1.3">${x.ar}</div></div>
        ${top ? "" : foot(null, s.foot)}</div>`; };
      return `<div class="canvas canvas--feed pair" data-hour="${s.hours[0]}">${half(s.ns[0], s.hours[0], s.kicker, true)}${half(s.ns[1], s.hours[1], s.label2 || "And", false)}</div>`;
    },
    // the reel's tile on the grid: 1080 × 1920, everything inside the centre 3:4 and Instagram's reel safe area
    cover(s) {
      const obj = object(s.obj);
      return sheet("story", s.hour, `${head(s.kicker || "Reel")}
        <div class="q-body" style="gap:${s.gap || 70}px;align-items:center;text-align:center">${s.objFirst === false ? "" : obj}<div class="col" style="gap:30px;align-items:center"><div class="q-lead" style="font-size:${s.d || 110}px;line-height:1.02">${s.disp}</div>${s.sub ? `<div class="body" style="max-width:780px">${s.sub}</div>` : ""}</div>${s.objFirst === false ? obj : ""}</div>
        ${foot(`<span class="playmark"><i></i>${esc(s.len ? s.len + " seconds" : "Reel")}</span>`, "Sound on")}`, "cover");
    },
  };

  /* ---------------------------------------------------------------- carousel slides (1080 × 1350) */
  const SLIDE = {
    // The Name, slide one: the number, the Arabic, the meaning
    "n-cover"(s, i, n) {
      const x = N(s.n);
      return sheet("feed", s.hour, `${head("The name of the week")}
        <div class="q-body" style="justify-content:space-between;padding:44px 0 34px">
          <div class="row" style="justify-content:space-between;align-items:flex-start;gap:30px"><div class="q-num" style="font-size:210px">${s.n}</div><div class="lbl" style="text-align:right;line-height:1.55;padding-top:14px">Of ninety-nine<br>${esc(s.week || "")}</div></div>
          <div class="q-ar" style="font-size:${s.arS || 290}px;text-align:center;line-height:1.25">${x.ar}</div>
          <div class="col" style="gap:14px"><div class="q-en" style="font-size:${enSize(x.en, true)}px">${esc(x.en)}</div><div class="q-tr">${esc(x.tr)}</div></div>
        </div>${foot(null, swipe)}`);
    },
    "n-meaning"(s, i, n) {
      const x = N(s.n);
      return sheet("feed", s.hour, `${head(pos(i, n, "What it means"))}
        <div class="q-body"><div class="mg"><div class="side"><div class="lbl">${esc(x.tr)}</div><div class="lbl" style="opacity:.9">No. ${nnum(s.n)}</div></div>
          <div class="col" style="gap:44px"><div class="q-lead" style="font-size:${s.d || 60}px">${s.text || esc(x.meaning)}</div><div class="rule"></div><div class="q-en" style="font-size:${s.ld || 50}px;line-height:1.16">${s.line || esc(x.line)}</div></div></div></div>
        ${foot(`${esc(x.tr)} · ${esc(x.en)}`, ARROW)}`);
    },
    "n-root"(s, i, n) {
      const x = N(s.n);
      return sheet("feed", s.hour, `${head(pos(i, n, "The root"))}
        <div class="q-body" style="gap:34px"><div class="root">${s.letters.map((l, k) => (k ? "<i></i>" : "") + `<span>${l}</span>`).join("")}</div>
          <div class="lbl" style="text-align:center">${esc(s.gloss)}</div>
          <div class="fam">${s.fam.map(([a, t, m]) => `<div><div class="w"><div class="t">${t}</div><div class="m">${m}</div></div><div class="a">${a}</div></div>`).join("")}</div></div>
        ${foot(`${esc(x.tr)} · ${esc(s.rootTr || "")}`, ARROW)}`);
    },
    "n-verse"(s, i, n) {
      const x = N(s.n);
      return sheet("feed", s.hour, `${head(i === 1 ? (s.kicker || "Jumu'ah") : pos(i, n, "In the Qur'an"))}
        <div class="q-body"><div class="verse">
          <div class="q-ar" style="font-size:${s.arS || 96}px;line-height:1.6">${s.ar}</div><div class="rule"></div>
          <div class="q-trans" style="font-size:${s.enS || 56}px">${s.en}</div>
          <div class="ref"><span class="lbl">${esc(s.ref)}</span>${s.note ? `<span class="lbl" style="text-align:right">${esc(s.note)}</span>` : ""}</div></div></div>
        ${foot(`${esc(x.tr)} · ${esc(x.en)}`, i === 1 ? swipe : ARROW)}`);
    },
    "n-when"(s, i, n) {
      const x = N(s.n);
      return sheet("feed", s.hour, `${head(pos(i, n, "Say it when"))}
        <div class="q-body" style="gap:36px"><div class="row" style="justify-content:space-between;align-items:center;gap:30px"><div class="q-lead" style="font-size:78px;line-height:1.02">Say it<br><em>when…</em></div><div class="q-ar" style="font-size:118px;line-height:1.3">${s.voc}</div></div>
          <div class="idx-list">${s.rows.map((t) => `<div><div class="s">${t}</div></div>`).join("")}</div></div>
        ${foot(`${esc(x.tr)} · ${esc(s.vocTr || "")}`, ARROW)}`);
    },
    "n-end"(s, i, n) {
      const x = N(s.n);
      return sheet("feed", s.hour, `${head(pos(i, n, "Keep it"))}
        <div class="q-body"><div class="row" style="gap:64px;align-items:center">${Q.card(s.n, 380)}
          <div class="col" style="gap:34px;flex:1;min-width:0"><div class="q-lead" style="font-size:${s.d || 74}px;line-height:1.04">${s.disp || "Keep it near<br><em>this week.</em>"}</div><div class="body" style="font-size:31px">${s.sub}</div><div class="row" style="gap:40px;color:var(--fg)">${SAVE}${SEND}</div></div></div></div>
        ${foot(null, s.next ? `Next Monday · No. ${nnum(s.next)}` : F.tagline)}`);
    },
    // a set: cover, one slide per name, an end
    "c-cover"(s, i, n) {
      const obj = object(s.obj, 0.8);
      return sheet("feed", s.hour, `${head(s.kicker || pos(i, n))}
        <div class="q-body" style="gap:${s.gap || 60}px;justify-content:space-between;padding:50px 0 40px"><div class="col" style="gap:28px"><div class="q-lead" style="font-size:${s.d || 112}px;line-height:1.0">${s.disp}</div>${s.sub ? `<div class="body" style="max-width:840px">${s.sub}</div>` : ""}</div>${obj}</div>
        ${foot(`<b>${F.handle}</b>`, swipe)}`);
    },
    "c-name"(s, i, n) {
      const x = N(s.n);
      return sheet("feed", s.hour, `${head(pos(i, n, s.tag || ""))}
        <div class="q-body" style="gap:30px;justify-content:space-between;padding:40px 0 34px">
          <div class="q-lead" style="font-size:${s.d || 58}px">${s.role}</div>
          <div class="q-ar" style="font-size:${s.arS || 230}px;text-align:right;line-height:1.28">${x.ar}</div>
          <div class="col" style="gap:12px"><div class="q-en" style="font-size:${enSize(x.en, true) - 16}px">${esc(x.en)}</div><div class="q-tr">${esc(x.tr)} · No. ${nnum(s.n)}</div></div>
          <div class="body">${s.line || esc(x.line)}</div></div>
        ${foot(null, ARROW)}`);
    },
    "c-text"(s, i, n) {
      const obj = object(s.obj, 0.9);
      return sheet("feed", s.hour, `${head(pos(i, n, s.tag || ""))}
        <div class="q-body" style="gap:44px">${s.num ? `<div class="q-num" style="font-size:150px">${s.num}</div>` : ""}<div class="q-lead" style="font-size:${s.d || 80}px;line-height:1.04">${s.disp}</div>${s.sub ? `<div class="body" style="max-width:880px">${s.sub}</div>` : ""}${obj}</div>
        ${foot(s.left || null, ARROW)}`);
    },
    "c-three"(s, i, n) {
      return sheet("feed", s.hour, `${head(pos(i, n, s.tag || ""))}
        <div class="q-body" style="gap:40px"><div class="q-lead" style="font-size:${s.d || 70}px;line-height:1.04">${s.disp}</div>
          <div class="three">${s.rows.map(([k, t, x]) => `<div><div class="k">${k}</div><div><div class="t">${t}</div>${x ? `<div class="s">${x}</div>` : ""}</div></div>`).join("")}</div></div>
        ${foot(s.left || null, ARROW)}`);
    },
    "c-pair"(s, i, n) {
      const a = N(s.ns[0]), b = N(s.ns[1]);
      return sheet("feed", s.hour, `${head(pos(i, n, s.tag || ""))}
        <div class="q-body" style="gap:30px;justify-content:space-between;padding:40px 0 34px">
          <div class="q-ar" style="font-size:${s.arS || 150}px;text-align:right;line-height:1.35">${a.ar} ${b.ar}</div>
          <div class="col" style="gap:12px"><div class="q-en" style="font-size:${s.enS || 70}px">${esc(a.en.replace(/^The /, "the "))}, ${esc(b.en.replace(/^The /, "the "))}</div><div class="q-tr">${esc(a.tr)} · ${esc(b.tr)}</div></div>
          <div class="rule"></div>
          <div class="body">${s.line}</div>
          <div class="lbl">${esc(s.ref)}</div></div>
        ${foot(null, ARROW)}`);
    },
    // Jumu'ah, last slide every week: the hour that is answered, and the name to ask by
    "j-hour"(s, i, n) {
      return sheet("feed", s.hour, `${head(pos(i, n, "The hour"))}
        <div class="q-body" style="gap:50px"><div class="q-lead" style="font-size:${s.d || 84}px;line-height:1.04">Ask in the<br><em>last hour.</em></div>
          ${object({ kind: "dial", on: "asr" })}
          <div class="body">“Seek it in the last hour after Asr.” Abu Dawud 1048. The hour on Friday when asking is answered, just before Maghrib, wherever you are.</div>
          <div class="row" style="justify-content:space-between;align-items:center;gap:30px;border-top:1.5px solid var(--rule);padding-top:30px"><div class="lbl" style="line-height:1.5">Ask by<br>this week's name</div><div class="col" style="align-items:flex-end;gap:4px"><div class="q-ar" style="font-size:96px;line-height:1.3">${s.voc}</div><div class="q-tr">${esc(s.vocTr)}</div></div></div></div>
        ${foot(null, "Jumu'ah Mubarak")}`);
    },
    // a list of names met, two columns
    "c-list"(s, i, n) {
      return sheet("feed", s.hour, `${head(pos(i, n, s.tag || ""))}
        <div class="q-body" style="gap:40px"><div class="q-lead" style="font-size:${s.d || 72}px;line-height:1.04">${s.disp}</div>
          <div class="nlist">${s.ns.map((k) => { const x = N(k); return `<div><span class="k">${k}</span><span class="t">${esc(x.tr)}</span><span class="a">${x.ar}</span></div>`; }).join("")}</div></div>
        ${foot(null, ARROW)}`);
    },
    "c-end"(s, i, n) {
      const obj = object(s.obj, 0.9);
      return sheet("feed", s.hour, `${head(pos(i, n, "Save it · send it"))}
        <div class="q-body" style="gap:50px">${obj}<div class="q-lead" style="font-size:${s.d || 86}px;line-height:1.04">${s.disp}</div>${s.sub ? `<div class="body" style="max-width:860px">${s.sub}</div>` : ""}<div class="row" style="gap:44px;color:var(--fg)">${SAVE}${SEND}</div></div>
        ${foot(null, s.foot || F.tagline)}`);
    },
  };

  /* ---------------------------------------------------------------- stories (1080 × 1920, inside 250 / 340) */
  const STORY = {
    "qs-name"(s) {
      const x = N(s.n);
      return sheet("story", s.hour, `${head(s.kicker || "This week")}
        <div class="q-body" style="gap:24px;align-items:center;text-align:center"><div class="q-num" style="font-size:150px">${s.n}</div>${nameBlock(s.n, { ar: 270, en: enSize(x.en, true) - 10 })}<div class="body" style="max-width:800px;margin-top:20px">${s.sub || esc(x.line)}</div></div>
        ${foot()}`);
    },
    "qs-text"(s) {
      const obj = object(s.obj);
      return sheet("story", s.hour, `${head(s.kicker)}
        <div class="q-body" style="gap:${s.gap || 60}px;align-items:center;text-align:center">${s.objLast ? "" : obj}<div class="q-lead" style="font-size:${s.d || 100}px;line-height:1.04">${s.disp}</div>${s.sub ? `<div class="body" style="max-width:820px">${s.sub}</div>` : ""}${s.objLast ? obj : ""}</div>
        ${foot(null, s.foot)}`);
    },
    // a story with a sticker: the words are drawn, the zone below is left empty for the real sticker,
    // placed by hand in the Instagram app. The dashed guide shows on this page only, never in the PNG.
    "qs-stk"(s) {
      const k = s.sticker, Z = { poll: [760, 300], quiz: [800, 560], slider: [760, 260], question: [800, 420], link: [620, 150], reveal: [700, 300] }[k.type];
      const top = k.type === "quiz" && s.n ? `<div class="q-ar" style="font-size:${s.arS || 220}px;line-height:1.25">${N(s.n).ar}</div>` : object(s.obj);
      return sheet("story", s.hour, `${head(s.kicker)}
        <div class="q-body" style="gap:${s.gap || 64}px;align-items:center;text-align:center">${top}<div class="q-lead" style="font-size:${s.d || 92}px;line-height:1.04">${s.disp}</div>${s.sub ? `<div class="body" style="max-width:820px">${s.sub}</div>` : ""}
          <div class="stk-zone" style="width:${Z[0]}px;height:${Z[1]}px"><div class="guide">${esc(k.type)} sticker here</div></div></div>
        ${foot()}`);
    },
  };
  // a story can borrow any feed or slide kind's look: the hour dial, the months, the three ways
  STORY["qs-obj"] = (s) => {
    const obj = object(s.obj);
    return sheet("story", s.hour, `${head(s.kicker)}
      <div class="q-body" style="gap:${s.gap || 64}px"><div class="q-lead" style="font-size:${s.d || 96}px;line-height:1.04;${s.center ? "text-align:center" : ""}">${s.disp}</div>${obj}${s.sub ? `<div class="body" style="${s.center ? "text-align:center;" : ""}">${s.sub}</div>` : ""}</div>
      ${foot(null, s.foot)}`);
  };

  window.QUIET_DRAW = { FEED, SLIDE, STORY, setNow: (n) => (CTX.now = n), hijri, short, long, plain };
  if (!document.getElementById("cal")) return;   // reel.html borrows the kinds and leaves here

  /* ---------------------------------------------------------------- the day */
  const DAYS = D.days;
  const nowFor = (d) => (D.weeks.find((w) => d.date >= w.from && d.date <= w.to) || D.weeks[0]).n;
  const weekOf = (d) => D.weeks.find((w) => d.date >= w.from && d.date <= w.to) || D.weeks[0];
  const with_ = (s, h) => Object.assign({}, s, { hour: s.hour || h });
  const slug = (s) => plain(s).replace(/[^\w\s'-]+/g, "").replace(/\s+/g, " ").trim();
  const folder = (d) => `${d.date} ${short(d.date).slice(0, 3)} - ${slug(d.post ? d.post.title : "stories")}`;

  function sheetHTML(html, w, h, cls, name, label) {
    return `<div class="sheet ${cls}" data-w="${w}" data-h="${h}" data-name="${esc(name)}"><div class="fit"><div class="inner">${html}</div></div>
      <div class="cap"><span>${label}</span><button type="button" data-dl-one>PNG</button></div></div>`;
  }
  function stickerText(k) {
    if (k.type === "poll") return `Poll sticker over the empty zone. Leave its question blank; options: “${k.opts[0]}” / “${k.opts[1]}”.`;
    if (k.type === "quiz") return `Quiz sticker over the empty zone. Question: “${k.q || "Which name is this?"}” Options: ${k.opts.map((o, i) => `“${o}”${i === k.ok ? " (correct)" : ""}`).join(" / ")}. If the quiz sticker is missing on your phone, use a poll with the first two.`;
    if (k.type === "slider") return `Emoji slider over the empty zone. Question: “${k.q}” Emoji: ${k.emoji}.`;
    if (k.type === "question") return `Question sticker over the empty zone: “${k.q}”`;
    if (k.type === "reveal") return `Reveal sticker over the empty zone. Hint: “${k.q}”`;
    if (k.type === "link") return `Link sticker over the empty zone → ${k.url}, text “${k.label}”.`;
    return "";
  }
  function renderDay(d) {
    CTX.now = nowFor(d);
    const p = d.post, wk = weekOf(d);
    let sheets = "", label = "", kind = "";
    if (p) {
      if (p.type === "carousel") {
        const n = p.slides.length;
        sheets = p.slides.map((s, i) => sheetHTML(SLIDE[s.kind](with_(s, p.hour), i + 1, n), 1080, 1350, "slide", `${folder(d)} - slide ${i + 1} of ${n}`, `${i + 1} of ${n}`)).join("");
        label = `Carousel · ${n} slides · 1080 × 1350`; kind = "Carousel";
      } else if (p.type === "reel") {
        sheets = sheetHTML(FEED.cover(with_(p.cover, p.hour)), 1080, 1920, "one cov", `${folder(d)} - reel cover`, "Reel cover · 1080 × 1920 · grid shows the centre 3:4");
        label = `Reel · ${p.reel.len}s · 1080 × 1920`; kind = "Reel";
      } else {
        sheets = sheetHTML(FEED[p.feed.kind](with_(p.feed, p.hour)), 1080, 1350, "one", `${folder(d)} - post`, "Feed post · 1080 × 1350");
        label = "Single image · 1080 × 1350"; kind = "Single";
      }
    }
    const stories = (d.stories || []).map((s, i) => sheetHTML(STORY[s.kind](with_(s, s.hour || d.storyHour || (p && p.hour) || "dhuhr")), 1080, 1920, "story", `${folder(d)} - story ${i + 1}`, `Story ${i + 1} · ${s.at} · ${s.sticker ? "by hand" : "auto"}`)).join("");
    const stList = (d.stories || []).map((s, i) => `<div class="srow"><div class="when"><b>${esc(s.at)}</b>Story ${i + 1}</div><div>${s.sticker ? `<span class="tag hand">By hand</span> ${esc(stickerText(s.sticker))}` : `<span class="tag auto">Auto-publishes</span> ${esc(s.note || plain(s.disp || (s.n ? N(s.n).tr + ", " + N(s.n).en : "")))}`}</div></div>`).join("");
    const reel = p && p.type === "reel" ? `<div class="board reel"><div class="head"><span class="lblh">The reel · 1080 × 1920 · ${p.reel.len}s · original sound</span>
        <div class="acts"><a class="btn dl" href="out/media/${d.date}/reel.mp4" download="${esc(folder(d))} - reel.mp4">${DOWN} Download reel</a></div></div>
        <div class="rrow"><video src="out/media/${d.date}/reel.mp4" controls playsinline preload="metadata" loop></video>
        <div class="script">${p.reel.script.map((l) => `<div><b>${esc(l[0])}</b> ${esc(l[1])}</div>`).join("")}<div class="note-p" style="margin-top:14px">The first frame is the hook, already on screen at 0s. All text sits inside the reel safe area: 84px from the left, 144px from the right, 250px from the top, 420px from the bottom.</div></div></div></div>` : "";
    const ev = (d.events || []).map((e) => `<span class="tag">${esc(e)}</span>`).join("");
    $("#day").innerHTML = `
      <div class="dayhd"><div class="no">${dateOf(d.date).getDate()}</div>
        <div><div class="ti">${p ? p.title : "Stories only"}</div><div class="meta">${long(d.date)} · ${esc(hijri(d.date))}${p ? ` · post at <b>${esc(p.at)} WAT</b>` : ""}<br>Week of ${esc(N(wk.n).tr)} · ${esc(wk.theme)}${p ? ` · ${HN[p.hour]} palette` : ""}</div>${ev ? `<div class="tags">${ev}</div>` : ""}</div>
        <div class="fmt">${p ? label : ""}<br>${(d.stories || []).length} stor${(d.stories || []).length === 1 ? "y" : "ies"}</div></div>
      ${p ? `<div class="board post"><div class="head"><span class="lblh">${kind === "Carousel" ? "The carousel, in order" : kind === "Reel" ? "The reel cover" : "The post"}</span>
          <div class="acts"><button class="btn dl" type="button" data-dl-post>${DOWN} ${kind === "Carousel" ? `Download all ${p.slides.length} slides` : kind === "Reel" ? "Download cover" : "Download post"}</button><button class="btn" type="button" data-copy>Copy caption</button></div></div>
        <div class="sheets">${sheets}</div></div>` : ""}
      <div class="two">
        ${p ? `<div class="board caption"><div class="head"><span class="lblh">The caption</span><div class="acts"><button class="btn" type="button" data-copy>Copy caption</button></div></div>
          <pre>${esc(p.caption.trim())}</pre>
          <div class="note-p">Why ${kind.toLowerCase() === "single" ? "a single image" : "a " + kind.toLowerCase()}: ${esc(p.fmt)}</div>
          ${p.why ? `<div class="note-p">Why this post: ${esc(p.why)}</div>` : ""}
          <div class="note-p">Alt text: ${esc((p.alt || []).join(" | "))}</div>
          ${p.hand ? `<div class="note-p">By hand after it goes live: ${esc(p.hand)}</div>` : ""}</div>` : `<div class="board"><div class="head"><span class="lblh">A stories-only day</span></div><p class="lede" style="margin:0">${esc(d.why || "No feed post today. The stories keep the people who follow close; the feed stays quiet.")}</p></div>`}
        <div class="stack">${stories ? `<div class="board"><div class="head"><span class="lblh">Stories · 1080 × 1920</span><div class="acts"><button class="btn dl" type="button" data-dl-stories>${DOWN} Download ${(d.stories || []).length > 1 ? "all stories" : "story"}</button></div></div><div class="sheets" style="justify-content:flex-start">${stories}</div><div class="stories-list" style="margin-top:18px">${stList}</div></div>` : ""}${reel}</div>
      </div>`;
    fitAll(); bind(d);
    $$(".cal .d[data-date]").forEach((b) => b.classList.toggle("cur", b.dataset.date === d.date));
  }
  function fitAll() {
    $$(".sheet").forEach((sh) => { const w = +sh.dataset.w, h = +sh.dataset.h, fit = $(".fit", sh), W = fit.clientWidth || w, s = W / w; fit.style.height = Math.round(h * s) + "px"; $(".inner", fit).style.transform = `scale(${s})`; });
  }
  addEventListener("resize", fitAll);

  /* ---------------------------------------------------------------- export */
  const NOGUIDE = (node) => !(node.classList && node.classList.contains("guide"));
  async function renderOne(sh) {
    const c = $(".canvas", sh);
    await document.fonts.ready;
    return Promise.race([
      htmlToImage.toPng(c, { width: c.offsetWidth, height: c.offsetHeight, canvasWidth: c.offsetWidth, canvasHeight: c.offsetHeight, pixelRatio: 1, skipAutoScale: true, cacheBust: false, filter: NOGUIDE }),
      new Promise((_, bad) => setTimeout(() => bad(new Error("render timed out")), 90000)),
    ]);
  }
  function save(url, name) { const a = document.createElement("a"); a.download = name; a.href = url; document.body.appendChild(a); a.click(); a.remove(); }
  async function exportMany(list, zipName, btn) {
    const label = btn.innerHTML; btn.disabled = true;
    try {
      if (list.length > 1 && window.JSZip) {
        const zip = new JSZip();
        for (let i = 0; i < list.length; i++) { btn.textContent = `Rendering ${i + 1} of ${list.length}`; zip.file(list[i].dataset.name + ".png", (await renderOne(list[i])).split(",")[1], { base64: true }); }
        btn.textContent = "Packing"; save(URL.createObjectURL(await zip.generateAsync({ type: "blob" })), zipName + ".zip");
      } else {
        for (let i = 0; i < list.length; i++) { btn.textContent = "Rendering"; save(await renderOne(list[i]), list[i].dataset.name + ".png"); await new Promise((r) => setTimeout(r, 400)); }
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
      const text = d.post.caption.trim();
      try { await navigator.clipboard.writeText(text); } catch (e) { const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove(); }
      toast("Caption copied");
    }));
  }
  let toastT; function toast(m) { const t = $("#toast"); t.textContent = m; t.classList.add("on"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("on"), 2200); }

  /* ---------------------------------------------------------------- the calendar */
  const GP = { fajr: "linear-gradient(135deg,#F6DCCF,#C9DBE6)", morning: "linear-gradient(135deg,#F4EEE4,#F1D9A6)", dhuhr: "linear-gradient(135deg,#F4EEE4,#F2CFC0)", asr: "linear-gradient(135deg,#EFD9B8,#A9BFA6)", maghrib: "linear-gradient(135deg,#8A4F3F,#3E3A58)", isha: "linear-gradient(135deg,#2A2F44,#171A26)" };
  const byDate = new Map(DAYS.map((d) => [d.date, d]));
  const iso = (t) => `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
  let cal = `<div class="hd w"></div>${["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((x) => `<div class="hd">${x}</div>`).join("")}`;
  for (const w of D.weeks) {
    const x = N(w.n);
    cal += `<div class="wk"><div class="h">Week ${w.i} · No. ${nnum(w.n)}</div><div class="n">${esc(x.tr)}</div><div class="h" style="margin-top:4px;letter-spacing:.06em;text-transform:none">${esc(w.theme)}</div></div>`;
    const mon = dateOf(w.mon);
    for (let k = 0; k < 7; k++) {
      const t = new Date(mon); t.setDate(mon.getDate() + k); const ds = iso(t), d = byDate.get(ds);
      const out = ds < D.start || ds > D.end;
      if (!d) { cal += `<div class="d off"><div class="dt"><span>${t.getDate()} ${MON[t.getMonth()]}</span></div>${out ? `<div class="hj">${ds < D.start ? "Before the season" : ""}</div>` : ""}</div>`; continue; }
      const p = d.post;
      cal += `<button type="button" class="d" data-date="${ds}"><div class="dt"><span>${t.getDate()} ${MON[t.getMonth()]}</span>${p ? `<span>${esc(p.at)}</span>` : ""}</div>
        ${p ? `<div class="chip ${isDark(p.hour) ? "dark" : ""}" style="background:${GP[p.hour]}"><small>${p.type === "single" ? "Single" : p.type === "reel" ? "Reel" : `Carousel · ${p.slides.length}`}</small>${esc(plain(p.title))}</div>` : ""}
        ${(d.stories || []).length ? `<div class="st">${d.stories.length} stor${d.stories.length === 1 ? "y" : "ies"}</div>` : ""}${(d.events || []).length ? `<div class="ev">${esc(d.events[0])}</div>` : ""}</button>`;
    }
  }
  $("#cal").innerHTML = cal;
  $$(".cal .d[data-date]").forEach((b) => b.addEventListener("click", () => go(DAYS.findIndex((d) => d.date === b.dataset.date), "scroll")));

  const sel = $("#pick");
  sel.innerHTML = D.weeks.map((w) => `<optgroup label="Week ${w.i} · ${N(w.n).tr}">` + DAYS.filter((d) => d.date >= w.from && d.date <= w.to).map((d, k) => `<option value="${DAYS.indexOf(d)}">${short(d.date)} · ${d.post ? plain(d.post.title) : "Stories"}</option>`).join("") + "</optgroup>").join("");
  let cur = 0;
  function todayI() { const t = iso(new Date()); const i = DAYS.findIndex((d) => d.date >= t); return t >= D.start && t <= D.end && i >= 0 ? i : null; }
  function go(i, push) {
    i = Math.min(DAYS.length - 1, Math.max(0, i)); cur = i; sel.value = String(i);
    $("#prev").disabled = i === 0; $("#next").disabled = i === DAYS.length - 1;
    renderDay(DAYS[i]);
    const hash = `#${DAYS[i].date}`;
    if (push !== false && location.hash !== hash) history.replaceState(null, "", hash);
    if (push === "scroll") $("#day").scrollIntoView({ behavior: "smooth", block: "start" });
  }
  sel.addEventListener("change", () => go(+sel.value));
  $("#prev").addEventListener("click", () => go(cur - 1)); $("#next").addEventListener("click", () => go(cur + 1));
  const ti = todayI(), tb = $("#todayBtn"); if (ti != null) tb.addEventListener("click", () => go(ti)); else tb.hidden = true;
  addEventListener("hashchange", () => { const i = DAYS.findIndex((d) => "#" + d.date === location.hash); if (i >= 0 && i !== cur) go(i, false); });
  addEventListener("keydown", (e) => { if (e.target.matches("input,textarea,select")) return; if (e.key === "ArrowLeft") go(cur - 1); if (e.key === "ArrowRight") go(cur + 1); });
  const hi = DAYS.findIndex((d) => "#" + d.date === location.hash);
  go(hi >= 0 ? hi : ti != null ? ti : 0, false);
  window.QUIET_PAGE = { go, renderOne, days: DAYS, current: () => cur, folder };
})();
