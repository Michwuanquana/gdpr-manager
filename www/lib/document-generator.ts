import { WizardData, DATA_TYPE_LABELS, PURPOSE_LABELS } from './types';

// Helper funkce pro generování seznamu sebraných dat
function getCollectedDataList(data: WizardData): string[] {
  const result: string[] = [];
  const { collectedData } = data;
  
  if (collectedData.name) result.push(DATA_TYPE_LABELS.name);
  if (collectedData.email) result.push(DATA_TYPE_LABELS.email);
  if (collectedData.phone) result.push(DATA_TYPE_LABELS.phone);
  if (collectedData.address) result.push(DATA_TYPE_LABELS.address);
  if (collectedData.birthDate) result.push(DATA_TYPE_LABELS.birthDate);
  if (collectedData.paymentData) result.push(DATA_TYPE_LABELS.paymentData);
  if (collectedData.ipCookies) result.push(DATA_TYPE_LABELS.ipCookies);
  if (collectedData.photos) result.push(DATA_TYPE_LABELS.photos);
  if (collectedData.other && collectedData.otherDescription) {
    result.push(collectedData.otherDescription);
  }
  
  return result;
}

// Helper funkce pro generování účelů zpracování
function getPurposesList(data: WizardData): { purpose: string; legalBasis: string }[] {
  const result: { purpose: string; legalBasis: string }[] = [];
  const { purposes } = data;
  
  if (purposes.contractFulfillment) {
    result.push({
      purpose: PURPOSE_LABELS.contractFulfillment,
      legalBasis: 'Plnění smlouvy (čl. 6 odst. 1 písm. b) GDPR)',
    });
  }
  if (purposes.marketing) {
    result.push({
      purpose: PURPOSE_LABELS.marketing,
      legalBasis: 'Souhlas subjektu údajů (čl. 6 odst. 1 písm. a) GDPR)',
    });
  }
  if (purposes.personalization) {
    result.push({
      purpose: PURPOSE_LABELS.personalization,
      legalBasis: 'Oprávněný zájem správce (čl. 6 odst. 1 písm. f) GDPR)',
    });
  }
  if (purposes.analytics) {
    result.push({
      purpose: PURPOSE_LABELS.analytics,
      legalBasis: 'Oprávněný zájem správce (čl. 6 odst. 1 písm. f) GDPR)',
    });
  }
  if (purposes.employeeAgenda) {
    result.push({
      purpose: PURPOSE_LABELS.employeeAgenda,
      legalBasis: 'Plnění právní povinnosti (čl. 6 odst. 1 písm. c) GDPR)',
    });
  }
  if (purposes.accounting) {
    result.push({
      purpose: PURPOSE_LABELS.accounting,
      legalBasis: 'Plnění právní povinnosti (čl. 6 odst. 1 písm. c) GDPR)',
    });
  }
  
  return result;
}

// Helper funkce pro generování příjemců
function getRecipientsList(data: WizardData): string[] {
  const result: string[] = [];
  const { recipients } = data;
  
  if (recipients.hasAccountant) {
    result.push('Účetní / daňový poradce');
  }
  if (recipients.hostingProvider) {
    result.push(`Poskytovatel hostingu: ${recipients.hostingProvider}`);
  }
  if (recipients.paymentGateway) {
    result.push(`Platební brána: ${recipients.paymentGateway}`);
  }
  if (recipients.emailMarketing) {
    result.push(`E-mail marketing: ${recipients.emailMarketing}`);
  }
  if (recipients.analytics === 'google') {
    result.push('Google Analytics (Google Ireland Limited)');
  } else if (recipients.analytics === 'other' && recipients.analyticsOther) {
    result.push(`Analytika: ${recipients.analyticsOther}`);
  }
  
  return result;
}

