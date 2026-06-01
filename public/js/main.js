/* ================================================================
   CALIBER CAR SERVICE — main.js
   Renders the page from CONFIG (config.js) and runs all animations.
================================================================ */

const IMG_FALLBACK_ATTR = SITE_IMG_FB;
const PHONE_ICON = SITE_PHONE_ICON;
const BRAND_MARK_SVG = SITE_BRAND_MARK_SVG;

/* ----------------------------------------------------------------
   HTML helper for the brand wordmark
---------------------------------------------------------------- */
function brandWordmark() {
  const { primary, secondary } = CONFIG.brand;
  return `<span class="logo-primary">${primary}</span>` +
         BRAND_MARK_SVG +
         `<span class="logo-secondary">${secondary}</span>`;
}

/* ================================================================
   RENDER HELPERS — each returns an HTML string
================================================================ */

function navDropdown(id, label, items) {
  const menu = items.map((a) => `<li><a href="${a.href}">${a.label}</a></li>`).join('');
  return `
          <li class="nav-dropdown" id="${id}">
            <button class="nav-dropdown-trigger" aria-haspopup="true" aria-expanded="false" data-dd="${id}">
              ${label} <span class="nav-dropdown-chevron">▾</span>
            </button>
            <ul class="nav-dropdown-menu">${menu}</ul>
          </li>`;
}

function renderNav() {
  const links = CONFIG.nav
    .map((n) => `<li><a href="${n.href}">${n.label}</a></li>`)
    .join('');

  const ap = navDropdown('navAirports', 'Airports', CONFIG.footer.airports);
  const sv = navDropdown('navServices', 'Services', CONFIG.footer.services);
  const ar = navDropdown('navAreas', 'Areas', navDesktopAreaLinks());

  return `
    <nav class="nav" id="nav" aria-label="Primary">
      <a href="#hero" class="nav-logo">${brandWordmark()}</a>
      <div class="nav-right">
        <ul class="nav-links">
          ${links}
          ${ap}
          ${sv}
          ${ar}
        </ul>
        <a href="${CONFIG.phoneHref}" class="nav-phone">${PHONE_ICON}${CONFIG.phone}</a>
        <a href="${CONFIG.bookHref}" class="nav-cta"${MOOVS_BOOK_ONCLICK(CONFIG.bookHref)}>Book Now</a>
        <button class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
      <aside class="nav-drawer" id="navDrawer" aria-label="Mobile menu">
        <button class="nav-drawer-close" id="navDrawerClose" aria-label="Close menu">&#x2715;</button>
        <div class="nav-drawer-scroll">
          ${buildNavDrawerHTML({ homeAnchors: CONFIG.nav })}
        </div>
      </aside>
    </nav>`;
}

function renderHero() {
  const { badge, headline, sub, ctaPrimary, ctaSecondary, image } = CONFIG.hero;

  return `
    <section class="hero" id="hero">
      <div class="hero-image" id="heroImage">
        <img src="${image.src}" alt="${image.alt}" width="1200" height="800" fetchpriority="high" decoding="async"${IMG_FALLBACK_ATTR} />
        <span class="hero-image-frame">Caliber 2026</span>
      </div>
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
          <a href="${ctaPrimary.href}" class="btn btn-gold"${MOOVS_BOOK_ONCLICK(ctaPrimary.href)}>
            ${ctaPrimary.label}
            <span class="btn-arrow">→</span>
          </a>
          <a href="${CONFIG.phoneHref}" class="btn btn-outline">
            ${PHONE_ICON}${CONFIG.phone}
            <span class="btn-arrow">&#x2197;&#xFE0E;</span>
          </a>
        </div>
        <a href="${CONFIG.seo.googleReviewsUrl}" class="hero-trust" target="_blank" rel="noopener" aria-label="Five-star rated on Google">
          <span class="hero-trust-stars" aria-hidden="true">★★★★★</span>
          <span class="hero-trust-text">Five-Star Rated on Google</span>
        </a>
        <div class="hero-scroll" aria-hidden="true">
          <span>Scroll</span>
          <span class="hero-scroll-line"></span>
        </div>
      </div>
    </section>`;
}

function renderStats() {
  const items = CONFIG.stats
    .map((s) => {
      const number = s.static
        ? `<span class="stat-number stat-number--static">${s.value}</span>`
        : `<span class="stat-number" data-target="${s.value}" data-suffix="${s.suffix || ''}">
          0<span class="stat-suffix">${s.suffix || ''}</span>
        </span>`;
      return `
      <div class="stat-item">
        ${number}
        <span class="stat-label">${s.label}</span>
      </div>`;
    })
    .join('');

  return `
    <section class="stats" aria-label="Key statistics">
      <div class="stats-grid">${items}</div>
    </section>`;
}

function renderTrustStrip() {
  const items = CONFIG.trustStrip
    .map((t) => `<span class="trust-strip-item">${t}</span>`)
    .join('');
  return `
    <div class="trust-strip" aria-label="Credentials">
      <div class="trust-strip-inner">${items}</div>
    </div>`;
}

