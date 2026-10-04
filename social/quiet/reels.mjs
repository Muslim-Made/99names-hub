// THE QUIET MONTHS · the reels.
//   node reels.mjs [2026-10-21 ...]      (no dates: every reel in data.js)
// Frames are drawn by reel.html one at a time through headless Chrome (CDP, no npm). Every fifth
// frame is checked: each visible word must sit inside the reel safe area (x 84–936, y 250–1500)
// and must not cross any drawn shape the frame declares in window.ART. A reel that fails is not
// encoded. Sound is written by audio.py from the site's own hour chords; ffmpeg joins them as
// Metricool and the Graph API want a reel: 1080x1920, 30 fps, H.264 yuv420p, AAC 128k at 48 kHz.
import fs from "node:fs"; import path from "node:path"; import { spawn, execFileSync } from "node:child_process";
const HERE = path.dirname(new URL(import.meta.url).pathname), ROOT = path.resolve(HERE, "../..");
global.window = {}; eval(fs.readFileSync(path.join(HERE, "../kit/names.js"), "utf8")); eval(fs.readFileSync(path.join(HERE, "data.js"), "utf8"));
const ALL = window.QUIET.days.filter((d) => d.post && d.post.type === "reel").map((d) => d.date);
const SET = process.argv.slice(2).length ? process.argv.slice(2) : ALL, FPS = 30;
const PORT = 8749, DBG = 9660 + Math.floor(Math.random() * 30), dir = `${process.env.TMPDIR || "/tmp"}/nn-qreel-${DBG}`;
const server = spawn("python3", ["-m", "http.server", String(PORT), "--bind", "127.0.0.1"], { cwd: ROOT, stdio: "ignore" });
const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", ["--headless=new", `--remote-debugging-port=${DBG}`, "--window-size=1080,1920", "--hide-scrollbars", "--no-first-run", `--user-data-dir=${dir}`, "about:blank"], { stdio: "ignore" });
process.on("exit", () => { chrome.kill(); server.kill(); try { fs.rmSync(dir, { recursive: true, force: true }); } catch (e) {} });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let targets; for (let i = 0; i < 40; i++) { try { targets = await (await fetch(`http://127.0.0.1:${DBG}/json`)).json(); break; } catch (e) { await sleep(250); } }
const ws = new WebSocket(targets.find((t) => t.type === "page").webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r));
let id = 0; const waiting = new Map();
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && waiting.has(d.id)) { waiting.get(d.id)(d); waiting.delete(d.id); } };
const send = (method, params = {}) => new Promise((r) => { const i = ++id; waiting.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = (expr) => send("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true }).then((r) => r.result.result.value);
await send("Page.enable"); await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 1080, height: 1920, deviceScaleFactor: 1, mobile: false });
const SAFE = { x0: 83, x1: 937, y0: 249, y1: 1501 };
function clash(w, a) {
  if (a.type === "rect") return Math.min(w.x + w.w, a.x + a.w) - Math.max(w.x, a.x) > 3 && Math.min(w.y + w.h, a.y + a.h) - Math.max(w.y, a.y) > 3;
  const nx = Math.max(w.x, Math.min(a.cx, w.x + w.w)), ny = Math.max(w.y, Math.min(a.cy, w.y + w.h)), near = Math.hypot(nx - a.cx, ny - a.cy);
  const far = Math.max(...[[w.x, w.y], [w.x + w.w, w.y], [w.x, w.y + w.h], [w.x + w.w, w.y + w.h]].map(([x, y]) => Math.hypot(x - a.cx, y - a.cy)));
  return far >= a.r1 && near <= a.r2;
}
fs.mkdirSync(path.join(HERE, "reels"), { recursive: true });
let failed = 0;
for (const date of SET) {
  const frames = path.join(HERE, "_reel", date); fs.rmSync(frames, { recursive: true, force: true }); fs.mkdirSync(frames, { recursive: true });
  await send("Page.navigate", { url: `http://127.0.0.1:${PORT}/social/quiet/reel.html?d=${date}` }); await sleep(2500);
  await ev("document.fonts.ready.then(()=>true)");
  const len = await ev("window.LEN"), hours = await ev("window.HOURS"), n = Math.round(len * FPS), problems = new Set();
  const t0 = Date.now();
  for (let i = 0; i < n; i++) {
    const t = i / FPS;
    await ev(`window.render(${t.toFixed(4)})`);
    if (i % 5 === 0) {
      const { words, art } = await ev("({ words: window.WORDS(), art: window.ART })");
      for (const w of words) {
        if (w.t !== "brand" && (w.x < SAFE.x0 || w.x + w.w > SAFE.x1 || w.y < SAFE.y0 || w.y + w.h > SAFE.y1)) problems.add(`outside the safe area at ${t.toFixed(1)}s: “${w.t}”`);
        if (w.t === "brand" && w.y < SAFE.y0) problems.add(`wordmark above 250px at ${t.toFixed(1)}s`);
        for (const a of art) if (clash(w, a)) problems.add(`“${w.t}” crosses a drawn ${a.type} at ${t.toFixed(1)}s`);
      }
    }
    const shot = await send("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width: 1080, height: 1920, scale: 1 } });
    fs.writeFileSync(path.join(frames, `f${String(i).padStart(4, "0")}.png`), Buffer.from(shot.result.data, "base64"));
  }
  const first = [...problems].slice(0, 8);
  console.log(`${date} (${len}s, ${hours}): ${n} frames in ${((Date.now() - t0) / 1000).toFixed(0)}s · ${problems.size ? problems.size + " problems" : "every word clear"}`);
  if (problems.size) { failed++; first.forEach((p) => console.log("   !! " + p)); continue; }
  fs.copyFileSync(path.join(frames, "f0000.png"), path.join(HERE, "reels", `${date}-frame0.png`));
  const wav = path.join(HERE, "_reel", `${date}.wav`);
  execFileSync("python3", [path.join(HERE, "audio.py"), hours, String(len), wav], { stdio: "inherit" });
  const out = path.join(HERE, "reels", `${date}.mp4`);
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-framerate", String(FPS), "-i", path.join(frames, "f%04d.png"), "-i", wav, "-c:v", "libx264", "-preset", "medium", "-crf", "19", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "128k", "-ar", "48000", "-shortest", "-movflags", "+faststart", out]);
  console.log("  →", path.relative(HERE, out), Math.round(fs.statSync(out).size / 1024), "KB");
  fs.rmSync(frames, { recursive: true, force: true });
}
ws.close(); process.exit(failed ? 1 : 0);
