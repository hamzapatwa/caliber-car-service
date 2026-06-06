/* ================================================================
   CALIBER CAR SERVICE — consent.js
   Opt-out: Google tags on by default; blocked after user declines.
================================================================ */

(function () {
  'use strict';

  var STORAGE_KEY = 'ccs_consent';
  var AW_ID = 'AW-18199416292';

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  var CONSENT_GRANTED = {
    ad_storage:         'granted',
    ad_user_data:       'granted',
    ad_personalization: 'granted',
    analytics_storage:  'granted',
  };

  var CONSENT_DENIED = {
    ad_storage:         'denied',
    ad_user_data:       'denied',
    ad_personalization: 'denied',
    analytics_storage:  'denied',
  };

  function getStored() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function saveStored(granted) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ granted: granted, ts: Date.now() }));
    } catch (e) { /* private browsing */ }
  }

  function loadGoogleTags() {
    if (document.getElementById('ccs-gtag-loader')) return;

    var loader = document.createElement('script');
    loader.id = 'ccs-gtag-loader';
    loader.async = true;
    loader.src = 'https://www.googletagmanager.com/gtag/js?id=' + AW_ID;
    loader.onload = function () {
      gtag('js', new Date());
      gtag('config', AW_ID);
    };
    document.head.appendChild(loader);
  }

  function removeBanner() {
    var el = document.getElementById('ccs-consent');
    if (el) el.remove();
    document.documentElement.classList.remove('ccs-consent-open');
  }

  function onDismiss() {
    saveStored(true);
    gtag('consent', 'update', CONSENT_GRANTED);
    loadGoogleTags();
    removeBanner();
  }

  function onAccept() {
    onDismiss();
  }

  function onDecline() {
    saveStored(false);
    gtag('consent', 'update', CONSENT_DENIED);
    removeBanner();
  }

  function showBanner() {
    if (document.getElementById('ccs-consent')) return;

    document.documentElement.classList.add('ccs-consent-open');

    var root = document.createElement('div');
    root.id = 'ccs-consent';
    root.className = 'ccs-consent';
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-labelledby', 'ccs-consent-title');
    root.innerHTML =
      '<div class="ccs-consent__panel">' +
        '<button type="button" class="ccs-consent__close" id="ccs-consent-close" aria-label="Close">' +
          '<span aria-hidden="true">&#x2715;</span>' +
        '</button>' +
        '<div class="ccs-consent__accent" aria-hidden="true"></div>' +
        '<div class="ccs-consent__body">' +
          '<p class="ccs-consent__eyebrow">Privacy &amp; Experience</p>' +
          '<h2 class="ccs-consent__title" id="ccs-consent-title">Help us get you there faster</h2>' +
          '<p class="ccs-consent__text">' +
            'We use cookies to measure bookings, improve our site, and show relevant offers. ' +
            'By continuing, you agree to this — or choose Essential cookies only below.' +
          '</p>' +
          '<ul class="ccs-consent__benefits" aria-label="What cookies enable">' +
            '<li>Faster, smoother booking experience</li>' +
            '<li>More relevant service recommendations</li>' +
            '<li>Better insight into what our guests need</li>' +
          '</ul>' +
        '</div>' +
        '<div class="ccs-consent__actions">' +
          '<button type="button" class="ccs-consent__accept" id="ccs-consent-accept">' +
            'Accept &amp; Continue' +
            '<span class="ccs-consent__accept-arrow" aria-hidden="true">→</span>' +
          '</button>' +
          '<button type="button" class="ccs-consent__decline" id="ccs-consent-decline">' +
            'Essential cookies only' +
          '</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(root);
    document.getElementById('ccs-consent-close').addEventListener('click', onDismiss);
    document.getElementById('ccs-consent-accept').addEventListener('click', onAccept);
    document.getElementById('ccs-consent-decline').addEventListener('click', onDecline);
    document.addEventListener('keydown', function onEscape(e) {
      if (e.key !== 'Escape' || !document.getElementById('ccs-consent')) return;
      document.removeEventListener('keydown', onEscape);
      onDismiss();
    });
  }

  function init() {
    var stored = getStored();
    var declined = stored && stored.granted === false;

    gtag('consent', 'default', Object.assign(
      { functionality_storage: 'granted', security_storage: 'granted' },
      declined ? CONSENT_DENIED : CONSENT_GRANTED
    ));

    if (!declined) {
      loadGoogleTags();
    }

    if (!stored) {
      document.addEventListener('DOMContentLoaded', showBanner);
    }
  }

  init();
})();
