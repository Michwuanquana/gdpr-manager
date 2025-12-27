# GDPR Manager - MVP pro gdpr-manager.cz

## Co to je
Generátor GDPR dokumentace pro české malé firmy a weby. Uživatel projde wizardem, vyplní základní info o své firmě a zpracování dat, a dostane hotové právní dokumenty v češtině.

## Tech stack
- Frontend: Next.js 14 (App Router) + Tailwind CSS + shadcn/ui
- Bez databáze v MVP - vše client-side, state v React
- Export: PDF (react-pdf nebo html2pdf) + DOCX (docx.js)
- Deploy: existující Docker setup (nginx reverse proxy)

## Struktura wizardu (5 kroků)

### Krok 1: Základní info o firmě
- Název firmy/jméno OSVČ
- IČO
- Sídlo/adresa
- Kontaktní email
- Web (volitelné)

### Krok 2: Co děláte?
- Typ podnikání (e-shop, služby, SaaS, blog, jiné)
- Máte zaměstnance? (ano/ne, kolik)
- Máte web s formuláři? (ano/ne)

### Krok 3: Jaká data sbíráte?
Checkboxy:
- [ ] Jméno a příjmení
- [ ] Email
- [ ] Telefon
- [ ] Adresa
- [ ] Datum narození
- [ ] Platební údaje
- [ ] IP adresy / cookies
- [ ] Fotografie
- [ ] Jiné (text input)

### Krok 4: Účely zpracování
Checkboxy:
- [ ] Plnění smlouvy (objednávky, služby)
- [ ] Marketing a newsletter
- [ ] Personalizace obsahu
- [ ] Analytika webu
- [ ] Zaměstnanecká agenda
- [ ] Účetnictví a daně

### Krok 5: Komu data předáváte?
- Účetní/daňový poradce (ano/ne)
- Poskytovatel hostingu (text: kdo)
- Platební brána (text: která)
- Email marketing (text: který nástroj)
- Analytika (Google Analytics, jiné)
- Předání do třetích zemí mimo EU? (ano/ne, kam)

## Výstupní dokumenty

### Dokument 1: Zásady zpracování osobních údajů
Pro zveřejnění na webu. Obsahuje:
- Kdo je správce (z kroku 1)
- Jaké údaje zpracováváme (z kroku 3)
- Za jakým účelem (z kroku 4)
- Na jakém právním základě
- Komu údaje předáváme (z kroku 5)
- Jak dlouho uchováváme
- Práva subjektu údajů (standardní GDPR práva)
- Kontakt pro uplatnění práv

### Dokument 2: Informační povinnost (kratší verze)
Pro přiložení k formulářům, objednávkám. Zkrácená verze zásad.

### Dokument 3: Souhlas se zpracováním OÚ (template)
Pro případy kde je potřeba souhlas (marketing). Obsahuje checkbox text + plné znění.

### Dokument 4: Záznamy o činnostech zpracování (čl. 30 GDPR)
Interní dokument - tabulka s:
- Účel zpracování
- Kategorie subjektů
- Kategorie údajů
- Příjemci
- Lhůty pro výmaz
- Bezpečnostní opatření (obecné)

## UI/UX požadavky
- Čistý, profesionální design (právnický feel, ale přátelský)
- Barvy: tmavě modrá (#1e3a5f) + bílá + akcent zelená
- Progress bar nahoře ukazující krok wizardu
- Možnost vrátit se na předchozí krok
- Na konci: náhled všech dokumentů + tlačítka pro stažení PDF/DOCX
- Mobile responsive

## Struktura souborů
```
www/
├── app/
│   ├── page.tsx          # Landing page
│   ├── wizard/
│   │   └── page.tsx      # Hlavní wizard komponenta
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── wizard/
│   │   ├── Step1Company.tsx
│   │   ├── Step2Business.tsx
│   │   ├── Step3Data.tsx
│   │   ├── Step4Purposes.tsx
│   │   ├── Step5Recipients.tsx
│   │   └── WizardProgress.tsx
│   ├── documents/
│   │   ├── PrivacyPolicy.tsx
│   │   ├── InfoObligation.tsx
│   │   ├── ConsentForm.tsx
│   │   └── ProcessingRecords.tsx
│   └── ui/               # shadcn komponenty
├── lib/
│   ├── types.ts          # TypeScript typy pro wizard data
│   ├── document-generator.ts  # Logika generování textu
│   └── export.ts         # PDF/DOCX export funkce
├── public/
└── package.json
```

## Právní texty
Použij standardní GDPR formulace v češtině. Texty musí být:
- Právně korektní dle GDPR a českého zákona 110/2019 Sb.
- Srozumitelné pro laika
- Dynamicky doplněné o data z wizardu

## Co NEDĚLAT v MVP
- Žádná registrace/login
- Žádná databáze
- Žádné platby
- Žádný backend API (vše client-side)
- Žádná cookie lišta (to je fáze 2)

## Priorita
1. Fungující wizard s uložením stavu
2. Generování textu dokumentů
3. Zobrazení náhledu dokumentů
4. Export do PDF
5. Export do DOCX (nice to have)