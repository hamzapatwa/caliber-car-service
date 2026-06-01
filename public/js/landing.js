/* ================================================================
   CALIBER CAR SERVICE — landing.js
   Shared renderer for airport, service, area, town, about pages.
   Reads window.LANDING_PAGE (legacy: window.AIRPORT_PAGE).
================================================================ */

const LP_PHONE_ICON =
  `<svg class="phone-icon" width="13" height="13" viewBox="0 0 24 24" ` +
  `fill="#B8963E" aria-hidden="true">` +
  `<path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 ` +
  `1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 ` +
  `1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 ` +
  `2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>` +
  `</svg>`;

const LP_FALLBACK_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">' +
    '<rect width="800" height="600" fill="#0E0E0C"/>' +
    '<text x="400" y="295" font-family="Bebas Neue,Impact,sans-serif" font-size="84" ' +
      'letter-spacing="12" fill="#B8963E" text-anchor="middle">CALIBER</text>' +
    '<text x="400" y="335" font-family="sans-serif" font-size="14" ' +
      'letter-spacing="6" fill="#55554C" text-anchor="middle">CAR SERVICE</text>' +
  '</svg>';
const LP_FALLBACK_URI = 'data:image/svg+xml;utf8,' + encodeURIComponent(LP_FALLBACK_SVG);
const LP_IMG_FB = ` onerror="this.onerror=null;this.src='${LP_FALLBACK_URI}';this.classList.add('is-fallback');"`;

const MOOVS_BOOK_ONCLICK = (url) =>
  ` onclick="if(typeof gtag_report_conversion==='function'){return gtag_report_conversion('${url}');}window.open('${url}','_blank','noopener,noreferrer');return false;"`;

const LP_BRAND_MARK_SVG =
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

const LP_DEFAULT_STEPS_AIRPORT = [
  { num: '01', title: 'BOOK YOUR RIDE', desc: 'Reserve online or call dispatch. Confirm your flight number and pickup address — we handle the rest.' },
  { num: '02', title: 'WE TRACK YOUR FLIGHT', desc: 'Real-time monitoring keeps your driver one step ahead of delays, early arrivals, and gate changes.' },
  { num: '03', title: 'CHAUFFEUR MEETS YOU', desc: 'Your driver is in arrivals, name sign in hand, before your bags hit the belt. Luggage loaded, door held.' },
];

const LP_DEFAULT_STEPS_GENERAL = [
  { num: '01', title: 'BOOK YOUR RIDE', desc: 'Reserve online or call dispatch with your pickup time, addresses, and any special instructions.' },
  { num: '02', title: 'DISPATCH CONFIRMS', desc: 'We confirm your chauffeur, vehicle class, and timing — and stay reachable if plans change.' },
  { num: '03', title: 'CHAUFFEUR ARRIVES', desc: 'Your driver is on location early, vehicle detailed, and ready — door held, luggage handled.' },
];

function lpImageFile(file) {
  if (!file) return null;
  if (file.startsWith('http') || file.startsWith('/')) return file;
  if (file.includes('..')) return lpRel(file);
  if (file.startsWith('assets/')) return '/' + file;
  return '/assets/images/' + file;
}

function lpPageImages(page) {
  const slug = page.slug || page.code;
  if (typeof SITE_IMAGES !== 'undefined' && SITE_IMAGES.pages && SITE_IMAGES.pages[slug]) {
    return SITE_IMAGES.pages[slug];
  }
  const defaults = typeof SITE_IMAGES !== 'undefined' && SITE_IMAGES.defaults;
  const typeKey = page.type === 'hub' ? 'hub' : page.type;
  return (defaults && defaults[typeKey]) || { hero: 'planepluscar.jpg', glove: 'whiteglove.webp' };
}

function lpHeroBg(page) {
  if (page.hero && page.hero.bgImage) return page.hero.bgImage;
  const imgs = lpPageImages(page);
  return lpImageFile(imgs.hero);
}

function lpGloveImg(page) {
  if (page.glove && page.glove.image) return page.glove.image;
  const imgs = lpPageImages(page);
  return lpImageFile(imgs.glove) || '/assets/images/whiteglove.webp';
}

function lpGetPage() {
  return window.LANDING_PAGE || window.AIRPORT_PAGE;
}

