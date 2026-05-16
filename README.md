# Caliber Car Service

A production-ready static marketing site for **Caliber Car Service** — a luxury black-car service based on Long Island, NY, serving the tri-state area.

Plain HTML, CSS, and JavaScript. No framework. No build step.

---

## Stack

- **HTML / CSS / JS** — four files, no dependencies installed locally.
- **GSAP 3 + ScrollTrigger** (cdnjs) — scroll choreography, hero intro, count-ups.
- **Lenis** (jsDelivr) — buttery-smooth scroll, wired into the GSAP ticker.
- **Bebas Neue + DM Sans** via [@fontsource](https://fontsource.org/) on jsDelivr.

---

## File map

| File         | Responsibility                                                       |
| ------------ | -------------------------------------------------------------------- |
| `index.html` | Thin shell. Loads fonts/scripts, mounts `#app`.                      |
| `config.js`  | **Single source of truth.** All copy, links, colors, fleet, services. |
| `styles.css` | All layout & design tokens (CSS variables driven by `config.js`).    |
| `main.js`    | Renders the page from `CONFIG`; runs every animation.                |

To rebrand or change content, edit **`config.js`** only.

---

## Run locally

```bash
npm run dev
# or
python3 -m http.server 3000
```

Then open `http://localhost:3000`.

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

- Replace the two Edmunds-hosted reference images in `config.js` (`IMG_HERO`, `IMG_DETAIL`) with your own files. All `<img>` tags already have a stylized SVG fallback via `onerror`.
- Update `CONFIG.phone`, `CONFIG.email`, and `CONFIG.bookHref` (currently a placeholder `tel:` number and the same-page anchor).
- Update SEO title/description in `CONFIG.seo`.
- Swap reviewer names/locations if needed in `CONFIG.reviews`.

---

## Design tokens (edit in `config.js → theme`)

| Token       | Value     | Usage                                  |
| ----------- | --------- | -------------------------------------- |
| `bg`        | `#080808` | Page background                        |
| `surface`   | `#0E0E0C` | Alternating section background         |
| `border`    | `#1A1A14` | Dividers, card borders                 |
| `gold`      | `#B8963E` | Accent — logo pipe, marquee, hovers    |
| `white`     | `#EEEEE8` | Body & headline text                   |
| `muted`     | `#55554C` | Secondary text, eyebrow labels         |

Typography is fluid — every major size uses `clamp()`.
