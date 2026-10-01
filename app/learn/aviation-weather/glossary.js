/* PlaneWX glossary tooltips. Triggers: a.gl links with data-gl set to a glossary id (term from the
   embedded glossary JSON), or a.gl links with data-term, data-def, data-src-title, data-src-url (inline,
   used by the worked decode). Works on hover, keyboard focus, and tap. Esc closes. Without JS the
   links jump to the on-page glossary or decode table, so nothing is lost. */
(function () {
  var dataEl = document.getElementById('glossary-data');
  var terms = {};
  if (dataEl) { try { JSON.parse(dataEl.textContent).forEach(function (t) { terms[t.id] = t; }); } catch (e) {} }
  var tip = document.createElement('span');
  tip.className = 'gl-tip'; tip.id = 'gl-tip'; tip.setAttribute('role', 'tooltip'); tip.hidden = true;
  var cur = null, shownAt = 0, showT = null, hideT = null;
  function el(tag, cls, text) { var n = document.createElement(tag); n.className = cls; if (text) n.textContent = text; return n; }
  function info(a) {
    if (a.dataset.gl && terms[a.dataset.gl]) return terms[a.dataset.gl];
    return { term: a.dataset.term || a.textContent, expansion: a.dataset.exp || '', definition: a.dataset.def || '',
             source: a.dataset.srcTitle || '', url: a.dataset.srcUrl || '' };
  }
  function fill(a) {
    var t = info(a); tip.textContent = '';
    tip.appendChild(el('span', 'gl-t', t.term));
    if (t.expansion && t.expansion !== t.term) tip.appendChild(el('span', 'gl-x', t.expansion));
    tip.appendChild(el('span', 'gl-d', t.definition));
    if (t.url) {
      var s = el('span', 'gl-s', 'Source: '), l = document.createElement('a');
      l.href = t.url; l.textContent = t.source; l.target = '_blank'; l.rel = 'noopener';
      s.appendChild(l); tip.appendChild(s);
    }
  }
  function place(a) {
    var r = a.getBoundingClientRect(), vw = document.documentElement.clientWidth, vh = window.innerHeight;
    var w = tip.offsetWidth, h = tip.offsetHeight;
    var left = Math.min(Math.max(8, r.left), vw - w - 8), top = r.bottom + 6;
    if (top + h > vh - 8 && r.top - h - 6 > 8) top = r.top - h - 6;
    tip.style.left = left + 'px'; tip.style.top = top + 'px';
  }
  function show(a) {
    clearTimeout(hideT);
    if (cur && cur !== a) hide();
    cur = a; fill(a);
    a.insertAdjacentElement('afterend', tip);   /* right after the trigger, so Tab reaches the Source link */
    tip.hidden = false; place(a); shownAt = Date.now();
    a.setAttribute('aria-expanded', 'true'); a.setAttribute('aria-describedby', 'gl-tip');
  }
  function hide() {
    clearTimeout(showT); clearTimeout(hideT);
    if (!cur) return;
    tip.hidden = true; cur.setAttribute('aria-expanded', 'false'); cur.removeAttribute('aria-describedby'); cur = null;
  }
  function trig(n) { return n && n.closest ? n.closest('a.gl') : null; }
  document.querySelectorAll('a.gl').forEach(function (a) { a.setAttribute('aria-expanded', 'false'); });
  document.addEventListener('mouseover', function (e) {
    var a = trig(e.target);
    if (a) { clearTimeout(hideT); if (a !== cur) { clearTimeout(showT); showT = setTimeout(function () { show(a); }, 120); } }
    else if (tip.contains(e.target)) clearTimeout(hideT);
  });
  document.addEventListener('mouseout', function (e) {
    var from = trig(e.target) || (tip.contains(e.target) ? tip : null);
    if (!from) return;
    var to = e.relatedTarget;
    if (to && (tip.contains(to) || (cur && cur.contains(to)))) return;
    clearTimeout(showT); hideT = setTimeout(hide, 250);
  });
  document.addEventListener('focusin', function (e) {
    var a = trig(e.target);
    if (a) show(a);
    else if (cur && !tip.contains(e.target)) hide();
  });
  document.addEventListener('click', function (e) {
    var a = trig(e.target);
    if (a) {
      e.preventDefault();
      if (a === cur && !tip.hidden && Date.now() - shownAt > 600) hide(); else show(a);
      return;
    }
    if (cur && !tip.contains(e.target)) hide();
  });
  document.addEventListener('keydown', function (e) {
    if ((e.key === 'Escape' || e.key === 'Esc') && cur) { var a = cur; hide(); a.focus(); e.stopPropagation(); }
  });
  window.addEventListener('scroll', function () { if (cur) place(cur); }, { passive: true });
  window.addEventListener('resize', function () { if (cur) place(cur); });
  /* Key Facts: open on desktop, collapsed on small screens (open for everyone without JS).
     When the box is taller than the viewport (it is capped with internal scroll), show a bottom fade
     until the reader scrolls to the end. */
  var kf = document.getElementById('key-facts');
  function kfCap() {
    if (!kf) return;
    var capped = kf.scrollHeight > kf.clientHeight + 2;
    kf.classList.toggle('is-capped', capped);
    kf.classList.toggle('at-end', capped && kf.scrollTop + kf.clientHeight >= kf.scrollHeight - 4);
  }
  if (kf && window.matchMedia) {
    var mq = window.matchMedia('(min-width: 980px)');
    var sync = function () { kf.open = mq.matches; kfCap(); };
    sync(); if (mq.addEventListener) mq.addEventListener('change', sync);
    kf.addEventListener('scroll', kfCap, { passive: true });
    kf.addEventListener('toggle', kfCap);
    window.addEventListener('resize', kfCap);
    window.addEventListener('load', kfCap);
  }
  /* Raw code blocks: drop the right-edge fade once scrolled to the end (or when nothing overflows). */
  document.querySelectorAll('.raw-wrap').forEach(function (w) {
    var pre = w.querySelector('pre');
    var upd = function () { w.classList.toggle('at-end', pre.scrollLeft + pre.clientWidth >= pre.scrollWidth - 2); };
    pre.addEventListener('scroll', upd, { passive: true }); window.addEventListener('resize', upd); upd();
  });
})();
