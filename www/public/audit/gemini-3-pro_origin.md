# **Právní audit GDPR dokumentace** //2

## **Výsledek: FAIL (Nehovující)**

## ---

**Odůvodnění**

Předložená sada šablon GDPR dokumentace (dokumenty 1 až 5\) byla podrobena komplexnímu, hloubkovému právnímu auditu z hlediska souladu s Nařízením Evropského parlamentu a Rady (EU) 2016/679 (GDPR), zákonem č. 110/2019 Sb., o zpracování osobních údajů, a souvisejícími zvláštními právními předpisy České republiky, zejména se zákonem č. 582/1991 Sb., o organizaci a provádění sociálního zabezpečení, a zákonem č. 563/1991 Sb., o účetnictví. Cílem tohoto auditu bylo ověřit, zda nastavený systém dokumentace poskytuje dostatečný právní rámec pro zpracování osobních údajů a zda obstojí v případě kontroly dozorovým úřadem (ÚOOÚ) či jinými správními orgány.

Audit odhalil kritické nedostatky v oblasti zákonných retenčních lhůt, které činí dokumentaci v současné podobě právně neudržitelnou a rizikovou. Ačkoliv dokumentace prokazuje snahu o reflektování moderních trendů v oblasti mezinárodního předávání dat, obsahuje faktické chyby, které by při implementaci vedly správce k porušení kogentních ustanovení českého právního řádu, konkrétně v oblasti archivace mzdové agendy. Dále byly identifikovány významné diskrepance mezi deklarovaným zpracováním v analytické rovině (Google Analytics) a technickou realitou nástroje, což zakládá porušení zásady transparentnosti.

Dokumentace je hodnocena jako **FAIL**, primárně proto, že nabádá správce k likvidaci mzdových listů po 30 letech, ačkoliv platná legislativa od 1\. ledna 2023 vyžaduje lhůtu 45 let. Toto pochybení není formální, nýbrž materiální, s potenciálním dopadem na důchodové nároky subjektů údajů a s vysokým rizikem sankce.

### **Co je v pořádku:**

Ačkoliv je celkový verdikt negativní, je nutné vyzdvihnout oblasti, kde dokumentace splňuje vysoké standardy a reflektuje aktuální vývoj:

* **Reflektování EU-US Data Privacy Framework (DPF):** Dokumentace v *Zásadách zpracování osobních údajů* 1 správně identifikuje aktuální právní titul pro předávání dat do USA. Odkaz na rozhodnutí o přiměřenosti pro Google LLC a The Rocket Science Group LLC (Mailchimp) je v souladu s prováděcím rozhodnutím Evropské komise z července 2023\. Audit potvrdil, že obě společnosti jsou aktivními účastníky DPF seznamu.2 Tento přístup eliminuje nutnost spoléhat se výhradně na Standardní smluvní doložky (SCCs) a složité posuzování dopadů předávání (TIA), což zjednodušuje administrativní zátěž správce.  
* **Formální struktura plnění informační povinnosti:** Dokumenty pokrývají katalog požadavků dle článků 13 a 14 GDPR. Obsahují identifikaci správce, účely, právní základy, kategorie příjemců i poučení o právech subjektů údajů. Z formálního hlediska šablony správně transponují požadavky nařízení do textové podoby.  
* **Procesní uchopení incidentů:** *Směrnice pro řešení bezpečnostních incidentů* 1 správně implementuje procesní lhůty dle článku 33 GDPR (72 hodin) a metodicky odlišuje povinnost ohlášení dozorovému úřadu od povinnosti oznámení subjektům údajů (dle článku 34 GDPR), která nastupuje až při vysokém riziku.

## ---

**Hloubková analýza a identifikace nedostatků**

V následující části je předložen detailní právní rozbor identifikovaných deficitů. Analýza postupuje od kritických legislativních rozporů až po doporučení pro zvýšení právní jistoty.

### **1\. Kritická chyba v retenčních dobách mzdové agendy (Legislativní kolize)**

Tento nedostatek je hlavním důvodem pro udělení hodnocení FAIL. Správné nastavení skartačních a archivačních lhůt je klíčové pro soulad se zásadou omezení uložení (čl. 5 odst. 1 písm. e) GDPR), avšak tato zásada nesmí být aplikována v rozporu se zvláštními zákony vyžadujícími delší uchování.

Nález:  
V dokumentu 4-zaznamy-o-cinnostech-zpracovani.pdf (strana 2\) a 1-zasady-zpracovani-osobnich-udaju.pdf (strana 2\) je u účelu zpracování "Zaměstnanecká agenda" explicitně uvedena lhůta pro výmaz mzdových listů v délce 30 let.1  
Právní analýza:  
Tato lhůta vychází z již neplatné právní úpravy. S účinností od 1\. ledna 2023 došlo k novelizaci zákona č. 582/1991 Sb., o organizaci a provádění sociálního zabezpečení. Konkrétně ustanovení § 35a odst. 4 písm. d) tohoto zákona nově stanovuje povinnost zaměstnavatelů uschovávat mzdové listy nebo účetní záznamy o údajích potřebných pro účely důchodového pojištění po dobu 45 kalendářních roků následujících po roce, kterého se týkají.4  
Důvodem této legislativní změny, zavedené zákonem č. 455/2022 Sb., bylo prodlužování věku odchodu do důchodu a potřeba zajistit dostupnost podkladů pro výpočet důchodových nároků po delší časové období. Původní lhůta 30 let se ukázala jako nedostatečná pro pokrytí celé ekonomicky aktivní dráhy pojištěnců v kontextu demografických změn.6

Dopad chyby:  
Pokud by správce (zaměstnavatel) postupoval podle auditované dokumentace, zahájil by skartaci mzdových listů o 15 let dříve, než zákon povoluje. Tímto jednáním by se dopustil:

1. **Porušení zákona o organizaci a provádění sociálního zabezpečení**, za což hrozí sankce ze strany České správy sociálního zabezpečení (ČSSZ).  
2. **Porušení zásady zákonnosti dle čl. 5 odst. 1 písm. a) GDPR**, která vyžaduje, aby zpracování osobních údajů bylo v souladu s právem EU i členského státu. Předčasná likvidace dat, která má správce povinnost uchovávat, je protiprávním zpracováním (ve formě výmazu).  
3. **Poškození práv subjektů údajů (zaměstnanců)**, kteří by v budoucnu mohli čelit obtížím při prokazování nároků na starobní důchod v důsledku absence důkazních materiálů.

