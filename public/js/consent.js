/* ================================================================
   CALIBER CAR SERVICE — consent.js
   Opt-in: Google tags load only after user accepts.
================================================================ */

(function () {
  'use strict';

  var STORAGE_KEY = 'ccs_consent';
  var AW_ID = 'AW-18199416292';

  var script = document.currentScript;
  var src = (script && script.getAttribute('src')) || 'js/consent.js';
  var BASE = src.replace(/js\/consent\.js(\?.*)?$/i, '');

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

      var conv = document.createElement('script');
      conv.src = BASE + 'js/conversion.js';
      document.head.appendChild(conv);
    };
    document.head.appendChild(loader);
  }

  function removeBanner() {
    var el = document.getElementById('ccs-consent');
    if (el) el.remove();
    document.documentElement.classList.remove('ccs-consent-open');
  }

  function onAccept() {
    saveStored(true);
    gtag('consent', 'update', CONSENT_GRANTED);
    loadGoogleTags();
    removeBanner();
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
        '<div class="ccs-consent__accent" aria-hidden="true"></div>' +
        '<div class="ccs-consent__body">' +
          '<p class="ccs-consent__eyebrow">Privacy &amp; Experience</p>' +
          '<h2 class="ccs-consent__title" id="ccs-consent-title">Help us get you there faster</h2>' +
          '<p class="ccs-consent__text">' +
            'We use cookies to measure bookings, improve our site, and show relevant offers. ' +
            'Choose Accept to enable analytics and ads, or Essential only to continue without them.' +
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
    document.getElementById('ccs-consent-accept').addEventListener('click', onAccept);
    document.getElementById('ccs-consent-decline').addEventListener('click', onDecline);
  }

  function init() {
    var stored = getStored();
    var granted = stored && stored.granted === true;

    gtag('consent', 'default', Object.assign(
      { functionality_storage: 'granted', security_storage: 'granted' },
      granted ? CONSENT_GRANTED : CONSENT_DENIED
    ));

    if (granted) {
      loadGoogleTags();
    }

    if (!stored) {
      document.addEventListener('DOMContentLoaded', showBanner);
    }
  }

  init();
})();
