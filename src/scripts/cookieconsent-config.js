import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.1.0/dist/cookieconsent.umd.js';

CookieConsent.run({
    guiOptions: {
        consentModal: {
            layout: "bar",
            position: "bottom",
            equalWeightButtons: true,
            flipButtons: false
        },
        preferencesModal: {
            layout: "box",
            position: "right",
            equalWeightButtons: true,
            flipButtons: false
        }
    },
    categories: {
        necessary: {
            readOnly: true
        },
        analytics: {}
    },
    language: {
        default: "de",
        autoDetect: "browser",
        translations: {
            de: {
                consentModal: {
                    title: "Wir verwenden Cookies",
                    description: "Wir nutzen Cookies, um unsere Website nutzerfreundlich zu gestalten und anonyme Statistiken über die Nutzung zu erhalten. Du kannst selbst entscheiden, welche Cookies du zulassen möchtest.",
                    acceptAllBtn: "Alle akzeptieren",
                    acceptNecessaryBtn: "Nur notwendige Cookies",
                    showPreferencesBtn: "Cookie-Einstellungen",
                    footer: "<a href=\"/datenschutz/\">Datenschutz</a>",
                    ariaLabel: "Cookie-Banner"
                },
                preferencesModal: {
                    title: "Cookie-Einstellungen",
                    ariaLabel: "Cookie-Einstellungen",
                    acceptAllBtn: "Alle akzeptieren",
                    acceptNecessaryBtn: "Nur notwendige Cookies",
                    savePreferencesBtn: "Einstellungen speichern",
                    closeIconLabel: "Schließen",
                    serviceCounterLabel: "Dienste",
                    sections: [
                        {
                            title: "Verwendung von Cookies",
                            description: "Wir setzen Cookies ein, um grundlegende Funktionen der Website bereitzustellen und anonymisierte Nutzungsstatistiken zu erstellen."
                        },
                        {
                            title: "Notwendige Cookies <span class=\"pm__badge\">Immer aktiv</span>",
                            description: "Diese Cookies sind technisch erforderlich, damit unsere Seite funktioniert. Sie speichern keine personenbezogenen Daten.",
                            linkedCategory: "necessary"
                        },
                        {
                            title: "Analyse Cookies",
                            description: "Diese Cookies helfen uns zu verstehen, wie Besucher unsere Website nutzen. Alle Daten sind anonymisiert.",
                            linkedCategory: "analytics"
                        },
                        {
                            title: "Weitere Informationen",
                            description: "Bei Fragen zum Einsatz von Cookies kontaktiere uns bitte unter <a class=\"cc__link\" href=\"mailto:dsgvo@karrierekolleg.at\">dsgvo@karrierekolleg.at</a>."
                        }
                    ]
                }
            }
        }
    },
    disablePageInteraction: true
});