// Generátor: Zásady zpracování osobních údajů
export function generatePrivacyPolicy(data: WizardData): string {
  const collectedDataList = getCollectedDataList(data);
  const purposesList = getPurposesList(data);
  const recipientsList = getRecipientsList(data);
  
  return `
# Zásady zpracování osobních údajů

## 1. Správce osobních údajů

Správcem osobních údajů je:

**${data.company.name}**
IČO: ${data.company.ico}
Sídlo: ${data.company.address}
E-mail: ${data.company.email}
${data.company.web ? `Web: ${data.company.web}` : ''}

(dále jen „správce")

## 2. Rozsah zpracovávaných osobních údajů

Správce zpracovává následující kategorie osobních údajů:

${collectedDataList.map(item => `- ${item}`).join('\n')}

## 3. Účely a právní základ zpracování

Vaše osobní údaje zpracováváme pro následující účely:

${purposesList.map(item => `### ${item.purpose}\n- **Právní základ:** ${item.legalBasis}`).join('\n\n')}

## 4. Příjemci osobních údajů

Vaše osobní údaje mohou být předány následujícím příjemcům:

${recipientsList.length > 0 ? recipientsList.map(item => `- ${item}`).join('\n') : '- Osobní údaje nejsou předávány třetím stranám'}

${data.recipients.thirdCountryTransfer ? `
### Předání do třetích zemí
Vaše osobní údaje mohou být předány do země mimo Evropský hospodářský prostor: ${data.recipients.thirdCountryName || 'neuvedeno'}. V takovém případě zajišťujeme odpovídající záruky ochrany osobních údajů v souladu s čl. 46 GDPR.
` : ''}

## 5. Doba uchovávání osobních údajů

Osobní údaje uchováváme po dobu:

- **Pro plnění smlouvy:** po dobu trvání smluvního vztahu a následně po dobu nezbytnou pro uplatnění práv a plnění povinností vyplývajících ze smlouvy (obvykle 3 roky od ukončení smlouvy)
- **Pro účetní a daňové účely:** po dobu stanovenou právními předpisy (obvykle 10 let)
- **Pro marketing:** do odvolání souhlasu
- **Pro analytické účely:** maximálně 26 měsíců

## 6. Vaše práva

V souvislosti se zpracováním osobních údajů máte následující práva:

### Právo na přístup (čl. 15 GDPR)
Máte právo získat od správce potvrzení, zda jsou vaše osobní údaje zpracovávány, a pokud ano, máte právo získat přístup k těmto údajům.

### Právo na opravu (čl. 16 GDPR)
Máte právo požadovat opravu nepřesných osobních údajů nebo doplnění neúplných údajů.

### Právo na výmaz (čl. 17 GDPR)
Máte právo požadovat výmaz osobních údajů, pokud jsou splněny podmínky stanovené GDPR.

### Právo na omezení zpracování (čl. 18 GDPR)
Máte právo požadovat omezení zpracování v případech stanovených GDPR.

### Právo na přenositelnost údajů (čl. 20 GDPR)
Máte právo získat své osobní údaje ve strukturovaném, běžně používaném a strojově čitelném formátu.

### Právo vznést námitku (čl. 21 GDPR)
Máte právo vznést námitku proti zpracování založenému na oprávněném zájmu správce.

### Právo odvolat souhlas
Pokud je zpracování založeno na souhlasu, máte právo tento souhlas kdykoli odvolat.

### Právo podat stížnost
Máte právo podat stížnost u dozorového úřadu, kterým je Úřad pro ochranu osobních údajů, Pplk. Sochora 27, 170 00 Praha 7, www.uoou.cz.

## 7. Kontakt

Pro uplatnění svých práv nebo s dotazy ohledně zpracování osobních údajů nás kontaktujte na:

E-mail: ${data.company.email}
${data.company.web ? `Web: ${data.company.web}` : ''}

## 8. Změny zásad

Tyto zásady zpracování osobních údajů mohou být průběžně aktualizovány. O významných změnách vás budeme informovat.

---

Tyto zásady jsou účinné od: ${new Date().toLocaleDateString('cs-CZ', { day: 'numeric', month: 'numeric', year: 'numeric' })}
  `.trim();
}

// Generátor: Informační povinnost (kratší verze)
export function generateInfoObligation(data: WizardData): string {
  const collectedDataList = getCollectedDataList(data);
  const purposesList = getPurposesList(data);

  return `
# Informace o zpracování osobních údajů

## Správce údajů
${data.company.name}, IČO: ${data.company.ico}, ${data.company.address}

## Zpracovávané údaje
${collectedDataList.join(', ')}

## Účely zpracování
${purposesList.map(item => `- ${item.purpose} (${item.legalBasis})`).join('\n')}

## Vaše práva
Máte právo na přístup k údajům, jejich opravu, výmaz, omezení zpracování, přenositelnost a právo vznést námitku. Souhlas můžete kdykoli odvolat.

## Kontakt
${data.company.email}

## Dozorový úřad
Úřad pro ochranu osobních údajů, www.uoou.cz

---

Účinné od: ${new Date().toLocaleDateString('cs-CZ', { day: 'numeric', month: 'numeric', year: 'numeric' })}
  `.trim();
}

// Generátor: Souhlas se zpracováním OÚ
export function generateConsentForm(data: WizardData): string {
  return `
# Souhlas se zpracováním osobních údajů

Já, níže podepsaný/á, uděluji souhlas se zpracováním svých osobních údajů správci:

**${data.company.name}**, IČO: ${data.company.ico}, ${data.company.address}

### Rozsah údajů
Jméno, e-mail, případně další údaje poskytnuté v souvislosti s marketingovou komunikací

### Účel zpracování
- Zasílání obchodních sdělení a newsletterů
- Informování o novinkách, akcích a nabídkách

**Právní základ:** Souhlas subjektu údajů (čl. 6 odst. 1 písm. a) GDPR)