/** Canonical display names for airport codes (UI only — SEO may still use JFK). */
const LP_AIRPORT_LABELS = {
  JFK: { name: 'John F. Kennedy', full: 'John F. Kennedy International Airport' },
};

function lpPageDisplayName(page) {
  return page.fullName || page.name;
}

function lpStrategyCardName(card) {
  const info = LP_AIRPORT_LABELS[card.code];
  if (info && (!card.name || card.name === card.code || card.name === 'JFK')) return info.name;
  return card.name;
}

function lpStrategyLinkName(card) {
  return card.fullName || lpStrategyCardName(card);
}

function lpBrandWordmark() {
  return `<span class="logo-primary">CALIBER</span>` +
         LP_BRAND_MARK_SVG +
         `<span class="logo-secondary">CAR SERVICE</span>`;
}

function lpRel(href) {
  if (!href || href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) {
    return href;
  }
  const cleaned = href.replace(/^(\.\.\/)+/, '');
  if (cleaned.startsWith('#')) return cleaned.startsWith('/#') ? cleaned : '/' + cleaned;
  if (cleaned.startsWith('/')) return cleaned.endsWith('/') || cleaned.includes('#') ? cleaned : cleaned + '/';
  return '/' + cleaned.replace(/\/$/, '') + '/';
}

function lpLinkList(items) {
  if (!items || !items.length) return [];
  return items.map((a) => ({ label: a.label, href: lpRel(a.href) }));
}

function lpInjectFaqSchema(page) {
  if (!page.faq || !page.faq.length) return;
  const prev = document.getElementById('lp-faq-schema');
  if (prev) prev.remove();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
  const el = document.createElement('script');
  el.type = 'application/ld+json';
  el.id = 'lp-faq-schema';
  el.textContent = JSON.stringify(schema);
  document.head.appendChild(el);
}

function lpInjectBreadcrumbSchema(page) {
  const prev = document.getElementById('lp-breadcrumb-schema');
  if (prev) prev.remove();
  const crumbs = page.breadcrumb || lpDefaultBreadcrumb(page);
  const base = (page.seo && page.seo.url) ? page.seo.url.replace(/\/[^/]*\/?$/, '/') : 'https://calibercarservice.com/';
  const items = crumbs.map((c, i) => {
    let item = 'https://calibercarservice.com/';
    if (c.href) {
      const h = lpRel(c.href);
      item = h.startsWith('http') ? h : 'https://calibercarservice.com' + (h.startsWith('/') ? h : '/' + h);
    } else if (i === crumbs.length - 1 && page.seo && page.seo.url) {
      item = page.seo.url;
    }
    return {
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item,
    };
  });
  const el = document.createElement('script');
  el.type = 'application/ld+json';
  el.id = 'lp-breadcrumb-schema';
  el.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  });
  document.head.appendChild(el);
}

function lpDefaultBreadcrumb(page) {
  const typeLabels = {
    airport: 'Airport Service',
    service: 'Services',
    area:    'Service Areas',
    hub:     'Service Areas',
    town:    'Service Areas',
    borough: 'New York City',
    about:   'About',
  };
  const crumbs = [{ label: 'Home', href: '/' }];
  if (page.type === 'airport') {
    crumbs.push({ label: typeLabels.airport });
  } else if (page.type === 'borough') {
    crumbs.push({ label: 'New York City', href: 'nyc/' });
  } else if (page.type !== 'about' && page.type !== 'hub') {
    crumbs.push({ label: typeLabels[page.type] || 'Services', href: 'areas/' });
  }
  crumbs.push({ label: lpPageDisplayName(page) });
  return crumbs;
}

function lpBreadcrumbHtml(page) {
  const crumbs = page.breadcrumb || lpDefaultBreadcrumb(page);
  return crumbs.map((c, i) => {
    const isLast = i === crumbs.length - 1;
    const sep = i > 0 ? '<span class="sep">›</span>' : '';
    if (isLast || !c.href) {
      return `${sep}<span>${c.label}</span>`;
    }
    return `${sep}<a href="${lpRel(c.href)}">${c.label}</a>`;
  }).join('');
}

