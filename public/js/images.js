/**
 * Caliber Car Service — site image map (local assets only).
 * Landing pages resolve image paths from site root (/assets/…) via landing.js.
 */
const SITE_IMAGES = {
  /* Homepage & fleet (paths from site root) */
  home: {
    hero: 'assets/images/escalade-night-ai.png',
  },
  fleet: {
    sedan: 'assets/images/ct4.jpg',
    suv:   'assets/images/vistiq.png',
    van:   'assets/images/sprinter.jpg',
  },

  /* Defaults by landing page type */
  defaults: {
    airport: { hero: 'planepluscar.jpg', glove: 'whiteglove.webp' },
    service: { hero: 'car-and-jet.webp', glove: 'rear-seat.webp' },
    area:    { hero: 'merc-and-jet.webp', glove: 'whiteglove.webp' },
    town:    { hero: 'vistiq.png', glove: 'rear-seat.webp' },
    borough: { hero: 'escalade-night.jpg.webp', glove: 'light-trail.jpg.webp' },
    hub:     { hero: 'light-trail.jpg.webp', glove: 'whiteglove.webp' },
    about:   { hero: 'whiteglove.webp', glove: 'rear-seat.webp' },
  },

  /* Per-page overrides (filename only, under assets/images/) */
  pages: {
    jfk:            { hero: 'planepluscar.jpg', glove: 'car-and-jet.webp' },
    lga:            { hero: 'planepluscar.jpg', glove: 'merc-and-jet.webp' },
    ewr:            { hero: 'car-and-jet.webp', glove: 'planepluscar.jpg' },
    hpn:            { hero: 'merc-and-jet.webp', glove: 'whiteglove.webp' },
    corporate:      { hero: 'rear-seat.webp', glove: 'back-seat.webp' },
    hourly:         { hero: 'rear-seat.webp', glove: 'back-seat.webp' },
    events:         { hero: 'special-event.webp', glove: 'escalade-wine-tour.webp' },
    cruise:         { hero: 'sprinter-cruise.jpg', glove: 'sprinter-cruise.jpg' },
    hamptons:       { hero: 'escalade-wine-tour.webp', glove: 'special-event.webp' },
    'north-shore':  { hero: 'vistiq.png', glove: 'whiteglove.webp' },
    'westchester-ct': { hero: 'car-and-jet.webp', glove: 'merc-and-jet.webp' },
    nyc:            { hero: 'light-trail.jpg.webp', glove: 'escalade-night-ai.png' },
    manhattan:      { hero: 'escalade-night.jpg.webp', glove: 'light-trail.jpg.webp' },
    brooklyn:       { hero: 'car-and-jet.webp', glove: 'merc-and-jet.webp' },
    queens:         { hero: 'planepluscar.jpg', glove: 'car-and-jet.webp' },
    bronx:          { hero: 'merc-and-jet.webp', glove: 'rear-seat.webp' },
    'staten-island': { hero: 'escalade-night-ai.png', glove: 'whiteglove.webp' },
    'garden-city':  { hero: 'ct4.jpg', glove: 'rear-seat.webp' },
    'great-neck':   { hero: 'vistiq.png', glove: 'whiteglove.webp' },
    manhasset:      { hero: 'ct4.jpg', glove: 'back-seat.webp' },
    huntington:     { hero: 'light-trail.jpg.webp', glove: 'rear-seat.webp' },
    syosset:        { hero: 'car-and-jet.webp', glove: 'rear-seat.webp' },
    melville:       { hero: 'rear-seat.webp', glove: 'car-and-jet.webp' },
    'rockville-centre': { hero: 'escalade-wine-tour.webp', glove: 'whiteglove.webp' },
    about:          { hero: 'whiteglove.webp', glove: 'rear-seat.webp' },
    areas:          { hero: 'light-trail.jpg.webp', glove: 'vistiq.png' },
  },
};
