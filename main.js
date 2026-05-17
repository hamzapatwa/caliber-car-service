/* ================================================================
   CALIBER CAR SERVICE — main.js
   Renders the page from CONFIG (config.js) and runs all animations.
================================================================ */

/* ----------------------------------------------------------------
   Image fallback — used on any <img> via inline onerror.
   Swaps the broken image for a stylized "CALIBER CAR SERVICE"
   placeholder rendered as an inline SVG data URI.
---------------------------------------------------------------- */
const FALLBACK_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">' +
    '<defs><radialGradient id="g" cx="50%" cy="50%" r="60%">' +
      '<stop offset="0%" stop-color="#B8963E" stop-opacity="0.18"/>' +
      '<stop offset="100%" stop-color="#0E0E0C" stop-opacity="0"/>' +
    '</radialGradient></defs>' +
    '<rect width="800" height="600" fill="#0E0E0C"/>' +
    '<rect width="800" height="600" fill="url(#g)"/>' +
    '<text x="400" y="295" font-family="Bebas Neue, Impact, sans-serif" font-size="84" letter-spacing="12" fill="#B8963E" text-anchor="middle">CALIBER</text>' +
    '<text x="400" y="335" font-family="sans-serif" font-size="14" letter-spacing="6" fill="#55554C" text-anchor="middle">CAR SERVICE</text>' +
  '</svg>';
const FALLBACK_DATA_URI = 'data:image/svg+xml;utf8,' + encodeURIComponent(FALLBACK_SVG);
const IMG_FALLBACK_ATTR =
  ` onerror="this.onerror=null;this.src='${FALLBACK_DATA_URI}';this.classList.add('is-fallback');"`;

/* ----------------------------------------------------------------
   Phone icon — gold handset SVG, inline wherever phone# appears
---------------------------------------------------------------- */
const PHONE_ICON =
  `<svg class="phone-icon" width="13" height="13" viewBox="0 0 24 24" ` +
  `fill="#B8963E" aria-hidden="true">` +
  `<path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 ` +
  `1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 ` +
  `1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 ` +
  `2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>` +
  `</svg>`;

/* ----------------------------------------------------------------
   HTML helper for the brand wordmark
---------------------------------------------------------------- */
function brandWordmark() {
  const { primary, secondary } = CONFIG.brand;
  return `<span class="logo-primary">${primary}</span>` +
         `<span class="logo-pipe">|</span>` +
         `<span class="logo-secondary">${secondary}</span>`;
}

/* ================================================================
   RENDER HELPERS — each returns an HTML string
================================================================ */

function renderNav() {
  const links = CONFIG.nav
    .map((n) => `<li><a href="${n.href}">${n.label}</a></li>`)
    .join('');

  const airportItems = CONFIG.footer.airports
    .map((a) => `<li><a href="${a.href}">${a.label}</a></li>`)
    .join('');

  const drawerAirports = CONFIG.footer.airports
    .map((a) => `<a href="${a.href}">${a.label}</a>`)
    .join('');

  return `
    <nav class="nav" id="nav" aria-label="Primary">
      <a href="#hero" class="nav-logo">${brandWordmark()}</a>
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
        <a href="${CONFIG.phoneHref}" class="nav-phone">${PHONE_ICON}${CONFIG.phone}</a>
        <a href="${CONFIG.bookHref}" class="nav-cta" target="_blank" rel="noopener">Book Now</a>
        <button class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
      <aside class="nav-drawer" id="navDrawer" aria-label="Mobile menu">
        ${CONFIG.nav.map((n) => `<a href="${n.href}">${n.label}</a>`).join('')}
        ${drawerAirports}
        <a href="${CONFIG.bookHref}" class="nav-cta" target="_blank" rel="noopener">Book Now</a>
      </aside>
    </nav>`;
}