function lpRenderNav() {
  const navItems = [
    { label: 'Services', href: '/#services' },
    { label: 'Fleet',    href: '/#fleet' },
    { label: 'Coverage', href: '/#coverage' },
    { label: 'Reviews',  href: '/#reviews' },
  ];
  const airports = lpLinkList(CONFIG.footer.airports);
  const services = lpLinkList(CONFIG.footer.services);
  const areas    = lpLinkList(CONFIG.footer.areas);

  const dd = (id, label, items) => {
    if (!items.length) return '';
    const menu = items.map((a) => `<li><a href="${a.href}">${a.label}</a></li>`).join('');
    const drawer = items.map((a) => `<a href="${a.href}">${a.label}</a>`).join('');
    return {
      desktop: `
        <li class="nav-dropdown" id="${id}">
          <button class="nav-dropdown-trigger" aria-haspopup="true" aria-expanded="false" data-dd="${id}">
            ${label} <span class="nav-dropdown-chevron">▾</span>
          </button>
          <ul class="nav-dropdown-menu">${menu}</ul>
        </li>`,
      drawer,
    };
  };

  const ap = dd('navAirports', 'Airports', airports);
  const sv = dd('navServices', 'Services', services);
  const ar = dd('navAreas', 'Areas', areas);

  const links = navItems.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join('');

  return `
    <nav class="nav" id="nav" aria-label="Primary">
      <a href="/" class="nav-logo">${lpBrandWordmark()}</a>
      <div class="nav-right">
        <ul class="nav-links">
          ${links}
          ${ap.desktop}
          ${sv.desktop}
          ${ar.desktop}
        </ul>
        <a href="${CONFIG.phoneHref}" class="nav-phone">${LP_PHONE_ICON}${CONFIG.phone}</a>
        <a href="${CONFIG.bookHref}" class="nav-cta"${MOOVS_BOOK_ONCLICK(CONFIG.bookHref)}>Book Now</a>
        <button class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
      <aside class="nav-drawer" id="navDrawer" aria-label="Mobile menu">
        <button class="nav-drawer-close" id="navDrawerClose" aria-label="Close menu">&#x2715;</button>
        <div class="nav-drawer-scroll">
          ${navItems.map((n) => `<a href="${n.href}">${n.label}</a>`).join('')}
          ${ap.drawer}
          ${sv.drawer}
          ${ar.drawer}
          <a href="${CONFIG.bookHref}" class="nav-cta"${MOOVS_BOOK_ONCLICK(CONFIG.bookHref)}>Book Now</a>
        </div>
      </aside>
    </nav>`;
}

function lpRenderHero(page) {
  const { hero } = page;
  const bg = lpHeroBg(page);
  const eyebrow = hero.eyebrow || 'Long Island · Nassau &amp; Suffolk · 24/7';
  return `
    <section class="ap-hero" id="ap-hero">
      <div class="ap-hero-bg" id="apHeroBg" style="background-image:url('${bg}')"></div>
      <div class="ap-hero-content">
        <p class="ap-breadcrumb">${lpBreadcrumbHtml(page)}</p>
        <div class="ap-hero-eyebrow">${eyebrow}</div>
        <h1 class="ap-hero-headline">
          <span class="ap-gold">${hero.line1}</span><br>
          <span class="ap-ghost">${hero.line2}</span>
        </h1>
        <p class="ap-hero-sub">${hero.sub}</p>
        <div class="ap-hero-ctas">
          <a href="${CONFIG.bookHref}" class="btn btn-gold"${MOOVS_BOOK_ONCLICK(CONFIG.bookHref)}>
            Reserve Your Ride <span class="btn-arrow">→</span>
          </a>
          <a href="${CONFIG.phoneHref}" class="btn btn-outline">
            ${LP_PHONE_ICON}${CONFIG.phone} <span class="btn-arrow">&#x2197;&#xFE0E;</span>
          </a>
        </div>
      </div>
    </section>`;
}

function lpRenderTrust(page) {
  const items = (page.trust || CONFIG.stats.map((s) => ({
    value: String(s.value) + (s.suffix || ''),
    label: s.label,
  }))).map((t) => `
      <div class="ap-trust-item">
        <span class="ap-trust-value">${t.value}</span>
        <span class="ap-trust-label">${t.label}</span>
      </div>`).join('');
  return `<div class="ap-trust"><div class="ap-trust-grid">${items}</div></div>`;
}

