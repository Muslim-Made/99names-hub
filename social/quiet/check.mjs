// THE QUIET MONTHS · check.
//
//   node check.mjs [--day 2026-10-19] [--no-export] [--no-contrast]
//
// The First Thirty's checker, with the quiet months' own rules. Serves brand/ locally, opens the
// planner in headless Chrome over CDP (no npm), walks every day and reads each sheet back:
//   · fonts resolved; nothing outside its sheet; no headline wrapped past its written breaks
//   · nothing meant to be read under 22px (18px inside a printed card, phone or envelope)
//   · stories and reel covers keep every word inside Instagram's own bars: 250px from the top,
//     340px from the bottom; feed posts keep every word inside the grid's 3:4 crop
//   · no two blocks overlap
//   · TEXT NEVER SITS ON A DRAWN THING. The sheet is rasterised twice with every word hidden:
//     once as drawn, once with the rays, cards, dots, dial and rules hidden too. Under every line
//     of free text the two must be the same picture. Any difference is a drawn thing under a word.
//   · contrast: the pixels under each line against the text colour, 4.5:1, or 3:1 from 32px up
// Then every sheet is exported exactly as the download button exports it, into _check/export/.
import fs from "node:fs"; import path from "node:path"; import { spawn } from "node:child_process";
const HERE = path.dirname(new URL(import.meta.url).pathname), ROOT = path.resolve(HERE, "../..");
const OUT = path.join(HERE, "_check", "export"); fs.mkdirSync(OUT, { recursive: true });
const args = process.argv.slice(2);
const only = args.includes("--day") ? args[args.indexOf("--day") + 1].split(",") : null;
const doExport = !args.includes("--no-export"), doContrast = !args.includes("--no-contrast");
const PORT = 8747, DBG = 9600 + Math.floor(Math.random() * 50), dir = `${process.env.TMPDIR || "/tmp"}/nn-qcheck-${DBG}`;
const server = spawn("python3", ["-m", "http.server", String(PORT), "--bind", "127.0.0.1"], { cwd: ROOT, stdio: "ignore" });
const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", ["--headless=new", `--remote-debugging-port=${DBG}`, "--window-size=1440,2200", "--hide-scrollbars", "--no-first-run", `--user-data-dir=${dir}`, "about:blank"], { stdio: "ignore" });
process.on("exit", () => { chrome.kill(); server.kill(); try { fs.rmSync(dir, { recursive: true, force: true }); } catch (e) {} });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let targets; for (let i = 0; i < 40; i++) { try { targets = await (await fetch(`http://127.0.0.1:${DBG}/json`)).json(); break; } catch (e) { await sleep(250); } }
const ws = new WebSocket(targets.find((t) => t.type === "page").webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r));
let id = 0; const waiting = new Map(); const errors = [];
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && waiting.has(d.id)) { waiting.get(d.id)(d); waiting.delete(d.id); } else if (d.method === "Runtime.exceptionThrown") errors.push(d.params.exceptionDetails.text + " " + (d.params.exceptionDetails.exception?.description || "").slice(0, 200)); else if (d.method === "Log.entryAdded" && d.params.entry.level === "error") errors.push(d.params.entry.text.slice(0, 200)); };
const send = (method, params = {}) => new Promise((r) => { const i = ++id; waiting.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (expr) => { const r = await send("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true }); if (r.result.exceptionDetails) throw new Error(r.result.exceptionDetails.text + " " + (r.result.exceptionDetails.exception?.description || "")); return r.result.result.value; };
await send("Runtime.enable"); await send("Log.enable"); await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 2200, deviceScaleFactor: 1, mobile: false });   // tall enough for a reel cover sheet whole
await sleep(800);
await send("Page.navigate", { url: `http://127.0.0.1:${PORT}/social/quiet/index.html` }); await sleep(1500);
for (let i = 0; i < 120 && !(await ev("!!(window.QUIET_PAGE && window.htmlToImage)")); i++) await sleep(500);
if (!(await ev("!!window.QUIET_PAGE"))) { console.log("page never became ready", errors); process.exit(1); }
const lines = [];
const log = (s) => { console.log(s); lines.push(s); };
log("fonts " + JSON.stringify(await ev(`(async()=>{await document.fonts.ready;return ["300 16px Fraunces","italic 400 16px Fraunces","300 16px 'DM Sans'","500 16px 'DM Sans'","600 16px 'Scheherazade New'"].map(f=>[f,document.fonts.check(f)])})()`)));
log("page horizontal overflow px: " + await ev("document.documentElement.scrollWidth - document.documentElement.clientWidth"));

const INSPECT = `(async (doContrast) => {
  const TEXT = (el) => Array.from(el.childNodes).some((n) => n.nodeType === 3 && n.textContent.trim());
  const OBJ = ".card,.env,.phone";
  const ORN = ".ring,.breath,.l99,.g99,.dial,.months .d,.root i,.card,.env,.phone,.rule,.playmark i";
  const lum = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const ratio = (a, b) => { const A = lum(a), B = lum(b); return (Math.max(A, B) + 0.05) / (Math.min(A, B) + 0.05); };
  const parse = (c) => { const m = c.match(/[\\d.]+/g).map(Number); return { rgb: m.slice(0, 3), a: m.length > 3 ? m[3] : 1 }; };
  const NOGUIDE = (node) => !(node.classList && node.classList.contains("guide"));
  const snap = (c) => htmlToImage.toCanvas(c, { width: c.offsetWidth, height: c.offsetHeight, canvasWidth: c.offsetWidth, canvasHeight: c.offsetHeight, pixelRatio: 1, skipAutoScale: true, cacheBust: false, filter: NOGUIDE });
  const out = [];
  for (const sh of document.querySelectorAll(".sheet")) {
    sh.scrollIntoView({ block: "start", behavior: "instant" }); await new Promise((r) => requestAnimationFrame(() => r()));   // elementFromPoint only sees the viewport
    const c = sh.querySelector(".canvas"), name = sh.dataset.name, cr = c.getBoundingClientRect(), s = cr.width / c.offsetWidth, issues = [];
    const tall = c.offsetHeight > 1500, W = c.offsetWidth, H = c.offsetHeight;
    const texts = Array.from(c.querySelectorAll("*")).filter((el) => TEXT(el) && el.getBoundingClientRect().width > 0 && !el.closest(".guide"));
    const zones = Array.from(c.querySelectorAll(".stk-zone")).map((z) => z.getBoundingClientRect());
    const local = (r) => ({ l: (r.left - cr.left) / s, t: (r.top - cr.top) / s, r: (r.right - cr.left) / s, b: (r.bottom - cr.top) / s });
    for (const el of texts) {
      const r = el.getBoundingClientRect(), L = local(r), cs = getComputedStyle(el), fs = parseFloat(cs.fontSize), cls = (el.className && String(el.className).split(" ")[0]) || el.tagName.toLowerCase(), t = el.textContent.trim().slice(0, 36), inObj = !!el.closest(OBJ);
      if (L.l < -1 || L.r > W + 1 || L.t < -1 || L.b > H + 1) issues.push("outside sheet: " + cls + " \\"" + t + "\\"");
      for (const z of zones) if (Math.min(r.right, z.right) - Math.max(r.left, z.left) > 2 && Math.min(r.bottom, z.bottom) - Math.max(r.top, z.top) > 2) issues.push("text inside the sticker zone: " + cls + " \\"" + t + "\\"");
      if (fs < (inObj ? 18 : 22)) issues.push("small type " + fs + "px: " + cls + " \\"" + t + "\\"");
      if (!inObj && tall && (L.t < 249 || L.b > H - 339)) issues.push("outside the story safe area (" + Math.round(L.t) + "–" + Math.round(L.b) + "): " + cls + " \\"" + t + "\\"");
      if (!inObj && !tall && (L.l < 60 || L.r > W - 60)) issues.push("outside the grid's 3:4 crop: " + cls + " \\"" + t + "\\"");
      if (/^(disp|line|q-lead|q-en|q-trans)$/.test(cls) && el.innerHTML.includes("<br")) {
        const want = (el.innerHTML.match(/<br/g) || []).length + 1, lh = parseFloat(cs.lineHeight), got = Math.round(r.height / s / lh);
        if (got > want) issues.push("wrapped past its breaks (" + got + " for " + want + "): \\"" + t + "\\"");
      }
      if (el.scrollWidth > el.clientWidth + 1 && cs.whiteSpace === "nowrap") issues.push("nowrap overflow: " + cls + " \\"" + t + "\\"");
    }
    const blocks = Array.from(c.querySelectorAll(".q-head,.q-foot,.q-lead,.q-en,.q-ar,.q-tr,.q-num,.q-trans,.body,.lbl,.rule,.root,.fam,.idx-list,.nlist,.verse,.three,.months,.dial,.g99,.cell,.card,.env,.phone,.breath,.row,.col,.mg,.stk-zone")).filter((el) => el.getBoundingClientRect().height > 0).filter((el, i, a) => !a.some((o) => o !== el && o.contains(el)));
    for (let i = 0; i < blocks.length; i++) for (let j = i + 1; j < blocks.length; j++) {
      const A = blocks[i].getBoundingClientRect(), B = blocks[j].getBoundingClientRect();
      const ox = Math.min(A.right, B.right) - Math.max(A.left, B.left), oy = Math.min(A.bottom, B.bottom) - Math.max(A.top, B.top);
      if (ox > 4 && oy > 4 && !blocks[i].classList.contains("fanq") && !blocks[j].classList.contains("fanq")) issues.push("overlap: " + String(blocks[i].className).split(" ")[0] + " / " + String(blocks[j].className).split(" ")[0]);
    }
    const info = texts.map((el) => {
      const ls = [];
      for (const nd of el.childNodes) if (nd.nodeType === 3 && nd.textContent.trim()) { const rg = document.createRange(); rg.selectNodeContents(nd); for (const lr of rg.getClientRects()) if (lr.width > 2 && lr.height > 2) ls.push(lr); }
      return { el, col: parse(getComputedStyle(el).color), fs: parseFloat(getComputedStyle(el).fontSize), fw: +getComputedStyle(el).fontWeight, lines: ls, t: el.textContent.trim().slice(0, 36), inObj: !!el.closest(OBJ), cls: (el.className && String(el.className).split(" ")[0]) || el.tagName.toLowerCase() };
    });
    for (const it of info) it.lines = it.lines.filter((lr) => { const hit = document.elementFromPoint(lr.left + lr.width / 2, lr.top + lr.height / 2); return hit && (hit === it.el || it.el.contains(hit)); });
    texts.forEach((el) => { el.dataset.oc = el.style.cssText; el.style.setProperty("color", "transparent", "important"); el.style.setProperty("-webkit-text-fill-color", "transparent", "important"); });
    let drawn, bare;
    const orn = Array.from(c.querySelectorAll(ORN));
    try {
      drawn = await snap(c);
      orn.forEach((el) => { el.dataset.ov = el.style.visibility; el.style.visibility = "hidden"; });
      bare = await snap(c);
    } finally {
      orn.forEach((el) => { el.style.visibility = el.dataset.ov || ""; delete el.dataset.ov; });
      texts.forEach((el) => { el.style.cssText = el.dataset.oc; delete el.dataset.oc; });
    }
    const dx = drawn.getContext("2d", { willReadFrequently: true }), bx = bare.getContext("2d", { willReadFrequently: true });
    let worst = 99, worstT = "", under = 0;
    for (const it of info) {
      if (it.col.a === 0 || !it.lines.length) continue;
      const need = it.fs >= 32 || (it.fs >= 24 && it.fw >= 500) ? 3 : 4.5;
      let minR = 99, hit = 0;
      for (const lr of it.lines) {
        const x0 = Math.max(0, Math.round((lr.left - cr.left) / s)), y0 = Math.max(0, Math.round((lr.top - cr.top) / s)), w = Math.min(drawn.width - x0, Math.round(lr.width / s)), h = Math.min(drawn.height - y0, Math.round(lr.height / s));
        if (w < 2 || h < 2) continue;
        const cols = Math.max(1, Math.min(10, Math.round(w / 80)));
        for (let cx = 0; cx < cols; cx++) {
          const cw = Math.floor(w / cols), d = dx.getImageData(x0 + cx * cw, y0, cw, h).data, e = bx.getImageData(x0 + cx * cw, y0, cw, h).data;
          let R = 0, G = 0, B = 0, n = 0, diff = 0, peak = 0;
          for (let p = 0; p < d.length; p += 16) { R += d[p]; G += d[p + 1]; B += d[p + 2]; n++; const dd = (Math.abs(d[p] - e[p]) + Math.abs(d[p + 1] - e[p + 1]) + Math.abs(d[p + 2] - e[p + 2])) / 3; diff += dd; if (dd > peak) peak = dd; }
          if (!it.inObj && (diff / n > 1.5 || peak > 24)) hit++;
          if (doContrast) { const bg = [R / n, G / n, B / n], a = it.col.a, fg = it.col.rgb.map((v, k) => v * a + bg[k] * (1 - a)); minR = Math.min(minR, ratio(fg, bg)); }
        }
      }
      if (hit) { under++; issues.push("text on a drawn thing (" + hit + " cells): " + it.cls + " \\"" + it.t + "\\""); }
      if (doContrast && minR < need) issues.push("contrast " + minR.toFixed(2) + " < " + need + " at " + Math.round(it.fs) + "px: " + it.cls + " \\"" + it.t + "\\"");
      if (minR < worst) { worst = minR; worstT = it.cls + " " + it.t; }
    }
    out.push({ name, issues, worst: worst.toFixed(2), worstT });
  }
  return out;
})(${doContrast})`;

const days = await ev("window.QUIET_PAGE.days.map(d => d.date)");
let problems = 0, sheetsTotal = 0;
for (let i = 0; i < days.length; i++) {
  if (only && !only.includes(days[i])) continue;
  await ev(`window.QUIET_PAGE.go(${i}, false)`); await sleep(350);
  const report = await ev(INSPECT);
  sheetsTotal += report.length;
  for (const r of report) if (r.issues.length) { problems++; log(`!! ${r.name}\n     ${r.issues.join("\n     ")}`); }
  if (doExport) {
    const count = await ev("document.querySelectorAll('.sheet').length");
    for (let k = 0; k < count; k++) {
      const name = await ev(`document.querySelectorAll('.sheet')[${k}].dataset.name`);
      const url = await ev(`window.QUIET_PAGE.renderOne(document.querySelectorAll('.sheet')[${k}])`);
      const kind = /story (\d+)/.test(name) ? "story" + name.match(/story (\d+)/)[1] : /slide (\d+) of/.test(name) ? "slide" + name.match(/slide (\d+) of/)[1].padStart(2, "0") : /reel cover/.test(name) ? "cover" : "post";
      fs.writeFileSync(path.join(OUT, `${days[i]}-${kind}.png`), Buffer.from(url.split(",")[1], "base64"));
    }
  }
  const worst = report.filter((r) => r.worst).sort((a, b) => a.worst - b.worst)[0];
  log(`${days[i]}: ${report.length} sheets, ${report.filter((r) => r.issues.length).length} with issues${worst ? ` · lowest contrast ${worst.worst} (${worst.worstT.slice(0, 40)})` : ""}`);
}
if (errors.length) log("page errors: " + JSON.stringify(errors.slice(0, 6)));
log(problems ? `${problems} of ${sheetsTotal} sheets need attention` : `every one of ${sheetsTotal} sheets reads clean`);
fs.writeFileSync(path.join(HERE, "_check", "report.txt"), lines.join("\n") + "\n");
ws.close(); process.exit(0);
