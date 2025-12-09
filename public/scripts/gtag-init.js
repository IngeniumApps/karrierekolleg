// This script runs inside a Partytown worker after cookie consent.
// It cannot access Astro variables or window-scope values.

const GA_ID = document.currentScript.dataset.gaId;

self.dataLayer = self.dataLayer || [];

function gtag() {
    self.dataLayer.push(arguments);
}

gtag('js', new Date());
gtag('config', GA_ID, { anonymize_ip: true });