function lpRenderFeatures(page) {
  if (!page.features || !page.features.length) return '';
  const cards = page.features.map((f, i) => `
      <div class="ap-feature-card">
        <span class="ap-feature-num">0${i + 1}</span>
        <h3 class="ap-feature-title">${f.title}</h3>
        <p class="ap-feature-desc">${f.desc}</p>
      </div>`).join('');
  const head = page.featuresHead || { eyebrow: "What's Included", title: 'Every ride' };
  return `
    <section class="ap-features">
      <div class="ap-features-inner">
        <div class="ap-features-head">
          <span class="section-eyebrow">${head.eyebrow}</span>
          <h2 class="section-title">${head.title}<span class="gold">.</span></h2>
        </div>
        <div class="ap-features-grid">${cards}</div>
      </div>
    </section>`;
}

function lpRenderRoutes(page) {
  if (!page.routes || !page.routes.length) return '';
  const cards = page.routes.map((r) => `
      <div class="ap-route-card">
        <span class="ap-route-label">${r.label || 'Typical route'}</span>
        <span class="ap-route-dest">${r.dest}</span>
        <span class="ap-route-time">${r.time}</span>
        <p class="ap-route-note">${r.note}</p>
      </div>`).join('');
  return `
    <section class="ap-routes">
      <div class="ap-routes-inner">
        <div class="ap-routes-head">
          <span class="section-eyebrow">From your door</span>
          <h2 class="section-title">Common routes<span class="gold">.</span></h2>
        </div>
        <div class="ap-routes-grid">${cards}</div>
      </div>
    </section>`;
}

function lpGetAirportStrategy(page) {
  if (page.airportStrategy) return page.airportStrategy;
  if (page.airportPick) {
    return {
      eyebrow: 'Airport Strategy',
      title:   page.airportPick.title,
      lede:    page.airportPick.body,
      cards:   [],
    };
  }
  return null;
}

function lpRenderAirportStrategy(page) {
  const strategy = lpGetAirportStrategy(page);
  if (!strategy || !strategy.cards || !strategy.cards.length) return '';

  const eyebrow = strategy.eyebrow || 'Airport Strategy';
  const title   = strategy.title || 'Which airport to use';
  const lede    = strategy.lede
    ? `<p class="ap-strategy-lede">${strategy.lede}</p>`
    : '';

  const cards = strategy.cards.map((c) => {
    const highlight = c.highlight ? ' ap-strategy-card--highlight' : '';
    const link = c.href
      ? `<a href="${lpRel(c.href)}" class="ap-strategy-card-link">View ${lpStrategyLinkName(c)} service <span aria-hidden="true">→</span></a>`
      : '';
    const cardName = lpStrategyCardName(c);
    return `
      <article class="ap-strategy-card${highlight}">
        <div class="ap-strategy-card-top">
          <span class="ap-strategy-code">${c.code}</span>
          <span class="ap-strategy-badge">${c.badge}</span>
        </div>
        <h3 class="ap-strategy-card-name">${cardName}</h3>
        <p class="ap-strategy-card-body">${c.body}</p>
        ${link}
      </article>`;
  }).join('');

  return `
    <section class="ap-strategy">
      <div class="ap-strategy-inner">
        <div class="ap-strategy-head">
          <span class="section-eyebrow">${eyebrow}</span>
          <h2 class="section-title">${title}<span class="gold">.</span></h2>
          ${lede}
        </div>
        <div class="ap-strategy-grid">${cards}</div>
      </div>
    </section>`;
}

