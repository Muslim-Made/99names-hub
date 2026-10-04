// THE QUIET MONTHS · the schedule, for Metricool.
//
//   node schedule.mjs [--base https://brand.99names.net/social/quiet/out/media] [--template metricool.csv]
//
// Reads data.js and the checked exports (_check/export, reels/), and writes out/:
//   media/<date>/…jpg|mp4   every sheet as an sRGB JPEG (the Graph API takes JPEG only), every reel
//   metricool-01.csv …      Metricool's bulk import, 50 rows or fewer per file, oldest first
//   manifest.json           the same schedule as data, for the Metricool MCP or anything else
//   metricool.zip           the CSVs, for the planner's download button
// One row per feed post, carousel or reel; one row per story frame. A story that carries a sticker
// is written as a DRAFT at its time, so Metricool holds it for you to finish on your phone instead
// of publishing it bare. The brand's timezone in Metricool must be Africa/Lagos: the CSV has no
// timezone column and every time here is WAT.
//
// Column names follow Metricool's help article. If you download the real template from Metricool
// (Planner → Import → Download template) and pass it with --template, its header row is used as is
// and every value is placed by column name, so a renamed or reordered column can't shift the data.
import fs from "node:fs"; import path from "node:path"; import { execFileSync } from "node:child_process";
const HERE = path.dirname(new URL(import.meta.url).pathname);
const arg = (k, d) => (process.argv.includes(k) ? process.argv[process.argv.indexOf(k) + 1] : d);
const BASE = arg("--base", "https://brand.99names.net/social/quiet/out/media").replace(/\/$/, "");
global.window = {}; eval(fs.readFileSync(path.join(HERE, "../kit/names.js"), "utf8")); eval(fs.readFileSync(path.join(HERE, "data.js"), "utf8"));
const Q = window.QUIET, OUT = path.join(HERE, "out"), MEDIA = path.join(OUT, "media"), EX = path.join(HERE, "_check", "export");
fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(MEDIA, { recursive: true });

const ANNEX = ["Text", "Date", "Time", "Draft", "Facebook", "Twitter/X", "LinkedIn", "GBP", "Instagram", "Pinterest", "TikTok", "YouTube", "Threads", "Bluesky",
  ...Array.from({ length: 10 }, (_, i) => `Picture Url ${i + 1}`), ...Array.from({ length: 10 }, (_, i) => `Alt text picture ${i + 1}`),
  "Document title", "Shortener", "Video Thumbnail Url", "Video Cover Frame", "Instagram Post Type", "Instagram Show Reel On Feed", "First Comment Text", "Brand name (Optional)"];
const tpl = arg("--template", null);
const HEAD = tpl ? fs.readFileSync(tpl, "utf8").replace(/^﻿/, "").split(/\r?\n/)[0].split(",").map((h) => h.replace(/^"|"$/g, "").trim()) : ANNEX;
const NETWORKS = ["Facebook", "Twitter/X", "LinkedIn", "GBP", "Instagram", "Pinterest", "TikTok", "YouTube", "Threads", "Bluesky"];

// PNG → sRGB JPEG, quality 92, through Pillow (already used by the thirty's contact sheets)
const jobs = [];
const jpg = (src, dest) => { jobs.push([src, dest]); return dest; };
const plain = (h) => String(h || "").replace(/<br>/g, " ").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
const rows = [], manifest = [], missing = [];
const need = (p) => { if (!fs.existsSync(p)) missing.push(path.relative(HERE, p)); return p; };

