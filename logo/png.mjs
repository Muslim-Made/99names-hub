// logo/png.mjs — rasterise the SVG masters through headless Chrome (transparent where the SVG is).
//   node png.mjs            # every entry in SET
// Chrome keeps the exact aspect; Quick Look and sips do not.
import fs from "node:fs"; import path from "node:path"; import { spawn } from "node:child_process";
const HERE = path.dirname(new URL(import.meta.url).pathname);
const SET = [["mark-ink",1000],["mark-sand",1000],["wordmark-ink",2000],["wordmark-sand",2000],["lockup-horizontal-ink",2000],["lockup-horizontal-sand",2000],["lockup-stacked-ink",2000],["lockup-tagline-ink",2000],["numeral-ink",2000],["numeral-sand",2000],["signature-arabic-ink",2000],["signature-arabic-sand",2000],["og-image",1200,"og-image-1200x630"],["app-icon",1024],["app-icon",512],["app-icon-night",1024],["avatar",1024],["favicon",16],["favicon",32],["favicon",48],["favicon",180],["favicon",192],["favicon",512]];
const DBG = 9400 + Math.floor(Math.random() * 50), dir = `${process.env.TMPDIR || "/tmp"}/nn-png-${DBG}`;
const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", ["--headless=new", `--remote-debugging-port=${DBG}`, "--window-size=1200,1200", "--hide-scrollbars", "--no-first-run", `--user-data-dir=${dir}`, "about:blank"], { stdio: "ignore" });
process.on("exit", () => { chrome.kill(); try { fs.rmSync(dir, { recursive: true, force: true }); } catch (e) {} });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let targets; for (let i = 0; i < 40; i++) { try { targets = await (await fetch(`http://127.0.0.1:${DBG}/json`)).json(); break; } catch (e) { await sleep(250); } }
const ws = new WebSocket(targets.find((t) => t.type === "page").webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r));
let id = 0; const waiting = new Map(); ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && waiting.has(d.id)) { waiting.get(d.id)(d); waiting.delete(d.id); } };
const send = (method, params = {}) => new Promise((r) => { const i = ++id; waiting.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
await send("Page.enable"); await send("Emulation.setDefaultBackgroundColorOverride", { color: { r: 0, g: 0, b: 0, a: 0 } });
for (const [name, w, outName] of SET) {
  const svg = fs.readFileSync(path.join(HERE, name + ".svg"), "utf8");
  const [, vw, vh] = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
  const h = Math.round((w * vh) / vw);
  await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile: false });
  const html = `<!doctype html><html><body style="margin:0;background:transparent"><img src="data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}" style="display:block;width:${w}px;height:${h}px"></body></html>`;
  await send("Page.navigate", { url: "data:text/html;base64," + Buffer.from(html).toString("base64") }); await sleep(500);
  const shot = await send("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width: w, height: h, scale: 1 } });
  const out = path.join(HERE, "png", (outName || `${name}-${w}`) + ".png");
  fs.writeFileSync(out, Buffer.from(shot.result.data, "base64")); console.log(path.basename(out), w, h);
}
ws.close(); process.exit(0);
