/* 99names · Noor · The Passage
   ------------------------------------------------------------------
   The shell that holds one work inside the world's margin and bar.

     /hub/view.html?p=/world/index.html

   The sidebar index is not written twice: it is read out of the World
   itself at load, so a card added to index.html appears here with no
   further work. */
(function () {
  var frame = document.getElementById('frame');
  var stage = document.getElementById('stage');
  var crumbRoom = document.getElementById('crumb-room');
  var crumbPage = document.getElementById('crumb-page');
  var raw = document.getElementById('raw');
  var indexEl = document.getElementById('index');
  var WIDE = 'nn-passage-wide';
  var rooms = [];

  /* ---------- what was asked for ---------- */
  function clean(p) {
    if (!p) return '';
    try { p = decodeURIComponent(p); } catch (e) {}
    p = p.trim();
    if (/^[a-z][a-z0-9+.-]*:/i.test(p) || p.indexOf('//') === 0) return '';
    if (p.charAt(0) !== '/') p = '/' + p;
    if (p.indexOf('/hub/view') === 0) return '';
    return p;
  }
  var want = clean(new URLSearchParams(location.search).get('p'));
  if (!want) {
    stage.classList.add('empty');
    document.title = '99names · The Passage';
  } else {
    raw.href = want;
    frame.src = want;
  }

  /* ---------- names, before the frame has said anything ---------- */
  function pretty(path) {
    var last = path.split('?')[0].split('#')[0].split('/').filter(Boolean).pop() || '';
    last = last.replace(/\.html$/, '').replace(/^\d+[-.]/, '').replace(/[-_]+/g, ' ');
    return last ? last.replace(/\b[a-z]/g, function (c) { return c.toUpperCase(); }) : 'The work';
  }
  function fromTitle(title) {
    var parts = (title || '').split(/\s+[·—|–\-]\s+/)
      .map(function (x) { return x.trim(); })
      .filter(function (x) {
        return x && !/^99names\b/i.test(x) && !/^(19|20)\d\d$/.test(x) && !/^\d+$/.test(x);
      });
    var last = parts.length ? parts[parts.length - 1] : (title || '').trim(); return /^[a-z0-9-]+$/.test(last) ? last.replace(/-/g, ' ').replace(/\b[a-z]/g, function (c) { return c.toUpperCase(); }) : last;
  }
  var lastTitle = '';
  function setName(title, path) {
    path = path || want;
    if (title) lastTitle = title;
    var name = workName(path) || fromTitle(lastTitle) || pretty(path);
    if (name.length > 60) name = name.slice(0, 58).trim() + '…';
    crumbPage.textContent = name;
    document.title = name + ' · 99names';
  }
  if (want) setName('', want);

  /* ---------- the index, read out of the World ---------- */
  function workName(path) {
    for (var i = 0; i < rooms.length; i++) for (var j = 0; j < rooms[i].works.length; j++) {
      if (samePath(rooms[i].works[j].href, path)) return rooms[i].works[j].title;
    }
    return '';
  }
  function folder(p) { return (p || '').split('?')[0].split('#')[0].replace(/[^/]*$/, ''); }
  function roomFor(path) {
    var exact = null, near = null;
    rooms.forEach(function (r) {
      r.works.forEach(function (w) {
        if (samePath(w.href, path)) exact = r;
        else if (!near && folder(path).indexOf(folder(w.href)) === 0) near = r;
      });
    });
    return exact || near;
  }
  function samePath(a, b) {
    return a && b && a.split('#')[0].split('?')[0].replace(/\/index\.html$/, '/') === b.split('#')[0].split('?')[0].replace(/\/index\.html$/, '/');
  }
  function drawIndex(current) {
    if (!rooms.length) return;
    indexEl.innerHTML = rooms.map(function (r) {
      var mine = r === roomFor(current);
      var works = r.works.map(function (w) {
        return '<li><a href="?p=' + encodeURIComponent(w.href) + '"' + (samePath(w.href, current) ? ' class="on"' : '') + '>' + w.title + '</a></li>';
      }).join('');
      return '<div class="rm' + (mine ? ' here' : '') + '">' +
        '<a href="/#' + r.id + '"><span class="n">' + r.num + '</span><span class="t">' + r.name + '</span></a>' +
        '<ul class="works">' + works + '</ul></div>';
    }).join('');
    var here = roomFor(current);
    crumbRoom.textContent = here ? here.name : 'Noor';
  }
  fetch('/', { credentials: 'same-origin' })
    .then(function (r) { return r.ok ? r.text() : Promise.reject(); })
    .then(function (html) {
      var doc = new DOMParser().parseFromString(html, 'text/html');
      doc.querySelectorAll('.room').forEach(function (room) {
        var works = [];
        room.querySelectorAll('.card').forEach(function (card) {
          var main = card.querySelector('a.main'), h3 = card.querySelector('h3');
          if (!main || !h3 || main.target) return;
          var href = main.getAttribute('href') || '';
          if (!href || href.charAt(0) === '#' || /^[a-z]+:/i.test(href)) return;
          if (/\.(pdf|mp4|zip|png|jpe?g|svg)$/i.test(href.split('?')[0])) return;
          var h3c = h3.cloneNode(true); h3c.querySelectorAll('.sym').forEach(function (s) { s.remove(); });
          works.push({ title: h3c.textContent.trim(), href: href.charAt(0) === '/' ? href : '/' + href });
        });
        var head = room.querySelector('.room-head .num');
        rooms.push({ id: room.id, name: room.getAttribute('data-room') || room.id, num: head ? head.textContent.trim() : '', works: works });
      });
      drawIndex(want);
      setName('', want);
    })
    .catch(function () {
      indexEl.innerHTML = '<div class="rm here"><a href="/"><span class="n">&larr;</span><span class="t">The World</span></a></div>';
    });

  /* ---------- the frame speaks ---------- */
  window.addEventListener('message', function (e) {
    if (e.origin !== location.origin || !e.data || e.data.nn !== 'passage') return;
    var path = clean(e.data.path) || want;
    setName(e.data.title, path);
    raw.href = path;
    if (path !== want) { want = path; history.replaceState(null, '', '?p=' + encodeURIComponent(path)); }
    drawIndex(path);
    stage.classList.add('ready');
  });
  frame.addEventListener('load', function () {
    stage.classList.add('ready');
    try {
      var d = frame.contentDocument;
      if (d) {
        var path = d.location.pathname + d.location.search + d.location.hash;
        setName(d.title, path);
        raw.href = path;
        if (path !== want) { want = path; history.replaceState(null, '', '?p=' + encodeURIComponent(path)); }
        drawIndex(path);
      }
    } catch (err) {}
  });
  setTimeout(function () { if (want) stage.classList.add('ready'); }, 4000);

  /* ---------- expanded and back again ---------- */
  function setWide(on) {
    document.body.classList.toggle('wide', on);
    try { on ? localStorage.setItem(WIDE, '1') : localStorage.removeItem(WIDE); } catch (e) {}
  }
  try { if (localStorage.getItem(WIDE) === '1') document.body.classList.add('wide'); } catch (e) {}
  document.getElementById('expand').addEventListener('click', function () { setWide(true); });
  document.getElementById('shrink').addEventListener('click', function () { setWide(false); });
  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var a = document.activeElement;
    if (a && (/^(input|textarea|select)$/i.test(a.tagName) || a.isContentEditable)) return;
    if (e.key === 'Escape') {
      if (document.body.classList.contains('wide')) { e.preventDefault(); setWide(false); } else location.href = '/';
    } else if (e.key === 'e' || e.key === 'E') {
      e.preventDefault(); setWide(!document.body.classList.contains('wide'));
    }
  });
  window.addEventListener('message', function (e) {
    if (e.origin !== location.origin || !e.data || e.data.nn !== 'passage-key') return;
    if (e.data.key === 'Escape') { if (document.body.classList.contains('wide')) setWide(false); else location.href = '/'; }
  });
})();
