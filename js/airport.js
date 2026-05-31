/* ================================================================
   CALIBER CAR SERVICE — airport.js
   Standalone renderer for /jfk, /lga, /ewr, /hpn landing pages.
   Reads window.AIRPORT_PAGE config set inline in each page.
================================================================ */

/* ----------------------------------------------------------------
   Image fallback (same as main.js)
---------------------------------------------------------------- */
const AP_PHONE_ICON =
  `<svg class="phone-icon" width="13" height="13" viewBox="0 0 24 24" ` +
  `fill="#B8963E" aria-hidden="true">` +
  `<path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 ` +
  `1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 ` +
  `1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 ` +
  `2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>` +
  `</svg>`;

const AP_FALLBACK_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">' +
    '<rect width="800" height="600" fill="#0E0E0C"/>' +
    '<text x="400" y="295" font-family="Bebas Neue,Impact,sans-serif" font-size="84" ' +
      'letter-spacing="12" fill="#B8963E" text-anchor="middle">CALIBER</text>' +
    '<text x="400" y="335" font-family="sans-serif" font-size="14" ' +
      'letter-spacing="6" fill="#55554C" text-anchor="middle">CAR SERVICE</text>' +
  '</svg>';
const AP_FALLBACK_URI = 'data:image/svg+xml;utf8,' + encodeURIComponent(AP_FALLBACK_SVG);
const AP_IMG_FB = ` onerror="this.onerror=null;this.src='${AP_FALLBACK_URI}';this.classList.add('is-fallback');"`;

const MOOVS_BOOK_ATTRS = ' target="_blank" rel="noopener" onclick="return gtag_report_conversion(this.href)"';

/* ----------------------------------------------------------------
   Crosshair-C brand mark — same inline SVG as main.js, kept in sync.
   Strokes are thickened from caliber_mark.svg so the mark stays
   legible at nav/footer scale.
---------------------------------------------------------------- */
const AP_BRAND_MARK_SVG =
  `<svg class="brand-mark" viewBox="0 0 200 200" aria-hidden="true">` +
    `<line x1="15" y1="100" x2="185" y2="100" stroke="#B8963E" stroke-width="2.5"/>` +
    `<line x1="100" y1="15" x2="100" y2="185" stroke="#B8963E" stroke-width="2.5"/>` +
    `<line x1="15" y1="93" x2="15" y2="107" stroke="#B8963E" stroke-width="4"/>` +
    `<line x1="185" y1="93" x2="185" y2="107" stroke="#B8963E" stroke-width="4"/>` +
    `<line x1="93" y1="15" x2="107" y2="15" stroke="#B8963E" stroke-width="4"/>` +
    `<line x1="93" y1="185" x2="107" y2="185" stroke="#B8963E" stroke-width="4"/>` +
    `<path d="M 132.8 77.1 A 40 40 0 1 0 132.8 122.9" fill="none" stroke="#B8963E" stroke-width="5" stroke-linecap="butt"/>` +
    `<circle cx="100" cy="100" r="4" fill="#B8963E"/>` +
  `</svg>`;

/* ----------------------------------------------------------------
   Brand wordmark helper
---------------------------------------------------------------- */
function apBrandWordmark() {
  return `<span class="logo-primary">CALIBER</span>` +
         AP_BRAND_MARK_SVG +
         `<span class="logo-secondary">CAR SERVICE</span>`;
}

function apAirportLinks() {
  if (typeof CONFIG !== 'undefined' && CONFIG.footer && CONFIG.footer.airports) {
    return CONFIG.footer.airports.map((a) => ({
      label: a.label,
      href:  '../' + a.href,
    }));
  }
  return [
    { label: 'JFK Airport',        href: '../jfk/' },
    { label: 'LaGuardia (LGA)',    href: '../lga/' },
    { label: 'Newark (EWR)',       href: '../ewr/' },
    { label: 'White Plains (HPN)', href: '../hpn/' },
  ];
}