function renderServices() {
  const cards = CONFIG.services
    .map((s) => {
      const external = !s.href;
      const attrs = external ? MOOVS_BOOK_ONCLICK(CONFIG.bookHref) : '';
      return `
      <a class="service-card" href="${s.href || CONFIG.bookHref}" aria-label="${s.name}"${attrs}>
        <span class="service-num">${s.num}</span>
        <h3 class="service-name">${s.name}</h3>
        <p class="service-desc">${s.desc}</p>
        <span class="service-arrow" aria-hidden="true">→</span>
      </a>`;
    })
    .join('');

  return `
    <section class="services" id="services">
      <div class="services-inner">
        <div class="services-head">
          <span class="section-eyebrow">What We Do</span>
          <h2 class="section-title">Service<span class="gold">.</span></h2>
          <p class="section-lede">Six ways we put you on the road — every one of them on time, on point, and on your terms.</p>
        </div>
        <div class="services-grid">${cards}</div>
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
          <img src="${v.image.src}" alt="${v.image.alt}" loading="lazy" decoding="async"${IMG_FALLBACK_ATTR} />
        </div>
        <div class="fleet-info">
          <span class="fleet-num">${v.num} of ${String(CONFIG.fleet.length).padStart(2, '0')}</span>
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
          <a href="${CONFIG.bookHref}" class="btn btn-outline fleet-cta"${MOOVS_BOOK_ONCLICK(CONFIG.bookHref)}>
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
  const itemHtml = (i) => {
    if (typeof i === 'object' && i.href) {
      return `<li><a href="${i.href}">${i.label}</a></li>`;
    }
    return `<li>${i}</li>`;
  };

  const groups = CONFIG.coverage.groups
    .map((g) => {
      const title = g.href
        ? `<a href="${g.href}" class="coverage-group-title coverage-group-title--link">${g.title}</a>`
        : `<span class="coverage-group-title">${g.title}</span>`;
      return `
      <div class="coverage-group">
        ${title}
        <ul>${g.items.map(itemHtml).join('')}</ul>
      </div>`;
    })
    .join('');

  return `
    <section class="coverage" id="coverage">
      <div class="coverage-inner">
        <div class="coverage-head">
          <span class="section-eyebrow">Where We Drive</span>
          <h2 class="section-title">Tri-state, <span class="gold">door to door.</span></h2>
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
          <p class="reviews-sub">Five-star rated on Google</p>
        </div>
        <div class="reviews-grid">${cards}</div>
        <div class="reviews-cta">
          <a href="${CONFIG.seo.googleReviewsUrl}" target="_blank" rel="noopener" class="btn btn-outline">
            Read Google Reviews
            <span class="btn-arrow">&#x2197;&#xFE0E;</span>
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
        <div class="cta-contact">
          <a href="${CONFIG.phoneHref}" class="cta-contact-item">
            <span class="cta-contact-label">Dispatch — 24/7</span>
            <span class="cta-contact-value">${PHONE_ICON}${CONFIG.phone}</span>
          </a>
          <a href="${CONFIG.emailHref}" class="cta-contact-item">
            <span class="cta-contact-label">Corporate Accounts</span>
            <span class="cta-contact-value cta-contact-value--email">${CONFIG.email}</span>
          </a>
        </div>
        <a href="${CONFIG.bookHref}" class="btn btn-gold"${MOOVS_BOOK_ONCLICK(CONFIG.bookHref)}>
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
      <div class="footer-inner footer-inner--four">
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
          <span class="footer-col-title">Services</span>
          <div class="footer-list">
            ${CONFIG.footer.services.map((a) => `<a href="${a.href}">${a.label}</a>`).join('')}
          </div>
        </div>
        <div class="footer-col">
          <span class="footer-col-title">Airports &amp; Areas</span>
          <div class="footer-list">
            ${CONFIG.footer.airports.map((a) => `<a href="${a.href}">${a.label}</a>`).join('')}
            <a href="/areas/">All Service Areas</a>
            <a href="/about/">About Caliber</a>
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
    renderTrustStrip(),
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

  return lenis;
}

/* ----------------------------------------------------------------
   MOBILE NAV — scroll lock helpers (Lenis captures wheel on desktop)
---------------------------------------------------------------- */
function navPointerOverDrawer(drawer, clientX, clientY) {
  if (!drawer) return false;
  const r = drawer.getBoundingClientRect();
  return clientX >= r.left && clientX <= r.right && clientY >= r.top && clientY <= r.bottom;
}

function navDrawerScroller(drawer) {
  return drawer?.querySelector('.nav-drawer-scroll') || drawer;
}

function navScrollDrawer(scroller, deltaY) {
  if (!scroller) return;
  const max = scroller.scrollHeight - scroller.clientHeight;
  scroller.scrollTop = Math.max(0, Math.min(max, scroller.scrollTop + deltaY));
}