function renderHero() {
  const { badge, headline, sub, ctaPrimary, ctaSecondary, image } = CONFIG.hero;

  return `
    <section class="hero" id="hero">
      <div class="hero-content">
        <div class="hero-badge">
          <span class="hero-badge-dot"></span>
          ${badge}
        </div>
        <h1 class="hero-name">
          <span class="hero-name-row">
            <span class="hero-name-inner">${headline.line1}</span>
          </span>
          <span class="hero-name-row ghost">
            <span class="hero-name-inner">${headline.line2}</span>
          </span>
          ${headline.line3 ? `
          <span class="hero-name-row">
            <span class="hero-name-inner">${headline.line3}</span>
          </span>` : ''}
        </h1>
        <p class="hero-sub">${sub}</p>
        <div class="hero-ctas">
          <a href="${ctaPrimary.href}" class="btn btn-gold" target="_blank" rel="noopener">
            ${ctaPrimary.label}
            <span class="btn-arrow">→</span>
          </a>
          <a href="${CONFIG.phoneHref}" class="btn btn-outline">
            ${PHONE_ICON}${CONFIG.phone}
            <span class="btn-arrow">↗</span>
          </a>
        </div>
        <div class="hero-scroll" aria-hidden="true">
          <span>Scroll</span>
          <span class="hero-scroll-line"></span>
        </div>
      </div>
      <div class="hero-image" id="heroImage">
        <img src="${image.src}" alt="${image.alt}"${IMG_FALLBACK_ATTR} />
        <span class="hero-image-frame">Caliber 2026</span>
      </div>
    </section>`;
}

function renderStats() {
  const items = CONFIG.stats
    .map((s) => `
      <div class="stat-item">
        <span class="stat-number" data-target="${s.value}" data-suffix="${s.suffix}">
          0<span class="stat-suffix">${s.suffix}</span>
        </span>
        <span class="stat-label">${s.label}</span>
      </div>`)
    .join('');

  return `
    <section class="stats" aria-label="Key statistics">
      <div class="stats-grid">${items}</div>
    </section>`;
}

function renderMarquee() {
  const doubled = [...CONFIG.marquee, ...CONFIG.marquee];
  const items   = doubled.map((t) => `<span class="marquee-item">${t}</span>`).join('');
  return `
    <div class="marquee-section" aria-hidden="true">
      <div class="marquee-track">${items}</div>
    </div>`;
}

function renderServices() {
  const rows = CONFIG.services
    .map((s) => `
      <a class="service-row" href="${s.href || CONFIG.bookHref}" aria-label="${s.name}">
        <span class="service-num">${s.num}</span>
        <h3 class="service-name">${s.name}</h3>
        <p class="service-desc">${s.desc}</p>
        <span class="service-arrow" aria-hidden="true">→</span>
      </a>`)
    .join('');

  return `
    <section class="services" id="services">
      <div class="services-inner">
        <div class="services-head">
          <span class="section-eyebrow">What We Do</span>
          <h2 class="section-title">Service<span class="gold">.</span></h2>
          <p class="section-lede">Six ways we put you on the road — every one of them on time, on point, and on your terms.</p>
        </div>
        <div class="services-list">${rows}</div>
      </div>
    </section>`;
}

function renderFleet() {
  const spreads = CONFIG.fleet
    .map((v, i) => {
      const reverse  = i % 2 === 1 ? ' reverse' : '';
      const features = v.features
        .map((f) => `<span class="fleet-feature">${f}</span>`)
        .join('');

      return `
      <article class="fleet-spread${reverse}">
        <div class="fleet-image-wrap" data-tilt>
          <span class="fleet-image-badge">${v.category}</span>
          <img src="${v.image.src}" alt="${v.image.alt}"${IMG_FALLBACK_ATTR} />
        </div>
        <div class="fleet-info">
          <span class="fleet-num">${v.num} of ${String(CONFIG.fleet.length).padStart(2, '0')}</span>
          <span class="fleet-category">${v.category} Class</span>
          <h3 class="fleet-name">${v.name}</h3>
          <p class="fleet-models">${v.models}</p>
          <p class="fleet-desc">${v.description}</p>
          <div class="fleet-metrics">
            <div>
              <span class="fleet-metric-num">${v.capacity}<span class="gold">.</span></span>
              <span class="fleet-metric-label">${v.capacityNote}</span>
            </div>
            <div>
              <span class="fleet-metric-num">${v.luggage}</span>
              <span class="fleet-metric-label">Luggage</span>
            </div>
          </div>
          <div class="fleet-features">${features}</div>
          <a href="${CONFIG.bookHref}" class="btn btn-outline fleet-cta" target="_blank" rel="noopener">
            Reserve ${v.category}
            <span class="btn-arrow">→</span>
          </a>
        </div>
      </article>`;
    })
    .join('');

  return `
    <section class="fleet" id="fleet">
      <div class="fleet-head">
        <span class="section-eyebrow">The Fleet</span>
        <h2 class="section-title">Three vehicles.<br><span class="gold">One standard.</span></h2>
        <p class="section-lede">Every car is detailed before every trip, garaged on Long Island, and driven by a vetted, suited chauffeur.</p>
      </div>
      ${spreads}
    </section>`;
}

