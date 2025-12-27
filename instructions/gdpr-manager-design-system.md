# GDPR Manager — Design System & Typografie

## Filosofie designu

GDPR Manager je nástroj pro právní compliance. Design musí komunikovat:
- **Důvěryhodnost** — profesionální, seriózní
- **Přehlednost** — uživatel rychle najde co potřebuje
- **Bezpečí** — ochrana dat, spolehlivost

---

## Typografie

### Font pairing doporučení

Na základě Google Fonts knowledge a charakteru projektu:

```
PRIMARY:     Inter (UI, nadpisy, logo wordmark)
SECONDARY:   Source Serif 4 (dlouhý text, právní dokumenty)
MONO:        JetBrains Mono (kód, technické údaje)
```

### Proč tyto fonty?

**Inter**
- Navržen speciálně pro UI
- Výborná čitelnost na obrazovkách
- Profesionální, neutrální, důvěryhodný
- Podpora českých znaků (háčky, čárky)

**Source Serif 4**
- Serif pro kontrast a hierarchii
- Asociace s právními dokumenty a autoritou
- Skvělé pro delší čtení (privacy policy, smlouvy)

**JetBrains Mono**
- Pro API klíče, JSON, technické údaje
- Clear rozlišení podobných znaků (0/O, 1/l)

---

## Typografická škála

```css
/* Font imports */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  /* Font families */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-serif: 'Source Serif 4', Georgia, serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* Font sizes - using fluid scale */
  --text-xs: 0.75rem;      /* 12px - captions, badges */
  --text-sm: 0.875rem;     /* 14px - muted, helper text */
  --text-base: 1rem;       /* 16px - body text */
  --text-lg: 1.125rem;     /* 18px - lead paragraph */
  --text-xl: 1.25rem;      /* 20px - h4 */
  --text-2xl: 1.5rem;      /* 24px - h3 */
  --text-3xl: 1.875rem;    /* 30px - h2 */
  --text-4xl: 2.25rem;     /* 36px - h1 */
  --text-5xl: 3rem;        /* 48px - hero */

  /* Line heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;

  /* Font weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}
```

---

## Použití podle kontextu

### Logo / Wordmark

```css
.logo-wordmark {
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: var(--text-xl);
  letter-spacing: -0.02em;
  text-transform: none;
}

/* "GDPR" v logu může být semibold, "Manager" regular pro kontrast */
.logo-gdpr {
  font-weight: 700;
}
.logo-manager {
  font-weight: 400;
}
```

### Nadpisy (Headings)

```css
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-sans);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
  letter-spacing: -0.02em;
  color: var(--color-foreground);
}

h1 { font-size: var(--text-4xl); }
h2 { font-size: var(--text-3xl); }
h3 { font-size: var(--text-2xl); }
h4 { font-size: var(--text-xl); }
```

### Paragraph (Body text)

```css
.paragraph,
p {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: var(--leading-relaxed);
  color: var(--color-foreground);
}

/* Lead paragraph - úvodní text */
.lead {
  font-size: var(--text-lg);
  color: var(--color-muted-foreground);
}
```

### Muted text

```css
.muted,
.text-muted {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--font-normal);
  color: var(--color-muted-foreground);
}
```

### Legal / Dokumenty

```css
.legal-text,
.document-content {
  font-family: var(--font-serif);
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
}

/* Pro citace zákonů, GDPR článků */
.legal-quote {
  font-family: var(--font-serif);
  font-style: italic;
  border-left: 3px solid var(--color-primary);
  padding-left: 1rem;
}
```

### Code / Technické

```css
code,
.code,
kbd {
  font-family: var(--font-mono);
  font-size: 0.9em;
  background: var(--color-muted);
  padding: 0.2em 0.4em;
  border-radius: 0.25rem;
}

/* API klíče, JSON */
pre {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
}
```

### Buttons & UI

```css
.button,
button {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  letter-spacing: 0.01em;
}

/* Labels ve formulářích */
label {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
}
```

---

## Barevná paleta