/* ----------------------------------------------------------------
   MOBILE NAV TOGGLE
---------------------------------------------------------------- */
function setupNav(lenis) {
  const toggle   = document.getElementById('navToggle');
  const drawer   = document.getElementById('navDrawer');
  const closeBtn = document.getElementById('navDrawerClose');
  if (!toggle) return;

  // Drawer + overlay live on <body> so nav backdrop-filter never composites over the panel.
  if (drawer && drawer.parentElement !== document.body) {
    document.body.appendChild(drawer);
  }

  let overlay = document.querySelector('.nav-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);
  }

  let scrollLockY = 0;
  let overlayTouchBlock = null;
  let menuWheelHandler = null;

  bindNavDrawerTouchScroll(drawer);
  const focusTrap = bindNavDrawerFocusTrap(drawer, toggle);

  function openDrawer() {
    scrollLockY = window.scrollY || document.documentElement.scrollTop;
    document.documentElement.classList.add('nav-open');
    document.body.classList.add('nav-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
    focusTrap.onOpen();
    if (lenis && typeof lenis.stop === 'function') lenis.stop();

    if (overlay) {
      overlayTouchBlock = (e) => e.preventDefault();
      overlay.addEventListener('touchmove', overlayTouchBlock, { passive: false });
    }

    menuWheelHandler = (e) => {
      if (!document.body.classList.contains('nav-open')) return;
      if (drawer && navPointerOverDrawer(drawer, e.clientX, e.clientY)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        navScrollDrawer(navDrawerScroller(drawer), e.deltaY);
        return;
      }
      e.preventDefault();
    };
    document.addEventListener('wheel', menuWheelHandler, { passive: false, capture: true });
  }

  function closeDrawer() {
    document.documentElement.classList.remove('nav-open');
    document.body.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    focusTrap.onClose();
    window.scrollTo(0, scrollLockY);
    if (lenis && typeof lenis.start === 'function') lenis.start();

    if (overlay && overlayTouchBlock) {
      overlay.removeEventListener('touchmove', overlayTouchBlock);
      overlayTouchBlock = null;
    }
    if (menuWheelHandler) {
      document.removeEventListener('wheel', menuWheelHandler, { capture: true });
      menuWheelHandler = null;
    }
  }

  toggle.addEventListener('click', () => {
    document.body.classList.contains('nav-open') ? closeDrawer() : openDrawer();
  });

  // × button inside drawer
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  // Real overlay div — direct click handler, no pseudo-element ambiguity
  if (overlay) overlay.addEventListener('click', closeDrawer);

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const sel = anchor.getAttribute('href');
    if (!sel || sel.length < 2) return;
    const target = document.querySelector(sel);
    if (!target) return;
    e.preventDefault();
    if (document.body.classList.contains('nav-open')) closeDrawer();
    if (lenis) lenis.scrollTo(target, { offset: -64, duration: 1.4 });
    else target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  document.querySelectorAll('.nav-dropdown').forEach((dd) => {
    const btn = dd.querySelector('[data-dd]');
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.nav-dropdown.open').forEach((other) => {
        if (other !== dd) other.classList.remove('open');
      });
      const open = dd.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
  });
  document.addEventListener('click', () => {
    document.querySelectorAll('.nav-dropdown.open').forEach((dd) => dd.classList.remove('open'));
  });
  document.querySelectorAll('.nav-dropdown').forEach((dd) => {
    dd.addEventListener('click', (e) => e.stopPropagation());
  });

  bindNavDrawerCloseOnClick(drawer, closeDrawer);
}

/* ----------------------------------------------------------------
   HERO CINEMATIC INTRO
   • Full-bleed photo fades/scales in
   • Bebas Neue headline rows clip-reveal up with stagger
   • Badge + sub + CTAs fade up
---------------------------------------------------------------- */
function playHeroIntro() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('.hero-image', {
    opacity:  0,
    duration: 1.1,
    ease:     'power2.out',
  }, 0);
  tl.from('.hero-image img', {
    scale:    1.14,
    duration: 1.45,
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

  tl.from(['.hero-sub', '.hero-ctas', '.hero-trust'], {
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
  document.querySelectorAll('.stat-number:not(.stat-number--static)').forEach((el) => {
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

  /* SERVICES cards */
  gsap.from('.service-card', {
    scrollTrigger: { trigger: '.services-grid', start: 'top 80%' },
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
  const lenis = setupLenis();
  setupNav(lenis);

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  gsap.registerPlugin(ScrollTrigger);

  if (!reducedMotion) {
    playHeroIntro();
    initScrollAnimations();
    initFleetTilt();
  } else {
    document.querySelectorAll('.stat-number:not(.stat-number--static)').forEach((el) => {
      const target = parseInt(el.dataset.target, 10) || 0;
      const suffix = el.dataset.suffix || '';
      el.innerHTML = target + `<span class="stat-suffix">${suffix}</span>`;
    });
    document.getElementById('nav')?.classList.toggle('scrolled', window.scrollY > 50);
  }

  requestAnimationFrame(() => ScrollTrigger.refresh());
});
