// hub/shot.mjs — one screenshot from headless Chrome over CDP, no npm. Used by thumbs.py.
//   node shot.mjs <out.png> <url> [--w 1440] [--h 900] [--wait 3000] [--js "expr"] [--after 1500] [--scroll N] [--full]
import fs from "node:fs";
import { spawn } from "node:child_process";
const a = process.argv.slice(2);
const out = a[0], url = a[1];
const opt = (k, d) => (a.includes(k) ? a[a.indexOf(k) + 1] : d);
const W = +opt("--w", 1440), H = +opt("--h", 900), wait = +opt("--wait", 3000), js = opt("--js", null), after = +opt("--after", 1500), scroll = +opt("--scroll", 0), full = a.includes("--full");
const DBG = 9340 + Math.floor(Math.random() * 50);
const dir = `${process.env.TMPDIR || "/tmp"}/nn-shot-${DBG}`;
const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", ["--headless=new", `--remote-debugging-port=${DBG}`, `--window-size=${W},${H}`, "--hide-scrollbars", "--no-first-run", `--user-data-dir=${dir}`, "about:blank"], { stdio: "ignore" });
process.on("exit", () => { chrome.kill(); try { fs.rmSync(dir, { recursive: true, force: true, maxRetries: 3 }); } catch (e) {} });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let targets; for (let i = 0; i < 40; i++) { try { targets = await (await fetch(`http://127.0.0.1:${DBG}/json`)).json(); break; } catch (e) { await sleep(250); } }
const ws = new WebSocket(targets.find((t) => t.type === "page").webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0; const waiting = new Map(); const errors = [];
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && waiting.has(d.id)) { waiting.get(d.id)(d); waiting.delete(d.id); } else if (d.method === "Runtime.exceptionThrown") errors.push(d.params.exceptionDetails.text + " " + (d.params.exceptionDetails.exception?.description || "")); else if (d.method === "Log.entryAdded" && d.params.entry.level === "error") errors.push(d.params.entry.text); };
const send = (method, params = {}) => new Promise((r) => { const i = ++id; waiting.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
await send("Runtime.enable"); await send("Log.enable"); await send("Page.enable");
await send("Network.setCacheDisabled", { cacheDisabled: true });
await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 1, mobile: W < 700 });
await send("Page.navigate", { url });
await sleep(wait);
if (scroll) { await send("Runtime.evaluate", { expression: `window.scrollTo({top:${scroll},behavior:'instant'})` }); await sleep(900); }
if (js) { const r = await send("Runtime.evaluate", { expression: js, awaitPromise: true, returnByValue: true }); console.log("js:", JSON.stringify(r.result.result.value)); await sleep(after); }
const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: full });
fs.writeFileSync(out, Buffer.from(shot.result.data, "base64"));
const overflow = await send("Runtime.evaluate", { expression: "document.documentElement.scrollWidth - document.documentElement.clientWidth", returnByValue: true });
console.log("overflow:", overflow.result.result.value, "errors:", JSON.stringify(errors));
ws.close(); process.exit(0);