function apInjectFaqSchema(page) {
  const prev = document.getElementById('ap-faq-schema');
  if (prev) prev.remove();

  const schema = {
    '@context':   'https://schema.org',
    '@type':      'FAQPage',
    mainEntity: page.faq.map(({ q, a }) => ({
      '@type':          'Question',
      name:             q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  const el = document.createElement('script');
  el.type = 'application/ld+json';
  el.id = 'ap-faq-schema';
  el.textContent = JSON.stringify(schema);
  document.head.appendChild(el);
}

/* ================================================================
   RENDER FUNCTIONS
================================================================ */

function apRenderNav(page) {
  const navItems = [
    { label: 'Services',  href: '../#services'  },
    { label: 'Fleet',     href: '../#fleet'     },
    { label: 'Coverage',  href: '../#coverage'  },
    { label: 'Reviews',   href: '../#reviews'   },
  ];
  const airports = apAirportLinks();
  const links = navItems
    .map((n) => `<li><a href="${n.href}">${n.label}</a></li>`)
    .join('');
  const airportItems = airports
    .map((a) => `<li><a href="${a.href}">${a.label}</a></li>`)
    .join('');
  const drawerAirports = airports
    .map((a) => `<a href="${a.href}">${a.label}</a>`)
    .join('');

  return `
    <nav class="nav" id="nav" aria-label="Primary">
      <a href="../" class="nav-logo">${apBrandWordmark()}</a>
      <div class="nav-right">
        <ul class="nav-links">
          ${links}
          <li class="nav-dropdown" id="navAirports">
            <button class="nav-dropdown-trigger" aria-haspopup="true" aria-expanded="false" id="navAirportsBtn">
              Airports <span class="nav-dropdown-chevron">▾</span>
            </button>
            <ul class="nav-dropdown-menu">${airportItems}</ul>
          </li>
        </ul>
        <a href="tel:+15165952391" class="nav-phone">${AP_PHONE_ICON}(516) 595-2391</a>
        <a href="${CONFIG.bookHref}" class="nav-cta"${MOOVS_BOOK_ATTRS}>Book Now</a>
        <button class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
      <aside class="nav-drawer" id="navDrawer" aria-label="Mobile menu">
        <button class="nav-drawer-close" id="navDrawerClose" aria-label="Close menu">&#x2715;</button>
        ${navItems.map((n) => `<a href="${n.href}">${n.label}</a>`).join('')}
        ${drawerAirports}
        <a href="${CONFIG.bookHref}" class="nav-cta"${MOOVS_BOOK_ATTRS}>Book Now</a>
      </aside>
    </nav>`;
}

function apRenderHero(page) {
  const { hero } = page;
  return `
    <section class="ap-hero" id="ap-hero">
      <div class="ap-hero-bg" id="apHeroBg" style="background-image:url('../assets/images/planepluscar.jpg')"></div>
      <div class="ap-hero-content">
        <p class="ap-breadcrumb">
          <a href="../">Home</a>
          <span class="sep">›</span>
          <span>Airport Service</span>
          <span class="sep">›</span>
          <span>${page.name}</span>
        </p>
        <div class="ap-hero-eyebrow">Long Island · Nassau &amp; Suffolk · 24/7</div>
        <h1 class="ap-hero-headline">
          <span class="ap-gold">${hero.line1}</span><br>
          <span class="ap-ghost">${hero.line2}</span>
        </h1>
        <p class="ap-hero-sub">${hero.sub}</p>
        <div class="ap-hero-ctas">
          <a href="${CONFIG.bookHref}" class="btn btn-gold"${MOOVS_BOOK_ATTRS}>
            Reserve Your Ride <span class="btn-arrow">→</span>
          </a>
          <a href="tel:+15165952391" class="btn btn-outline">
            ${AP_PHONE_ICON}(516) 595-2391 <span class="btn-arrow">&#x2197;&#xFE0E;</span>
          </a>
        </div>
      </div>
    </section>`;
}

function apRenderTrust(page) {
  const items = page.trust
    .map((t) => `
      <div class="ap-trust-item">
        <span class="ap-trust-value">${t.value}</span>
        <span class="ap-trust-label">${t.label}</span>
      </div>`)
    .join('');
  return `
    <div class="ap-trust">
      <div class="ap-trust-grid">${items}</div>
    </div>`;
}

function apRenderFeatures(page) {
  const cards = page.features
    .map((f, i) => `
      <div class="ap-feature-card">
        <span class="ap-feature-num">0${i + 1}</span>
        <h3 class="ap-feature-title">${f.title}</h3>
        <p class="ap-feature-desc">${f.desc}</p>
      </div>`)
    .join('');
  return `
    <section class="ap-features">
      <div class="ap-features-inner">
        <div class="ap-features-head">
          <span class="section-eyebrow">What's Included</span>
          <h2 class="section-title">Every ride<span class="gold">.</span></h2>
        </div>
        <div class="ap-features-grid">${cards}</div>
      </div>
    </section>`;
}

function apRenderSteps() {
  const steps = [
    {
      num:   '01',
      title: 'BOOK YOUR RIDE',
      desc:  'Reserve online or call dispatch. Confirm your flight number and pickup address — we handle the rest.',
    },
    {
      num:   '02',
      title: 'WE TRACK YOUR FLIGHT',
      desc:  'Real-time monitoring keeps your driver one step ahead of delays, early arrivals, and gate changes.',
    },
    {
      num:   '03',
      title: 'CHAUFFEUR MEETS YOU',
      desc:  'Your driver is in arrivals, name sign in hand, before your bags hit the belt. Luggage loaded, door held.',
    },
  ];
  const items = steps
    .map((s) => `
      <div class="ap-step">
        <span class="ap-step-num">${s.num}</span>
        <h3 class="ap-step-title">${s.title}</h3>
        <p class="ap-step-desc">${s.desc}</p>
      </div>`)
    .join('');
  return `
    <section class="ap-steps">
      <div class="ap-steps-inner">
        <div class="ap-steps-head">
          <span class="section-eyebrow">The Process</span>
          <h2 class="section-title">How it works<span class="gold">.</span></h2>
        </div>
        <div class="ap-steps-grid">${items}</div>
      </div>
    </section>`;
}

function apRenderGlove(page) {
  const { glove } = page;
  return `
    <section class="ap-glove">
      <div class="ap-glove-inner">
        <div class="ap-glove-text">
          <span class="section-eyebrow">White Glove Service</span>
          <h2 class="ap-glove-headline">${glove.headline}</h2>
          <p class="ap-glove-body">${glove.body}</p>
          <a href="${CONFIG.bookHref}" class="btn btn-gold"${MOOVS_BOOK_ATTRS}>
            Book Online <span class="btn-arrow">→</span>
          </a>
        </div>
        <div class="ap-glove-img-wrap">
          <img
            src="../assets/images/whiteglove.webp"
            alt="Caliber Car Service — white glove chauffeur service"
            class="ap-glove-img"
            loading="lazy"
            ${AP_IMG_FB}
          />
        </div>
      </div>
    </section>`;
}

function apRenderFAQ(page) {
  const items = page.faq
    .map((q) => `
      <details class="ap-faq-item">
        <summary>${q.q}</summary>
        <p class="ap-faq-answer">${q.a}</p>
      </details>`)
    .join('');
  return `
    <section class="ap-faq" id="ap-faq">
      <div class="ap-faq-inner">
        <div class="ap-faq-head">
          <span class="section-eyebrow">Common Questions</span>
          <h2 class="section-title">${page.name} FAQs<span class="gold">.</span></h2>
        </div>
        <div class="ap-faq-list">${items}</div>
      </div>
    </section>`;
}

function apRenderCTA(page) {
  return `
    <section class="cta" id="cta">
      <div class="cta-inner">
        <div class="cta-text">
          <span class="section-eyebrow">Ready When You Are</span>
          <h2 class="cta-heading">Book your<br>${page.name} transfer<span class="gold">.</span></h2>
          <p class="cta-sub">One call, one driver, on time — every time. Available 24 hours a day, 7 days a week.</p>
        </div>
        <div class="cta-contact cta-contact--single">
          <a href="tel:+15165952391" class="cta-contact-item">
            <span class="cta-contact-label">Dispatch — 24/7</span>
            <span class="cta-contact-value">${AP_PHONE_ICON}(516) 595-2391</span>
          </a>
        </div>
        <a href="${CONFIG.bookHref}" class="btn btn-gold"${MOOVS_BOOK_ATTRS}>
          Book Online <span class="btn-arrow">→</span>
        </a>
      </div>
    </section>`;
}

function apRenderFooter() {
  const airportLinks = apAirportLinks()
    .map((a) => `<a href="${a.href}">${a.label}</a>`)
    .join('');

  return `
    <footer class="footer" role="contentinfo">
      <div class="footer-inner footer-inner--four">
        <div class="footer-brand-col">
          <a href="../" class="footer-brand">${apBrandWordmark()}</a>
          <p class="footer-tagline">Family owned and operated on Long Island since 2004. Executive transport across the tri-state — discreet, dependable, on-time.</p>
          <div class="footer-badges">
            <span class="footer-badge">Family Owned Since 2004</span>
            <span class="footer-badge">Fully Licensed</span>
            <span class="footer-badge">TLC Compliant</span>
            <span class="footer-badge">Fully Insured</span>
          </div>
        </div>
        <div class="footer-col">
          <span class="footer-col-title">Contact</span>
          <div class="footer-list">
            <a href="tel:+15165952391">${AP_PHONE_ICON}(516) 595-2391</a>
            <span>Long Island, New York</span>
            <span>Available 24/7</span>
          </div>
        </div>
        <div class="footer-col">
          <span class="footer-col-title">Explore</span>
          <div class="footer-list">
            <a href="../#services">Services</a>
            <a href="../#fleet">Fleet</a>
            <a href="../#coverage">Coverage</a>
            <a href="../#reviews">Reviews</a>
            <a href="tel:+15165952391">Book Now</a>
          </div>
        </div>
        <div class="footer-col">
          <span class="footer-col-title">Airports</span>
          <div class="footer-list">
            ${airportLinks}
            <a href="../#services">All Services</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-copy">&copy; 2026 Caliber Car Service. All rights reserved.</p>
        <nav class="footer-nav" aria-label="Footer">
          <a href="../">Home</a>
          <a href="../#services">Services</a>
          <a href="tel:+15165952391">Book</a>
        </nav>
      </div>
    </footer>`;
}

/* ================================================================
   RENDER — assemble full page
================================================================ */
function apRender() {
  const page = window.AIRPORT_PAGE;

  document.title = page.seo.title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', page.seo.description);

  apInjectFaqSchema(page);

  document.getElementById('ap-app').innerHTML = [
    apRenderNav(page),
    apRenderHero(page),
    apRenderTrust(page),
    apRenderFeatures(page),
    apRenderSteps(),
    apRenderGlove(page),
    apRenderFAQ(page),
    apRenderCTA(page),
    apRenderFooter(),
  ].join('');
}

/* ================================================================
   LENIS SMOOTH SCROLL
================================================================ */
function apSetupLenis() {
  if (typeof Lenis === 'undefined') return;
  const lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
  lenis.on('scroll', () => ScrollTrigger && ScrollTrigger.update());
  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
  // Wire Lenis into GSAP ticker if available
  if (typeof gsap !== 'undefined') {
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }
}

/* ================================================================
   NAV BEHAVIOUR — scroll state + mobile toggle
================================================================ */
function apSetupNav() {
  const nav      = document.getElementById('nav');
  const toggle   = document.getElementById('navToggle');
  const drawer   = document.getElementById('navDrawer');
  const closeBtn = document.getElementById('navDrawerClose');
  if (!nav) return;

  // Inject overlay as direct child of <body> — must NOT be inside nav,
  // because backdrop-filter on nav.scrolled breaks position:fixed descendants.
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  // Scroll state
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function openDrawer() {
    document.body.classList.add('nav-open');
    toggle?.setAttribute('aria-expanded', 'true');
    toggle?.setAttribute('aria-label', 'Close menu');
  }
  function closeDrawer() {
    document.body.classList.remove('nav-open');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.setAttribute('aria-label', 'Open menu');
  }

  // Hamburger toggles
  toggle?.addEventListener('click', () => {
    document.body.classList.contains('nav-open') ? closeDrawer() : openDrawer();
  });

  // × button
  closeBtn?.addEventListener('click', closeDrawer);

  // Real overlay div — direct click, no pseudo-element issues
  overlay?.addEventListener('click', closeDrawer);

  // Close on link click inside drawer
  drawer?.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeDrawer));

  // Escape key
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });

  // Airports dropdown
  const airportBtn = document.getElementById('navAirportsBtn');
  const airportDd  = document.getElementById('navAirports');
  if (airportBtn && airportDd) {
    airportBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = airportDd.classList.toggle('open');
      airportBtn.setAttribute('aria-expanded', open);
    });
    document.addEventListener('click', () => airportDd.classList.remove('open'));
    airportDd.addEventListener('click', (e) => e.stopPropagation());
  }
}

