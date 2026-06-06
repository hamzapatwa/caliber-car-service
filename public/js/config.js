/**
 * ============================================================
 *  CALIBER CAR SERVICE — SITE CONFIG
 * ============================================================
 *  This is the ONLY file you need to edit to customize the
 *  entire site. Update the values below and the page rebuilds
 *  itself automatically.
 *
 *  HTML is supported in:  hero.sub, cta.heading (\n for break),
 *                         reviews[].quote, footer.copy
 *  All other fields:      plain text only
 * ============================================================
 */

const CONFIG = {

  /* ----------------------------------------------------------
     THEME — edit colors here, no CSS editing needed
  ---------------------------------------------------------- */
  theme: {
    bg:      '#080808',
    surface: '#0E0E0C',
    border:  '#1A1A14',
    gold:    '#B8963E',
    white:   '#EEEEE8',
    muted:   '#55554C',
  },

  /* ----------------------------------------------------------
     SEO — og-image.webp at site root; run npm run build:og after SVG edits
  ---------------------------------------------------------- */
  seo: {
    title:       'Caliber Car Service — Executive Black Car · Long Island & Tri-State',
    description: 'Chauffeured airport transfers, corporate accounts, and as-directed luxury transport across Long Island, NYC, New Jersey, and Connecticut. Available 24/7.',
    url:         'https://calibercarservice.com/',
    ogImage:     'https://calibercarservice.com/og-image.webp',
    googleReviewsUrl:
      'https://share.google/yh3vwcNMPvUH2Y9Bw',
    googleLeaveReviewUrl:
      'https://g.page/r/CUmzSEGPI6HCEAE/review',
  },

  /* ----------------------------------------------------------
     BRAND — logo is rendered as: PRIMARY | SECONDARY
  ---------------------------------------------------------- */
  brand: {
    primary:   'CALIBER',
    secondary: 'CAR SERVICE',
  },

  /* ----------------------------------------------------------
     NAVIGATION
  ---------------------------------------------------------- */
  nav: [
    { label: 'Services', href: '#services' },
    { label: 'Fleet',    href: '#fleet'    },
    { label: 'Coverage', href: '#coverage' },
    { label: 'Reviews',  href: '#reviews'  },
  ],

  /* ----------------------------------------------------------
     NAV MENU — curated for drawer & desktop (footer keeps full lists)
  ---------------------------------------------------------- */
  navMenu: {
    drawerSections: [
      { title: 'Airports', itemsKey: 'airports' },
      { title: 'NYC Boroughs', itemsKey: 'nyc' },
      {
        title: 'Long Island & Regions',
        itemsKey: 'longIsland',
        footer: { label: 'All towns & areas', href: '/areas/' },
      },
      { title: 'Services', itemsKey: 'services' },
    ],
    airports: [
      { label: 'John F. Kennedy (JFK)', href: '/jfk/' },
      { label: 'LaGuardia (LGA)',       href: '/lga/' },
      { label: 'Newark (EWR)',          href: '/ewr/' },
      { label: 'White Plains (HPN)',    href: '/hpn/' },
    ],
    services: [
      { label: 'Corporate Travel',      href: '/corporate/' },
      { label: 'Hourly Chauffeur',      href: '/hourly/' },
      { label: 'Manhattan Runs',        href: '/manhattan/' },
      { label: 'Events & Weddings',     href: '/events/' },
      { label: 'Cruise Terminals',      href: '/cruise/' },
    ],
    nyc: [
      { label: 'NYC Overview',    href: '/nyc/' },
      { label: 'Manhattan',       href: '/manhattan/' },
      { label: 'Brooklyn',        href: '/brooklyn/' },
      { label: 'Queens',          href: '/queens/' },
      { label: 'The Bronx',       href: '/bronx/' },
      { label: 'Staten Island',   href: '/staten-island/' },
    ],
    longIsland: [
      { label: 'Hamptons & East End', href: '/hamptons/' },
      { label: 'North Shore LI',  href: '/north-shore/' },
      { label: 'Westchester & CT',    href: '/westchester-ct/' },
      { label: 'Garden City',     href: '/garden-city/' },
      { label: 'Great Neck',      href: '/great-neck/' },
      { label: 'Manhasset',       href: '/manhasset/' },
      { label: 'Huntington',      href: '/huntington/' },
      { label: 'Syosset',         href: '/syosset/' },
    ],
    viewAll: { label: 'All service areas', href: '/areas/' },
    utility: [
      { label: 'Home',              href: '/', homeOnly: true },
      { label: 'All service areas', href: '/areas/' },
      { label: 'About Caliber',     href: '/about/' },
    ],
  },

  /* ----------------------------------------------------------
     CONTACT
  ---------------------------------------------------------- */
  phone:     '(516) 595-2391',
  phoneHref: 'tel:+15165952391',
  email:     'info@calibercarservice.com',
  emailHref: 'mailto:info@calibercarservice.com',
  bookHref:       'https://customer.moovs.app/caliber-car-service/request/new',
  quoteCtaLabel:  'Request Quote',

  /* ----------------------------------------------------------
     HERO
  ---------------------------------------------------------- */
  hero: {
    badge:    'Family Owned &amp; Operated Since 2004',
    headline: {
      line1: 'EXECUTIVE',
      line2: 'BLACK CAR',
      line3: 'SERVICE',
      line4: 'NYC',
    },
    sub:      'Chauffeured airport transfers, corporate accounts, and as-directed service across New York, New Jersey, and Connecticut. One call. Your ride. On time.',
    ctaPrimary:   { label: 'Request Quote', href: 'https://customer.moovs.app/caliber-car-service/request/new' },
    ctaSecondary: { label: 'See the Fleet',          href: '#fleet' },
    image: {
      src: typeof SITE_IMAGES !== 'undefined' ? SITE_IMAGES.home.hero : 'assets/images/escalade-night.webp',
      alt: 'Caliber Car Service — Cadillac Escalade at night',
    },
  },

  /* ----------------------------------------------------------
     STATS — numbers count up when scrolled into view
  ---------------------------------------------------------- */
  stats: [
    { value: '★★★★★', suffix: '', label: 'Five-Star Rated', static: true },
    { value: 24,  suffix: '/7', label: 'On-Demand Service'   },
    { value: 4,   suffix: '',   label: 'NY Area Airports'    },
    { value: 100, suffix: '%',  label: 'On-Time Dispatch'    },
  ],

  /* ----------------------------------------------------------
     TRUST STRIP — static credential band between Stats and
     Services. Replaces the old marquee.
  ---------------------------------------------------------- */
  trustStrip: [
    'TLC Compliant',
    'Fully Licensed &amp; Insured',
    'Family Owned Since 2004',
    '24/7 Dispatch',
  ],

  /* ----------------------------------------------------------
     SERVICES — editorial 6-row ledger
  ---------------------------------------------------------- */
  services: [
    {
      num:  '01',
      name: 'Airport Transfers',
      href: '/jfk/',
      desc: 'JFK · LGA · EWR · HPN with live flight tracking and complimentary meet-and-greet on request.',
    },
    {
      num:  '02',
      name: 'Corporate Travel',
      href: '/corporate/',
      desc: 'Dedicated accounts, monthly billing, and a single point of dispatch for your executive team.',
    },
    {
      num:  '03',
      name: 'As-Directed Hourly',
      href: '/hourly/',
      desc: 'Block-time bookings with a dedicated chauffeur for meetings, errands, or full-day itineraries.',
    },
    {
      num:  '04',
      name: 'Manhattan & NYC',
      href: '/manhattan/',
      desc: 'All five boroughs plus Long Island connections — airports, evenings, and commutes with flat-rate clarity.',
    },
    {
      num:  '05',
      name: 'Events & Occasions',
      href: '/events/',
      desc: 'Weddings, galas, anniversaries, and milestones — discreet, on-time, on-message.',
    },
    {
      num:  '06',
      name: 'Cruise Terminal Transfers',
      href: '/cruise/',
      desc: 'Brooklyn, Manhattan, and Bayonne terminals — door-to-gangway, luggage handled.',
    },
  ],

  /* ----------------------------------------------------------
     FLEET — three alternating spreads
  ---------------------------------------------------------- */
  fleet: [
    {
      num:         '01',
      category:    'Executive',
      name:        'EXECUTIVE SEDAN',
      models:      'Cadillac CT6 · Lincoln Continental',
      capacity:    3,
      capacityNote: 'Passengers',
      luggage:     '3 Bags',
      description: 'The standard for solo and small-party travel. Quiet cabin, leather throughout, and the discretion executives expect.',
      features: [
        'Premium leather interior',
        'Tinted privacy glass',
        'Phone chargers & Wi-Fi',
        'Complimentary water',
      ],
      image: { src: 'assets/images/ct4.webp', alt: 'Executive Sedan — Cadillac CT6 and Lincoln Continental' },
    },
    {
      num:         '02',
      category:    'Premium',
      name:        'PREMIUM SUV',
      models:      'Cadillac Escalade · Lincoln Navigator',
      capacity:    6,
      capacityNote: 'Passengers',
      luggage:     '6 Bags',
      description: 'Full-size luxury for families, group transfers, or executives who want presence on arrival. Spacious, climate-zoned, road-quiet.',
      features: [
        'Captain-style second row',
        'Tri-zone climate control',
        'Onboard refreshments',
        'Privacy-tint glass',
      ],
      image: {
        src: typeof SITE_IMAGES !== 'undefined' ? SITE_IMAGES.fleet.suv : 'assets/images/vistiq.webp',
        alt: 'Premium SUV — Cadillac Vistiq',
      },
    },
    {
      num:         '03',
      category:    'Group',
      name:        'EXECUTIVE VAN',
      models:      'Mercedes Sprinter · Ford Transit LXE',
      capacity:    14,
      capacityNote: 'Passengers',
      luggage:     '14 Bags',
      description: 'Built for corporate roadshows, wedding parties, and group airport transfers. Limo-style seating with full standing-height cabin.',
      features: [
        'Multiple seating layouts',
        'Onboard Wi-Fi & USB',
        'Overhead lighting',
        'Generous luggage hold',
      ],
      image: { src: 'assets/images/sprinter.webp', alt: 'Executive Van — Mercedes Sprinter' },
    },
  ],

  /* ----------------------------------------------------------
     COVERAGE — typography-forward 4-column list
  ---------------------------------------------------------- */
  coverage: {
    intro: 'We serve every door, every gate, every terminal — across Long Island, NYC, and the tri-state. Daily routes, advance reservations, and last-minute pickups all welcome.',
    groups: [
      {
        title: 'Long Island',
        href:  '/areas/',
        items: [
          { label: 'Garden City', href: '/garden-city/' },
          { label: 'Great Neck', href: '/great-neck/' },
          { label: 'Manhasset', href: '/manhasset/' },
          { label: 'Syosset', href: '/syosset/' },
          { label: 'Huntington', href: '/huntington/' },
          { label: 'The Hamptons', href: '/hamptons/' },
        ],
      },
      {
        title: 'New York City',
        href:  '/nyc/',
        items: [
          { label: 'Manhattan', href: '/manhattan/' },
          { label: 'Brooklyn', href: '/brooklyn/' },
          { label: 'Queens', href: '/queens/' },
          { label: 'The Bronx', href: '/bronx/' },
          { label: 'Staten Island', href: '/staten-island/' },
        ],
      },
      {
        title: 'Beyond Long Island',
        href:  '/areas/',
        items: [
          { label: 'Westchester & Connecticut', href: '/westchester-ct/' },
          { label: 'All NYC Boroughs', href: '/nyc/' },
        ],
      },
      {
        title: 'Airports',
        href:  '/areas/',
        items: [
          { label: 'John F. Kennedy (JFK)', href: '/jfk/' },
          { label: 'LaGuardia (LGA)', href: '/lga/' },
          { label: 'Newark (EWR)', href: '/ewr/' },
          { label: 'White Plains (HPN)', href: '/hpn/' },
        ],
      },
    ],
  },

  /* ----------------------------------------------------------
     REVIEWS — curated 5-star Google reviews
  ---------------------------------------------------------- */
  reviews: [
    {
      num:      '01',
      stars:    5,
      quote:    '100% on time, every single trip. My driver knew the JFK terminal layout better than anyone I&rsquo;ve had before. Had me at my international gate with time to spare. This is what executive transport should feel like.',
      name:     'Michael H.',
      location: 'Queens, NY',
    },
    {
      num:      '02',
      stars:    5,
      quote:    'Used them for my daughter&rsquo;s wedding. The Sprinter was immaculate, the driver was a gentleman, and the entire bridal party arrived calm and on time. Worth every dollar.',
      name:     'Chuck N.',
      location: 'Elmont, NY',
    },
    {
      num:      '03',
      stars:    5,
      quote:    'Booked last minute for an early JFK flight and honestly didn&rsquo;t know what to expect. Driver was outside my door at 4:45am, car was beautiful, and I didn&rsquo;t have to say a word the whole ride. He just knew where to go. Landed, texted them for my return, same experience. I&rsquo;m never using anyone else.',
      name:     'Naurin A.',
      location: 'Queens, NY',
    },
    {
      num:      '04',
      stars:    5,
      quote:    'We switched our entire C-suite to Caliber after one trip. Clean vehicles, professional chauffeurs, and a dispatch team that actually picks up the phone at four in the morning.',
      name:     'Mehtab M.',
      location: 'Hempstead, NY',
    },
  ],

  /* ----------------------------------------------------------
     CTA SECTION — closing reservation block
  ---------------------------------------------------------- */
  cta: {
    eyebrow:    'Ready When You Are',
    headline:   'REQUEST\nA QUOTE.',
    sub:        'Available 24 hours a day, seven days a week. Call dispatch, email reservations, or request a quote online — your chauffeur will be ready.',
    primary:    { label: 'Request Quote', href: 'https://customer.moovs.app/caliber-car-service/request/new' },
  },

  /* ----------------------------------------------------------
     FOOTER
  ---------------------------------------------------------- */
  footer: {
    tagline: 'Family owned and operated on Long Island since 2004. Executive transport across the tri-state — discreet, dependable, on-time.',
    badges:  ['Family Owned Since 2004', 'Fully Licensed', 'TLC Compliant', 'Fully Insured'],
    copy:    '&copy; 2026 Caliber Car Service. All rights reserved.',
    links: [
      { label: 'Top',      href: '#hero'     },
      { label: 'Services', href: '#services' },
      { label: 'Fleet',    href: '#fleet'    },
      { label: 'Request Quote', href: '#cta' },
    ],
    airports: [
      { label: 'John F. Kennedy (JFK)', href: '/jfk/' },
      { label: 'LaGuardia (LGA)',       href: '/lga/' },
      { label: 'Newark (EWR)',          href: '/ewr/' },
      { label: 'White Plains (HPN)',    href: '/hpn/' },
    ],
    services: [
      { label: 'Corporate Travel',      href: '/corporate/' },
      { label: 'Hourly Chauffeur',      href: '/hourly/' },
      { label: 'Manhattan Runs',        href: '/manhattan/' },
      { label: 'Events & Weddings',     href: '/events/' },
      { label: 'Cruise Terminals',      href: '/cruise/' },
    ],
    areas: [
      { label: 'NYC Overview',          href: '/nyc/' },
      { label: 'Manhattan',             href: '/manhattan/' },
      { label: 'Brooklyn',              href: '/brooklyn/' },
      { label: 'Queens',                href: '/queens/' },
      { label: 'The Bronx',             href: '/bronx/' },
      { label: 'Staten Island',         href: '/staten-island/' },
      { label: 'Hamptons & East End',   href: '/hamptons/' },
      { label: 'North Shore LI',        href: '/north-shore/' },
      { label: 'Westchester & CT',      href: '/westchester-ct/' },
      { label: 'Garden City',           href: '/garden-city/' },
      { label: 'Great Neck',            href: '/great-neck/' },
      { label: 'Manhasset',             href: '/manhasset/' },
      { label: 'Rockville Centre',      href: '/rockville-centre/' },
      { label: 'Melville',              href: '/melville/' },
      { label: 'Huntington',            href: '/huntington/' },
      { label: 'Syosset',               href: '/syosset/' },
      { label: 'All Service Areas',     href: '/areas/' },
    ],
  },

};

/* ----------------------------------------------------------
   Apply theme CSS variables immediately when this file loads
   (before main.js runs, preventing any flash of wrong color)
---------------------------------------------------------- */
(function applyTheme() {
  const s = document.documentElement.style;
  const t = CONFIG.theme;
  s.setProperty('--bg',      t.bg);
  s.setProperty('--surface', t.surface);
  s.setProperty('--border',  t.border);
  s.setProperty('--gold',    t.gold);
  s.setProperty('--white',   t.white);
  s.setProperty('--muted',   t.muted);
}());