### Doba zpracování
Do odvolání souhlasu

### Odvolání souhlasu
Souhlas lze kdykoli odvolat e-mailem na ${data.company.email} nebo kliknutím na odkaz v zaslaném e-mailu.

### Vaše práva
Máte právo na přístup k údajům, jejich opravu, výmaz, omezení zpracování a právo podat stížnost u Úřadu pro ochrany osobních údajů (www.uoou.cz).

### Prohlášení
Udělení souhlasu je dobrovolné. Odvolání souhlasu nemá vliv na zákonnost zpracování před jeho odvoláním.

---

Datum: ________________    Jméno a příjmení: ________________

E-mail: ________________    Podpis: ________________

---

Vzor vytvořen: ${new Date().toLocaleDateString('cs-CZ', { day: 'numeric', month: 'numeric', year: 'numeric' })}
  `.trim();
}

// Generátor: Záznamy o činnostech zpracování (čl. 30 GDPR)
export function generateProcessingRecords(data: WizardData): string {
  const collectedDataList = getCollectedDataList(data);
  const recipientsList = getRecipientsList(data);

  const records: string[] = [];

  if (data.purposes.contractFulfillment) {
    records.push(`
### Plnění smlouvy (objednávky, služby)

| | |
|---|---|
| **Účel zpracování** | Plnění smlouvy (čl. 6 odst. 1 písm. b) GDPR) |
| **Kategorie subjektů** | Zákazníci, klienti |
| **Kategorie údajů** | ${collectedDataList.join(', ')} |
| **Příjemci** | ${recipientsList.length > 0 ? recipientsList.join(', ') : 'Nejsou'} |
| **Lhůta pro výmaz** | 3 roky po ukončení smlouvy |
| **Bezpečnostní opatření** | Šifrování, řízení přístupu, zálohování |
`);
  }

  if (data.purposes.marketing) {
    records.push(`
### Marketing a newsletter

| | |
|---|---|
| **Účel zpracování** | Marketing a newsletter (čl. 6 odst. 1 písm. a) GDPR - souhlas) |
| **Kategorie subjektů** | Odběratelé newsletteru |
| **Kategorie údajů** | Jméno, e-mail |
| **Příjemci** | ${data.recipients.emailMarketing || 'Nejsou'} |
| **Lhůta pro výmaz** | Do odvolání souhlasu |
| **Bezpečnostní opatření** | Šifrování, řízení přístupu |
`);
  }

  if (data.purposes.personalization) {
    records.push(`
### Personalizace obsahu