function renderCoverage() {
  const groups = CONFIG.coverage.groups
    .map((g) => `
      <div class="coverage-group">
        <span class="coverage-group-title">${g.title}</span>
        <ul>${g.items.map((i) => `<li>${i}</li>`).join('')}</ul>
      </div>`)
    .join('');

  return `
    <section class="coverage" id="coverage">
      <div class="coverage-inner">
        <div class="coverage-head">
          <div>
            <span class="section-eyebrow">Where We Drive</span>
            <h2 class="section-title">Tri-state, <span class="gold">door to door.</span></h2>
          </div>
          <p class="coverage-intro">${CONFIG.coverage.intro}</p>
        </div>
        <div class="coverage-grid">${groups}</div>
      </div>
    </section>`;
}

function renderReviews() {
  const cards = CONFIG.reviews
    .map((r) => `
      <article class="review-card">
        <div class="review-stars" aria-label="${r.stars} out of 5 stars">
          ${'<span>★</span>'.repeat(r.stars)}
        </div>
        <p class="review-quote">${r.quote}</p>
        <div class="review-attr">
          <span class="review-attr-name">${r.name}</span>
          <span class="review-attr-loc">${r.location}</span>
        </div>
      </article>`)
    .join('');

  return `
    <section class="reviews" id="reviews">
      <div class="reviews-inner">
        <div class="reviews-head">
          <span class="section-eyebrow">Client Experiences</span>
          <h2 class="section-title">What our<br>travelers say.</h2>
          <p class="reviews-sub">More than 500+ five-star Google reviews</p>
        </div>
        <div class="reviews-grid">${cards}</div>
        <div class="reviews-cta">
          <a href="https://www.google.com/maps" target="_blank" rel="noopener" class="btn btn-outline">
            View all 500+ Google Reviews
            <span class="btn-arrow">↗</span>
          </a>
        </div>
      </div>
    </section>`;
}

function renderCTA() {
  const c = CONFIG.cta;
  return `
    <section class="cta" id="cta">
      <div class="cta-inner">
        <span class="section-eyebrow cta-eyebrow">${c.eyebrow}</span>
        <h2 class="cta-heading">${c.headline.replace('YOUR RIDE.', '<span class="gold">YOUR RIDE.</span>')}</h2>
        <p class="cta-sub">${c.sub}</p>
        <div class="cta-contact cta-contact--single">
          <a href="${CONFIG.phoneHref}" class="cta-contact-item">
            <span class="cta-contact-label">Dispatch — 24/7</span>
            <span class="cta-contact-value">${PHONE_ICON}${CONFIG.phone}</span>
          </a>
        </div>
        <a href="${CONFIG.bookHref}" class="btn btn-gold" target="_blank" rel="noopener">
          ${c.primary.label}
          <span class="btn-arrow">→</span>
        </a>
      </div>
    </section>`;
}

function renderFooter() {
  const { tagline, badges, copy, links } = CONFIG.footer;
  const badgeHtml = badges
    .map((b) => `<span class="footer-badge">${b}</span>`)
    .join('');
  const linkHtml = links
    .map((l) => `<a href="${l.href}">${l.label}</a>`)
    .join('');

  return `
    <footer class="footer" role="contentinfo">
      <div class="footer-inner">
        <div class="footer-brand-col">
          <a href="#hero" class="footer-brand">${brandWordmark()}</a>
          <p class="footer-tagline">${tagline}</p>
          <div class="footer-badges">${badgeHtml}</div>
        </div>
        <div class="footer-col">
          <span class="footer-col-title">Contact</span>
          <div class="footer-list">
            <a href="${CONFIG.phoneHref}">${PHONE_ICON}${CONFIG.phone}</a>
            <span>Long Island, New York</span>
            <span>Available 24/7</span>
          </div>
        </div>
        <div class="footer-col">
          <span class="footer-col-title">Explore</span>
          <div class="footer-list">
            ${CONFIG.nav.map((n) => `<a href="${n.href}">${n.label}</a>`).join('')}
            <a href="${CONFIG.bookHref}" target="_blank" rel="noopener">Book Now</a>
          </div>
        </div>
        <div class="footer-col">
          <span class="footer-col-title">Airports</span>
          <div class="footer-list">
            ${CONFIG.footer.airports.map((a) => `<a href="${a.href}">${a.label}</a>`).join('')}
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-copy">${copy}</p>
        <nav class="footer-nav" aria-label="Footer">${linkHtml}</nav>
      </div>
    </footer>`;
}

