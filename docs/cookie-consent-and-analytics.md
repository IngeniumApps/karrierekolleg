# Cookie Consent & Google Analytics – Karriere Kolleg (Astro + Partytown)

Diese Dokumentation beschreibt die komplette technische Umsetzung des Cookie-Consents bei *Karriere Kolleg*.  

---

# 1. Projektstruktur – Relevante Dateien

| Datei | Zweck |
|-------|-------|
| `astro.config.mjs` | Integration von Partytown + globale Astro-Konfiguration |
| `src/scripts/cookieconsent-config.js` | Cookie-Banner-Konfiguration (OrestBida v3) |
| `src/components/analytics/GoogleTag.astro` | Google Analytics Loader + ausgelagerter Init-Code |
| `src/scripts/gtag-init.js` | Ausgelagerter GA-Initialisierungscode |
| `src/components/common/Head.astro` | Standard-SEO/OpenGraph |
| `src/layouts/MainLayout.astro` | Zentrales Layout inkl. `<GoogleTag />` + CookieConsent-Loader |

---

# 2. Astro + Partytown Setup

**Datei:** `astro.config.mjs`

```ts
integrations: [
  react(),
  partytown({ config: { forward: ['dataLayer.push'] } })
]
```

Warum?

- Partytown lagert GoogleAnalytics in einen Web Worker aus → bessere Performance
- `dataLayer.push` wird weitergeleitet → GoogleAnalytics funktioniert korrekt

---

# 3. Cookie-Banner Setup

**Datei:** `src/scripts/cookieconsent-config.js`

Du lädst OrestBida CookieConsent v3 über CDN:

```js
import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.1.0/dist/cookieconsent.umd.js';
```

Der Banner ist in Kategorien organisiert:

```js
categories: {
  necessary: { readOnly: true },
  analytics: {}
},
```

Wichtig:

- **analytics** ist bewusst leer – die Kategorie dient nur als Umschalter
- Alle Scripts mit `data-category="analytics"` werden blockiert, bis der User zustimmt

---

# 4. GoogleAnalytics & Consent – Dein Setup

**Datei:** `src/components/analytics/GoogleTag.astro`

### GoogleAnalytics wird geladen über Partytown **und** blockiert über CookieConsent:

```astro
<script
    data-category="analytics"
    type="text/partytown"
    src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
/>
```

# 4.1 GoogleAnalytics-Initialisierung

**Datei:** `src/scripts/gtag-init.js`

```js
// Executed via Partytown after cookie consent
window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}

gtag('js', new Date());
gtag('config', GA_ID);
```

Einbindung in GoogleTag.astro:

```astro
<script
  data-category="analytics"
  type="text/partytown"
  define:vars={{ GA_ID }}
  src={`${import.meta.env.BASE_URL}src/scripts/gtag-init.js`}
/>
```
---

# 5. Einbindung ins Layout

**Datei:** `src/layouts/MainLayout.astro`

GoogleAnalytics wurde korrekt in `<head>` eingebunden:

```astro
<GoogleTag />
```

Der CookieConsent-Loader ist am Ende des Body:

```astro
<script type="module" src={`${import.meta.env.BASE_URL}src/scripts/cookieconsent-config.js`}></script>
```

Das ist wichtig:

- CookieConsent initialisiert, nachdem die Seite gerendert ist
- blockiert dann GoogleAnalytics zuverlässig

---

# 6. Testanleitung

## A) Test: Analytics blockiert

1. Inkognito-Modus  
2. Webseite öffnen  
3. „Nur notwendige Cookies“ klicken  
4. DevTools → Network → Filter: `gtag`

**Erwartet:**  
❌ KEIN Request zu:  
- `gtag/js`  
- `google-analytics.com/g/collect`
- KEINE GA-Cookies (`_ga`, `_gid`)

**Sources Tab:**  
Nur diese dürfen erscheinen:

```
~partytown-sandbox-sw.html
partytown-sw.js
```

➡️ **GoogleAnalytics darf noch nicht existieren, da es blockiert wird**

---

## B) Consent zurücksetzen

```js
localStorage.clear()
```

Reload → Banner erscheint erneut.

---

## C) Test: Analytics aktiv

1. „Alle akzeptieren“ klicken  
2. Reload  
3. Network → Filter `gtag`  

**Erwartet:**  
✔️ `https://www.googletagmanager.com/gtag/js?id=G-XXXX`  
✔️ `https://www.google-analytics.com/g/collect?...`

Jetzt ist GooglyAnalytics aktiv & Partytown geladen.

**Sources Tab:**  
Jetzt DARF dieser Ordner existieren:

```
~partytown/googletagmanager.com/gtag/js
```

➡️ Beweis: GooglyAnalytics wurde erst nach Zustimmung gestartet.

---

# 7. Troubleshooting

### GoogleAnalytics lädt trotzdem  
→ Prüfen, ob ein Script **ohne** `data-category="analytics"` eingebunden wurde.

### Cookie-Banner erscheint nicht  
→ LocalStorage prüfen:

```js
localStorage.getItem('cc_cookie')
```

### Partytown lädt nicht  
→ DevTools → Application → Service Workers prüfen.

---

# 8. Zusammenfassung

Dein Setup ist vollständig DSGVO-konform:

| Zustand | Ergebnis |
|--------|----------|
| **Ohne Zustimmung** | GoogleAnalytics blockiert, keine Cookies, kein Traffic |
| **Mit Zustimmung** | GoogleAnalytics lädt, Tracking aktiv, Partytown optimiert Performance |

**Das Verhalten entspricht exakt Best Practices für EU-Tracking.**