| | |
|---|---|
| **Účel zpracování** | Personalizace obsahu (čl. 6 odst. 1 písm. f) GDPR - oprávněný zájem) |
| **Kategorie subjektů** | Návštěvníci webu, zákazníci |
| **Kategorie údajů** | Cookies, historie prohlížení |
| **Příjemci** | Nejsou |
| **Lhůta pro výmaz** | 26 měsíců |
| **Bezpečnostní opatření** | Šifrování, anonymizace |
`);
  }

  if (data.purposes.analytics) {
    records.push(`
### Analytika webu

| | |
|---|---|
| **Účel zpracování** | Analytika webu (čl. 6 odst. 1 písm. f) GDPR - oprávněný zájem) |
| **Kategorie subjektů** | Návštěvníci webu |
| **Kategorie údajů** | IP adresa, cookies, údaje o chování |
| **Příjemci** | ${data.recipients.analytics === 'google' ? 'Google Ireland Limited' : data.recipients.analyticsOther || 'Nejsou'} |
| **Lhůta pro výmaz** | 26 měsíců |
| **Bezpečnostní opatření** | Anonymizace IP, šifrování přenosu |
`);
  }

  if (data.purposes.employeeAgenda && data.business.hasEmployees) {
    records.push(`
### Zaměstnanecká agenda

| | |
|---|---|
| **Účel zpracování** | Zaměstnanecká agenda (čl. 6 odst. 1 písm. c) GDPR - právní povinnost) |
| **Kategorie subjektů** | Zaměstnanci |
| **Kategorie údajů** | Identifikační údaje, mzdové údaje |
| **Příjemci** | ČSSZ, zdravotní pojišťovny, Finanční úřad |
| **Lhůta pro výmaz** | 30 let (mzdové listy) |
| **Bezpečnostní opatření** | Řízení přístupu, šifrování, fyzické zabezpečení |
`);
  }

  if (data.purposes.accounting) {
    records.push(`
### Účetnictví a daně

| | |
|---|---|
| **Účel zpracování** | Účetnictví a daně (čl. 6 odst. 1 písm. c) GDPR - právní povinnost) |
| **Kategorie subjektů** | Zákazníci, dodavatelé |
| **Kategorie údajů** | Fakturační údaje, platební údaje |
| **Příjemci** | ${data.recipients.hasAccountant ? 'Účetní / daňový poradce, Finanční úřad' : 'Finanční úřad'} |
| **Lhůta pro výmaz** | 10 let dle zákona o účetnictví |
| **Bezpečnostní opatření** | Řízení přístupu, šifrování, zálohování |
`);
  }

  return `
# Záznamy o činnostech zpracování

dle čl. 30 Nařízení Evropského parlamentu a Rady (EU) 2016/679 (GDPR)

## Identifikace správce

| | |
|---|---|
| **Název správce** | ${data.company.name} |
| **IČO** | ${data.company.ico} |
| **Sídlo** | ${data.company.address} |
| **Kontaktní e-mail** | ${data.company.email} |
| **Datum vyhotovení** | ${new Date().toLocaleDateString('cs-CZ', { day: 'numeric', month: 'numeric', year: 'numeric' })} |

---

## Záznamy o činnostech zpracování

${records.length > 0 ? records.join('\n\n') : '*Nejsou definovány žádné činnosti zpracování.*'}

---

## Obecná bezpečnostní opatření

Správce přijal následující technická a organizační opatření k zajištění bezpečnosti osobních údajů:

### Technická opatření
- Šifrování dat při přenosu (HTTPS/TLS)
- Pravidelné zálohování dat
- Antivirová ochrana
- Firewall a zabezpečení sítě

### Organizační opatření
- Řízení přístupových práv
- Školení zaměstnanců v oblasti ochrany osobních údajů
- Dokumentované postupy pro zpracování údajů
- Postupy pro řešení bezpečnostních incidentů

---

Tyto záznamy jsou průběžně aktualizovány.

Poslední aktualizace: ${new Date().toLocaleDateString('cs-CZ', { day: 'numeric', month: 'numeric', year: 'numeric' })}
  `.trim();
}
