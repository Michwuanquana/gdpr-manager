# Právní audit GDPR dokumentace

## Výsledek: **PASS** (s výhradami)

---

## Odůvodnění

Předložená sada GDPR dokumentů představuje komplexní systém šablon, který po vyplnění konkrétních údajů správce bude splňovat požadavky GDPR. Dokumentace pokrývá všechny klíčové oblasti: informační povinnost, získávání souhlasu, záznamy o činnostech zpracování a řešení bezpečnostních incidentů.

**Co je v pořádku:**

Právní základy zpracování jsou správně přiřazeny k jednotlivým účelům dle čl. 6 odst. 1 GDPR – plnění smlouvy pro objednávky, souhlas pro marketing a analytiku, právní povinnost pro účetnictví a zaměstnaneckou agendu.

Informační povinnost dle čl. 13 GDPR je v hlavním dokumentu („Zásady zpracování osobních údajů") splněna kompletně – obsahuje identifikaci správce, účely a právní základy, příjemce, informace o přenosech do třetích zemí včetně záruk (EU-US Data Privacy Framework pro Google, SCC pro Mailchimp), doby uchovávání, kompletní výčet práv subjektů údajů a kontakt na ÚOOÚ.

Souhlas se zpracováním splňuje požadavky čl. 7 GDPR – je dobrovolný, konkrétní, informovaný, snadno odvolatelný třemi způsoby (e-mail, odkaz v newsletteru, webový formulář).

Záznamy o činnostech zpracování odpovídají struktuře požadované čl. 30 GDPR – obsahují účely, kategorie subjektů a údajů, příjemce, lhůty pro výmaz a popis bezpečnostních opatření pro každou činnost zpracování.

Směrnice pro řešení incidentů pokrývá čl. 33 a 34 GDPR – 72hodinová lhůta pro ohlášení ÚOOÚ, kritéria pro posouzení rizika, povinnost informovat subjekty údajů při vysokém riziku, evidence incidentů, vzorové oznámení subjektům údajů.

---

## Výhrady/Nedostatky

| Problém | Závažnost |
|---------|-----------|
| Nesoulad retenční doby u zaměstnanecké agendy – hlavní dokument uvádí 5 let, záznamy o činnostech správně uvádí 45 let pro mzdové listy (dle novely zákona č. 582/1991 Sb. účinné od 1.1.2023) | střední |
| Zkrácená informace o zpracování (dokument 2) neobsahuje doby uchovávání, konkrétní příjemce ani informace o přenosech do třetích zemí – měla by obsahovat odkaz na kompletní Zásady | nízká |
| U personalizace obsahu chybí v záznamech o činnostech explicitní lhůta pro výmaz (hlavní dokument uvádí 2 roky) | nízká |

**Podrobněji k retenci zaměstnaneckých údajů:** Zákon č. 582/1991 Sb., o organizaci a provádění sociálního zabezpečení, ve znění novely zákonem č. 455/2022 Sb. (účinné od 1.1.2023), vyžaduje uchovávání mzdových listů a evidenčních listů důchodového pojištění po dobu 45 let (§ 35a odst. 4 písm. d)). Výjimku tvoří mzdové listy poživatelů starobního důchodu (10 let). Hlavní dokument („Zásady") uvádí 5 let, což je příliš krátká doba. Doporučuji sjednotit na „45 let pro mzdovou dokumentaci, 5 let pro ostatní personální dokumenty" nebo obdobně rozlišit.

---

## Verdikt

Dokumentace je právně funkční a po vyplnění konkrétních údajů správce obstojí při běžné kontrole ÚOOÚ. Zjištěné nedostatky nezpůsobují neplatnost ani závažné porušení GDPR, jedná se o interní nesoulad v retenčních dobách, který lze snadno opravit.

**Doporučení před nasazením:**
1. Sjednotit retenční dobu u zaměstnanecké agendy napříč dokumenty (respektovat 45letou lhůtu pro mzdové podklady dle novely 455/2022 Sb.)
2. Doplnit do zkrácené informace (dokument 2) odkaz na kompletní Zásady zpracování
3. Ověřit, že implementace cookie souhlasu odpovídá deklarovanému právnímu základu (souhlas před aktivací Google Analytics)

---

*(Nejedná se o právní službu podle § 25 zákona č. 85/1996 Sb.; pro konečné posouzení doporučuji konzultaci s advokátem.)*