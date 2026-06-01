# Caliber Car Service

A production-ready static marketing site for **Caliber Car Service** — a luxury black-car service based on Long Island, NY, serving the tri-state area.

Plain HTML, CSS, and JavaScript. No framework. Minimal build scripts for landing pages and assets.

---

## Stack

- **HTML / CSS / JS** — static site, no runtime dependencies.
- **GSAP 3 + ScrollTrigger** (cdnjs) — scroll choreography, hero intro, count-ups.
- **Lenis** (jsDelivr) — smooth scroll, wired into the GSAP ticker.
- **Bebas Neue + DM Sans** via [@fontsource](https://fontsource.org/) on jsDelivr.

---

## Project layout

```
├── public/                 # Deployable site (Vercel output directory)
│   ├── index.html          # Homepage
│   ├── robots.txt  sitemap.xml  og-image.png
│   ├── assets/  css/  js/  design/
│   └── pages/              # Landing pages by category
│       ├── airports/       # jfk, lga, ewr, hpn
│       ├── services/       # corporate, hourly, events, cruise
│       ├── boroughs/       # manhattan, brooklyn, queens, …
│       ├── towns/          # garden-city, great-neck, …
│       ├── hubs/           # nyc, areas
│       ├── regions/        # hamptons, north-shore, westchester-ct
│       └── about/
├── scripts/
│   ├── landing_page_data.py
│   ├── airport_pages.py
│   ├── generate_landing_pages.py  # HTML shells, symlinks, sitemap
│   ├── optimize_images.py
│   ├── site_routes.py
│   └── dev_server.py
├── design/
├── package.json
└── vercel.json
```

**Content:** edit `public/js/config.js` for site-wide copy and links.  
**Landing pages:** edit `scripts/landing_page_data.py` and `scripts/airport_pages.py`, then `npm run build:landings`.

---

## Run locally

```bash
npm run dev
```

Open `http://localhost:3001`. Landing pages use `public/{slug}/` symlinks to `public/pages/…`.

Regenerate assets and landing HTML:

```bash
npm run build
```

Regenerate the Open Graph PNG after editing `design/og-image.svg`:

```bash
npm run build:og
```

---

## Sections (homepage)

1. **Hero** — cinematic intro with vehicle photo.
2. **Stats** — four numbers that count up on scroll.
3. **Trust strip** — credentials band.
4. **Services** — editorial six-row ledger.
5. **Fleet** — three alternating spreads.
6. **Coverage** — four-column region list.
7. **Reviews** — editorial pull quotes.
8. **CTA** — phone, email, book online.
9. **Footer** — links, airports, services, areas.

---

## Design tokens (edit in `public/js/config.js → theme`)

| Token       | Value     | Usage                                  |
| ----------- | --------- | -------------------------------------- |
| `bg`        | `#080808` | Page background                        |
| `gold`      | `#B8963E` | Accents, CTAs, highlights              |
| `white`     | `#EEEEE8` | Primary text                           |
