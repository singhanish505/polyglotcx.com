/* PolyglotCX — site interactions (static multi-page). No framework, no router. */
(function () {
  'use strict';
  var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─────────── ICON SYSTEM ─────────── */
  var _s = 'viewBox="0 0 24 24"';
  var ICONS = {
    shield: '<svg ' + _s + '><path d="M12 3l7 3v5c0 4.6-3 7.7-7 9-4-1.3-7-4.4-7-9V6z"/></svg>',
    lock: '<svg ' + _s + '><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 018 0v3"/><path d="M12 15v2"/></svg>',
    building: '<svg ' + _s + '><path d="M4 21h16M6 21V4l7-2v19M13 21V8l5 2v11M9 7h1M9 11h1M9 15h1"/></svg>',
    monitor: '<svg ' + _s + '><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>',
    user: '<svg ' + _s + '><circle cx="12" cy="8" r="4"/><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6"/></svg>',
    users: '<svg ' + _s + '><circle cx="9" cy="8" r="3.4"/><path d="M2.6 20c0-3 2.9-5 6.4-5s6.4 2 6.4 5"/><path d="M16 5.2a3 3 0 013 5.6M21.4 20c0-2.4-1.6-4.2-4-4.8"/></svg>',
    settings: '<svg ' + _s + '><circle cx="12" cy="12" r="3"/><path d="M19.4 13a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-2.9 1.2V21a2 2 0 01-4 0v-.2A1.7 1.7 0 007 19.6a1.7 1.7 0 00-1.9.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1A1.7 1.7 0 003.6 15a1.7 1.7 0 00-1.6-1H2a2 2 0 010-4h.2A1.7 1.7 0 003.8 9a1.7 1.7 0 00-.3-1.9l-.1-.1a2 2 0 112.8-2.8l.1.1A1.7 1.7 0 009 4.6h.1A1.7 1.7 0 0010 3V3a2 2 0 014 0v.2a1.7 1.7 0 002.9 1.2 1.7 1.7 0 001.9-.3l.1-.1a2 2 0 112.8 2.8l-.1.1A1.7 1.7 0 0020.4 9v.1a1.7 1.7 0 001.6 1.6H22a2 2 0 010 4h-.2a1.7 1.7 0 00-1.4 1.3z"/></svg>',
    plug: '<svg ' + _s + '><path d="M9 7V3M15 7V3M7 7h10v3a5 5 0 01-10 0z M12 15v6"/></svg>',
    signal: '<svg ' + _s + '><path d="M4 11a9 9 0 019 9M4 4a16 16 0 0116 16"/><circle cx="6" cy="18" r="1.6"/></svg>',
    'file-text': '<svg ' + _s + '><path d="M7 3h7l5 5v13H7z M14 3v5h5 M10 12h6M10 16h6"/></svg>',
    chart: '<svg ' + _s + '><path d="M6 20V10M12 20V4M18 20v-7M3 20h18"/></svg>',
    globe: '<svg ' + _s + '><circle cx="12" cy="12" r="9"/><path d="M3.5 9h17M3.5 15h17M12 3c2.4 2.6 3.7 5.8 3.7 9S14.4 18.4 12 21 8.3 15.2 8.3 12 9.6 5.6 12 3z"/></svg>',
    database: '<svg ' + _s + '><ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v7c0 1.7 3.1 3 7 3s7-1.3 7-3V5M5 12v7c0 1.7 3.1 3 7 3s7-1.3 7-3v-7"/></svg>',
    refresh: '<svg ' + _s + '><path d="M20 9a8 8 0 00-14-3.2L4 7M4 4v3h3M4 15a8 8 0 0014 3.2L20 17M20 20v-3h-3"/></svg>',
    phone: '<svg ' + _s + '><path d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.24 11 11 0 003.5.56 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11 11 0 00.55 3.5 1 1 0 01-.25 1z"/></svg>',
    'phone-device': '<svg ' + _s + '><rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M10.5 18.5h3"/></svg>',
    headset: '<svg ' + _s + '><path d="M4 13a8 8 0 0116 0M4 13v4a2 2 0 002 2h1v-6H6a2 2 0 00-2 0m16 0a2 2 0 00-2 0h-1v6h1a2 2 0 002-2v-4M12 21h3"/></svg>',
    upload: '<svg ' + _s + '><path d="M12 15V4M8 8l4-4 4 4M4 15v4a2 2 0 002 2h12a2 2 0 002-2v-4"/></svg>',
    cloud: '<svg ' + _s + '><path d="M7 18a4 4 0 010-8 5.5 5.5 0 0110.6-1.6A3.8 3.8 0 0118 18z"/></svg>',
    folder: '<svg ' + _s + '><path d="M4 7a2 2 0 012-2h3.5l2 2H18a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2z"/></svg>',
    bot: '<svg ' + _s + '><rect x="5" y="7" width="14" height="11" rx="3"/><path d="M9 4v3M15 4v3M9 21l1.2-3M15 21l-1.2-3"/><circle cx="9.5" cy="12.5" r="1"/><circle cx="14.5" cy="12.5" r="1"/></svg>',
    message: '<svg ' + _s + '><path d="M4 5h16v11H8l-4 4z"/></svg>',
    type: '<svg ' + _s + '><path d="M4 17V9a3 3 0 016 0v8M4 13h6M14 17V7h3.5a3 3 0 010 6H14M14 13h4a3 3 0 010 6h-4"/></svg>',
    link: '<svg ' + _s + '><path d="M9 15l6-6M10.5 6.5l1-1a4 4 0 016 6l-1 1M13.5 17.5l-1 1a4 4 0 01-6-6l1-1"/></svg>',
    bell: '<svg ' + _s + '><path d="M6 16V11a6 6 0 1112 0v5l2 2H4z M10 21a2 2 0 004 0"/></svg>',
    search: '<svg ' + _s + '><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
    edit: '<svg ' + _s + '><path d="M12 20h9M16.5 3.5l4 4L8 20l-4.5 1L5 16.5z"/></svg>',
    clipboard: '<svg ' + _s + '><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2 M9 12h6M9 16h4"/></svg>',
    'trending-up': '<svg ' + _s + '><path d="M3 17l6-6 4 4 8-9M22 6v5M22 6h-5"/></svg>',
    target: '<svg ' + _s + '><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/></svg>',
    ticket: '<svg ' + _s + '><path d="M4 8a2 2 0 012-2h12a2 2 0 012 2 2 2 0 000 4 2 2 0 000 4 2 2 0 01-2 2H6a2 2 0 01-2-2 2 2 0 000-4 2 2 0 000-4z M14 6v12"/></svg>',
    mic: '<svg ' + _s + '><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M6 11a6 6 0 0012 0M12 17v4M9 21h6"/></svg>',
    bolt: '<svg ' + _s + '><path d="M13 3L5 14h6l-1 7 8-11h-6z"/></svg>',
    scale: '<svg ' + _s + '><path d="M12 3v18M7 21h10M6 6l12-2 M6 6l-3 6a3 3 0 006 0z M18 4l3 6a3 3 0 01-6 0z"/></svg>',
    timer: '<svg ' + _s + '><circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6M12 5V2"/></svg>',
    'x-circle': '<svg ' + _s + '><circle cx="12" cy="12" r="9"/><path d="M15 9l-6 6M9 9l6 6"/></svg>',
    sparkles: '<svg ' + _s + '><path d="M12 3l1.7 4.6L18 9l-4.3 1.4L12 15l-1.7-4.6L6 9l4.3-1.4z M18.5 3.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/></svg>',
    mail: '<svg ' + _s + '><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M4 7l8 6 8-6"/></svg>',
    'map-pin': '<svg ' + _s + '><path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>',
    academic: '<svg ' + _s + '><path d="M12 4l10 5-10 5L2 9z M6 11v5c0 1.6 2.7 3 6 3s6-1.4 6-3v-5M22 9v5"/></svg>',
    alert: '<svg ' + _s + '><path d="M12 3l10 17H2z M12 9v5M12 17h.01"/></svg>',
    rocket: '<svg ' + _s + '><path d="M12 3c3.2 1.2 6 4.3 6 9.2L15 14l-6 0-3-1.8C6 7.3 8.8 4.2 12 3z M9 14l-3 3 3 1 1 3 3-3"/><circle cx="12" cy="9" r="1"/></svg>'
  };

  function hydrateIcons(root) {
    root.querySelectorAll('[data-ico]').forEach(function (n) {
      if (n.dataset.rendered) return;
      var svg = ICONS[n.dataset.ico];
      if (!svg) return;
      var isContainer = n.classList.contains('card-ico') || n.classList.contains('int-ic') || n.classList.contains('si');
      if (!isContainer && !n.classList.contains('ico')) n.classList.add('ico');
      n.innerHTML = svg;
      n.dataset.rendered = '1';
    });
  }

  /* ─────────── MICRO-INTERACTIONS ─────────── */
  function bindSpotlight(root) {
    root.querySelectorAll('.card,.int-c,.prod-card,.btn-grad,.btn-xl.primary').forEach(function (c) {
      c.addEventListener('pointermove', function (e) {
        var r = c.getBoundingClientRect();
        c.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        c.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
      });
    });
  }
  function bindMagnetic(root) {
    if (RM) return;
    root.querySelectorAll('.hero-ctas .btn-xl').forEach(function (b) {
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        b.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) / r.width * 7).toFixed(1) + 'px,' + ((e.clientY - r.top - r.height / 2) / r.height * 7).toFixed(1) + 'px)';
      });
      b.addEventListener('pointerleave', function () { b.style.transform = ''; });
    });
  }
  function bindTilt(root) {
    if (RM) return;
    root.querySelectorAll('.fh-visual,.phone-mock').forEach(function (el) {
      if (el.parentElement) el.parentElement.style.perspective = '1000px';
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = 'rotateX(' + (-py * 5).toFixed(2) + 'deg) rotateY(' + (px * 5).toFixed(2) + 'deg)';
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
    var pf = root.querySelector('.pipe-frame');
    if (pf) {
      pf.addEventListener('pointermove', function (e) {
        var r = pf.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        pf.style.transform = 'rotateX(' + (-py * 2).toFixed(2) + 'deg) rotateY(' + (px * 2.5).toFixed(2) + 'deg)';
      });
      pf.addEventListener('pointerleave', function () { pf.style.transform = ''; });
    }
  }
  function countUpAll(root) {
    if (RM) return;
    root.querySelectorAll('.stat .sv').forEach(function (el) {
      var raw = (el.textContent || '').trim();
      var m = raw.match(/^([^0-9]*)([0-9][0-9,]*)(.*)$/);
      if (!m || /[0-9]/.test(m[3])) return;
      var pre = m[1], target = parseInt(m[2].replace(/,/g, ''), 10), post = m[3];
      el.textContent = pre + '0' + post;
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          io.disconnect();
          var dur = 1200, t0 = performance.now();
          (function tick(t) {
            var k = Math.min(1, (t - t0) / dur);
            var v = Math.round((1 - Math.pow(1 - k, 3)) * target);
            el.textContent = pre + v.toLocaleString('en-US') + post;
            if (k < 1) requestAnimationFrame(tick);
          })(t0);
        });
      }, { threshold: 0.7 });
      io.observe(el);
    });
  }
  function loopMarquees(root) {
    root.querySelectorAll('.marquee-track[data-loop]').forEach(function (t) {
      if (t.dataset.looped) return;
      t.dataset.looped = '1';
      t.innerHTML += t.innerHTML;
    });
  }
  function bindHeroFX(root) {
    if (RM) return;
    var hero = root.querySelector('.hero');
    if (!hero) return;
    var grid = hero.querySelector('.hero-grid-bg');
    var glows = [].slice.call(hero.querySelectorAll('.glow'));
    window.addEventListener('scroll', function () {
      var y = Math.min(window.scrollY, 1000);
      glows.forEach(function (g, i) { g.style.marginTop = (y * (0.05 + i * 0.03)).toFixed(1) + 'px'; });
      if (grid) grid.style.transform = 'translateY(' + (y * 0.12).toFixed(1) + 'px)';
    }, { passive: true });
  }
  function initReveal(root) {
    root.querySelectorAll('.reveal').forEach(function (el) {
      if (!el.parentElement) return;
      var sibs = [].slice.call(el.parentElement.children).filter(function (c) { return c.classList.contains('reveal'); });
      el.style.setProperty('--rv-i', sibs.indexOf(el) % 7);
    });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    root.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  }
  function initFaq(root) {
    root.querySelectorAll('.faq-i').forEach(function (item) {
      var btn = item.querySelector('.faq-q');
      var ans = item.querySelector('.faq-a');
      if (!btn || !ans) return;
      btn.addEventListener('click', function () {
        var open = item.classList.contains('open');
        var parent = item.parentElement;
        parent.querySelectorAll('.faq-i').forEach(function (x) {
          x.classList.remove('open');
          x.querySelector('.faq-a').style.maxHeight = null;
          var b = x.querySelector('.faq-q'); if (b) b.setAttribute('aria-expanded', 'false');
        });
        if (!open) {
          item.classList.add('open');
          ans.style.maxHeight = ans.scrollHeight + 'px';
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ─────────── HOMEPAGE PIPELINE ANIMATION ─────────── */
  function initPipeline() {
    var wave = document.getElementById('wave');
    if (!wave) return;
    wave.innerHTML = '';
    for (var i = 0; i < 72; i++) {
      var b = document.createElement('i');
      b.style.height = (8 + Math.random() * 34) + 'px';
      b.style.animationDelay = (Math.random() * 1.1) + 's';
      b.style.animationDuration = (0.7 + Math.random() * 0.9) + 's';
      wave.appendChild(b);
    }
    if (RM) return;
    var stages = [].slice.call(document.querySelectorAll('#stages .stage'));
    var outs = [].slice.call(document.querySelectorAll('#pipe-out .pout'));
    var tEl = document.getElementById('pipe-t');
    var langs = ['English + Hindi (code-switched)', 'Bahasa Melayu', 'Mandarin + English', 'Tamil', 'Tagalog + English', 'Thai', 'Vietnamese', 'Cantonese + English'];
    var langEl = document.getElementById('pipe-lang');
    var step = 0, t = 0, cycle = 0;
    setInterval(function () {
      if (step < stages.length) {
        stages.forEach(function (s, i) { s.classList.toggle('on', i === step); if (i < step) s.classList.add('done'); });
        if (step >= 4) outs[Math.min(step - 4, 3)].classList.add('show');
        t += 8 + Math.random() * 6;
        if (tEl) tEl.textContent = t.toFixed(1) + 's';
        step++;
      } else {
        outs.forEach(function (o) { o.classList.add('show'); });
        setTimeout(function () {
          stages.forEach(function (s) { s.classList.remove('on', 'done'); });
          outs.forEach(function (o) { o.classList.remove('show'); });
          step = 0; t = 0; cycle++;
          if (langEl) langEl.textContent = 'Detected: ' + langs[cycle % langs.length];
        }, 1800);
        step++;
        if (step > stages.length + 2) step = stages.length + 2;
      }
    }, 820);
  }

  /* ─────────── ROI CALCULATOR ─────────── */
  function initRoi() {
    var rc = document.getElementById('r-calls');
    if (!rc) return;
    var ra = document.getElementById('r-analysts'), rco = document.getElementById('r-cost');
    var fmt = function (n) { return n.toLocaleString('en-US'); };
    function upd() {
      var calls = +rc.value, an = +ra.value, cost = +rco.value;
      document.getElementById('rv-calls').textContent = fmt(calls);
      document.getElementById('rv-analysts').textContent = an;
      document.getElementById('rv-cost').textContent = '$' + fmt(cost);
      var now = Math.round(calls * 0.03);
      document.getElementById('ro-now').textContent = fmt(now);
      document.getElementById('ro-after').textContent = fmt(calls);
      document.getElementById('ro-save').textContent = '$' + fmt(Math.round(an * cost * 0.8 * 12));
      document.getElementById('ro-x').textContent = (now > 0 ? Math.round(calls / now) : '∞') + '×';
    }
    [rc, ra, rco].forEach(function (s) { s.addEventListener('input', upd); });
    upd();
  }

  /* ─────────── CONTACT FORM ─────────── */
  function initForm() {
    var form = document.getElementById('lead-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('f-name'), email = document.getElementById('f-email'), co = document.getElementById('f-company');
      var ok = true;
      [name, email, co].forEach(function (f) {
        if (!f.value.trim()) { f.style.borderColor = 'var(--rose)'; ok = false; }
        else f.style.borderColor = 'var(--w15)';
      });
      if (email.value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)) { email.style.borderColor = 'var(--rose)'; ok = false; }
      if (!ok) return;
      form.style.display = 'none';
      var note = document.querySelector('.form-note'); if (note) note.style.display = 'none';
      document.getElementById('form-success').style.display = 'block';
      window.scrollTo({ top: document.getElementById('form-success').offsetTop - 140, behavior: 'smooth' });
    });
  }

  /* ─────────── NAV: scroll state, progress, mega-menu, mobile drawer ─────────── */
  function initNav() {
    var nav = document.getElementById('site-nav');
    var prog = document.getElementById('scroll-progress');
    var sticky = document.getElementById('sticky-cta');
    var ticking = false;
    function onScroll() {
      var y = window.scrollY;
      if (nav) nav.classList.toggle('scrolled', y > 16);
      if (prog) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        prog.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, y / max) : 0) + ')';
      }
      if (sticky) sticky.classList.toggle('show', y > 640);
      ticking = false;
    }
    window.addEventListener('scroll', function () { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
    onScroll();

    // desktop mega-menu — click toggles for touch, Esc closes, click-outside closes
    var items = [].slice.call(document.querySelectorAll('.nav-item'));
    items.forEach(function (item) {
      var btn = item.querySelector('button');
      var panel = item.querySelector('.nav-panel');
      if (!btn || !panel) return;
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var open = panel.getAttribute('data-open') === 'true';
        items.forEach(function (o) {
          var p = o.querySelector('.nav-panel'), b = o.querySelector('button');
          if (p) p.removeAttribute('data-open');
          if (b) b.setAttribute('aria-expanded', 'false');
        });
        if (!open) { panel.setAttribute('data-open', 'true'); btn.setAttribute('aria-expanded', 'true'); }
      });
    });
    document.addEventListener('click', function (e) {
      if (e.target.closest('.nav-item')) return;
      items.forEach(function (o) {
        var p = o.querySelector('.nav-panel'), b = o.querySelector('button');
        if (p) p.removeAttribute('data-open');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      items.forEach(function (o) {
        var p = o.querySelector('.nav-panel'), b = o.querySelector('button');
        if (p) p.removeAttribute('data-open');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
      closeDrawer();
    });

    // mobile drawer
    var hamb = document.getElementById('hamburger');
    var drawer = document.getElementById('mobile-drawer');
    var closeBtn = document.getElementById('drawer-close');
    function openDrawer() {
      if (!drawer) return;
      drawer.hidden = false;
      requestAnimationFrame(function () { drawer.classList.add('open'); });
      hamb.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    function closeDrawer() {
      if (!drawer) return;
      drawer.classList.remove('open');
      drawer.hidden = true;
      if (hamb) hamb.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
    if (hamb) hamb.addEventListener('click', function () {
      drawer.classList.contains('open') ? closeDrawer() : openDrawer();
    });
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (drawer) {
      drawer.querySelectorAll('.m-toggle').forEach(function (t) {
        t.addEventListener('click', function () {
          var sub = t.nextElementSibling;
          var open = t.getAttribute('aria-expanded') === 'true';
          t.setAttribute('aria-expanded', String(!open));
          if (sub) sub.classList.toggle('open', !open);
        });
      });
      drawer.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeDrawer); });
    }
    window.__closeDrawer = closeDrawer;
  }

  /* ─────────── BOOT ─────────── */
  function boot() {
    var d = document;
    hydrateIcons(d);
    initNav();
    initReveal(d);
    bindSpotlight(d);
    bindMagnetic(d);
    bindTilt(d);
    countUpAll(d);
    loopMarquees(d);
    bindHeroFX(d);
    initFaq(d);
    initPipeline();
    initRoi();
    initForm();
    // mark current top-level nav link
    var path = location.pathname;
    d.querySelectorAll('.nav-links a[href]').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href === '/' ? path === '/' : path.indexOf(href) === 0) a.classList.add('active');
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
