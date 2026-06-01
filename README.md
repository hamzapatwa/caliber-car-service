# Caliber Car Service

A production-ready static marketing site for **Caliber Car Service** — a luxury black-car service based on Long Island, NY, serving the tri-state area.

Plain HTML, CSS, and JavaScript. No framework. Minimal build scripts for landing pages and assets.

---

## Stack

- **HTML / CSS / JS** — static site, no runtime dependencies.
- **GSAP 3 + ScrollTrigger** (cdnjs) — scroll choreography, hero intro, count-ups.
- **Lenis** (jsDelivr) — buttery-smooth scroll, wired into the GSAP ticker.
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
│   ├── generate_landing_pages.py  # also syncs vercel.json rewrites
│   ├── site_routes.py             # slug → category mapping
│   ├── dev_server.py              # local dev with URL rewrites
│   └── build_wallpapers.py
├── design/                 # Source art (SVG, previews — not all deployed)
│   ├── og-image.svg
│   ├── wallpapers/
│   └── …
├── package.json
└── vercel.json
```

**Content:** edit `public/js/config.js` for site-wide copy and links.  
**Landing pages:** edit `scripts/landing_page_data.py`, then `npm run build:landings`.

---

## Run locally

```bash
npm run dev
```

Then open `http://localhost:3001`. Landing pages live under `public/pages/…` and are also linked at `public/{slug}/` (symlinks) so URLs like `/jfk/` work with any static server.

Regenerate the Open Graph PNG after editing `design/og-image.svg`:

```bash
npm run build:og
```

Regenerate landing page HTML shells:

```bash
npm run build:landings
```

---

## Sections (homepage)

1. **Hero** — cinematic 2-column intro with clip-reveal headline and a slide-in vehicle photo.
2. **Stats** — four numbers that count up from zero as they enter the viewport.
3. **Marquee** — gold ticker band with services + locations (CSS-only infinite loop).
4. **Services** — editorial six-row ledger with hover indicator.
5. **Fleet** — three alternating full-width spreads (3D-tilt vehicle photo on hover).
6. **Coverage** — typography-forward 4-column list of regions.
7. **Reviews** — sticky-meta editorial layout with large pull quotes.
8. **CTA** — closing reservation block (phone, email, button).
9. **Footer** — three-column footer with legal badges (Licensed · TLC · Insured).

---

## Before launch

- Replace placeholder phone/email/book links in `public/js/config.js`.
- Update SEO title/description in `CONFIG.seo`.
- Swap reviewer names/locations if needed in `CONFIG.reviews`.

---

## Design tokens (edit in `public/js/config.js → theme`)

| Token       | Value     | Usage                                  |
| ----------- | --------- | -------------------------------------- |
| `bg`        | `#080808` | Page background                        |
| `surface`   | `#0E0E0C` | Alternating section background         |
| `border`    | `#1A1A14` | Dividers, card borders                 |
| `gold`      | `#B8963E` | Accent — logo pipe, marquee, hovers    |
| `white`     | `#EEEEE8` | Body & headline text                   |
| `muted`     | `#55554C` | Secondary text, eyebrow labels         |

Typography is fluid — every major size uses `clamp()`.
