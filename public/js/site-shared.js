/* ================================================================
   CALIBER — shared constants (homepage + landing pages)
================================================================ */

const SITE_FALLBACK_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">' +
    '<rect width="800" height="600" fill="#0E0E0C"/>' +
    '<text x="400" y="295" font-family="Bebas Neue,Impact,sans-serif" font-size="84" ' +
      'letter-spacing="12" fill="#B8963E" text-anchor="middle">CALIBER</text>' +
    '<text x="400" y="335" font-family="sans-serif" font-size="14" ' +
      'letter-spacing="6" fill="#55554C" text-anchor="middle">CAR SERVICE</text>' +
  '</svg>';
const SITE_FALLBACK_URI = 'data:image/svg+xml;utf8,' + encodeURIComponent(SITE_FALLBACK_SVG);
const SITE_IMG_FB = ` onerror="this.onerror=null;this.src='${SITE_FALLBACK_URI}';this.classList.add('is-fallback');"`;

const SITE_PHONE_ICON =
  `<svg class="phone-icon" width="13" height="13" viewBox="0 0 24 24" ` +
  `fill="#B8963E" aria-hidden="true">` +
  `<path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 ` +
  `1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 ` +
  `1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 ` +
  `2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>` +
  `</svg>`;

const MOOVS_BOOK_ONCLICK = (url) =>
  ` onclick="if(typeof gtag_report_conversion==='function'){return gtag_report_conversion('${url}');}window.open('${url}','_blank','noopener,noreferrer');return false;"`;

const SITE_BRAND_MARK_SVG =
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

/** Returns { onOpen, onClose } hooks for mobile drawer focus management. */
function bindNavDrawerFocusTrap(drawer, toggle) {
  let previousFocus = null;

  function onKeydown(e) {
    if (!document.body.classList.contains('nav-open') || e.key !== 'Tab' || !drawer) return;
    const nodes = drawer.querySelectorAll('a[href], button:not([disabled])');
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  return {
    onOpen() {
      previousFocus = document.activeElement;
      document.addEventListener('keydown', onKeydown);
      const first = drawer.querySelector('a[href], button:not([disabled])');
      if (first) requestAnimationFrame(() => first.focus());
    },
    onClose() {
      document.removeEventListener('keydown', onKeydown);
      const restore = previousFocus && typeof previousFocus.focus === 'function'
        ? previousFocus
        : toggle;
      if (restore) restore.focus();
      previousFocus = null;
    },
  };
}

function headHasJsonLdType(type) {
  return Array.from(document.querySelectorAll('head script[type="application/ld+json"]'))
    .some((el) => el.textContent.includes(`"@type": "${type}"`));
}
