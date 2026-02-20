
ABSCHNITT 1: FÜR STANDARD HTML-SEITEN

1. Der Global Site Tag Code:
<!-- Muss in den <head> aller Seiten -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GOOGLE_TAG_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'GOOGLE_TAG_ID');
</script>

2. Das Event-Snippet:
<!-- Muss in den <head> der Conversion-Seite (Danke-Seite) -->
<script>
  gtag('event', 'conversion', {
      'send_to': 'GOOGLE_ADS_ID/CONVERSION_LABEL',
      'value': 1.0,
      'currency': 'EUR'
  });
</script>

ABSCHNITT 2: FÜR AMP-SEITEN

1. AMP Head Code:
<!-- Muss in den <head> der AMP-Seite -->
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>

2. AMP Body Code:
<!-- Muss in den <body> der Conversion-Seite -->
<amp-analytics type="googleanalytics">
<script type="application/json">
{
  "vars": {
    "gtag_id": "GOOGLE_TAG_ID",
    "config": {
      "GOOGLE_TAG_ID": { "groups": "default" }
    }
  },
  "triggers": {
    "conversion_trigger": {
      "on": "visible",
      "vars": {
        "event_name": "conversion",
        "value": 1.0,
        "currency": "EUR",
        "send_to": ["GOOGLE_ADS_ID/CONVERSION_LABEL"]
      }
    }
  }
}
</script>
</amp-analytics>