/* ----------------------------------------------------------------
   RENDER — build full page HTML from CONFIG
---------------------------------------------------------------- */
function render() {
  document.title = CONFIG.seo.title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', CONFIG.seo.description);

  document.getElementById('app').innerHTML = [
    renderNav(),
    renderHero(),
    renderStats(),
    renderMarquee(),
    renderServices(),
    renderFleet(),
    renderCoverage(),
    renderReviews(),
    renderCTA(),
    renderFooter(),
  ].join('');
}

/* ----------------------------------------------------------------
   LENIS smooth scroll + anchor handling
---------------------------------------------------------------- */
function setupLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing:   (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);

  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const sel = anchor.getAttribute('href');
    if (!sel || sel.length < 2) return;
    const target = document.querySelector(sel);
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target, { offset: -64, duration: 1.4 });
    document.body.classList.remove('nav-open');
    const t = document.getElementById('navToggle');
    if (t) t.setAttribute('aria-expanded', 'false');
  });

  return lenis;
}

/* ----------------------------------------------------------------
   MOBILE NAV TOGGLE
---------------------------------------------------------------- */
function setupNav() {
  const toggle = document.getElementById('navToggle');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    const open = !document.body.classList.contains('nav-open');
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  // Airports dropdown — click toggle (keyboard / touch)
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

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
      document.body.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ----------------------------------------------------------------
   HERO CINEMATIC INTRO
   • Bebas Neue headline rows clip-reveal up with stagger
   • Badge + sub + CTAs fade up
   • Car photo slides in from the right
---------------------------------------------------------------- */
function playHeroIntro() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Hero image: slide in from right with scale/blur recovery
  tl.from('.hero-image', {
    xPercent: 14,
    opacity:  0,
    duration: 1.15,
    ease:     'power3.out',
  }, 0);
  tl.from('.hero-image img', {
    scale:    1.12,
    duration: 1.4,
    ease:     'power2.out',
  }, 0);

  // Headline rows
  tl.from('.hero-name-inner', {
    yPercent: 110,
    duration: 1.05,
    stagger:  0.12,
  }, 0.15);

  // Supporting elements
  tl.from('.hero-badge', {
    opacity:  0,
    y:        -16,
    duration: 0.7,
  }, 0.05);

  tl.from(['.hero-sub', '.hero-ctas'], {
    opacity:  0,
    y:        24,
    duration: 0.7,
    stagger:  0.12,
  }, 0.55);

  tl.from('.hero-image-frame', {
    opacity:  0,
    x:        20,
    duration: 0.6,
  }, 0.9);

  tl.from('.hero-scroll', {
    opacity:  0,
    duration: 0.5,
  }, 1.0);

  // Nav fade-in
  tl.from('.nav', {
    opacity:  0,
    y:        -10,
    duration: 0.5,
  }, 0.1);
}