function lpRenderSteps(page) {
  const steps = page.steps ||
    (page.type === 'airport' ? LP_DEFAULT_STEPS_AIRPORT : LP_DEFAULT_STEPS_GENERAL);
  const items = steps.map((s) => `
      <div class="ap-step">
        <span class="ap-step-num">${s.num}</span>
        <h3 class="ap-step-title">${s.title}</h3>
        <p class="ap-step-desc">${s.desc}</p>
      </div>`).join('');
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

function lpRenderGlove(page) {
  if (!page.glove) return '';
  const { glove } = page;
  const img = lpGloveImg(page);
  return `
    <section class="ap-glove">
      <div class="ap-glove-inner">
        <div class="ap-glove-text">
          <span class="section-eyebrow">White Glove Service</span>
          <h2 class="ap-glove-headline">${glove.headline}</h2>
          <p class="ap-glove-body">${glove.body}</p>
          <a href="${CONFIG.bookHref}" class="btn btn-gold"${MOOVS_BOOK_ONCLICK(CONFIG.bookHref)}>
            Book Online <span class="btn-arrow">→</span>
          </a>
        </div>
        <div class="ap-glove-img-wrap">
          <img src="${img}" alt="${glove.alt || 'Caliber Car Service — chauffeur service'}" class="ap-glove-img" loading="lazy" ${LP_IMG_FB} />
        </div>
      </div>
    </section>`;
}

function lpRenderAboutBlocks(page) {
  if (!page.aboutBlocks || !page.aboutBlocks.length) return '';
  const blocks = page.aboutBlocks.map((b) => `
      <div class="ap-about-block">
        <h3>${b.title}</h3>
        <p>${b.body}</p>
      </div>`).join('');
  return `
    <section class="ap-about-blocks">
      <div class="ap-about-blocks-inner">${blocks}</div>
    </section>`;
}

function lpRenderHub(page) {
  if (!page.hubGroups || !page.hubGroups.length) return '';
  const groups = page.hubGroups.map((g) => `
      <div class="ap-hub-group">
        <h3 class="ap-hub-group-title">${g.title}</h3>
        <div class="ap-hub-links">
          ${g.links.map((l) => `<a href="${lpRel(l.href)}">${l.label}</a>`).join('')}
        </div>
      </div>`).join('');
  return `
    <section class="ap-hub">
      <div class="ap-hub-inner">${groups}</div>
    </section>`;
}

function lpRenderFAQ(page) {
  if (!page.faq || !page.faq.length) return '';
  const items = page.faq.map((q) => `
      <details class="ap-faq-item">
        <summary>${q.q}</summary>
        <p class="ap-faq-answer">${q.a}</p>
      </details>`).join('');
  const title = page.faqTitle || `${lpPageDisplayName(page)} FAQs`;
  return `
    <section class="ap-faq" id="ap-faq">
      <div class="ap-faq-inner">
        <div class="ap-faq-head">
          <span class="section-eyebrow">Common Questions</span>
          <h2 class="section-title">${title}<span class="gold">.</span></h2>
        </div>
        <div class="ap-faq-list">${items}</div>
      </div>
    </section>`;
}

function lpRenderRelated(page) {
  if (!page.related || !page.related.length) return '';
  const links = page.related.map((l) => `<a href="${lpRel(l.href)}">${l.label}</a>`).join('');
  return `
    <section class="ap-related">
      <div class="ap-related-inner">
        <p class="ap-related-title">Related pages</p>
        <div class="ap-related-links">${links}</div>
      </div>
    </section>`;
}

function lpRenderCTA(page) {
  const cta = page.cta || {};
  const headline = cta.headline || `Book your<br>${lpPageDisplayName(page)} ride`;
  const sub = cta.sub || 'One call, one driver, on time — every time. Available 24 hours a day, 7 days a week.';
  return `
    <section class="cta" id="cta">
      <div class="cta-inner">
        <div class="cta-text">
          <span class="section-eyebrow">Ready When You Are</span>
          <h2 class="cta-heading">${headline}<span class="gold">.</span></h2>
          <p class="cta-sub">${sub}</p>
        </div>
        <div class="cta-contact cta-contact--single">
          <a href="${CONFIG.phoneHref}" class="cta-contact-item">
            <span class="cta-contact-label">Dispatch — 24/7</span>
            <span class="cta-contact-value">${LP_PHONE_ICON}${CONFIG.phone}</span>
          </a>
        </div>
        <a href="${CONFIG.bookHref}" class="btn btn-gold"${MOOVS_BOOK_ONCLICK(CONFIG.bookHref)}>
          Book Online <span class="btn-arrow">→</span>
        </a>
      </div>
    </section>`;
}

function lpRenderFooter() {
  const airportLinks = lpLinkList(CONFIG.footer.airports)
    .map((a) => `<a href="${a.href}">${a.label}</a>`).join('');
  const serviceLinks = lpLinkList(CONFIG.footer.services)
    .map((a) => `<a href="${a.href}">${a.label}</a>`).join('');
  const areaLinks = lpLinkList(CONFIG.footer.areas)
    .map((a) => `<a href="${a.href}">${a.label}</a>`).join('');

  return `
    <footer class="footer" role="contentinfo">
      <div class="footer-inner footer-inner--four">
        <div class="footer-brand-col">
          <a href="/" class="footer-brand">${lpBrandWordmark()}</a>
          <p class="footer-tagline">${CONFIG.footer.tagline}</p>
          <div class="footer-badges">
            ${CONFIG.footer.badges.map((b) => `<span class="footer-badge">${b}</span>`).join('')}
          </div>
        </div>
        <div class="footer-col">
          <span class="footer-col-title">Contact</span>
          <div class="footer-list">
            <a href="${CONFIG.phoneHref}">${LP_PHONE_ICON}${CONFIG.phone}</a>
            <span>Long Island, New York</span>
            <span>Available 24/7</span>
          </div>
        </div>
        <div class="footer-col">
          <span class="footer-col-title">Services</span>
          <div class="footer-list">${serviceLinks}</div>
        </div>
        <div class="footer-col">
          <span class="footer-col-title">Airports &amp; Areas</span>
          <div class="footer-list">
            ${airportLinks}
            <a href="${lpRel('areas/')}">All Service Areas</a>
            <a href="${lpRel('about/')}">About Caliber</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-copy">${CONFIG.footer.copy}</p>
        <nav class="footer-nav" aria-label="Footer">
          <a href="/">Home</a>
          <a href="/#services">Services</a>
          <a href="${CONFIG.bookHref}"${MOOVS_BOOK_ONCLICK(CONFIG.bookHref)}>Book</a>
        </nav>
      </div>
    </footer>`;
}

function lpRender() {
  const page = lpGetPage();
  if (!page) return;

  document.title = page.seo.title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', page.seo.description);

  lpInjectFaqSchema(page);
  lpInjectBreadcrumbSchema(page);

  const sections = [
    lpRenderNav(),
    lpRenderHero(page),
    lpRenderTrust(page),
  ];

  if (page.type === 'hub') {
    sections.push(lpRenderHub(page));
  } else if (page.type === 'about') {
    sections.push(lpRenderAboutBlocks(page));
    sections.push(lpRenderGlove(page));
  } else {
    sections.push(lpRenderFeatures(page));
    sections.push(lpRenderRoutes(page));
    sections.push(lpRenderAirportStrategy(page));
    sections.push(lpRenderSteps(page));
    sections.push(lpRenderGlove(page));
  }

  sections.push(
    lpRenderFAQ(page),
    lpRenderRelated(page),
    lpRenderCTA(page),
    lpRenderFooter(),
  );

  const root = document.getElementById('lp-app') || document.getElementById('ap-app');
  if (root) root.innerHTML = sections.filter(Boolean).join('');
}

function lpSetupLenis() {
  if (typeof Lenis === 'undefined') return null;
  const lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
  lenis.on('scroll', () => ScrollTrigger && ScrollTrigger.update());
  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
  if (typeof gsap !== 'undefined') {
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  return lenis;
}

function lpNavPointerOverDrawer(drawer, clientX, clientY) {
  if (!drawer) return false;
  const r = drawer.getBoundingClientRect();
  return clientX >= r.left && clientX <= r.right && clientY >= r.top && clientY <= r.bottom;
}

function lpNavDrawerScroller(drawer) {
  return drawer?.querySelector('.nav-drawer-scroll') || drawer;
}

function lpNavScrollDrawer(scroller, deltaY) {
  if (!scroller) return;
  const max = scroller.scrollHeight - scroller.clientHeight;
  scroller.scrollTop = Math.max(0, Math.min(max, scroller.scrollTop + deltaY));
}

function lpSetupNav(lenis) {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const drawer = document.getElementById('navDrawer');
  const closeBtn = document.getElementById('navDrawerClose');
  if (!nav) return;

  if (drawer && drawer.parentElement !== document.body) {
    document.body.appendChild(drawer);
  }

  let overlay = document.querySelector('.nav-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);
  }

  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  let scrollLockY = 0;
  let overlayTouchBlock = null;
  let menuWheelHandler = null;

  bindNavDrawerTouchScroll(drawer);

  function openDrawer() {
    scrollLockY = window.scrollY || document.documentElement.scrollTop;
    document.documentElement.classList.add('nav-open');
    document.body.classList.add('nav-open');
    toggle?.setAttribute('aria-expanded', 'true');
    toggle?.setAttribute('aria-label', 'Close menu');
    if (lenis && typeof lenis.stop === 'function') lenis.stop();

    if (overlay) {
      overlayTouchBlock = (e) => e.preventDefault();
      overlay.addEventListener('touchmove', overlayTouchBlock, { passive: false });
    }

    menuWheelHandler = (e) => {
      if (!document.body.classList.contains('nav-open')) return;
      if (drawer && lpNavPointerOverDrawer(drawer, e.clientX, e.clientY)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        lpNavScrollDrawer(lpNavDrawerScroller(drawer), e.deltaY);
        return;
      }
      e.preventDefault();
    };
    document.addEventListener('wheel', menuWheelHandler, { passive: false, capture: true });
  }

  function closeDrawer() {
    document.documentElement.classList.remove('nav-open');
    document.body.classList.remove('nav-open');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.setAttribute('aria-label', 'Open menu');
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

  toggle?.addEventListener('click', () => {
    document.body.classList.contains('nav-open') ? closeDrawer() : openDrawer();
  });
  closeBtn?.addEventListener('click', closeDrawer);
  overlay?.addEventListener('click', closeDrawer);
  drawer?.querySelectorAll('.nav-drawer-scroll a').forEach((a) => a.addEventListener('click', closeDrawer));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });

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
}

function lpInitAnimations() {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const heroBg = document.getElementById('apHeroBg');
  if (heroBg) requestAnimationFrame(() => heroBg.classList.add('zoomed'));

  gsap.from('.ap-hero-content > *', {
    opacity: 0, y: 28, duration: 0.8, ease: 'power2.out', stagger: 0.12, delay: 0.2,
  });

  gsap.from('.ap-trust-item', {
    scrollTrigger: { trigger: '.ap-trust', start: 'top 88%' },
    opacity: 0, y: 20, duration: 0.6, stagger: 0.08, ease: 'power2.out',
  });

  gsap.from('.ap-feature-card, .ap-route-card, .ap-strategy-card, .ap-hub-links a', {
    scrollTrigger: { trigger: '.ap-features-grid, .ap-routes-grid, .ap-strategy-grid, .ap-hub', start: 'top 80%' },
    opacity: 0, y: 30, duration: 0.7, stagger: 0.08, ease: 'power2.out',
  });

  gsap.from('.ap-step', {
    scrollTrigger: { trigger: '.ap-steps-grid', start: 'top 82%' },
    opacity: 0, y: 28, duration: 0.7, stagger: 0.15, ease: 'power2.out',
  });

  gsap.from('.ap-glove-text > *', {
    scrollTrigger: { trigger: '.ap-glove', start: 'top 95%', once: true },
    opacity: 0, x: -24, duration: 0.75, stagger: 0.1, ease: 'power2.out', immediateRender: false,
  });
  gsap.from('.ap-glove-img-wrap', {
    scrollTrigger: { trigger: '.ap-glove', start: 'top 95%', once: true },
    opacity: 0, x: 24, duration: 0.75, ease: 'power2.out', immediateRender: false,
  });

  gsap.from('.ap-faq-item', {
    scrollTrigger: { trigger: '.ap-faq-list', start: 'top 82%' },
    opacity: 0, y: 16, duration: 0.55, stagger: 0.07, ease: 'power2.out',
  });

  document.querySelectorAll('.section-eyebrow, .section-title, .section-lede').forEach((el) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%' },
      opacity: 0, y: 20, duration: 0.65, ease: 'power2.out',
    });
  });

  requestAnimationFrame(() => ScrollTrigger.refresh());
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.AIRPORT_PAGE && !window.LANDING_PAGE) {
    window.LANDING_PAGE = Object.assign({ type: 'airport' }, window.AIRPORT_PAGE);
  }
  lpRender();
  const lenis = lpSetupLenis();
  lpSetupNav(lenis);
  lpInitAnimations();
});
