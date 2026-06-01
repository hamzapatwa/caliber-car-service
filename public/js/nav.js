/* ================================================================
   CALIBER — shared navigation (mobile drawer + desktop menus)
================================================================ */

function navResolveHref(href, linkFn) {
  if (!href) return href;
  return linkFn ? linkFn(href) : href;
}

function navMenuLinks(key) {
  const menu = CONFIG.navMenu;
  if (!menu) return [];
  if (typeof menu[key] === 'string' && CONFIG.footer[menu[key]]) {
    return CONFIG.footer[menu[key]];
  }
  return menu[key] || [];
}

/** Curated links for desktop “Areas” dropdown (not the full footer list). */
function navDesktopAreaLinks() {
  const menu = CONFIG.navMenu;
  if (!menu) return CONFIG.footer.areas || [];
  return [
    ...(menu.nyc || []),
    ...(menu.longIsland || []),
    menu.viewAll,
  ].filter(Boolean);
}

function navDrawerSectionHTML(section, linkFn) {
  const links = section.items
    ? section.items
    : navMenuLinks(section.itemsKey);
  if (!links.length) return '';

  const panelLinks = links
    .map((item) => {
      const href = navResolveHref(item.href, linkFn);
      return `<a href="${href}">${item.label}</a>`;
    })
    .join('');

  const footer = section.footer
    ? `<a class="nav-drawer-section-more" href="${navResolveHref(section.footer.href, linkFn)}">${section.footer.label} →</a>`
    : '';

  return `
    <div class="nav-drawer-section">
      <p class="nav-drawer-section-title">${section.title}</p>
      <div class="nav-drawer-section-links">
        ${panelLinks}
        ${footer}
      </div>
    </div>`;
}

/**
 * @param {{ homeAnchors?: Array, isLanding?: boolean, linkFn?: Function }} opts
 */
function buildNavDrawerHTML(opts = {}) {
  const linkFn = opts.linkFn;
  const menu = CONFIG.navMenu;
  const sections = menu?.drawerSections || [];

  const bookHref = navResolveHref(CONFIG.bookHref, linkFn);
  const phoneHref = CONFIG.phoneHref;

  const actions = `
    <div class="nav-drawer-actions">
      <a href="${bookHref}" class="nav-drawer-book btn btn-gold"${typeof MOOVS_BOOK_ONCLICK === 'function' ? MOOVS_BOOK_ONCLICK(CONFIG.bookHref) : ''}>
        Book Now <span class="btn-arrow">→</span>
      </a>
      <a href="${phoneHref}" class="nav-drawer-phone">
        <span class="nav-drawer-phone-label">Dispatch 24/7</span>
        <span class="nav-drawer-phone-num">${CONFIG.phone}</span>
      </a>
    </div>`;

  let quick = '';
  const anchors = opts.homeAnchors || (opts.isLanding ? null : CONFIG.nav);
  if (anchors && anchors.length) {
    quick = `
      <nav class="nav-drawer-quick" aria-label="On this page">
        <span class="nav-drawer-label">On this page</span>
        ${anchors.map((a) => `<a href="${navResolveHref(a.href, linkFn)}">${a.label}</a>`).join('')}
      </nav>`;
  }

  const sectionHTML = sections
    .map((section) => navDrawerSectionHTML(section, linkFn))
    .join('');

  const utility = (menu?.utility || [])
    .map((item) => {
      if (item.landingOnly && !opts.isLanding) return '';
      if (item.homeOnly && opts.isLanding) return '';
      return `<a href="${navResolveHref(item.href, linkFn)}">${item.label}</a>`;
    })
    .join('');

  return `
    ${actions}
    ${quick}
    <div class="nav-drawer-sections" role="navigation" aria-label="Site sections">
      ${sectionHTML}
    </div>
    <nav class="nav-drawer-utility" aria-label="More">
      ${utility}
    </nav>`;
}

function bindNavDrawerCloseOnClick(drawer, closeFn) {
  if (!drawer || !closeFn) return;
  drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeFn));
}
