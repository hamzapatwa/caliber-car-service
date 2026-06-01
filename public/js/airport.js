/* Deprecated — use landing.js. Maps legacy AIRPORT_PAGE for old HTML shells. */
if (window.AIRPORT_PAGE && !window.LANDING_PAGE) {
  window.LANDING_PAGE = Object.assign({ type: 'airport' }, window.AIRPORT_PAGE);
}
