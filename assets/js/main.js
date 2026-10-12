/* ==========================================================================
   KW RED — homepage behaviour

   Scope note: this page shows only content that exists on redww.com today.
   No new product features. Fields marked "placeholder" below need a value
   from the existing database; nothing here needs a new backend feature.
     placeholder → launch starting price, launch delivery year, launch unit mix,
                   district project/unit counts, developer project counts.
     real        → names, developers, districts, unit price/beds/baths/sqm/
                   type/delivery, hotline, email, social links.
   Content is rendered from the DATA block so it can be swapped for an API.
   ========================================================================== */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var IMG = 'assets/img/';

  /* ---------- icons ------------------------------------------------- */
  var I = {
    phone: '<path d="M21 16.9v2.6a1.7 1.7 0 0 1-1.9 1.7 17 17 0 0 1-7.4-2.6 16.7 16.7 0 0 1-5.1-5.1A17 17 0 0 1 4 6a1.7 1.7 0 0 1 1.7-1.9h2.6a1.7 1.7 0 0 1 1.7 1.5c.1.8.3 1.7.6 2.4a1.7 1.7 0 0 1-.4 1.8l-1.1 1.1a13.7 13.7 0 0 0 5 5l1.1-1.1a1.7 1.7 0 0 1 1.8-.4c.8.3 1.6.5 2.4.6a1.7 1.7 0 0 1 1.6 1.9z"/>',
    chat: '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.8 8.8 0 0 1-3.8-.9L3 20.5l1.6-4.8A8.4 8.4 0 0 1 12 3.1a8.4 8.4 0 0 1 9 8.4z"/>',
    bed: '<path d="M3 17v-5h18v5M3 17v2M21 17v2M3 12V7M7 12V9.5h10V12"/>',
    bath: '<path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3zM7 12V6a2 2 0 0 1 4 0M7 19l-1 2M17 19l1 2"/>',
    area: '<path d="M4 9V4h5M20 15v5h-5M4 4l6 6M20 20l-6-6"/>'
  };
  function svg(d) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + d + '</svg>'; }

  /* ---------- data --------------------------------------------------- */
  var HERO = [
    { img: 'hero-north-coast.jpg', place: 'North Coast' },
    { img: 'hero-ras-el-hekma.jpg', place: 'Ras El Hekma' },
    { img: 'hero-new-cairo.jpg', place: 'New Cairo' }
  ];

  var LAUNCH_IMGS = ['launch-diplo-east.jpg', 'launch-jirian.jpg', 'launch-sky-north.jpg',
    'launch-telal-soul.jpg', 'launch-saada.jpg', 'launch-ten-islands.jpg'];

  // n/d/z are live site data. p (price), y (delivery), mix are placeholders.
  var LAUNCHES = [
    { n: 'Diplo East', d: 'MBG Developments', z: 'New Capital', p: 4.2, y: 2028, mix: 'Apartments & duplexes' },
    { n: 'Jirian Mountain View', d: 'Mountain View', z: 'El Sheikh Zayed', p: 9.5, y: 2029, mix: 'Villas & townhouses' },
    { n: 'SKY North', d: 'SKY AD Development', z: 'North Coast', p: 7.4, y: 2028, mix: 'Chalets & villas' },
    { n: 'Telal Soul', d: 'Roya Developments', z: 'North Coast', p: 8.9, y: 2029, mix: 'Chalets & villas' },
    { n: 'SAADA Boutique', d: 'Horizon Egypt Developments', z: 'New Cairo', p: 8.3, y: 2029, mix: 'Villas' },
    { n: 'Ten Islands', d: 'Al Ahly Sabbour', z: 'North Coast', p: 11.5, y: 2029, mix: 'Chalets & villas' },
    { n: 'El Patio Hills', d: 'La Vista Developments', z: 'New Cairo', p: 7.8, y: 2028, mix: 'Villas & twin houses' },
    { n: 'One50', d: 'El Gabry Developments', z: 'El Sheikh Zayed', p: 5.4, y: 2027, mix: 'Apartments' },
    { n: 'ONS', d: 'Mabany Edris', z: 'El Sheikh Zayed', p: 6.1, y: 2028, mix: 'Apartments & penthouses' },
    { n: 'Mist', d: 'M Squared', z: 'New Cairo', p: 6.9, y: 2029, mix: 'Apartments & duplexes' },
    { n: 'WESTDAYS', d: 'IL Cazar Developments', z: '6th of October', p: 5.2, y: 2028, mix: 'Apartments' },
    { n: 'Hyde Park Signature', d: 'Hyde Park Developments', z: '6th of October', p: 7.1, y: 2028, mix: 'Apartments' },
    { n: 'M Signature', d: 'Vantage Developments', z: 'New Cairo', p: 9.1, y: 2029, mix: 'Apartments & penthouses' },
    { n: 'Talala', d: 'Madinet Masr', z: 'New Heliopolis', p: 5.8, y: 2028, mix: 'Apartments & duplexes' },
    { n: 'JIWAR', d: 'Concrete Developments', z: 'New Cairo', p: 6.2, y: 2028, mix: 'Apartments' },
    { n: 'Kasakuon', d: 'Ajna', z: 'New Cairo', p: 6.5, y: 2028, mix: 'Apartments' },
    { n: 'Rock Green', d: 'Rock Developments', z: 'El Shorouk', p: 4.1, y: 2027, mix: 'Apartments' },
    { n: 'Quest Towers', d: 'Memaar El Ashraf', z: 'Obour City', p: 3.6, y: 2027, mix: 'Apartments & offices' },
    { n: 'Avira Residence', d: 'Brouq Developments', z: 'New Cairo', p: 5.6, y: 2027, mix: 'Apartments' },
    { n: 'Jirian Palm Hills', d: 'Palm Hills Developments', z: 'El Sheikh Zayed', p: 10.2, y: 2029, mix: 'Villas & townhouses' }
  ];

  // name/image real; p (projects) and u (units) counts are placeholders
  var DISTRICTS = [
    { n: 'New Cairo', img: 'district-new-cairo.jpg', p: 32, u: 410 },
    { n: 'New Capital', img: 'district-new-capital.jpg', p: 28, u: 368 },
    { n: 'North Coast', img: 'district-north-coast.jpg', p: 24, u: 295 },
    { n: 'El Sheikh Zayed', img: 'district-sheikh-zayed.jpg', p: 21, u: 254 },
    { n: '6th of October', img: 'district-6th-october.jpg', p: 18, u: 221 },
    { n: 'Mostakbal City', img: 'district-mostakbal.jpg', p: 14, u: 176 },
    { n: 'Ain Sokhna', img: 'district-ain-sokhna.jpg', p: 11, u: 132 },
    { n: 'New Alamein', img: 'district-new-alamein.jpg', p: 9, u: 98 }
  ];

  // all fields here exist on the live unit cards
  var UNITS = [
    { n: 'Sia Matrouh', d: 'Arab Developers Holding', z: 'North Coast', k: 'Apartment', p: 3090000, b: 1, t: 2, m: 74, y: 'Delivery 2025', img: 'unit-sia-matrouh.jpg' },
    { n: 'Sia Island', d: 'Arab Developers Holding', z: 'Ain Sokhna', k: 'Apartment', p: 3156000, b: 1, t: 1, m: 57, y: 'Delivery 2025', img: 'unit-sia-island.jpg' },
    { n: 'Badya', d: 'Palm Hills Developments', z: '6th of October', k: 'Apartment', p: 5750000, b: 3, t: 3, m: 165, y: 'Delivery 2027', img: 'unit-badya.jpg' },
    { n: 'Al Burouj', d: 'Capital Group Properties', z: 'El Shorouk', k: 'Townhouse', p: 6300000, b: 3, t: 3, m: 175, y: 'Delivery 2027', img: 'unit-al-burouj.jpg' },
    { n: 'Zed East', d: 'Ora Developers', z: 'New Cairo', k: 'Apartment', p: 9200000, b: 3, t: 3, m: 190, y: 'Delivery 2028', img: 'unit-zed-east.jpg' },
    { n: 'Sodic East', d: 'Sodic', z: 'New Heliopolis', k: 'Villa', p: 8400000, b: 4, t: 4, m: 240, y: 'Delivery 2028', img: 'unit-sodic-east.jpg' }
  ];

  // developer names real; project counts are placeholders
  var DEVS = [
    ['Mountain View', 24], ['Palm Hills Developments', 21], ['Sodic', 19], ['Misr Italia Properties', 17],
    ['Tatweer Misr', 15], ['Ora Developers', 14], ['Madinet Masr', 13], ['Al Ahly Sabbour', 12],
    ['Hyde Park Developments', 11], ['IL Cazar Developments', 10], ['La Vista Developments', 9], ['Roya Developments', 8]
  ];

  /* ---------- helpers ------------------------------------------------ */
  function n(x) { return x.toLocaleString('en-US'); }
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  // chips must live inside .ph — it is the positioned ancestor they anchor to
  function media(src, alt, chips) {
    return '<div class="ph"><img src="' + IMG + src + '" alt="' + alt + '" loading="lazy" decoding="async">' +
      (chips || '') + '</div>';
  }

  /* ---------- hero ---------------------------------------------------- */
  var heroMedia = $('#heroMedia'), dots = $('#heroDots'), place = $('#heroPlace');
  HERO.forEach(function (h, i) {
    heroMedia.appendChild(el('div', 'hero__slide' + (i === 0 ? ' is-on' : ''),
      '<img src="' + IMG + h.img + '" alt="" ' + (i ? 'loading="lazy"' : 'fetchpriority="high"') + ' decoding="async">'));
    var b = el('button', null, '<span class="sr">' + h.place + '</span>');
    b.type = 'button';
    b.setAttribute('aria-current', String(i === 0));
    b.addEventListener('click', function () { showSlide(i); restart(); });
    dots.appendChild(b);
  });
  place.textContent = HERO[0].place;
  var slides = heroMedia.children, cur = 0, timer;
  function showSlide(i) {
    cur = i;
    for (var k = 0; k < slides.length; k++) slides[k].classList.toggle('is-on', k === i);
    for (var j = 0; j < dots.children.length; j++) dots.children[j].setAttribute('aria-current', String(j === i));
    place.textContent = HERO[i].place;
  }
  function restart() {
    if (timer) clearInterval(timer);
    if (!reduce) timer = setInterval(function () { showSlide((cur + 1) % HERO.length); }, 7000);
  }
  restart();

  /* ---------- districts --------------------------------------------------- */
  var dg = $('#districts-grid');
  DISTRICTS.forEach(function (x) {
    var li = el('li');
    li.innerHTML = '<a class="dcard" href="#districts" data-demo="Opens ' + x.n + '">' +
      media(x.img, x.n) +
      '<span class="dcard__t"><b>' + x.n + '</b>' +
      '<span class="tnum">' + x.p + ' projects · ' + n(x.u) + ' units</span></span></a>';
    dg.appendChild(li);
  });

  /* ---------- launches rail ---------------------------------------------- */
  var rail = $('#rail');
  LAUNCHES.forEach(function (x, i) {
    var li = el('li');
    li.innerHTML = '<article class="lcard">' +
      media(LAUNCH_IMGS[i % LAUNCH_IMGS.length], x.n + ' by ' + x.d + ', ' + x.z,
        '<span class="chip chip--area">' + x.z + '</span>' +
        '<span class="chip chip--tr">Delivery ' + x.y + '</span>') +
      '<div class="lcard__over">' +
        '<h3 class="h-card">' + x.n + '</h3>' +
        '<div class="lcard__dev">By ' + x.d + '</div>' +
        '<div class="lcard__mix">' + x.mix + '</div>' +
        '<div class="lcard__foot">' +
          '<div class="lcard__price"><span>Starting price</span>' +
            '<b class="tnum">' + x.p.toFixed(1) + 'M EGP</b></div>' +
          '<button class="btn btn--light" type="button" data-demo="Opens the enquiry form for ' + x.n + '">Request details</button>' +
        '</div>' +
      '</div></article>';
    rail.appendChild(li);
  });

  var prev = $('#railPrev'), next = $('#railNext'), bar = $('#railBar');
  function stepW() { var f = rail.querySelector('li'); return f ? f.getBoundingClientRect().width + 26 : 460; }
  prev.addEventListener('click', function () { rail.scrollBy({ left: -stepW(), behavior: reduce ? 'auto' : 'smooth' }); });
  next.addEventListener('click', function () { rail.scrollBy({ left: stepW(), behavior: reduce ? 'auto' : 'smooth' }); });
  function syncRail() {
    var max = rail.scrollWidth - rail.clientWidth;
    var ratio = max > 0 ? rail.scrollLeft / max : 0;
    var vis = Math.max(rail.clientWidth / rail.scrollWidth, 0.06);
    bar.style.width = (vis * 100) + '%';
    bar.style.transform = 'translateX(' + (ratio * (100 / vis - 100)) + '%)';
    prev.disabled = rail.scrollLeft < 4;
    next.disabled = rail.scrollLeft >= max - 4;
  }
  rail.addEventListener('scroll', function () { window.requestAnimationFrame(syncRail); }, { passive: true });
  window.addEventListener('resize', syncRail);
  syncRail();

  /* ---------- units ------------------------------------------------------- */
  var ug = $('#units-grid'), utabs = $('#unitTabs'), filter = 'All';
  var KINDS = ['All'].concat(UNITS.map(function (u) { return u.k; })
    .filter(function (v, i, a) { return a.indexOf(v) === i; }));
  function drawTabs() {
    utabs.innerHTML = '';
    KINDS.forEach(function (k) {
      var li = el('li'), b = el('button', null, k === 'All' ? 'All units' : k + 's');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', String(filter === k));
      b.addEventListener('click', function () { filter = k; drawTabs(); drawUnits(); });
      li.appendChild(b); utabs.appendChild(li);
    });
  }
  function drawUnits() {
    ug.innerHTML = '';
    UNITS.filter(function (u) { return filter === 'All' || u.k === filter; }).forEach(function (x) {
      var li = el('li');
      li.innerHTML = '<article class="ucard">' +
        media(x.img, x.k + ' in ' + x.n + ', ' + x.z, '<span class="chip chip--dark">' + x.y + '</span>') +
        '<div class="ucard__body">' +
          '<div><h3>' + x.n + '</h3>' +
          '<div class="ucard__meta">' + x.k + ' · ' + x.z + ' · ' + x.d + '</div></div>' +
          '<div class="ucard__price"><span class="ucard__from">From</span>' +
            '<b class="tnum">' + n(x.p) + ' EGP</b></div>' +
          '<div class="specs">' +
            '<span>' + svg(I.bed) + '<span class="tnum">' + x.b + ' bed</span></span>' +
            '<span>' + svg(I.bath) + '<span class="tnum">' + x.t + ' bath</span></span>' +
            '<span>' + svg(I.area) + '<span class="tnum">' + x.m + ' m²</span></span>' +
          '</div>' +
          '<div class="ucard__foot">' +
            '<button class="btn btn--ghost" type="button" data-demo="Opens the unit page for ' + x.n + '">View details</button>' +
            '<button class="ibtn" type="button" data-call aria-label="Call about ' + x.n + '">' + svg(I.phone) + '</button>' +
            '<button class="ibtn" type="button" data-demo="Opens WhatsApp about ' + x.n + '" aria-label="WhatsApp about ' + x.n + '">' + svg(I.chat) + '</button>' +
          '</div>' +
        '</div></article>';
      ug.appendChild(li);
    });
  }
  drawTabs(); drawUnits();

  /* ---------- developers --------------------------------------------------- */
  var dv = $('#devs');
  DEVS.forEach(function (d) {
    var li = el('li');
    li.innerHTML = '<a class="dev" href="#developers" data-demo="Opens ' + d[0] + '">' +
      '<b>' + d[0] + '</b><span class="tnum">' + d[1] + ' projects</span></a>';
    dv.appendChild(li);
  });

  /* ---------- search -------------------------------------------------------- */
  var list = $('#places');
  DISTRICTS.map(function (d) { return d.n; })
    .concat(LAUNCHES.map(function (l) { return l.n; }))
    .concat(DEVS.map(function (d) { return d[0]; }))
    .forEach(function (v) { var o = el('option'); o.value = v; list.appendChild(o); });

  $('#searchForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var v = $('#q').value.trim();
    toast('Search' + (v ? ' for "' + v + '"' : '') + '. Prototype only — no results page yet.');
  });

  /* ---------- newsletter ------------------------------------------------------ */
  $('#newsForm').addEventListener('submit', function (e) {
    e.preventDefault();
    $('#newsMsg').textContent = 'Prototype only. On the live site this adds ' + $('#email').value + ' to the list.';
  });

  /* ---------- navigation ------------------------------------------------------- */
  var nav = $('#nav'), burger = $('#burger'), sheet = $('#sheet');
  function onScroll() { nav.classList.toggle('is-solid', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  burger.addEventListener('click', function () {
    var open = !sheet.hidden;
    sheet.hidden = open;
    burger.setAttribute('aria-expanded', String(!open));
    if (!open) nav.classList.add('is-solid'); else onScroll();
  });
  sheet.addEventListener('click', function (e) {
    if (e.target.closest('a')) { sheet.hidden = true; burger.setAttribute('aria-expanded', 'false'); }
  });

  // dropdowns: "KW RED" in the main nav, and the account menu when signed in
  var POPS = [[$('#kwBtn'), $('#kwMenu')], [$('#userBtn'), $('#userMenu')]];
  function closeMenus(except) {
    POPS.forEach(function (p) {
      if (p[0] && p[1] && p[1] !== except) { p[1].hidden = true; p[0].setAttribute('aria-expanded', 'false'); }
    });
  }
  POPS.forEach(function (p) {
    if (!p[0] || !p[1]) return;
    p[0].addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !p[1].hidden;
      closeMenus(p[1]);
      p[1].hidden = open;
      p[0].setAttribute('aria-expanded', String(!open));
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.menu')) closeMenus();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMenus();
      if (!sheet.hidden) { sheet.hidden = true; burger.setAttribute('aria-expanded', 'false'); }
    }
  });

  /* ---------- signed-out / signed-in ------------------------------------------- */
  // The page reads its state from [data-auth] on <html>. Wire that to the real
  // session on the server; everything below is the prototype switch only.
  var root = document.documentElement;
  function setAuth(state) {
    root.setAttribute('data-auth', state);
    closeMenus();
    [].forEach.call(document.querySelectorAll('[data-auth-set]'), function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-auth-set') === state));
    });
  }
  var authSwitch = $('#authSwitch');
  if (authSwitch) {
    authSwitch.addEventListener('click', function (e) {
      var b = e.target.closest('[data-auth-set]');
      if (b) setAuth(b.getAttribute('data-auth-set'));
    });
  }

  /* ---------- actions ---------------------------------------------------------- */
  var tt;
  function toast(msg) {
    var t = $('#toast');
    t.textContent = msg; t.hidden = false;
    clearTimeout(tt); tt = setTimeout(function () { t.hidden = true; }, 4200);
  }
  function copyHotline() {
    try {
      navigator.clipboard.writeText('15735').then(
        function () { toast('Hotline 15735 copied.'); },
        function () { toast('Select the number on the page to copy it.'); }
      );
    } catch (err) { toast('Select the number on the page to copy it.'); }
  }
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-call]')) { copyHotline(); return; }
    if (e.target.closest('[data-signout]')) {
      e.preventDefault(); setAuth('guest'); toast('Signed out.'); return;
    }
    var d = e.target.closest('[data-demo]');
    if (d) {
      if (d.tagName === 'A' && (d.getAttribute('href') || '').charAt(0) === '#') e.preventDefault();
      toast('Prototype only. ' + d.getAttribute('data-demo') + '.');
    }
  });
})();