/* ================================================================
   ANIMATIONS
================================================================ */
function apInitAnimations() {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  // Hero bg subtle zoom
  const heroBg = document.getElementById('apHeroBg');
  if (heroBg) {
    requestAnimationFrame(() => heroBg.classList.add('zoomed'));
  }

  // Hero content fade-up
  gsap.from('.ap-hero-content > *', {
    opacity:  0,
    y:        28,
    duration: 0.8,
    ease:     'power2.out',
    stagger:  0.12,
    delay:    0.2,
  });

  // Trust items
  gsap.from('.ap-trust-item', {
    scrollTrigger: { trigger: '.ap-trust', start: 'top 88%' },
    opacity: 0,
    y:       20,
    duration: 0.6,
    stagger:  0.08,
    ease:     'power2.out',
  });

  // Feature cards
  gsap.from('.ap-feature-card', {
    scrollTrigger: { trigger: '.ap-features-grid', start: 'top 80%' },
    opacity:  0,
    y:        30,
    duration: 0.7,
    stagger:  0.08,
    ease:     'power2.out',
  });

  // Steps
  gsap.from('.ap-step', {
    scrollTrigger: { trigger: '.ap-steps-grid', start: 'top 82%' },
    opacity:  0,
    y:        28,
    duration: 0.7,
    stagger:  0.15,
    ease:     'power2.out',
  });

  // Glove — immediateRender: false prevents GSAP from pre-setting
  // opacity:0 on mount, which causes elements to stay invisible when
  // the user scrolls past the trigger faster than ScrollTrigger fires.
  gsap.from('.ap-glove-text > *', {
    scrollTrigger: {
      trigger: '.ap-glove',
      start:   'top 95%',
      once:    true,
    },
    opacity:         0,
    x:               -24,
    duration:        0.75,
    stagger:         0.1,
    ease:            'power2.out',
    immediateRender: false,
  });
  gsap.from('.ap-glove-img-wrap', {
    scrollTrigger: {
      trigger: '.ap-glove',
      start:   'top 95%',
      once:    true,
    },
    opacity:         0,
    x:               24,
    duration:        0.75,
    ease:            'power2.out',
    immediateRender: false,
  });

  // FAQ
  gsap.from('.ap-faq-item', {
    scrollTrigger: { trigger: '.ap-faq-list', start: 'top 82%' },
    opacity:  0,
    y:        16,
    duration: 0.55,
    stagger:  0.07,
    ease:     'power2.out',
  });

  // Section heads — exclude glove children already animated above
  document.querySelectorAll('.section-eyebrow, .section-title, .section-lede').forEach((el) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%' },
      opacity:  0,
      y:        20,
      duration: 0.65,
      ease:     'power2.out',
    });
  });

  requestAnimationFrame(() => ScrollTrigger.refresh());
}

/* ================================================================
   INIT
================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  apRender();
  apSetupNav();
  apSetupLenis();
  apInitAnimations();
});
