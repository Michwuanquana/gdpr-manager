# Prompt: Czech Cookie Consent Plugin

## Kontext
Vytvoř open-source cookie consent plugin zaměřený na český trh. Plugin má být maximálně jednoduchý na implementaci ("jedna řádka kódu") a mít české texty out-of-the-box.

## Cíl
Lightweight, dependency-free JavaScript knihovna pro cookie consent, která:
- Funguje česky bez konfigurace
- Blokuje skripty před souhlasem
- Je ke stažení (self-hosted only, žádné CDN)
- Umožňuje konfiguraci přes JSON nebo data atributy

## Technické požadavky

### Základní implementace
```html
<script src="/js/czech-cookies.min.js"></script>
```

Nebo s konfigurací:
```html
<script 
  src="/js/czech-cookies.min.js"
  data-privacy-url="/zasady-ochrany-osobnich-udaju"
  data-position="bottom"
  data-theme="light">
</script>
```

### Core features (v1.0)
1. **Modal/banner UI** - česky, responzivní, WCAG accessible
2. **Kategorie cookies:**
   - Nezbytné (vždy povolené)
   - Analytické (Google Analytics, Seznam Sklik)
   - Marketingové (Facebook Pixel, Google Ads)
3. **Script blocking** - skripty s `type="text/plain"` + `data-cookie-category="analytics"` se aktivují až po souhlasu
4. **Persistence** - uložení volby do localStorage
5. **API** - `CzechCookies.hasConsent('analytics')`, `CzechCookies.showSettings()`

### Struktura souborů
```
/src
  /core
    consent.js      # Hlavní logika
    storage.js      # localStorage wrapper
    events.js       # Event emitter
  /ui
    modal.js        # UI komponenty
    styles.css      # Inline styles (injektované)
  /blocking
    scriptLoader.js # Aktivace blokovaných skriptů
  /config
    defaults.js     # České výchozí texty
    presets.js      # Presety pro GA, FB, Sklik...
  index.js          # Entry point
/dist
  cookies.min.js    # Bundled + minified (~8kb gzip)
```

### Výchozí české texty
```javascript
const defaultTexts = {
  title: "Používáme cookies",
  description: "Tento web používá cookies pro zajištění funkčnosti a analýzu návštěvnosti.",
  acceptAll: "Přijmout vše",
  rejectAll: "Odmítnout vše", 
  settings: "Nastavení",
  save: "Uložit nastavení",
  categories: {
    necessary: {
      name: "Nezbytné",
      description: "Nutné pro fungování webu. Nelze vypnout."
    },
    analytics: {
      name: "Analytické", 
      description: "Pomáhají nám pochopit, jak web používáte."
    },
    marketing: {
      name: "Marketingové",
      description: "Slouží k zobrazování relevantních reklam."
    }
  },
  privacyLink: "Zásady ochrany osobních údajů"
};
```

### Blokování skriptů - použití
```html
<!-- Google Analytics - blokovaný do souhlasu -->
<script type="text/plain" data-cookie-category="analytics">
  // GA kód zde
</script>

<!-- Facebook Pixel -->
<script type="text/plain" data-cookie-category="marketing">
  // FB Pixel kód zde
</script>
```

### JavaScript API
```javascript
// Kontrola souhlasu
if (CzechCookies.hasConsent('analytics')) {
  // spustit tracking
}

// Event listener
CzechCookies.on('consent', (categories) => {
  console.log('Uživatel souhlasil s:', categories);
});

// Programatické otevření nastavení
document.querySelector('#cookie-settings').addEventListener('click', () => {
  CzechCookies.showSettings();
});

// Reset souhlasu
CzechCookies.reset();
```

### Konfigurace přes JSON (advanced)
```javascript
CzechCookies.init({
  position: 'bottom', // 'bottom' | 'center' | 'top'
  theme: 'light',     // 'light' | 'dark' | 'auto'
  privacyUrl: '/zasady',
  categories: {
    analytics: {
      name: 'Analytické cookies',
      description: 'Custom popis...',
      services: ['Google Analytics', 'Hotjar']
    }
  },
  onAccept: (categories) => {},
  onReject: () => {}
});
```

## Build & distribuce
- Rollup/esbuild pro bundling
- Výstup: ES module + UMD + IIFE (pro přímé použití)
- Distribuce: download ze stránky gdpr-manager.cz/plugin
- NPM package: `czech-cookies` (volitelně)
- GitHub releases s přiloženými soubory

## Testování
- Unit testy pro core logiku
- E2E testy pro UI (Playwright)
- Test na reálném webu s GA/FB

## Dokumentace
- README.md s quick start
- Příklady pro WordPress, Shoptet, Next.js
- Changelog

## Nice-to-have (v2.0)
- Auto-detect cookies na webu
- Admin panel pro konfiguraci
- A/B testing consent ratů
- Integrace s Google Consent Mode v2