/* ----------------------------------------------------------------
   SCROLL ANIMATIONS
---------------------------------------------------------------- */
function initScrollAnimations() {
  /* NAV — scrolled state */
  ScrollTrigger.create({
    start: 'top -50px',
    end:   99999,
    onUpdate(self) {
      const nav = document.getElementById('nav');
      if (nav) nav.classList.toggle('scrolled', self.progress > 0);
    },
  });

  /* STATS count-up */
  document.querySelectorAll('.stat-number').forEach((el) => {
    const target = parseInt(el.dataset.target, 10) || 0;
    const suffix = el.dataset.suffix || '';
    ScrollTrigger.create({
      trigger: el,
      start:   'top 88%',
      once:    true,
      onEnter() {
        const obj = { val: 0 };
        gsap.to(obj, {
          val:      target,
          duration: 1.9,
          ease:     'power2.out',
          onUpdate() {
            el.innerHTML = Math.round(obj.val) +
              `<span class="stat-suffix">${suffix}</span>`;
          },
        });
      },
    });
  });

  /* SECTION eyebrow + title fade-ins */
  document.querySelectorAll('.section-eyebrow').forEach((eye) => {
    const sibs = [eye];
    let next = eye.nextElementSibling;
    while (next && (next.classList.contains('section-title') || next.classList.contains('section-lede'))) {
      sibs.push(next);
      next = next.nextElementSibling;
    }
    gsap.from(sibs, {
      scrollTrigger: { trigger: eye, start: 'top 88%' },
      opacity:  0,
      y:        28,
      duration: 0.8,
      ease:     'power2.out',
      stagger:  0.1,
    });
  });

  /* SERVICES rows */
  gsap.from('.service-row', {
    scrollTrigger: { trigger: '.services-list', start: 'top 80%' },
    opacity:  0,
    y:        36,
    duration: 0.7,
    ease:     'power2.out',
    stagger:  0.07,
  });

  /* FLEET spreads */
  document.querySelectorAll('.fleet-spread').forEach((spread) => {
    const img    = spread.querySelector('.fleet-image-wrap');
    const info   = spread.querySelector('.fleet-info');
    const reversed = spread.classList.contains('reverse');

    gsap.from(img, {
      scrollTrigger: { trigger: spread, start: 'top 75%' },
      x:        reversed ? 60 : -60,
      opacity:  0,
      duration: 1.0,
      ease:     'power3.out',
    });
    gsap.from(info.children, {
      scrollTrigger: { trigger: spread, start: 'top 70%' },
      opacity:  0,
      y:        28,
      duration: 0.7,
      ease:     'power2.out',
      stagger:  0.07,
    });
  });

  /* COVERAGE groups */
  gsap.from('.coverage-group', {
    scrollTrigger: { trigger: '.coverage-grid', start: 'top 80%' },
    opacity:  0,
    y:        32,
    duration: 0.7,
    ease:     'power2.out',
    stagger:  0.1,
  });
  gsap.from('.coverage-group li', {
    scrollTrigger: { trigger: '.coverage-grid', start: 'top 75%' },
    opacity:  0,
    y:        14,
    duration: 0.5,
    ease:     'power2.out',
    stagger:  0.03,
  });

  /* REVIEWS cards */
  gsap.from('.review-card', {
    scrollTrigger: { trigger: '.reviews-grid', start: 'top 80%' },
    opacity:  0,
    y:        36,
    duration: 0.75,
    ease:     'power2.out',
    stagger:  0.12,
  });

  /* CTA */
  gsap.from([
    '.cta .section-eyebrow',
    '.cta-heading',
    '.cta-sub',
    '.cta-contact',
    '.cta .btn',
  ], {
    scrollTrigger: { trigger: '.cta', start: 'top 75%', once: true },
    opacity:  0,
    y:        40,
    duration: 0.85,
    ease:     'power2.out',
    stagger:  0.1,
  });

  /* FOOTER */
  gsap.from('.footer-inner > *', {
    scrollTrigger: { trigger: '.footer', start: 'top 85%' },
    opacity:  0,
    y:        24,
    duration: 0.7,
    ease:     'power2.out',
    stagger:  0.1,
  });
}

/* ----------------------------------------------------------------
   FLEET 3D TILT — mousemove tracking on the image wrap
---------------------------------------------------------------- */
function initFleetTilt() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  document.querySelectorAll('[data-tilt]').forEach((card) => {
    let rafId = null;
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    card.addEventListener('mousemove', (e) => {
      const r  = card.getBoundingClientRect();
      targetX  = ((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * -6;
      targetY  = ((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) *  6;
      if (!rafId) rafId = requestAnimationFrame(loop);
    });

    function loop() {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      gsap.set(card, {
        rotationX:           currentX,
        rotationY:           currentY,
        transformPerspective: 1200,
      });
      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        rafId = requestAnimationFrame(loop);
      } else {
        rafId = null;
      }
    }

    card.addEventListener('mouseleave', () => {
      targetX = 0; targetY = 0;
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration:  0.7,
        ease:      'power2.out',
      });
    });
  });
}

/* ----------------------------------------------------------------
   INIT
---------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  render();
  setupNav();
  setupLenis();

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  gsap.registerPlugin(ScrollTrigger);

  if (!reducedMotion) {
    playHeroIntro();
    initScrollAnimations();
    initFleetTilt();
  } else {
    document.querySelectorAll('.stat-number').forEach((el) => {
      const target = parseInt(el.dataset.target, 10) || 0;
      const suffix = el.dataset.suffix || '';
      el.innerHTML = target + `<span class="stat-suffix">${suffix}</span>`;
    });
    document.getElementById('nav')?.classList.toggle('scrolled', window.scrollY > 50);
  }

  requestAnimationFrame(() => ScrollTrigger.refresh());
});
