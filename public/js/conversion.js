/* Google Ads — click conversion (Moovs booking)
   Must match Google Ads → Goals → Conversions → Tag setup exactly.
   Verify send_to label if status shows "misconfigured". */
function gtag_report_conversion(url) {
  var callback = function () {
    if (typeof(url) != 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };
  gtag('event', 'conversion', {
    'send_to': 'AW-18199416292/0RAwCNjk6LYcEOSblOZD',
    'event_callback': callback
  });
  return false;
}
