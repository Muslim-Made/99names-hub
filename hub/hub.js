/* 99names · Noor · The World
   The hour, the arrival, the sky behind the title, the ledger count, the
   rooms as you scroll, the mote in the margin, the tokens, and the palette (⌘K). */
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var body = document.body, html = document.documentElement;

  /* ---------- the hour ---------- */
  var BANDS = [[4, 7, 'fajr', 'Fajr'], [7, 11, 'morning', 'Morning'], [11, 15, 'dhuhr', 'Dhuhr'], [15, 18, 'asr', 'Asr'], [18, 20, 'maghrib', 'Maghrib'], [20, 28, 'isha', 'Isha']];
  function natural() { var h = new Date().getHours(); if (h < 4) h += 24; for (var i = 0; i < BANDS.length; i++) if (h >= BANDS[i][0] && h < BANDS[i][1]) return BANDS[i]; return BANDS[0]; }
  function byKey(k) { for (var i = 0; i < BANDS.length; i++) if (BANDS[i][2] === k) return BANDS[i]; return null; }
  var manual = null; try { manual = byKey(localStorage.getItem('nn-hour')); } catch (e) {}
  var dial = document.getElementById('dial'), dialLbl = document.getElementById('dial-lbl');
  function setHour(b, save) {
    html.setAttribute('data-hour', b[2]);
    if (dial) { dial.querySelectorAll('.dot').forEach(function (d) { d.classList.toggle('on', d.getAttribute('data-h') === b[2]); }); dial.classList.toggle('manual', !!manual); }
    if (dialLbl) dialLbl.firstChild.textContent = b[3];
    if (save) { try { manual ? localStorage.setItem('nn-hour', manual[2]) : localStorage.removeItem('nn-hour'); } catch (e) {} }
  }
  setHour(manual || natural());
  if (dial) {
    dial.querySelectorAll('.dot').forEach(function (d) { d.addEventListener('click', function () { manual = byKey(d.getAttribute('data-h')); setHour(manual, true); }); });
    var auto = dial.querySelector('.auto'); if (auto) auto.addEventListener('click', function () { manual = null; setHour(natural(), true); });
  }
  var timeEl = document.getElementById('time');
  function tick() { var d = new Date(); if (timeEl) timeEl.textContent = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); if (!manual) setHour(natural()); }
  tick(); setInterval(tick, 15000);

  /* ---------- arrival: the light settles after the threshold ---------- */
  var entered = false;
  try { entered = sessionStorage.getItem('nn-entered') === '1'; sessionStorage.removeItem('nn-entered'); } catch (e) {}
  if (entered && !reduce) {
    body.classList.add('arriving');
    requestAnimationFrame(function () { requestAnimationFrame(function () { body.classList.add('settle'); }); });
    setTimeout(function () { body.classList.remove('arriving', 'settle'); }, 2400);
  }

  /* ---------- the title rises ---------- */
  var title = document.getElementById('title');
  if (title && !reduce) {
    var text = title.textContent; title.textContent = '';
    text.split('').forEach(function (ch, i) {
      var s = document.createElement('span'); s.textContent = ch; s.className = 'ltr'; s.style.animationDelay = (0.3 + i * 0.09) + 's'; title.appendChild(s);
    });
  }

  /* ---------- the ring in the margin: ninety-nine rays ---------- */
  document.querySelectorAll('[data-ring]').forEach(function (el) {
    var NS = 'http://www.w3.org/2000/svg', svg = document.createElementNS(NS, 'svg'); svg.setAttribute('viewBox', '0 0 100 100');
    for (var k = 0; k < 99; k++) {
      var a = -Math.PI / 2 + k / 99 * Math.PI * 2, long = k % 11 === 0, r1 = 27, r2 = long ? 46 : 40, l = document.createElementNS(NS, 'line');
      l.setAttribute('x1', 50 + Math.cos(a) * r1); l.setAttribute('y1', 50 + Math.sin(a) * r1); l.setAttribute('x2', 50 + Math.cos(a) * r2); l.setAttribute('y2', 50 + Math.sin(a) * r2);
      l.setAttribute('stroke', 'currentColor'); l.setAttribute('stroke-width', long ? '1.1' : '.8'); l.setAttribute('stroke-linecap', 'round'); svg.appendChild(l);
    }
    el.appendChild(svg);
  });

  /* ---------- the sky: motes and the breathing ring ---------- */
  var sky = document.getElementById('sky'), cv = document.getElementById('motes');
  if (cv && !reduce) {
    var x = cv.getContext('2d'), DPR = Math.min(2, devicePixelRatio || 1), W, H, P = [], running = true, t0 = performance.now(), mouse = { x: .5, y: .5 };
    function size() { W = cv.width = sky.clientWidth * DPR; H = cv.height = sky.clientHeight * DPR; }
    size(); addEventListener('resize', size);
    for (var i = 0; i < 99; i++) P.push({ x: Math.random(), y: Math.random(), r: 1 + Math.random() * 1.8, v: 0.00009 + Math.random() * 0.0002, s: Math.random() * 6.28, w: 0.2 + Math.random() * 0.5 });
    sky.addEventListener('pointermove', function (e) { var r = sky.getBoundingClientRect(); mouse.x = (e.clientX - r.left) / r.width; mouse.y = (e.clientY - r.top) / r.height; });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { running = es[0].isIntersecting; }, { threshold: 0.02 }).observe(sky);
    (function frame(now) {
      requestAnimationFrame(frame); if (!running) return;
      var t = (now - t0) / 1000, dark = /isha|maghrib/.test(html.getAttribute('data-hour') || '');
      x.clearRect(0, 0, W, H);
      // the ring, breathing, a little to the right of centre
      var cx = W * (0.72 + (mouse.x - .5) * 0.02), cy = H * (0.42 + (mouse.y - .5) * 0.02), R = Math.min(W, H) * 0.19 * (1 + 0.025 * Math.sin(t * 0.7));
      x.strokeStyle = dark ? 'rgba(244,238,228,.5)' : 'rgba(42,38,34,.34)'; x.lineCap = 'round';
      for (var k = 0; k < 99; k++) {
        var a = -Math.PI / 2 + k / 99 * Math.PI * 2 + t * 0.012, long = k % 11 === 0, r1 = R, r2 = R * (long ? 1.62 : 1.42) + Math.sin(t * 1.2 + k * 0.4) * R * 0.03;
        x.lineWidth = (long ? 1.2 : 0.8) * DPR; x.beginPath(); x.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1); x.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2); x.stroke();
      }
      x.beginPath(); x.arc(cx, cy, R * 0.82, 0, 6.283); x.lineWidth = 1 * DPR; x.stroke();
      for (var i = 0; i < P.length; i++) {
        var p = P[i]; p.y -= p.v; if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); }
        var px = p.x * W + Math.sin(t * p.w + p.s) * 14 * DPR + (mouse.x - .5) * 24 * DPR * p.r, py = p.y * H, al = 0.25 + 0.45 * (0.5 + 0.5 * Math.sin(t * 1.3 + p.s));
        x.beginPath(); x.arc(px, py, p.r * DPR, 0, 6.283); x.fillStyle = dark ? 'rgba(244,238,228,' + al + ')' : 'rgba(255,255,255,' + (al + 0.2) + ')'; x.fill();
      }
    })(t0);
  }

  /* ---------- the ledger counts up ---------- */
  function count(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    if (reduce) { el.textContent = target; return; }
    var s0 = null, dur = 1600;
    (function step(ts) { if (!s0) s0 = ts; var k = Math.min(1, (ts - s0) / dur); k = 1 - Math.pow(1 - k, 4); el.textContent = Math.round(target * k); if (k < 1) requestAnimationFrame(step); })(performance.now());
  }
  var ledger = document.getElementById('ledger');
  if (ledger) {
    var cells = ledger.querySelectorAll('[data-count]'), start = function () { cells.forEach(function (c, i) { setTimeout(function () { count(c); }, 600 + i * 120); }); };
    var started = false, once = function () { if (!started) { started = true; start(); } };
    if ('IntersectionObserver' in window) { var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { once(); io.disconnect(); } }, { threshold: 0.3 }); io.observe(ledger); setTimeout(once, 4000); }
    else once();
  }

  /* ---------- reveals, and which room you are in ---------- */
  var rv = document.querySelectorAll('.rv'), rooms = document.querySelectorAll('.room');
  if ('IntersectionObserver' in window && !reduce) {
    var ro = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); } }); }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    rv.forEach(function (el) { ro.observe(el); }); rooms.forEach(function (el) { ro.observe(el); });
  } else { rv.forEach(function (el) { el.classList.add('in'); }); rooms.forEach(function (el) { el.classList.add('in'); }); }

  var links = document.querySelectorAll('#rooms a, #mnav a'), crumb = document.getElementById('crumb'), roomNo = document.getElementById('roomno'), list = document.getElementById('rooms'), mote = list && list.querySelector('.mote');
  function setActive(id, name, n) {
    var on = null;
    links.forEach(function (a) { var hit = a.getAttribute('href') === '#' + id; a.classList.toggle('on', hit); if (hit && a.closest('#rooms')) on = a; });
    if (crumb) crumb.textContent = name || 'The World';
    if (roomNo) roomNo.textContent = (n || '00') + ' / 05';
    if (mote) { if (on) { mote.style.top = (on.offsetTop + 17) + 'px'; list.classList.add('lit'); } else list.classList.remove('lit'); }
  }
  if ('IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) setActive(e.target.id, e.target.getAttribute('data-room'), e.target.getAttribute('data-n')); }); }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    rooms.forEach(function (r) { so.observe(r); });
    var top = new IntersectionObserver(function (es) { if (es[0].isIntersecting) setActive(null, 'The World', '00'); }, { rootMargin: '-40% 0px -55% 0px' });
    if (sky) top.observe(sky);
  }

  /* ---------- leafing through a kit ---------- */
  document.querySelectorAll('.card .plate.leafing').forEach(function (plate) {
    var leaves = plate.querySelectorAll('.leaf'), i = -1, timer = null; if (!leaves.length) return;
    function show(n) { leaves.forEach(function (l, k) { l.classList.toggle('on', k === n); }); }
    var card = plate.closest('.card');
    card.addEventListener('mouseenter', function () { if (reduce) return; i = -1; timer = setInterval(function () { i = (i + 1) % (leaves.length + 1); show(i === leaves.length ? -1 : i); }, 800); });
    card.addEventListener('mouseleave', function () { clearInterval(timer); show(-1); });
  });

  /* ---------- tokens: click to copy ---------- */
  var toast = document.getElementById('toast'), toastT = null;
  function say(msg) { if (!toast) return; toast.textContent = msg; toast.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(function () { toast.classList.remove('on'); }, 1600); }
  function copy(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text);
    var ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0'; body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) {} body.removeChild(ta); return Promise.resolve();
  }
  document.querySelectorAll('[data-hex]').forEach(function (sw) {
    sw.setAttribute('role', 'button'); sw.setAttribute('tabindex', '0');
    var go = function () { var hex = sw.getAttribute('data-hex'); copy(hex).then(function () { say(hex + ' copied'); sw.classList.add('done'); setTimeout(function () { sw.classList.remove('done'); }, 1200); }); };
    sw.addEventListener('click', go);
    sw.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
  });
  document.querySelectorAll('.hours .h[data-h]').forEach(function (h) { h.addEventListener('click', function () { manual = byKey(h.getAttribute('data-h')); setHour(manual, true); say(manual[3] + ' · the sky is tinted'); window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); }); });

  /* ---------- the Passage: works open inside the world ---------- */
  var SHELL = '/hub/view.html';
  function framedURL(href) {
    if (!href) return null; var u;
    try { u = new URL(href, location.href); } catch (e) { return null; }
    if (u.origin !== location.origin) return null;
    if (u.pathname === location.pathname && u.hash) return null;
    if (/^\/(leave|gate)\b/.test(u.pathname) || u.pathname.indexOf('/hub/view') === 0) return null;
    var last = u.pathname.split('/').pop(); if (last && !/\.html$/i.test(last)) return null;
    return SHELL + '?p=' + encodeURIComponent(u.pathname + u.search + u.hash);
  }
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a || a.target || a.hasAttribute('download') || a.hasAttribute('data-no-passage')) return;
    var to = framedURL(a.getAttribute('href')); if (!to) return;
    e.preventDefault(); location.href = to;
  });

  /* ---------- the palette ---------- */
  var palette = document.getElementById('palette'), q = document.getElementById('q'), res = document.getElementById('res'), index = [], sel = 0, hits = [];
  document.querySelectorAll('.card').forEach(function (card) {
    var main = card.querySelector('.main'), h3 = card.querySelector('h3'), p = card.querySelector('p'), img = card.querySelector('.plate img'), meta = card.querySelector('.meta'), room = card.closest('.room');
    if (!main || !h3) return;
    var h3c = h3.cloneNode(true); h3c.querySelectorAll('.sym').forEach(function (s) { s.remove(); });
    index.push({ t: h3c.textContent.trim(), d: p ? p.textContent.trim() : '', m: (room ? room.getAttribute('data-room') : '') + ' · ' + (card.getAttribute('data-kind') || '') + (meta ? ' · ' + meta.textContent.trim() : ''), href: main.getAttribute('href'), img: img ? img.getAttribute('src') : '', k: 'Open', ext: !!main.target });
  });
  if (window.KIT_INDEX) window.KIT_INDEX.forEach(function (d) { index.push(d); });
  document.querySelectorAll('[data-hex]').forEach(function (sw) { var n = sw.querySelector('span'); index.push({ t: (n ? n.textContent : '') + ' ' + sw.getAttribute('data-hex'), d: 'Noor colour. Copies the hex.', m: 'The World · colour', hex: sw.getAttribute('data-hex'), img: '', k: 'Copy' }); });
  BANDS.forEach(function (b) { index.push({ t: b[3], d: 'Tint the sky to ' + b[3] + '.', m: 'The hours', hour: b, img: '', k: 'Tint' }); });
  index.push({ t: 'Leave the world', d: 'Hand back the key and return to the threshold.', m: 'The Threshold', href: '/leave', img: '', k: 'Go' });
  function norm(s) { return s.toLowerCase().replace(/[^a-z0-9 ]/g, ' '); }
  function search(term) {
    var t = norm(term).trim(); if (!t) return index.slice(0, 8);
    var words = t.split(/\s+/);
    return index.map(function (it) {
      var hay = norm(it.t + ' ' + it.m + ' ' + it.d), score = 0;
      words.forEach(function (w) { if (norm(it.t).indexOf(w) === 0) score += 6; else if (norm(it.t).indexOf(w) >= 0) score += 4; else if (norm(it.m).indexOf(w) >= 0) score += 2; else if (hay.indexOf(w) >= 0) score += 1; else score -= 3; });
      return { it: it, score: score };
    }).filter(function (r) { return r.score > 0; }).sort(function (a, b) { return b.score - a.score; }).slice(0, 10).map(function (r) { return r.it; });
  }
  function render() {
    hits = search(q.value); sel = Math.min(sel, Math.max(0, hits.length - 1));
    if (!hits.length) { res.innerHTML = '<div class="none">Nothing by that name in the world</div>'; return; }
    res.innerHTML = hits.map(function (h, i) {
      var chip = h.img ? '<img src="' + h.img + '" alt="">' : '<span class="chip" style="background:' + (h.hex || (h.hour ? 'linear-gradient(140deg,' + ({ fajr: '#F6DCCF,#C9DBE6', morning: '#F4EEE4,#F1D9A6', dhuhr: '#F4EEE4,#F2CFC0', asr: '#EFD9B8,#A9BFA6', maghrib: '#E8A64B,#6B5A7A', isha: '#2A2F44,#171A26' })[h.hour[2]] + ')' : 'var(--sand)')) + '"></span>';
      return '<div class="r' + (i === sel ? ' on' : '') + '" data-i="' + i + '">' + chip + '<div><div class="t">' + h.t + '</div><div class="m">' + h.m + '</div></div><span class="k">' + h.k + '</span></div>';
    }).join('');
  }
  function openPalette() { palette.classList.add('open'); q.value = ''; sel = 0; render(); setTimeout(function () { q.focus(); }, 30); }
  function closePalette() { palette.classList.remove('open'); q.blur(); }
  function go(h, newTab) {
    if (!h) return;
    if (h.hex) { copy(h.hex).then(function () { say(h.hex + ' copied'); }); closePalette(); return; }
    if (h.hour) { manual = h.hour; setHour(manual, true); say(h.hour[3] + ' · the sky is tinted'); closePalette(); return; }
    if (newTab || h.ext) { window.open(h.href, '_blank'); return; }
    location.href = framedURL(h.href) || h.href;
  }
  document.querySelectorAll('[data-open-palette]').forEach(function (b) { b.addEventListener('click', openPalette); });
  palette.addEventListener('click', function (e) { if (e.target === palette) closePalette(); });
  q.addEventListener('input', function () { sel = 0; render(); });
  res.addEventListener('mousemove', function (e) { var r = e.target.closest('.r'); if (r && +r.getAttribute('data-i') !== sel) { sel = +r.getAttribute('data-i'); render(); } });
  res.addEventListener('click', function (e) { var r = e.target.closest('.r'); if (r) go(hits[+r.getAttribute('data-i')], e.shiftKey || e.metaKey); });
  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); palette.classList.contains('open') ? closePalette() : openPalette(); return; }
    if (e.key === '/' && !palette.classList.contains('open') && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); openPalette(); return; }
    if (!palette.classList.contains('open')) return;
    if (e.key === 'Escape') closePalette();
    else if (e.key === 'ArrowDown') { e.preventDefault(); sel = (sel + 1) % Math.max(1, hits.length); render(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); sel = (sel - 1 + Math.max(1, hits.length)) % Math.max(1, hits.length); render(); }
    else if (e.key === 'Enter') { e.preventDefault(); go(hits[sel], e.shiftKey); }
  });
})();
