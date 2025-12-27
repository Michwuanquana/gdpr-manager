# AI Context - GDPR Manager

## Projekt
Generátor GDPR dokumentace pro české firmy.
Doména: gdpr-manager.cz

## Struktura
- `/www` - Next.js frontend (App Router)
- `/backend` - (zatím prázdný, pro budoucí API)
- `/nginx.conf` - reverse proxy config
- `/docker-compose.yml` - orchestrace

## Tech stack
- Next.js 14, App Router
- TypeScript (striktní)
- Tailwind CSS + shadcn/ui
- Export: react-pdf, docx

## Konvence
- UI jazyk: čeština
- Kód jazyk: angličtina
- Komponenty: PascalCase
- Soubory: kebab-case
- "use client" jen kde nutné

## Aktuální fáze
MVP - wizard pro generování GDPR dokumentů. Bez backendu, bez auth, bez DB.

## DŮLEŽITÉ
- Právní texty musí odpovídat GDPR + zákon 110/2019 Sb.
- KISS - žádné zbytečné závislosti
- Vše client-side, žádné API volání