Výjimku tvoří mzdové listy vedené pro poživatele starobního důchodu, kde zákon ponechává lhůtu 10 let 8, avšak šablona tuto distinkci neobsahuje a paušálně uvádí chybných 30 let.

### **2\. Netransparentnost a technický nesoulad u Google Analytics (GA4)**

Dokumentace vykazuje nesoulad mezi právní deklarací a technologickou realitou používaných nástrojů. Tento rozpor zakládá riziko porušení informační povinnosti, neboť subjekt údajů je informován o době uložení, která není v praxi realizovatelná.

Nález:  
V Zásadách zpracování 1 i Záznamech o činnostech 1 je u účelu "Analytika webu" (Google Analytics) uvedena doba uchovávání 26 měsíců.  
Právní a technická analýza:  
Lhůta 26 měsíců byla standardní retenční dobou pro dřívější verzi nástroje, Universal Analytics (UA), která však ukončila zpracování dat k 1\. červenci 2023 (pro standardní služby). Nástupnická technologie, Google Analytics 4 (GA4), zavedla odlišná pravidla retence, která jsou pro běžné uživatele (bezplatná verze) výrazně restriktivnější.9  
V bezplatné verzi GA4 má správce na výběr pouze dvě možnosti retence uživatelských dat a dat o událostech: **2 měsíce** (výchozí nastavení) nebo **14 měsíců** (maximální nastavení).11 Lhůty 26, 38 nebo 50 měsíců jsou dostupné výhradně pro platící zákazníky verze GA4 360\.13 Vzhledem k tomu, že šablona je určena pro běžné e-shopy a firmy (což implikuje použití bezplatné verze), je deklarace 26 měsíců fakticky nesprávná.

Dopad chyby:  
Informování subjektu údajů o tom, že jeho data budou uchovávána 26 měsíců, zatímco systém je automaticky maže po 14 (nebo dokonce 2\) měsících, je porušením čl. 13 odst. 2 písm. a) GDPR. Ačkoliv se může zdát, že zkrácení doby je ve prospěch subjektu (privacy-friendly), GDPR vyžaduje přesnost a transparentnost. Subjekt údajů musí vědět, co se s jeho daty děje. Navíc, pokud by správce chtěl data uchovat déle (např. exportem do BigQuery), musel by to v dokumentaci uvést jako samostatný proces, což šablona nečiní.  
Dále je třeba rozlišovat mezi "uživatelskými daty" (user-level data), na která se retence vztahuje, a "agregovanými reporty", které zůstávají dostupné déle. Šablona toto rozlišení neobsahuje, čímž vytváří mylný dojem o životním cyklu analytických dat.15

### **3\. Strukturální deficit souhlasu (Personalizace vs. Marketing)**

Audit odhalil významný strukturální rozpor mezi definicí účelů v Zásadách a realizační fází sběru souhlasu. Tento nedostatek ohrožuje legalitu zpracování pro účely profilování.

**Nález:**

* *Zásady zpracování* 1 definují tři samostatné účely založené na souhlasu: "Marketing a newsletter", "Personalizace obsahu" a "Analytika webu".  
* *Souhlas se zpracováním* 1 (formulář) však obsahuje textaci a právní titul pouze pro **"Zasílání obchodních sdělení a newsletterů"**. V dokumentu zcela chybí mechanismus pro udělení souhlasu s "Personalizací obsahu" (např. doporučování produktů na základě historie, chování na webu).

Právní analýza:  
Dle čl. 4 odst. 11 GDPR musí být souhlas "konkrétní". To znamená, že musí být udělen odděleně pro různé účely zpracování (princip granularity či "unbundling"). Evropský sbor pro ochranu osobních údajů (EDPB) ve svých pokynech 05/2020 k souhlasu jasně stanoví, že nelze slučovat souhlas s přímým marketingem (zasílání e-mailů) se souhlasem s profilováním a personalizací obsahu, pokud nejde o zpracování nezbytně nutně provázané.17  
Profilování a personalizace obsahu představují specifický zásah do soukromí, který vyžaduje samostatný informovaný souhlas. Pokud správce provádí personalizaci pouze na základě souhlasu s marketingovou rozesílkou, jedná se o zpracování bez platného právního titulu, neboť subjekt údajů nebyl o personalizaci v momentě udělení souhlasu (na formuláři) specificky dotázán.19

Dopad chyby:  
Pokud by správce na základě této šablony spustil personalizaci webu, činil by tak nezákonně. Souhlas s "newsletterem" nelegitimuje analýzu chování uživatele na webu za účelem zobrazování personalizovaného obsahu. Hrozí zde riziko stížnosti subjektů i sankce za zpracování bez právního titulu (čl. 6 GDPR).

### **4\. Inkonzistence v retenčních dobách pro marketing**

Dokumentace vykazuje vnitřní rozpor v určení doby, po kterou je oprávněna uchovávat kontakty pro marketingové účely.

**Nález:**

* *Zásady zpracování* (čl. 5\) stanovují fixní dobu **3 roky**.1  
* *Souhlas se zpracováním* 1 a *Záznamy o činnostech* 1 stanovují dobu **"Do odvolání souhlasu"**.

Právní analýza:  
Tento rozpor vytváří právní nejistotu. Z pohledu GDPR je souhlas platný do doby jeho odvolání (čl. 7 odst. 3). Nicméně, správce je povinen dodržovat i zásadu omezení uložení a nesmí uchovávat data "navždy" bez revize, zda je souhlas stále aktuální (tzv. "stale consent").  
Uvedení fixní lhůty 3 let v Zásadách je pro správce silně omezující – znamenalo by to, že po 3 letech musí data smazat (nebo žádat o nový souhlas), i když subjekt souhlas neodvolal. Naopak formulace "do odvolání" v souhlasu dává subjektu očekávání trvalejšího vztahu. ÚOOÚ i zahraniční dozorové úřady doporučují stanovit dobu platnosti souhlasu (např. 3-5 let) nebo zavést proces "re-engagementu", ale dokumentace musí mluvit jedním hlasem. Rozpor 3 roky vs. neurčito je matoucí.20