Vycházím z loga (modrý štít #3B82F6, zelený checkmark #10B981):

```css
:root {
  /* Primary - modrá (důvěra, bezpečí) */
  --color-primary: #3B82F6;
  --color-primary-hover: #2563EB;
  --color-primary-light: #DBEAFE;
  --color-primary-dark: #1E40AF;

  /* Success - zelená (compliance, ok) */
  --color-success: #10B981;
  --color-success-light: #D1FAE5;
  --color-success-dark: #059669;

  /* Warning - oranžová (pozor, deadline) */
  --color-warning: #F59E0B;
  --color-warning-light: #FEF3C7;

  /* Danger - červená (porušení, chyba) */
  --color-danger: #EF4444;
  --color-danger-light: #FEE2E2;

  /* Neutrals */
  --color-background: #FFFFFF;
  --color-foreground: #0F172A;
  --color-muted: #F1F5F9;
  --color-muted-foreground: #64748B;
  --color-border: #E2E8F0;

  /* Dark mode */
  @media (prefers-color-scheme: dark) {
    --color-background: #0F172A;
    --color-foreground: #F8FAFC;
    --color-muted: #1E293B;
    --color-muted-foreground: #94A3B8;
    --color-border: #334155;
  }
}
```

---

## Logo — Doporučení

### Současné logo
Štít + dokument + checkmark je dobrá symbolika. Doporučuji:

1. **Zachovat koncept** — štít = ochrana, dokument = data/GDPR, check = compliance
2. **Zjednodušit** — méně detailů pro lepší škálování
3. **Wordmark** — "GDPR Manager" vedle ikony

### Logo varianty

```
1. Full logo:      [ikona] GDPR Manager
2. Compact:        [ikona] GDPR
3. Icon only:      [ikona]
4. Wordmark only:  GDPR Manager (pro favicon už máme ikonu)
```

### Vylepšené logo (návrh)

```svg
<!-- Zjednodušená verze -->
<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Štít - čistější tvar -->
  <path
    d="M50 8 L88 24 L88 52 Q88 78 50 94 Q12 78 12 52 L12 24 Z"
    fill="#3B82F6"
  />
  
  <!-- Checkmark - větší, čitelnější -->
  <path
    d="M35 52 L45 62 L65 42"
    stroke="white"
    stroke-width="8"
    stroke-linecap="round"
    stroke-linejoin="round"
    fill="none"
  />
</svg>
```

---

## Komponenty — Quick Reference

| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| Logo wordmark | Inter | xl (20px) | 700 | foreground |
| H1 | Inter | 4xl (36px) | 600 | foreground |
| H2 | Inter | 3xl (30px) | 600 | foreground |
| H3 | Inter | 2xl (24px) | 600 | foreground |
| Body | Inter | base (16px) | 400 | foreground |
| Lead | Inter | lg (18px) | 400 | muted-foreground |
| Muted | Inter | sm (14px) | 400 | muted-foreground |
| Caption | Inter | xs (12px) | 400 | muted-foreground |
| Legal docs | Source Serif 4 | base (16px) | 400 | foreground |
| Code | JetBrains Mono | sm (14px) | 400 | foreground |
| Button | Inter | sm (14px) | 500 | depends |
| Label | Inter | sm (14px) | 500 | foreground |

---

## Tailwind CSS konfigurace

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Source Serif 4', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        success: {
          DEFAULT: '#10B981',
          50: '#ECFDF5',
          100: '#D1FAE5',
          500: '#10B981',
          600: '#059669',
        },
      },
    },
  },
}
```

---

## Shadcn/ui komponenty

Pokud používáš shadcn/ui, uprav `globals.css`:

```css
@layer base {
  :root {
    --font-sans: 'Inter', sans-serif;
    --font-serif: 'Source Serif 4', serif;
    --font-mono: 'JetBrains Mono', monospace;
  }
  
  body {
    @apply font-sans antialiased;
  }
  
  /* Typografie */
  .prose-legal {
    @apply font-serif leading-relaxed;
  }
}
```

---

## Do's and Don'ts

### ✅ Do

- Používej Inter pro veškeré UI
- Source Serif pouze pro právní/dlouhý text
- Dostatečný kontrast (WCAG AA minimum)
- Konzistentní spacing (4px grid)
- Čisté, jednoduché ikony (Lucide)

### ❌ Don't

- Nemíchej více než 3 fonty
- Nepoužívej Source Serif pro UI elementy
- Nepoužívej příliš malé písmo (min 14px pro body)
- Vyhni se čistě šedému textu na bílém pozadí
- Nepoužívej dekorativní fonty

---

## Implementace v Next.js

```tsx
// app/layout.tsx
import { Inter, Source_Serif_4, JetBrains_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-serif',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-mono',
})

export default function RootLayout({ children }) {
  return (
    <html lang="cs" className={`${inter.variable} ${sourceSerif.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
```

---

*Verze 1.0 — Prosinec 2024*
