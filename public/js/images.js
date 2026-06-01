/**
 * Caliber Car Service — site image map (WebP only).
 * Landing pages resolve paths from site root (/assets/…) via landing.js.
 */
const SITE_IMAGES = {
  home: {
    hero: 'assets/images/escalade-night.webp',
  },
  fleet: {
    sedan: 'assets/images/ct4.webp',
    suv:   'assets/images/vistiq.webp',
    van:   'assets/images/sprinter.webp',
  },

  defaults: {
    airport: { hero: 'planepluscar.webp', glove: 'whiteglove.webp' },
    service: { hero: 'car-and-jet.webp', glove: 'rear-seat.webp' },
    area:    { hero: 'merc-and-jet.webp', glove: 'whiteglove.webp' },
    town:    { hero: 'vistiq.webp', glove: 'rear-seat.webp' },
    borough: { hero: 'escalade-night.webp', glove: 'light-trail.webp' },
    hub:     { hero: 'light-trail.webp', glove: 'whiteglove.webp' },
    about:   { hero: 'whiteglove.webp', glove: 'rear-seat.webp' },
  },

  pages: {
    jfk:            { hero: 'planepluscar.webp', glove: 'car-and-jet.webp' },
    lga:            { hero: 'planepluscar.webp', glove: 'merc-and-jet.webp' },
    ewr:            { hero: 'car-and-jet.webp', glove: 'planepluscar.webp' },
    hpn:            { hero: 'merc-and-jet.webp', glove: 'whiteglove.webp' },
    corporate:      { hero: 'rear-seat.webp', glove: 'back-seat.webp' },
    hourly:         { hero: 'rear-seat.webp', glove: 'back-seat.webp' },
    events:         { hero: 'special-event.webp', glove: 'escalade-wine-tour.webp' },
    cruise:         { hero: 'sprinter-cruise.webp', glove: 'sprinter-cruise.webp' },
    hamptons:       { hero: 'escalade-wine-tour.webp', glove: 'special-event.webp' },
    'north-shore':  { hero: 'vistiq.webp', glove: 'whiteglove.webp' },
    'westchester-ct': { hero: 'car-and-jet.webp', glove: 'merc-and-jet.webp' },
    nyc:            { hero: 'light-trail.webp', glove: 'escalade-night.webp' },
    manhattan:      { hero: 'escalade-night.webp', glove: 'light-trail.webp' },
    brooklyn:       { hero: 'car-and-jet.webp', glove: 'merc-and-jet.webp' },
    queens:         { hero: 'planepluscar.webp', glove: 'car-and-jet.webp' },
    bronx:          { hero: 'merc-and-jet.webp', glove: 'rear-seat.webp' },
    'staten-island': { hero: 'escalade-night.webp', glove: 'whiteglove.webp' },
    'garden-city':  { hero: 'ct4.webp', glove: 'rear-seat.webp' },
    'great-neck':   { hero: 'vistiq.webp', glove: 'whiteglove.webp' },
    manhasset:      { hero: 'ct4.webp', glove: 'back-seat.webp' },
    huntington:     { hero: 'light-trail.webp', glove: 'rear-seat.webp' },
    syosset:        { hero: 'car-and-jet.webp', glove: 'rear-seat.webp' },
    melville:       { hero: 'rear-seat.webp', glove: 'car-and-jet.webp' },
    'rockville-centre': { hero: 'escalade-wine-tour.webp', glove: 'whiteglove.webp' },
    about:          { hero: 'whiteglove.webp', glove: 'rear-seat.webp' },
    areas:          { hero: 'light-trail.webp', glove: 'vistiq.webp' },
  },
};