### **5\. Nedostatky v oblasti mezinárodního předávání dat (Mailchimp a SCCs)**

Ačkoliv je celkové hodnocení v oblasti DPF pozitivní, detailní analýza dokumentace ve vztahu k nástroji Mailchimp ukazuje na drobnou nepřesnost, která si zaslouží korekci pro maximální právní jistotu.

Nález:  
Zásady zpracování u nástroje Mailchimp (The Rocket Science Group LLC) uvádějí jako záruku "Standardní smluvní doložky (SCCs)".1  
Výzkum však potvrdil, že mateřská společnost Mailchimpu, Intuit Inc., je k datu auditu (konec roku 2025\) certifikována v rámci EU-US Data Privacy Framework a tato certifikace pokrývá i dceřinou společnost The Rocket Science Group LLC.3  
Právní analýza:  
Použití SCCs není chybou (je to platný nástroj dle čl. 46 GDPR), ale v kontextu existence rozhodnutí o přiměřenosti (DPF) je to nástroj subsidiární. Pro správce je výhodnější a právně robustnější primárně se odkazovat na DPF (čl. 45 GDPR), který nevyžaduje provádění složitého Transfer Impact Assessment (TIA), jenž je u SCCs povinný po rozsudku Schrems II.24 Dokumentace by měla primárně reflektovat DPF a SCCs uvádět jako záložní mechanismus pro případne zneplatnění DPF ("Schrems III").

## ---

**Výhrady/Nedostatky \- Přehledová tabulka**

| Dokument | Problém | Závažnost | Právní základ |
| :---- | :---- | :---- | :---- |
| **Záznamy o činnostech / Zásady** | Uvedena lhůta **30 let** pro mzdové listy místo zákonných **45 let**. | **KRITICKÁ** | § 35a zák. č. 582/1991 Sb. |
| **Zásady / Záznamy** | Uvedena retence **26 měsíců** u Google Analytics (technicky v GA4 standardně nedostupné, max 14 měsíců). | **VYSOKÁ** | Čl. 5 odst. 1 písm. a) GDPR (transparentnost) |
| **Souhlas se zpracováním** | Formulář souhlasu nepokrývá účel "Personalizace obsahu", ačkoliv je v Zásadách uveden jako samostatný účel. | **VYSOKÁ** | Čl. 6 odst. 1 písm. a) a Čl. 7 GDPR (granularita) |
| **Zásady vs. Souhlas** | Rozpor v době uložení pro marketing (3 roky fixně vs. do odvolání). | **STŘEDNÍ** | Čl. 13 odst. 2 písm. a) GDPR (informační povinnost) |
| **Zásady zpracování** | U Mailchimpu uvedeny pouze SCCs, ačkoliv je primárně kryt DPF (Data Privacy Framework). | **NÍZKÁ** | Čl. 45 vs. Čl. 46 GDPR |
| **Směrnice incidenty** | Odkaz na online formulář ÚOOÚ směřuje na konkrétní DS identifikátor, hrozí "link rot". | **NÍZKÁ** | Čl. 33 GDPR |

## ---

**Analýza dalších aspektů dokumentace**

### **6\. Bezpečnostní incidenty a hlášení**

