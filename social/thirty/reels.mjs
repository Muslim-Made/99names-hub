// THE FIRST THIRTY · the four reels.
//   node reels.mjs [1 2 3 4]
// Frames are rendered by reel.html one at a time through headless Chrome (CDP, no npm), the sound
// is written by audio.py from the site's own hour chords, and ffmpeg joins them: 1080x1920, 30 fps,
// H.264 + AAC, the way Instagram wants a reel. Text stays inside the safe area (top 250, bottom 340).
import fs from "node:fs"; import path from "node:path"; import { spawn, execFileSync } from "node:child_process";
const HERE = path.dirname(new URL(import.meta.url).pathname), ROOT = path.resolve(HERE, "../..");
const which = process.argv.slice(2).map(Number).filter(Boolean); const SET = which.length ? which : [1, 2, 3, 4];
const DAY = { 1: 3, 2: 10, 3: 17, 4: 24 }, FPS = 30;
const PORT = 8746, DBG = 9560 + Math.floor(Math.random() * 30), dir = `${process.env.TMPDIR || "/tmp"}/nn-reel-${DBG}`;
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
for (const r of SET) {
  const frames = path.join(HERE, "_reel", `r${r}`); fs.rmSync(frames, { recursive: true, force: true }); fs.mkdirSync(frames, { recursive: true });
  await send("Page.navigate", { url: `http://127.0.0.1:${PORT}/social/thirty/reel.html?r=${r}` }); await sleep(2500);
  await ev("document.fonts.ready.then(()=>true)");
  const len = await ev("window.LEN"), n = len * FPS;
  const t0 = Date.now();
  for (let i = 0; i < n; i++) {
    await ev(`window.render(${(i / FPS).toFixed(4)})`);
    const shot = await send("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width: 1080, height: 1920, scale: 1 } });
    fs.writeFileSync(path.join(frames, `f${String(i).padStart(4, "0")}.png`), Buffer.from(shot.result.data, "base64"));
  }
  console.log(`reel ${r}: ${n} frames in ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  const wav = path.join(HERE, "_reel", `r${r}.wav`);
  execFileSync("python3", [path.join(HERE, "audio.py"), String(r), String(len), wav], { stdio: "inherit" });
  const out = path.join(HERE, "reels", `day-${String(DAY[r]).padStart(2, "0")}.mp4`);
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-framerate", String(FPS), "-i", path.join(frames, "f%04d.png"), "-i", wav, "-c:v", "libx264", "-preset", "medium", "-crf", "19", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "160k", "-shortest", "-movflags", "+faststart", out]);
  console.log("  →", path.relative(HERE, out), Math.round(fs.statSync(out).size / 1024), "KB");
  fs.rmSync(frames, { recursive: true, force: true });
}
ws.close(); process.exit(0);
