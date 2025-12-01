// This script is executed by Partytown after cookie consent.
// It must not run until analytics are allowed.

window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}

gtag('js', new Date());
gtag('config', GA_ID); // GA_ID wird aus define:vars übergeben