Směrnice pro incidenty 1 je zpracována kvalitně. Správně stanovuje lhůtu 72 hodin pro ohlášení ÚOOÚ a definuje proces posouzení rizika.  
V dokumentu je uveden přímý odkaz na formulář: https://www.uoou.cz/ohlaseni-poruseni-zabezpeceni-osobnich-udaju/ds-5341.  
Doporučení: Přestože je odkaz funkční, v šablonách s dlouhou životností se doporučuje odkazovat na obecnější rozcestník (např. https://uoou.gov.cz/profesional/poruseni-zabezpeceni-osobnich-udaju nebo jen https://uoou.gov.cz), neboť struktura webu státní správy se může měnit. Přesný "deep link" může vést k chybě 404 v budoucnu.26

### **7\. Evidence souhlasů a "audit trail"**

Dokumentace neobsahuje explicitní instrukci, jak technicky zajistit prokazatelnost souhlasu (čl. 7 odst. 1 GDPR). Ačkoliv auditujeme šablony, je vhodné do textace souhlasu nebo záznamů o činnostech doplnit poznámku o nutnosti uchovávat logy (IP adresa, čas, znění souhlasu) pro případ kontroly.

## ---

**Verdikt a doporučení**

Předložená dokumentace v aktuálním stavu **NEOBSTOJÍ (FAIL)** při případné kontrole ÚOOÚ či ČSSZ, a to především z důvodu nerespektování aktuální legislativy v oblasti archivace mzdových listů. Tento nedostatek je snadno opravitelný, ale v současné podobě je fatální.

Pro dosažení stavu **PASS** je nezbytné provést následující revize:

1. **Oprava mzdové retence (Priorita č. 1):** V dokumentech *Záznamy o činnostech* a *Zásady zpracování* změnit lhůtu u mzdových listů z 30 let na **45 let**. Doplnit odkaz na aktuální znění § 35a zákona č. 582/1991 Sb.  
2. **Harmonizace analytiky (Priorita č. 2):** Změnit retenční dobu u Google Analytics z 26 měsíců na **14 měsíců** (nebo 2 měsíce), aby odpovídala realitě GA4.  
3. **Doplnění souhlasu (Priorita č. 3):** Do formuláře *Souhlasu* přidat samostatný checkbox pro "Personalizaci obsahu a profilování", nebo tento účel vypustit ze Zásad, pokud není fakticky využíván.  
4. **Konzistence marketingu:** Sjednotit lhůtu pro marketing na "3 roky nebo do odvolání" napříč všemi dokumenty.  
5. **Aktualizace transferů:** U Mailchimpu doplnit zmínku o DPF jako primárním titulu pro předávání.

Po zapracování těchto změn bude dokumentace představovat robustní a právně konformní základ pro compliance program správce.

*(Nejedná se o právní službu podle § 25 zákona č. 85/1996 Sb.; pro konečné posouzení doporučuji konzultaci s advokátem.)*

#### **Citovaná díla**

1. 1-zasady-zpracovani-osobnich-udaju.pdf  
2. Google LLC \- Data Privacy Framework, použito prosince 28, 2025, [https://www.dataprivacyframework.gov/participant/5780](https://www.dataprivacyframework.gov/participant/5780)  
3. Mailchimp and European Data Transfers, použito prosince 28, 2025, [https://mailchimp.com/help/mailchimp-european-data-transfers/](https://mailchimp.com/help/mailchimp-european-data-transfers/)  
4. Archivace mzdových listů a personálních dokladů, použito prosince 28, 2025, [https://www.archivace-dokumentu.cz/sluzby/mzdove-listy-archivace](https://www.archivace-dokumentu.cz/sluzby/mzdove-listy-archivace)  
5. Jak správně archivovat mzdové listy? \- Software602, použito prosince 28, 2025, [https://www.602.cz/blog/jak-spravne-archivovat-mzdove-listy](https://www.602.cz/blog/jak-spravne-archivovat-mzdove-listy)  
6. Prodloužení zákonné doby archivace mzdových listů | EY \- Česká republika, použito prosince 28, 2025, [https://www.ey.com/cs\_cz/technical/tax/tax-alerts/2023/02/prodlouzeni-zakonne-doby-archivace-mzdovych-listu](https://www.ey.com/cs_cz/technical/tax/tax-alerts/2023/02/prodlouzeni-zakonne-doby-archivace-mzdovych-listu)  
7. Mzdový list a další evidence důležité pro výpočet mezd \- PaM profi, použito prosince 28, 2025, [https://www.pamprofi.cz/33/mzdovy-list-a-dalsi-evidence-dulezite-pro-vypocet-mezd-uniqueidmRRWSbk196FNf8-jVUh4EmNaSbnjsPVysIiol3bQakY/](https://www.pamprofi.cz/33/mzdovy-list-a-dalsi-evidence-dulezite-pro-vypocet-mezd-uniqueidmRRWSbk196FNf8-jVUh4EmNaSbnjsPVysIiol3bQakY/)  
8. Archivace dat ve mzdové a personální oblasti \- PaM profi, použito prosince 28, 2025, [https://www.pamprofi.cz/33/archivace-dat-ve-mzdove-a-personalni-oblasti-uniqueidmRRWSbk196FNf8-jVUh4Ens20EV5lG0TAfkoNm\_h4VjwMeMMlZFKyg/](https://www.pamprofi.cz/33/archivace-dat-ve-mzdove-a-personalni-oblasti-uniqueidmRRWSbk196FNf8-jVUh4Ens20EV5lG0TAfkoNm_h4VjwMeMMlZFKyg/)  
9. All You Need To Know About Google Analytics 4 Data Retention \- Usercentrics, použito prosince 28, 2025, [https://usercentrics.com/guides/privacy-led-marketing/ga4-data-retention/](https://usercentrics.com/guides/privacy-led-marketing/ga4-data-retention/)  
10. Data Retention in Google Analytics (GA4) GA4.com, použito prosince 28, 2025, [https://ga4.com/data-retention-ga4](https://ga4.com/data-retention-ga4)  
11. Uchovávání dat \- Nápověda Analytics, použito prosince 28, 2025, [https://support.google.com/analytics/answer/7667196?hl=cs](https://support.google.com/analytics/answer/7667196?hl=cs)  
12. Data retention \- Analytics Help, použito prosince 28, 2025, [https://support.google.com/analytics/answer/7667196?hl=en\_USu0026amp;;ref\_topic\&ref\_topic=9303569](https://support.google.com/analytics/answer/7667196?hl=en_USu0026amp;;ref_topic&ref_topic=9303569)  
13. Data retention \- Analytics Help \- Google Help, použito prosince 28, 2025, [https://support.google.com/analytics/answer/7667196?hl=en](https://support.google.com/analytics/answer/7667196?hl=en)  
14. Google Analytics Pricing (Free Vs 360\) \- Analytify, použito prosince 28, 2025, [https://analytify.io/google-analytics-pricing/](https://analytify.io/google-analytics-pricing/)  
15. Google Analytics Data Retention explained for UA and GA4, použito prosince 28, 2025, [https://analyticscanvas.com/google-analytics-data-retention-explained-for-ua-and-ga4/](https://analyticscanvas.com/google-analytics-data-retention-explained-for-ua-and-ga4/)  
16. Data retention in Google Analytics, použito prosince 28, 2025, [https://www.simpleanalytics.com/blog/data-retention-in-google-analytics](https://www.simpleanalytics.com/blog/data-retention-in-google-analytics)  
17. Pokyny č. 05/2020 k souhlasu podle nařízení 2016/679 Verze 1.1 \- European Data Protection Board, použito prosince 28, 2025, [https://www.edpb.europa.eu/sites/default/files/files/file1/edpb\_guidelines\_202005\_consent\_cs.pdf](https://www.edpb.europa.eu/sites/default/files/files/file1/edpb_guidelines_202005_consent_cs.pdf)  
18. GDPR \- souhlas se zpracováním osobních údajů | Největší katalog ICT řešení, použito prosince 28, 2025, [https://lepsi-reseni.cz/ochrana-osobnich-udaju-gdpr/gdpr-souhlas-se-zpracovanim/](https://lepsi-reseni.cz/ochrana-osobnich-udaju-gdpr/gdpr-souhlas-se-zpracovanim/)  
19. Souhlas se zpracováním osobních údajů prakticky: Potřebujete jej vůbec?, použito prosince 28, 2025, [https://www.sedlakovalegal.cz/souhlas-se-zpracovanim-osobnich-udaju-prakticky](https://www.sedlakovalegal.cz/souhlas-se-zpracovanim-osobnich-udaju-prakticky)  
20. Souhlas se zpracováním osobních údajů pro účely marketingu \- Czech Virtuosi, použito prosince 28, 2025, [https://www.czechvirtuosi.cz/stranka/souhlas-se-zpracovanim-osobnich-udaju-marketing](https://www.czechvirtuosi.cz/stranka/souhlas-se-zpracovanim-osobnich-udaju-marketing)  
21. Informace o zpracování osobních údajů \- Obchodní sdělení a marketing \- fridababy.cz, použito prosince 28, 2025, [https://www.fridababy.cz/informace-o-zpracovani-osobnich-udaju-obchodni-sdeleni-a-marketing](https://www.fridababy.cz/informace-o-zpracovani-osobnich-udaju-obchodni-sdeleni-a-marketing)  
22. Často kladené otázky k zákonu o některých službách informační společnosti (č. 480/2004 Sb.) | Úřad pro ochranu osobních údajů, použito prosince 28, 2025, [https://uoou.gov.cz/cinnost/obchodni-sdeleni/casto-kladene-otazky-k-zakonu-c-4802004-sb](https://uoou.gov.cz/cinnost/obchodni-sdeleni/casto-kladene-otazky-k-zakonu-c-4802004-sb)  
23. Active Participant \- Privacy Shield, použito prosince 28, 2025, [https://www.privacyshield.gov/participant?id=a2zt0000000TXVKAA4](https://www.privacyshield.gov/participant?id=a2zt0000000TXVKAA4)  
24. DPF vs. SCCs vs. BCRs: Choosing the Right Cross-Border Data Transfer Framework For Your Business \- TermsFeed, použito prosince 28, 2025, [https://www.termsfeed.com/blog/dpf-scc-bcr/](https://www.termsfeed.com/blog/dpf-scc-bcr/)  
25. EU-U.S. Data Privacy Framework vs. EU Standard Contractual Clauses for Transatlantic Transfers of Personal Data | Alston & Bird, použito prosince 28, 2025, [https://www.alston.com/en/insights/publications/2023/09/eu-us-data-privacy-framework](https://www.alston.com/en/insights/publications/2023/09/eu-us-data-privacy-framework)  
26. Porušení zabezpečení osobních údajů, použito prosince 28, 2025, [https://uoou.gov.cz/profesional/poruseni-zabezpeceni-osobnich-udaju](https://uoou.gov.cz/profesional/poruseni-zabezpeceni-osobnich-udaju)  
27. Ohlášení porušení zabezpečení osobních údajů (data breach) \- gov.cz, použito prosince 28, 2025, [https://portal.gov.cz/sluzby-vs/ohlaseni-poruseni-zabezpeceni-osobnich-udaju-data-breach-S30277](https://portal.gov.cz/sluzby-vs/ohlaseni-poruseni-zabezpeceni-osobnich-udaju-data-breach-S30277)

# Právní audit GDPR dokumentace // 1.

## Výsledek: **FAIL** (Nevyhovuje)

---

## 1. Úvod a metodologie auditu

Předložený dokument představuje hloubkovou právní a compliance analýzu systému šablon GDPR dokumentace, předloženou k posouzení souladu s legislativním rámcem platným k prosinci 2025. Jakožto auditor specializující se na ochranu osobních údajů v regionu střední a východní Evropy (CEE) jsem provedl detailní revizi předložených materiálů optikou aktuálně účinných právních předpisů a rozhodovací praxe dozorových orgánů.

Tento audit není pouhým formálním odškrtnutím náležitostí. Vzhledem k dynamickému vývoji v oblasti ochrany dat – zejména s ohledem na nedávná rozhodnutí Evropského sboru pro ochranu osobních údajů (EDPB), judikaturu Soudního dvora Evropské unie (SDEU) a zpřísňující se dozorovou praxi českého Úřadu pro ochranu osobních údajů (ÚOOÚ) – je nezbytné hodnotit dokumentaci v širším kontextu kybernetické bezpečnosti a digitálního marketingu.

### 1.1 Legislativní rámec a referenční standardy

Hodnocení je založeno na komparaci předložených textů s následujícími normami a standardy:

- **Nařízení (EU) 2016/679 (GDPR)**: Obecné nařízení o ochraně osobních údajů, které tvoří páteřní legislativu.
- **Zákon č. 110/2019 Sb., o zpracování osobních údajů**: Český adaptační zákon.
- **Zákon č. 127/2005 Sb., o elektronických komunikacích (ZEK)**: Zejména § 89 odst. 3, který implementuje směrnici ePrivacy a od roku 2022 stanovuje striktní režim opt-in pro ukládání cookies.
- **EU-US Data Privacy Framework (DPF)**: Rozhodnutí o přiměřenosti přijaté Evropskou komisí v červenci 2023, které je v prosinci 2025 stále platným mechanismem pro transfery dat, ačkoliv čelí právním výzvám (např. případ Latombe).
- **Metodiky a stanoviska ÚOOÚ**: Zejména doporučení ke cookies lištám, kamerovým systémům (Metodika z února 2024) a vyřizování práv subjektů údajů.

### 1.2 Přehled auditovaných dokumentů

Předmětem auditu byly následující šablony:

- Směrnice pro řešení bezpečnostních incidentů
- Zásady zpracování osobních údajů (Privacy Policy)
- Informace o zpracování osobních údajů (Informační povinnost)
- Souhlas se zpracováním osobních údajů
- Záznamy o činnostech zpracování (RoPA)

---

## 2. Odůvodnění a hloubková analýza

Následující sekce poskytuje detailní rozbor zjištění. Ačkoliv dokumentace vykazuje snahu o systematičnost a pokrývá základní oblasti vyžadované GDPR, obsahuje fundamentální koncepční vady, které ji činí v aktuálním právním prostředí (rok 2025) rizikovou a v některých bodech přímo protiprávní.

### 2.1 Kritická vada: Právní tituly u cookies a analytiky

**Nejzávažnějším nedostatkem**, který prostupuje celou dokumentací a je primárním důvodem pro hodnocení FAIL, je chybné určení právního základu pro zpracování osobních údajů v rámci analytiky a personalizace obsahu.

#### Analýza problému

V dokumentu Zásady zpracování, bod 3, a shodně v dalších dokumentech, je uvedeno:

- **Personalizace obsahu** → Právní základ: Oprávněný zájem správce (čl. 6 odst. 1 písm. f) GDPR)
- **Analytika webu** → Právní základ: Oprávněný zájem správce (čl. 6 odst. 1 písm. f) GDPR)

Toto nastavení je v přímém rozporu s českou legislativou účinnou od 1. ledna 2022 a ustálenou evropskou praxí.[^1]

#### Právní kontext a vývoj do roku 2025:

Historicky (před rokem 2022) existovala v České republice tzv. šedá zóna, kdy zákon o elektronických komunikacích umožňoval výklad ve smyslu režimu opt-out (možnost odmítnout). V tomto období se správci často odvolávali na oprávněný zájem. Tato praxe však byla ukončena novelou ZEK, která plně harmonizovala české právo s evropskou směrnicí ePrivacy (2002/58/ES).

Podle **§ 89 odst. 3 ZEK** je pro uložení nebo čtení jakýchkoli informací z koncového zařízení uživatele (typicky cookies, Local Storage, pixely), které nejsou technicky nezbytné pro přenos zprávy nebo poskytnutí služby vyžádané uživatelem, vyžadován **předchozí prokazatelný souhlas**.[^1]

#### Proč nelze použít Oprávněný zájem pro Google Analytics?

Analytické nástroje jako Google Analytics (včetně verze GA4) a nástroje pro personalizaci obsahu (např. retargetingové pixely, personalizační cookies) nespadají do kategorie "technicky nezbytných" cookies. Webová stránka může plně fungovat a zobrazovat obecný obsah i bez těchto nástrojů.[^2]

Dozorové úřady, včetně ÚOOÚ a EDPB, konzistentně zastávají princip, že pokud je pro prvotní zásah do soukromí (uložení/čtení cookie) vyžadován souhlas dle speciálního předpisu (ePrivacy/ZEK), musí i následné zpracování osobních údajů získaných tímto nástrojem probíhat v režimu **Souhlasu dle čl. 6 odst. 1 písm. a) GDPR**. Nelze "přepnout" právní režim tak, že pro uložení cookie si vyžádám souhlas (nebo jej v horším případě obejdu) a pro zpracování dat v Google Analytics se odvolám na oprávněný zájem.[^3]

Takový postup by byl obcházením práv subjektu údajů. Právo na odvolání souhlasu (čl. 7 odst. 3 GDPR) je absolutní a musí být stejně snadné jako jeho udělení. Oproti tomu právo vznést námitku proti oprávněnému zájmu (čl. 21 GDPR) vyžaduje balanční test a je procesně složitější. Pokud by správce tvrdil, že zpracovává analytiku na základě oprávněného zájmu, de facto by tím uživateli odebíral jednoduchou možnost "vypnout" sledování prostým odvoláním souhlasu v cookie liště.

#### Důsledky pro rok 2025:

V roce 2025 je tento přístup považován za flagrantní porušení pravidel. Google v rámci svého Consent Mode v2, který se stal standardem pro digitální inzerci v EU od března 2024, vyžaduje explicitní signály souhlasu (`ad_user_data`, `ad_personalization`, `analytics_storage`).[^5] Pokud vaše dokumentace tvrdí, že právním titulem je oprávněný zájem, ale technická implementace na webu (vynucená Googlem) sbírá souhlasy, vytváříte rozpor mezi deklarovaným stavem (právní dokumentací) a faktickým stavem (technickým zpracováním). To je porušení zásady transparentnosti dle čl. 5 odst. 1 písm. a) GDPR.

ÚOOÚ v roce 2024 uložil rekordní pokutu 351 milionů Kč společnosti Avast právě za neoprávněné zpracování osobních údajů a nejasnosti v právních titulech, což signalizuje nulovou toleranci k podobným chybám.[^6]

### 2.2 Zpracování osobních údajů a transfery do třetích zemí (USA)

Auditovaný dokument v sekci 4 (Předání do třetích zemí) správně identifikuje problematiku transferů dat do USA, ale jeho obsah je částečně zastaralý a nekonzistentní s aktuálním stavem v prosinci 2025.

#### Google Analytics a DPF

Dokument správně uvádí, že Google LLC využívá záruku Data Privacy Framework (DPF). To je v souladu s realitou. Evropská komise vydala rozhodnutí o přiměřenosti pro DPF v červenci 2023 a Google je aktivním účastníkem tohoto rámce.[^7] I přes právní výzvy (případ Latombe u Tribunálu EU, který v září 2025 potvrdil platnost DPF[^9]), zůstává DPF v prosinci 2025 platným právním titulem pro transfer.

#### Mailchimp a nekonzistence

Dokument u nástroje Mailchimp uvádí jako záruku **Standardní smluvní doložky (SCCs)**. Ačkoliv SCCs zůstávají platným mechanismem (pokud jsou doplněny o Transfer Impact Assessment - TIA), tento přístup je zbytečně administrativně náročný a ignoruje faktický stav.

Společnost The Rocket Science Group LLC (provozovatel Mailchimp), jako dceřiná společnost Intuit Inc., je aktivně certifikována v rámci **EU-US Data Privacy Framework**.[^10] Mateřská společnost Intuit Inc. pokrývá své dceřiné společnosti včetně Mailchimpu touto certifikací.[^13]

Uvádět u Mailchimpu SCCs místo DPF je strategická chyba. Použití SCCs vyžaduje, aby správce (Vy) provedl posouzení vlivu předávání (TIA) a zkoumal legislativu USA (FISA 702), což je po rozhodnutí Schrems II extrémně složité. Využití DPF naproti tomu přenáší břemeno souladu na rozhodnutí Evropské komise o přiměřenosti. Pro právní čistotu a snížení rizika doporučuji v dokumentaci primárně odkazovat na DPF i u Mailchimpu.

### 2.3 Bezpečnostní incidenty a formální náležitosti

Dokument Směrnice pro řešení incidentů je kvalitně zpracován, ale obsahuje formální chyby v kontaktních údajích, které mohou mít fatální následky v krizové situaci.

- **Kontaktní email ÚOOÚ**: Dokument uvádí `posta@uoou.cz`. Ačkoliv je možné, že tento alias funguje, jedinou oficiální a garantovanou elektronickou adresou podatelny ÚOOÚ je **`posta@uoou.gov.cz`**.[^14] V případě, že by správce v časové tísni (do 72 hodin) odeslal hlášení na neoficiální adresu a to nebylo doručeno, nesplnil by svou zákonnou povinnost dle čl. 33 GDPR.
- **Datová schránka**: Identifikátor `qkbaa2n` je uveden správně.[^17]
- **Klasifikace rizik**: Tabulka pro posouzení závažnosti incidentu je logická a odpovídá metodikám ENISA a ÚOOÚ. Správně rozlišuje mezi incidenty, které vyžadují hlášení dozorovému úřadu (riziko pro práva), a těmi, které vyžadují oznámení subjektům (vysoké riziko).

### 2.4 Souhlas a retenční doby

Dokument Souhlas je formulován obecně správně, ale v kontextu marketingu a retence dat vyžaduje zpřesnění.

- **Retenční doba**: Dokument uvádí dobu zpracování "Do odvolání souhlasu". Jiný dokument uvádí u marketingu "3 roky". Zde je rozpor. V praxi se doporučuje u marketingového souhlasu stanovit určitý časový horizont (např. 3–5 let), po kterém by měl být souhlas obnoven (re-permissioning), aby byla zajištěna aktuálnost a zájem subjektu. "Do odvolání" je sice teoreticky možné, ale z pohledu principu omezení uložení (čl. 5 odst. 1 písm. e) GDPR) je lepší stanovit dobu, po kterou je souhlas považován za "čerstvý". Pokud správce data neaktualizuje a jen je drží "navždy", porušuje princip přesnosti.
- **Formulace souhlasu**: Souhlas musí být "jednoznačný". Pro účely 2025 a digitálního marketingu je vhodné explicitně zmínit, zda souhlas zahrnuje i profilování (segmentaci zákazníků) pro personalizaci reklamy. Pokud dokument zmiňuje pouze "Zasílání obchodních sdělení", ale reálně dochází k profilování v nástrojích jako Mailchimp nebo Google Ads (Customer Match), je souhlas nedostatečný.

### 2.5 Záznamy o činnostech (RoPA)

RoPA (Records of Processing Activities) je "účetní knihou" GDPR. Dokument trpí stejnou vadou jako ostatní – chybné určení právních titulů.

U položky "Analytika webu" a "Personalizace" je uveden **Oprávněný zájem**. To musí být změněno na **Souhlas**. Záznamy musí reflektovat realitu. Pokud správce na webu nasadí Cookie lištu (což dle zákona musí), reálně sbírá souhlasy. Pokud jeho interní evidence (RoPA) tvrdí, že zpracovává data na základě oprávněného zájmu, je dokumentace v rozporu s faktickým stavem.

**Lhůty pro výmaz**: Jsou nastaveny rozumně (Google Analytics 26 měsíců je standardní nastavení). U mzdové agendy je uvedeno 30 let pro mzdové listy, což odpovídá zákonu o organizaci a provádění sociálního zabezpečení.

---

## 3. Co je v pořádku

Navzdory celkovému hodnocení FAIL obsahují dokumenty řadu pozitivních prvků, na kterých lze stavět:

- **Struktura dokumentů**: Šablony mají logickou strukturu, jsou přehledné a jazykově srozumitelné (splnění požadavku transparentnosti dle čl. 12 GDPR).
- **Výčet práv subjektů údajů**: Informace o právech (přístup, oprava, výmaz, přenositelnost) jsou kompletní a správně odkazují na příslušné články GDPR.
- **Procesní stránka incidentů**: Směrnice dobře definuje workflow od detekce po hlášení, včetně důrazu na nedestruktivní zajištění důkazů ("Nezakrývejte stopy").
- **Identifikace příjemců**: Seznam kategorií příjemců (hosting, platební brána, účetní) je transparentní a konkrétní.
- **Účetní a mzdová agenda**: Zde jsou právní tituly (plnění právní povinnosti) a retenční doby nastaveny správně v souladu s českými zákony.

---

## 4. Výhrady a Nedostatky

| Dokument | Problém | Závažnost | Popis a dopad |
|----------|---------|-----------|---------------|
| Zásady zpracování | Chybný právní titul u Analytiky a Personalizace | **KRITICKÁ** | Uvedení "Oprávněného zájmu" pro analytické a marketingové cookies je v rozporu s § 89 odst. 3 ZEK a čl. 6 GDPR. ÚOOÚ vyžaduje "Souhlas". Hrozí vysoká sankce. |
| Směrnice incidentů | Chybný e-mail ÚOOÚ | Střední | Uvedena adresa `posta@uoou.cz` místo oficiální `posta@uoou.gov.cz`. Riziko nedoručení zákonného hlášení včas. |
| Zásady zpracování | Transfer do USA (Mailchimp) | Střední | Uvedeno SCCs místo DPF. Není to přímo chyba, ale je to administrativně náročnější a neodráží aktuální status společnosti Intuit/Mailchimp v DPF seznamu. |
| Souhlas vs Zásady | Nekonzistentní retence | Nízká | Rozpor mezi "3 roky" a "Do odvolání". Doporučuje se sjednotit na konkrétní dobu (např. 3 roky s možností prodloužení aktivním používáním). |
| RoPA | Chybějící odkaz na LIA | Nízká | U procesů, kde je skutečně oprávněný zájem (např. přímý marketing vlastním zákazníkům), chybí v RoPA zmínka o provedení Balančního testu (Legitimate Interest Assessment). |

---

## 5. Verdikt a doporučený postup nápravy

Dokumentace ve svém současném stavu **neobstojí při hloubkové kontrole ÚOOÚ**, primárně kvůli systémové chybě v nastavení právních titulů u online technologií (cookies). Tato chyba degraduje jinak solidně připravené šablony.

Pokud by byl tento systém implementován v roce 2025 bez úprav, správce by se vystavil riziku pokuty za neoprávněné zpracování osobních údajů (chybějící platný právní titul) a porušení zákona o elektronických komunikacích.

### Plán nápravy (Action Plan):

**Priorita 1 (Okamžitá oprava)**: V dokumentech změňte právní základ u účelů "Analytika webu", "Personalizace obsahu" a "Marketing/Newsletter (pro nové kontakty)" na **Souhlas subjektu údajů (čl. 6 odst. 1 písm. a) GDPR)**.

**Priorita 2 (Technická implementace)**: Zajistěte, aby webová stránka obsahovala funkční Cookie lištu (CMP), která reálně blokuje skripty (Google Analytics, Facebook Pixel) před udělením souhlasu. Texty v liště musí korespondovat s texty v dokumentech.

**Priorita 3 (Aktualizace transferů)**: V dokumentu upravte sekci o předávání dat. Uveďte, že Mailchimp (The Rocket Science Group LLC / Intuit Inc.) je certifikován v rámci EU-US Data Privacy Framework.

**Priorita 4 (Formální korekce)**: Ve všech dokumentech, kde se vyskytuje kontakt na úřad, opravte e-mail na `posta@uoou.gov.cz`.

**Priorita 5 (Sjednocení retence)**: Sjednoťte retenční dobu pro marketingové souhlasy na "3 roky od udělení souhlasu nebo posledního aktivního kontaktu".

Po zapracování těchto změn bude dokumentace splňovat požadavky platné legislativy a získá hodnocení **PASS**.

---

## 6. Závěrem: Širší kontext a trendy 2025

Je důležité vnímat, že rok 2025 přináší zvýšený tlak na transparentnost a vymahatelnost práv v digitálním prostředí.

### 6.1 Cookie Lišty a "Dark Patterns"

ÚOOÚ a evropští regulátoři se v roce 2025 intenzivně zaměřují na tzv. dark patterns (manipulativní design) v cookie lištách.[^18] Nestačí jen mít souhlas "na papíře". Tlačítko "Odmítnout vše" musí být v první vrstvě lišty stejně viditelné a barevně rovnocenné jako tlačítko "Přijmout vše".[^6] Dokumentace by měla obsahovat (např. v RoPA nebo interní směrnici) pravidlo, že design lišty nesmí být manipulativní.

### 6.2 Data Privacy Framework (DPF) a jeho stabilita

Ačkoliv je DPF v prosinci 2025 platný, existují snahy o jeho zneplatnění (podobně jako u Safe Harbor a Privacy Shield). Audit doporučuje, aby správce sledoval vývoj kauzy Latombe a dalších iniciativ organizace NOYB. Pokud by byl DPF v budoucnu zrušen, dokumentace by se musela vrátit k mechanismu SCCs (Standardních doložek) a provádění TIA. Proto je vhodné v dokumentu používat flexibilní formulace typu: "Předávání je založeno na rozhodnutí o přiměřenosti (DPF), případně na standardních smluvních doložkách, pokud by rozhodnutí pozbylo platnosti."

### 6.3 Automatizované rozhodování a AI

Dokument uvádí, že správce neprovádí automatizované rozhodování. Pokud by však firma plánovala nasadit pokročilé AI nástroje pro scoring zákazníků nebo dynamickou cenotvorbu, bylo by nutné tuto část revidovat a doplnit informace o logice takového zpracování (čl. 13 odst. 2 písm. f) GDPR). V kontextu roku 2025 a nástupu AI Act je transparentnost v této oblasti klíčová.[^19]

### 6.4 Právo na výmaz a technická realita

ÚOOÚ v roce 2025 avizuje kontroly zaměřené na faktickou schopnost správce data smazat (Right to be Forgotten).[^21] Dokumenty by měly být podpořeny interním technickým manuálem, jak data fyzicky odstranit ze všech systémů (včetně záloh a nástrojů třetích stran jako Mailchimp), když subjekt odvolá souhlas. Pouhé právní deklarování práva na výmaz nestačí, pokud chybí technický proces.

Tento audit potvrzuje, že ačkoliv jsou šablony solidním základem, v oblasti digitálních stop (cookies) a mezinárodních transferů vyžadují precizní aktualizaci, aby reflektovaly tvrdou realitu roku 2025.

---

> *(Nejedná se o právní službu podle § 25 zákona č. 85/1996 Sb.; pro konečné posouzení doporučuji konzultaci s advokátem.)*

---

## Citovaná díla

[^1]: Cookie Consent Requirements in the Czech Republic [Includes Checklist] - CookieYes, použito prosince 28, 2025, https://www.cookieyes.com/blog/cookie-consent-czech-republic/

[^2]: Cookies - Úřad pro ochranu osobních údajů, použito prosince 28, 2025, https://uoou.gov.cz/verejnost/qa-otazky-a-odpovedi/cookies

[^3]: Is Google Analytics 4 GDPR-compliant? - Usercentrics, použito prosince 28, 2025, https://usercentrics.com/knowledge-hub/google-analytics-and-gdpr-compliance-rulings/

[^5]: Režim souhlasu - Nápověda Analytics, použito prosince 28, 2025, https://support.google.com/analytics/answer/13802165?hl=cs

[^6]: Jak správně nastavit cookies lištu podle GDPR: Tipy z praxe analytika - Digitální architekti, použito prosince 28, 2025, https://digitalniarchitekti.cz/clanek/tipy-ke-cookies-z-praxe-analytika/

[^7]: Data Privacy Framework | Federal Trade Commission, použito prosince 28, 2025, https://www.ftc.gov/business-guidance/privacy-security/data-privacy-framework

[^9]: EU Court Upholds the Validity of the EU-U.S. Data Privacy Framework | The Data Advisor, použito prosince 28, 2025, https://www.wsgrdataadvisor.com/2025/09/eu-court-upholds-the-validity-of-the-eu-u-s-data-privacy-framework/

[^10]: Mailchimp and European Data Transfers, použito prosince 28, 2025, https://mailchimp.com/help/mailchimp-european-data-transfers/

[^13]: Mailchimp and European Data Transfers - QuickBooks - Intuit, použito prosince 28, 2025, https://quickbooks.intuit.com/learn-support/en-us/help-article/migrate-data/mailchimp-european-data-transfers/L6rhDhc1g_US_en_US

[^14]: Informace o zpracování osobních údajů, použito prosince 28, 2025, https://uoou.gov.cz/informace-o-zpracovani-osobnich-udaju

[^17]: Úřad pro ochranu osobních údajů - Datové schránky, použito prosince 28, 2025, https://www.mojedatovaschranka.cz/sds/detail.do?dbid=qkbaa2n

[^18]: Jak nastavit cookie lištu v roce 2025 - Právní prostor, použito prosince 28, 2025, https://www.pravniprostor.cz/clanky/mezinarodni-a-evropske-pravo/jak-nastavit-cookie-listu-v-roce-2025

[^19]: EMEA - Data Privacy, Digital and AI Round Up 2025/2026 | BCLP - JDSupra, použito prosince 28, 2025, https://www.jdsupra.com/legalnews/emea-data-privacy-digital-and-ai-round-4778529/

[^21]: Co bude ÚOOÚ kontrolovat v roce 2025? Právo na výmaz! - Právní prostor, použito prosince 28, 2025, https://www.pravniprostor.cz/clanky/mezinarodni-a-evropske-pravo/co-bude-uoou-kontrolovat-v-roce-2025-pravo-na-vymaz