for (const d of Q.days) {
  const dir = path.join(MEDIA, d.date); fs.mkdirSync(dir, { recursive: true });
  const url = (f) => `${BASE}/${d.date}/${path.basename(f)}`;
  const p = d.post;
  if (p) {
    const r = { Date: d.date, Time: p.at + ":00", Draft: "FALSE", Instagram: "TRUE", Text: p.caption.trim() };
    if (p.type === "reel") {
      const mp4 = need(path.join(HERE, "reels", `${d.date}.mp4`)), dst = path.join(dir, "reel.mp4");
      if (fs.existsSync(mp4)) fs.copyFileSync(mp4, dst);
      const cover = jpg(need(path.join(EX, `${d.date}-cover.png`)), path.join(dir, "cover.jpg"));
      Object.assign(r, { "Picture Url 1": url(dst), "Video Thumbnail Url": url(cover), "Instagram Post Type": "REEL", "Instagram Show Reel On Feed": "TRUE" });
      manifest.push({ date: d.date, time: p.at, tz: "Africa/Lagos", type: "REEL", title: plain(p.title), media: [url(dst)], cover: url(cover), caption: p.caption.trim(), alt: p.alt });
    } else {
      const files = p.type === "carousel" ? p.slides.map((_, i) => jpg(need(path.join(EX, `${d.date}-slide${String(i + 1).padStart(2, "0")}.png`)), path.join(dir, `slide-${String(i + 1).padStart(2, "0")}.jpg`))) : [jpg(need(path.join(EX, `${d.date}-post.png`)), path.join(dir, "post.jpg"))];
      if (files.length > 10) throw new Error(`${d.date}: ${files.length} slides; the API takes 10 at most`);
      files.forEach((f, i) => { r[`Picture Url ${i + 1}`] = url(f); r[`Alt text picture ${i + 1}`] = (p.alt || [])[i] || ""; });
      r["Instagram Post Type"] = "POST";
      manifest.push({ date: d.date, time: p.at, tz: "Africa/Lagos", type: p.type === "carousel" ? "CAROUSEL" : "POST", title: plain(p.title), media: files.map(url), caption: p.caption.trim(), alt: p.alt });
    }
    rows.push(r);
  }
  (d.stories || []).forEach((s, i) => {
    const f = jpg(need(path.join(EX, `${d.date}-story${i + 1}.png`)), path.join(dir, `story-${i + 1}.jpg`));
    const k = s.sticker;
    rows.push({ Date: d.date, Time: s.at + ":00", Draft: k ? "TRUE" : "FALSE", Instagram: "TRUE", Text: "", "Picture Url 1": url(f), "Instagram Post Type": "STORY" });
    manifest.push({ date: d.date, time: s.at, tz: "Africa/Lagos", type: "STORY", by: k ? "hand" : "auto", sticker: k || null, media: [url(f)] });
  });
}
if (missing.length) { console.log(`missing ${missing.length} files (run check.mjs and reels.mjs first):\n  ` + missing.slice(0, 12).join("\n  ")); process.exit(1); }

fs.writeFileSync(path.join(HERE, "_check", "jpg-jobs.json"), JSON.stringify(jobs));
execFileSync("python3", ["-c", `
import json
from PIL import Image, ImageCms
srgb = ImageCms.createProfile("sRGB")
for src, dst in json.load(open(${JSON.stringify(path.join(HERE, "_check", "jpg-jobs.json"))})):
    im = Image.open(src).convert("RGB")
    im.save(dst, "JPEG", quality=92, optimize=True, icc_profile=ImageCms.ImageCmsProfile(srgb).tobytes())
print("jpeg", len(json.load(open(${JSON.stringify(path.join(HERE, "_check", "jpg-jobs.json"))}))))
`], { stdio: "inherit" });

// CSV: every value quoted, UTF-8 with a BOM so Excel and Metricool both read the Arabic in captions
const cell = (v) => `"${String(v == null ? "" : v).replace(/"/g, '""')}"`;
const line = (r) => HEAD.map((h) => {
  if (h in r) return cell(r[h]);
  if (NETWORKS.includes(h)) return cell("FALSE");
  return cell("");
}).join(",");
rows.sort((a, b) => (a.Date + a.Time).localeCompare(b.Date + b.Time));
const files = [];
for (let i = 0; i < rows.length; i += 50) {
  const name = `metricool-${String(i / 50 + 1).padStart(2, "0")}.csv`;
  fs.writeFileSync(path.join(OUT, name), "﻿" + [HEAD.map(cell).join(","), ...rows.slice(i, i + 50).map(line)].join("\r\n") + "\r\n");
  files.push(`${name}: ${rows[i].Date} to ${rows[Math.min(rows.length, i + 50) - 1].Date}, ${Math.min(50, rows.length - i)} rows`);
}
fs.writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify({ brandTimezone: "Africa/Lagos", base: BASE, items: manifest }, null, 1));
execFileSync("zip", ["-q", "-j", path.join(OUT, "metricool.zip"), ...fs.readdirSync(OUT).filter((f) => f.endsWith(".csv")).map((f) => path.join(OUT, f)), path.join(OUT, "manifest.json")]);
const posts = manifest.filter((m) => m.type !== "STORY").length, st = manifest.filter((m) => m.type === "STORY"), hand = st.filter((m) => m.by === "hand").length;
console.log(`${rows.length} rows: ${posts} posts, ${st.length} stories (${st.length - hand} auto, ${hand} drafts for stickers)`);
files.forEach((f) => console.log("  " + f));
console.log("media under", BASE);
