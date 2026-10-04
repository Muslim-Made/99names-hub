/* 99names · Noor · The Passage · the return
   Every page in the world carries this one file. Standing on its own it
   draws a return to the World bottom left and offers to pull the world's
   margin around the page; inside the Passage it draws nothing and tells
   the shell what it is showing. Hidden in print, ignored by PNG export. */
(function () {
  if (window.__nnPassage) return;
  window.__nnPassage = true;
  var HALL = '/', SHELL = '/hub/view.html', here = location.pathname + location.search, framed = false;
  try { framed = window.self !== window.top; } catch (e) { framed = true; }

  if (framed) {
    document.documentElement.setAttribute('data-in-world', '');
    var tell = function () { try { window.parent.postMessage({ nn: 'passage', title: (document.title || '').trim(), path: location.pathname + location.search }, location.origin); } catch (e) {} };
    tell(); window.addEventListener('load', tell);
    window.addEventListener('message', function (e) { if (e.origin === location.origin && e.data && e.data.nn === 'passage-ask') tell(); });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
      var a = document.activeElement; if (a && (/^(input|textarea|select)$/i.test(a.tagName) || a.isContentEditable)) return;
      try { window.parent.postMessage({ nn: 'passage-key', key: 'Escape' }, location.origin); } catch (err) {}
    });
    return;
  }
  if (location.pathname === '/' || location.pathname === '/index.html') return;

  var RING = (function () { var s = ''; for (var k = 0; k < 99; k += 3) { var a = -Math.PI / 2 + k / 99 * Math.PI * 2, r1 = 26, r2 = k % 11 === 0 ? 46 : 40; s += '<line x1="' + (50 + Math.cos(a) * r1).toFixed(1) + '" y1="' + (50 + Math.sin(a) * r1).toFixed(1) + '" x2="' + (50 + Math.cos(a) * r2).toFixed(1) + '" y2="' + (50 + Math.sin(a) * r2).toFixed(1) + '"/>'; } return '<svg viewBox="0 0 100 100" aria-hidden="true"><g stroke="currentColor" stroke-width="4" stroke-linecap="round">' + s + '</g></svg>'; })();
  var FRAME = '<svg viewBox="0 0 16 14" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.2"><rect x="1" y="1.6" width="14" height="10.8" rx="2"/><line x1="6" y1="1.6" x2="6" y2="12.4"/></g></svg>';
  var css = '#nn-return{position:fixed;left:18px;bottom:18px;z-index:2147483000;display:flex;align-items:stretch;font-family:"DM Sans",system-ui,sans-serif;font-size:11px;letter-spacing:.2em;text-transform:uppercase;line-height:1;background:rgba(244,238,228,.92);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(42,38,34,.18);border-radius:999px;box-shadow:0 14px 40px -20px rgba(42,38,34,.45);opacity:0;transform:translateY(8px);transition:opacity .5s cubic-bezier(.16,1,.3,1),transform .5s cubic-bezier(.16,1,.3,1);overflow:hidden}' +
    '#nn-return.nn-in{opacity:1;transform:none}' +
    '#nn-return a{display:flex;align-items:center;gap:10px;padding:11px 15px;color:#5A534B;text-decoration:none;transition:color .28s,background .28s}' +
    '#nn-return a:hover{color:#2A2622;background:rgba(255,255,255,.7)}' +
    '#nn-return .nn-mk{width:15px;height:15px;flex:none;color:#E8A64B}#nn-return .nn-mk svg{width:100%;height:100%;display:block}' +
    '#nn-return .nn-sep{width:1px;background:rgba(42,38,34,.14);flex:none}#nn-return .nn-frame{padding:11px 13px}#nn-return .nn-frame svg{width:16px;height:14px;display:block}' +
    '#nn-return kbd{font:inherit;font-size:10px;padding:2px 6px;border-radius:6px;border:1px solid rgba(42,38,34,.18);color:rgba(42,38,34,.45)}' +
    '@media (max-width:640px){#nn-return{left:12px;bottom:12px;font-size:10px}#nn-return kbd{display:none}}@media print{#nn-return{display:none!important}}';
  function build() {
    if (document.getElementById('nn-return')) return;
    var style = document.createElement('style'); style.id = 'nn-return-style'; style.textContent = css; document.head.appendChild(style);
    var bar = document.createElement('div'); bar.id = 'nn-return'; bar.setAttribute('data-html2canvas-ignore', ''); bar.setAttribute('data-nn-chrome', '');
    bar.innerHTML = '<a href="' + HALL + '" title="Back to the World (Esc)"><span class="nn-mk">' + RING + '</span><span>The World</span><kbd>Esc</kbd></a><i class="nn-sep"></i><a class="nn-frame" href="' + SHELL + '?p=' + encodeURIComponent(here) + '" title="Show this page inside the World">' + FRAME + '</a>';
    document.body.appendChild(bar);
    requestAnimationFrame(function () { requestAnimationFrame(function () { bar.classList.add('nn-in'); }); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape' || e.metaKey || e.ctrlKey || e.altKey) return;
    var a = document.activeElement; if (a && (/^(input|textarea|select)$/i.test(a.tagName) || a.isContentEditable)) return;
    if (e.defaultPrevented || document.querySelector('dialog[open]')) return;
    location.href = HALL;
  });
})();
