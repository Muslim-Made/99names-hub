/* ============================================================
   99NAMES SOCIAL KIT — kit.js
   One place for every fact. Templates stay dumb; this file
   fills them, themes them, and exports them.

   In any template:
     <span data-fact="handle"></span>          → @official99names
     <span class="mark99" data-size="52"></span> → the 99-ray mark
     <span class="rays99 rays99--halo" data-r1="105" data-r2="200" data-w="1"></span>
     data-n="ar|en|tr|line|meaning|root|n|nn|arnum|hour" → filled from
       the picked name (?n=33, the toolbar picker, or this week's name)
     data-hour on .canvas → the palette; toolbar dots switch it live
     data-edit → click to edit on screen (never in export mode)
   ============================================================ */
window.FACTS = {
  url: "99names.net",
  handle: "@official99names",
  tagline: "Light, by name.",
  deckPrice: "$34",
  deckLine: "99 soft-touch cards, dawn to night.",
};

(function () {
  const $ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const isExport = /[?&]export/.test(location.search);
  if (isExport) document.documentElement.classList.add("export");

  /* ---- facts ---- */
  $("[data-fact]").forEach((el) => {
    const v = FACTS[el.dataset.fact];
    if (v != null) el.textContent = v;
  });

  /* ---- the 99-ray mark: a ring of ninety-nine rays, nothing at its centre ---- */
  const NS = "http://www.w3.org/2000/svg";
  function raysSVG(r1, r2, w, dot) {
    const c = 200;
    let lines = "";
    for (let i = 0; i < 99; i++) {
      const a = (i / 99) * Math.PI * 2 - Math.PI / 2;
      lines += `<line x1="${(c + Math.cos(a) * r1).toFixed(2)}" y1="${(c + Math.sin(a) * r1).toFixed(2)}" x2="${(c + Math.cos(a) * r2).toFixed(2)}" y2="${(c + Math.sin(a) * r2).toFixed(2)}"/>`;
    }
    return `<svg xmlns="${NS}" viewBox="0 0 400 400" aria-hidden="true"><g stroke="currentColor" stroke-width="${w}" stroke-linecap="round">${lines}</g>${dot ? '<circle cx="200" cy="200" r="36" fill="currentColor"/>' : ""}</svg>`;
  }
  $(".rays99").forEach((el) => {
    el.innerHTML = raysSVG(+el.dataset.r1 || 110, +el.dataset.r2 || 196, +el.dataset.w || 1.6, false);
  });
  $(".mark99").forEach((el) => {
    const s = +el.dataset.size || 52;
    el.style.width = el.style.height = s + "px";
    el.innerHTML = raysSVG(104, 192, 7, false);
  });

  /* ---- name templating ---- */
  const usesName = document.body.hasAttribute("data-name-template");
  let picked = null;
  function fillName(name) {
    picked = name;
    const h = window.hourForName(name.n);
    const map = {
      ar: name.ar, en: name.en, tr: name.tr, line: name.line, meaning: name.meaning,
      root: name.root, n: String(name.n), nn: String(name.n).padStart(2, "0"),
      arnum: window.arNum(name.n), hour: h,
    };
    $("[data-n]").forEach((el) => {
      const v = map[el.dataset.n];
      if (v != null) el.textContent = v;
    });
    /* re-skin any element that carries data-hour-from-name */
    $("[data-hour-from-name]").forEach((el) => {
      el.className = el.className.replace(/k-card--\w+/, "k-card--" + h);
      if (el.classList.contains("canvas")) el.dataset.hour = h;
    });
    const sel = document.querySelector(".toolbar select[data-names]");
    if (sel) sel.value = String(name.n);
  }
  if (usesName && window.NAMES99) {
    const q = new URLSearchParams(location.search).get("n");
    const n = q ? window.NAMES99[Math.min(99, Math.max(1, +q)) - 1] : window.weeklyName();
    fillName(n);
  }

  /* ---- editing ---- */
  if (!isExport) $("[data-edit]").forEach((el) => el.setAttribute("contenteditable", "true"));

  /* ---- fit canvas to window ---- */
  const canvas = document.querySelector(".canvas");
  const inner = document.querySelector(".stage-inner");
  function fit() {
    if (isExport || !canvas || !inner) return;
    const pad = 110;
    const s = Math.min((innerWidth - pad) / canvas.offsetWidth, (innerHeight - pad) / canvas.offsetHeight, 1);
    inner.style.transform = `scale(${s})`;
    inner.style.transformOrigin = "center center";
    inner.style.margin = s < 1 ? `${(canvas.offsetHeight * (s - 1)) / 2}px ${(canvas.offsetWidth * (s - 1)) / 2}px` : "0";
  }
  addEventListener("resize", fit);
  fit();

  /* ---- toolbar ---- */
  if (!isExport && canvas) {
    const bar = document.createElement("div");
    bar.className = "toolbar";
    const HOURS = ["fajr", "morning", "dhuhr", "asr", "maghrib", "isha"];
    const dots = HOURS.map((h) =>
      `<button type="button" class="hourdot hourdot--${h} ${canvas.dataset.hour === h || (!canvas.dataset.hour && h === "fajr") ? "on" : ""}" data-h="${h}" title="${h}"></button>`).join("");
    let nameSel = "";
    if (usesName && window.NAMES99) {
      nameSel = `<select data-names title="pick a name">` +
        window.NAMES99.map((n) => `<option value="${n.n}">${String(n.n).padStart(2, "0")} · ${n.tr}</option>`).join("") + `</select>`;
    }
    bar.innerHTML = `<span class="hint">click text to edit</span>${nameSel}<span class="hourdots">${dots}</span>` +
      `<button type="button" data-dl>png · ${canvas.offsetWidth}×${canvas.offsetHeight}</button>`;
    document.body.appendChild(bar);

    bar.addEventListener("click", (e) => {
      const d = e.target.closest(".hourdot");
      if (!d) return;
      canvas.dataset.hour = d.dataset.h;
      $(".hourdot", bar).forEach((x) => x.classList.toggle("on", x === d));
    });
    const sel = bar.querySelector("select[data-names]");
    if (sel) {
      if (picked) sel.value = String(picked.n);
      sel.addEventListener("change", () => fillName(window.NAMES99[+sel.value - 1]));
    }

    /* ---- png export ---- */
    const kitBase = (document.currentScript && document.currentScript.src
      ? document.currentScript.src
      : Array.from(document.scripts).map((s) => s.src).filter((s) => /kit\.js/.test(s))[0] || ""
    ).replace(/kit\.js.*$/, "");
    function ensureLib() {
      if (window.htmlToImage) return Promise.resolve();
      return new Promise((ok, bad) => {
        const s = document.createElement("script");
        s.src = kitBase + "vendor/html-to-image.js";
        s.onload = ok; s.onerror = bad;
        document.head.appendChild(s);
      });
    }
    bar.querySelector("[data-dl]").addEventListener("click", async () => {
      const btn = bar.querySelector("[data-dl]");
      btn.textContent = "rendering…";
      try {
        await ensureLib();
        await document.fonts.ready;
        const png = await Promise.race([
          htmlToImage.toPng(canvas, {
            width: canvas.offsetWidth, height: canvas.offsetHeight,
            pixelRatio: 1, skipAutoScale: true,
          }),
          new Promise((_, bad) => setTimeout(() => bad(new Error("render timed out — keep this window visible and check your connection")), 45000)),
        ]);
        const a = document.createElement("a");
        const base = (document.body.dataset.name || document.title || "99names").replace(/[^\w-]+/g, "-").toLowerCase();
        a.download = base + (picked ? "-" + picked.slug : "") + ".png";
        a.href = png;
        a.click();
        btn.textContent = "done — check downloads";
      } catch (e) {
        btn.textContent = "failed — fonts need internet";
        console.error(e);
      }
      setTimeout(() => (btn.textContent = `png · ${canvas.offsetWidth}×${canvas.offsetHeight}`), 2500);
    });
  }
})();
