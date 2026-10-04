// THE FIRST THIRTY · check.
//
//   node check.mjs [--day N] [--no-export] [--no-contrast]
//
// Serves brand/ on a local port, opens the page in headless Chrome over CDP
// (no npm), walks every day and reads each sheet back out of the DOM: fonts
// resolved, nothing outside its sheet, no headline wrapped past its written
// breaks, nothing under 18px, no text blocks overlapping, no wall name wider
// than its cell. Then the contrast test: every text element is hidden, the
// sheet is rasterised through the page's own html-to-image path, and the
// pixels under each text box are sampled cell by cell; the text colour
// (alpha composited) must clear WCAG 4.5:1 in every cell, or 3:1 when the
// type is 32px and up. Finally every sheet is exported exactly as the
// download button exports it, into _check/export/, so what is reviewed is
// what gets posted. Never trust the hidden Browser pane for any of this.
import fs from "node:fs"; import path from "node:path"; import { spawn } from "node:child_process";
const HERE = path.dirname(new URL(import.meta.url).pathname), ROOT = path.resolve(HERE, "../..");
const OUT = path.join(HERE, "_check", "export"); fs.mkdirSync(OUT, { recursive: true });
const args = process.argv.slice(2);
const only = args.includes("--day") ? +args[args.indexOf("--day") + 1] : null;
const doExport = !args.includes("--no-export"), doContrast = !args.includes("--no-contrast");
const PORT = 8745, DBG = 9500 + Math.floor(Math.random() * 50), dir = `${process.env.TMPDIR || "/tmp"}/nn-check-${DBG}`;
const server = spawn("python3", ["-m", "http.server", String(PORT), "--bind", "127.0.0.1"], { cwd: ROOT, stdio: "ignore" });
const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", ["--headless=new", `--remote-debugging-port=${DBG}`, "--window-size=1440,900", "--hide-scrollbars", "--no-first-run", `--user-data-dir=${dir}`, "about:blank"], { stdio: "ignore" });
process.on("exit", () => { chrome.kill(); server.kill(); try { fs.rmSync(dir, { recursive: true, force: true }); } catch (e) {} });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let targets; for (let i = 0; i < 40; i++) { try { targets = await (await fetch(`http://127.0.0.1:${DBG}/json`)).json(); break; } catch (e) { await sleep(250); } }
const ws = new WebSocket(targets.find((t) => t.type === "page").webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r));
let id = 0; const waiting = new Map(); const errors = [];
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && waiting.has(d.id)) { waiting.get(d.id)(d); waiting.delete(d.id); } else if (d.method === "Runtime.exceptionThrown") errors.push(d.params.exceptionDetails.text + " " + (d.params.exceptionDetails.exception?.description || "").slice(0, 200)); else if (d.method === "Log.entryAdded" && d.params.entry.level === "error") errors.push(d.params.entry.text.slice(0, 200)); };
const send = (method, params = {}) => new Promise((r) => { const i = ++id; waiting.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (expr) => { const r = await send("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true }); if (r.result.exceptionDetails) throw new Error(r.result.exceptionDetails.text + " " + (r.result.exceptionDetails.exception?.description || "")); return r.result.result.value; };
await send("Runtime.enable"); await send("Log.enable"); await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await sleep(800);
await send("Page.navigate", { url: `http://127.0.0.1:${PORT}/social/thirty/index.html#day-01` }); await sleep(1500);
for (let i = 0; i < 120 && !(await ev("!!(window.THIRTY && window.htmlToImage)")); i++) await sleep(500);   // jszip comes from a CDN; wait for the page to be whole
if (!(await ev("!!window.THIRTY"))) { console.log("page never became ready", errors); process.exit(1); }
const lines = [];
const log = (s) => { console.log(s); lines.push(s); };
log("fonts " + JSON.stringify(await ev(`(async()=>{await document.fonts.ready;return ["300 16px Fraunces","italic 400 16px Fraunces","300 16px 'DM Sans'","500 16px 'DM Sans'","600 16px 'Scheherazade New'"].map(f=>[f,document.fonts.check(f)])})()`)));
log("page horizontal overflow px: " + await ev("document.documentElement.scrollWidth - document.documentElement.clientWidth"));

const INSPECT = `(async (doContrast) => {
  const TEXT = (el) => Array.from(el.childNodes).some((n) => n.nodeType === 3 && n.textContent.trim());
  const lum = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const ratio = (a, b) => { const A = lum(a), B = lum(b); return (Math.max(A, B) + 0.05) / (Math.min(A, B) + 0.05); };
  const parse = (c) => { const m = c.match(/[\\d.]+/g).map(Number); return { rgb: m.slice(0, 3), a: m.length > 3 ? m[3] : 1 }; };
  const out = [];
  for (const sh of document.querySelectorAll(".sheet")) {
    const c = sh.querySelector(".canvas"), name = sh.dataset.name, cr = c.getBoundingClientRect(), s = cr.width / c.offsetWidth, issues = [];
    const texts = Array.from(c.querySelectorAll("*")).filter((el) => TEXT(el) && el.getBoundingClientRect().width > 0);
    for (const el of texts) {
      const r = el.getBoundingClientRect(), cs = getComputedStyle(el), fs = parseFloat(cs.fontSize), cls = (el.className && String(el.className).split(" ")[0]) || el.tagName.toLowerCase(), t = el.textContent.trim().slice(0, 36);
      if (r.left < cr.left - 1 || r.right > cr.right + 1 || r.top < cr.top - 1 || r.bottom > cr.bottom + 1) issues.push("outside sheet: " + cls + " \\"" + t + "\\"");
      if (fs < 18) issues.push("small type " + fs + "px: " + cls + " \\"" + t + "\\"");
      if (/^(disp|line)$/.test(cls) && el.innerHTML.includes("<br")) {
        const want = (el.innerHTML.match(/<br/g) || []).length + 1, lh = parseFloat(cs.lineHeight), got = Math.round(r.height / s / lh);
        if (got > want) issues.push("wrapped past its breaks (" + got + " for " + want + "): \\"" + t + "\\"");
      }
      if (el.scrollWidth > el.clientWidth + 1 && cs.whiteSpace === "nowrap") issues.push("nowrap overflow: " + cls + " \\"" + t + "\\"");
    }
    for (const w of c.querySelectorAll(".wall .w")) if (w.scrollWidth > w.clientWidth + 1) issues.push("wall name wider than its cell: " + w.textContent);
    const blocks = Array.from(c.querySelectorAll(".disp,.line,.body,.note,.lbl,.ar,.card,.env,.phone,.bands,.steps,.opts,.dots,.wall,.poll,.qbox,.play,.breath,.k-top,.k-foot,.idx,.role,.num,.qmark,.linkpill,.pill,.fan")).filter((el) => el.getBoundingClientRect().height > 0).filter((el, i, a) => !a.some((o) => o !== el && o.contains(el)));
    for (let i = 0; i < blocks.length; i++) for (let j = i + 1; j < blocks.length; j++) {
      const A = blocks[i].getBoundingClientRect(), B = blocks[j].getBoundingClientRect();
      const ox = Math.min(A.right, B.right) - Math.max(A.left, B.left), oy = Math.min(A.bottom, B.bottom) - Math.max(A.top, B.top);
      if (ox > 4 && oy > 4 && !blocks[i].classList.contains("fan") && !blocks[j].classList.contains("fan")) issues.push("overlap: " + blocks[i].className.split(" ")[0] + " / " + blocks[j].className.split(" ")[0]);
    }
    if (doContrast) {
      const info = texts.map((el) => {
        const lines = [];
        for (const nd of el.childNodes) if (nd.nodeType === 3 && nd.textContent.trim()) { const rg = document.createRange(); rg.selectNodeContents(nd); for (const lr of rg.getClientRects()) if (lr.width > 2 && lr.height > 2) lines.push(lr); }
        return { el, col: parse(getComputedStyle(el).color), fs: parseFloat(getComputedStyle(el).fontSize), fw: +getComputedStyle(el).fontWeight, lines, t: el.textContent.trim().slice(0, 36), cls: (el.className && String(el.className).split(" ")[0]) || el.tagName.toLowerCase() };
      });
      // a line hidden under another element (a fanned card behind the front card) is not read, so it is not measured
      for (const it of info) it.lines = it.lines.filter((lr) => { const hit = document.elementFromPoint(lr.left + lr.width / 2, lr.top + lr.height / 2); return hit && (hit === it.el || it.el.contains(hit)); });
      texts.forEach((el) => { el.dataset.oc = el.style.cssText; el.style.setProperty("color", "transparent", "important"); el.style.setProperty("-webkit-text-fill-color", "transparent", "important"); });
      let cv;
      try { cv = await htmlToImage.toCanvas(c, { width: c.offsetWidth, height: c.offsetHeight, canvasWidth: c.offsetWidth, canvasHeight: c.offsetHeight, pixelRatio: 1, skipAutoScale: true, cacheBust: false }); }
      finally { texts.forEach((el) => { el.style.cssText = el.dataset.oc; delete el.dataset.oc; }); }
      const ctx = cv.getContext("2d", { willReadFrequently: true });
      let worst = 99, worstT = "";
      for (const it of info) {
        if (it.col.a === 0 || !it.lines.length) continue;
        const need = it.fs >= 32 || (it.fs >= 24 && it.fw >= 500) ? 3 : 4.5;
        let minR = 99;
        for (const lr of it.lines) {
          const x0 = Math.max(0, Math.round((lr.left - cr.left) / s)), y0 = Math.max(0, Math.round((lr.top - cr.top) / s)), w = Math.min(cv.width - x0, Math.round(lr.width / s)), h = Math.min(cv.height - y0, Math.round(lr.height / s));
          if (w < 2 || h < 2) continue;
          const cols = Math.max(1, Math.min(8, Math.round(w / 100)));
          for (let cx = 0; cx < cols; cx++) {
            const cw = Math.floor(w / cols), d = ctx.getImageData(x0 + cx * cw, y0, cw, h).data;
            let R = 0, G = 0, B = 0, n = 0;
            for (let p = 0; p < d.length; p += 16) { R += d[p]; G += d[p + 1]; B += d[p + 2]; n++; }
            const bg = [R / n, G / n, B / n], a = it.col.a, fg = it.col.rgb.map((v, k) => v * a + bg[k] * (1 - a));
            minR = Math.min(minR, ratio(fg, bg));
          }
        }
        if (minR < need) issues.push("contrast " + minR.toFixed(2) + " < " + need + " at " + Math.round(it.fs) + "px: " + it.cls + " \\"" + it.t + "\\"");
        if (minR < worst) { worst = minR; worstT = it.cls + " " + it.t; }
      }
      out.push({ name, issues, worst: worst.toFixed(2), worstT });
    } else out.push({ name, issues });
  }
  return out;
})(${doContrast})`;

const N = await ev("window.THIRTY.days.length");
let problems = 0, sheetsTotal = 0;
for (let n = 1; n <= N; n++) {
  if (only && n !== only) continue;
  await ev(`window.THIRTY.go(${n}, false)`); await sleep(350);
  const report = await ev(INSPECT);
  sheetsTotal += report.length;
  for (const r of report) if (r.issues.length) { problems++; log(`!! ${r.name}\n     ${r.issues.join("\n     ")}`); }
  if (doExport) {
    const count = await ev("document.querySelectorAll('.sheet').length");
    for (let i = 0; i < count; i++) {
      const name = await ev(`document.querySelectorAll('.sheet')[${i}].dataset.name`);
      const url = await ev(`window.THIRTY.renderOne(document.querySelectorAll('.sheet')[${i}])`);
      const kind = /story (\d+)/.test(name) ? "story" + name.match(/story (\d+)/)[1] : /slide (\d+) of/.test(name) ? "slide" + name.match(/slide (\d+) of/)[1].padStart(2, "0") : "post";
      fs.writeFileSync(path.join(OUT, `d${String(n).padStart(2, "0")}-${kind}.png`), Buffer.from(url.split(",")[1], "base64"));
    }
  }
  const worst = report.filter((r) => r.worst).sort((a, b) => a.worst - b.worst)[0];
  log(`day ${String(n).padStart(2, "0")}: ${report.length} sheets, ${report.filter((r) => r.issues.length).length} with issues${worst ? ` · lowest contrast ${worst.worst} (${worst.worstT.slice(0, 40)})` : ""}`);
}
if (errors.length) log("page errors: " + JSON.stringify(errors.slice(0, 6)));
log(problems ? `${problems} of ${sheetsTotal} sheets need attention` : `every one of ${sheetsTotal} sheets reads clean`);
fs.writeFileSync(path.join(HERE, "_check", "report.txt"), lines.join("\n") + "\n");
ws.close(); process.exit(0);
