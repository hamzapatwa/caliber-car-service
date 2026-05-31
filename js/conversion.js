/* Google Ads — Outbound click conversion (Moovs booking) */
function gtag_report_conversion(url) {
  var callback = function () {
    if (typeof url !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };
  gtag('event', 'conversion', {
    'send_to': 'AW-18199416292/ORAWCNjK6LYCEOSb1OZD',
    'event_callback': callback
  });
  return false;
}
