# Caliber Car Service

A production-ready static marketing site for **Caliber Car Service** — a luxury black-car service based on Long Island, NY, serving the tri-state area.

Plain HTML, CSS, and JavaScript. No framework. No build step.

---

## Stack

- **HTML / CSS / JS** — static site, no dependencies installed locally.
- **GSAP 3 + ScrollTrigger** (cdnjs) — scroll choreography, hero intro, count-ups.
- **Lenis** (jsDelivr) — buttery-smooth scroll, wired into the GSAP ticker.
- **Bebas Neue + DM Sans** via [@fontsource](https://fontsource.org/) on jsDelivr.

---

## Project layout

```
├── index.html              # Main site entry
├── og-image.png            # Social preview (built from design/og-image.svg)
├── robots.txt  sitemap.xml vercel.json
├── assets/
│   ├── brand/              # Logo mark (favicon, SVG source)
│   └── images/             # Fleet & airport photos
├── css/
│   ├── styles.css          # Main site styles
│   ├── airport.css         # Airport landing pages
│   └── consent.css         # Cookie consent banner
├── js/
│   ├── config.js           # Single source of truth — copy, links, theme
│   ├── consent.js          # Consent Mode v2 — opt-out (tags on until decline)
│   ├── conversion.js       # Google Ads click conversion (Moovs)
│   ├── main.js             # Renders homepage from CONFIG
│   └── airport.js          # Renders airport pages
├── design/                 # Print + OG source (not linked from main nav)
│   ├── businesscard.html
│   ├── og-image.svg
│   └── qr.png
└── jfk/  lga/  ewr/  hpn/  # Airport landing pages
```

To rebrand or change content, edit **`js/config.js`** only.

---

## Run locally

```bash
npm run dev
# or
python3 -m http.server 3001
```

Then open `http://localhost:3001` (port 3000 is often used by Docker on macOS).

Regenerate the Open Graph PNG after editing `design/og-image.svg`:

```bash
npm run build:og
```

---

## Sections

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

- Replace the two Edmunds-hosted reference images in `js/config.js` (`IMG_HERO`, `IMG_DETAIL`) with your own files under `assets/images/`. All `<img>` tags already have a stylized SVG fallback via `onerror`.
- Update `CONFIG.phone`, `CONFIG.email`, and `CONFIG.bookHref` (currently a placeholder `tel:` number and the same-page anchor).
- Update SEO title/description in `CONFIG.seo`.
- Swap reviewer names/locations if needed in `CONFIG.reviews`.

---

## Design tokens (edit in `js/config.js → theme`)

| Token       | Value     | Usage                                  |
| ----------- | --------- | -------------------------------------- |
| `bg`        | `#080808` | Page background                        |
| `surface`   | `#0E0E0C` | Alternating section background         |
| `border`    | `#1A1A14` | Dividers, card borders                 |
| `gold`      | `#B8963E` | Accent — logo pipe, marquee, hovers    |
| `white`     | `#EEEEE8` | Body & headline text                   |
| `muted`     | `#55554C` | Secondary text, eyebrow labels         |

Typography is fluid — every major size uses `clamp()`.
