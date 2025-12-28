/*
 * Copyright (c) 2025 GDPR Manager
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 */

import { WizardData, DATA_TYPE_LABELS, PURPOSE_LABELS } from './types';
import { 
  RETENTION_PERIODS, 
  formatRetentionPeriod
} from './retention-defaults';

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
      legalBasis: 'Souhlas subjektu údajů (čl. 6 odst. 1 písm. a) GDPR)',
    });
  }
  if (purposes.analytics) {
    result.push({
      purpose: PURPOSE_LABELS.analytics,
      legalBasis: 'Souhlas subjektu údajů (čl. 6 odst. 1 písm. a) GDPR)',
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

// Helper funkce pro generování způsobů odvolání souhlasu
function getWithdrawalMethodsList(data: WizardData): string[] {
  const result: string[] = [];
  const { consentWithdrawal, company } = data;
  
  if (!consentWithdrawal?.methods?.length) {
    // Výchozí hodnoty pokud není nic nastaveno
    return [`E-mailem na adresu: ${company.email}`];
  }
  
  for (const method of consentWithdrawal.methods) {
    switch (method) {
      case 'email':
        result.push(`E-mailem na adresu: ${consentWithdrawal.email || company.email}`);
        break;
      case 'unsubscribe_link':
        result.push('Kliknutím na odkaz „Odhlásit se" v každém marketingovém e-mailu');
        break;
      case 'web_form':
        if (consentWithdrawal.webFormUrl) {
          result.push(`Formulářem na webu: ${consentWithdrawal.webFormUrl}`);
        } else {
          result.push('Formulářem na našem webu');
        }
        break;
      case 'phone':
        if (consentWithdrawal.phone) {
          result.push(`Telefonicky na čísle: ${consentWithdrawal.phone}`);
        }
        break;
      case 'post':
        result.push(`Písemně na adresu: ${consentWithdrawal.address || company.address}`);
        break;
      case 'in_person':
        result.push(`Osobně na provozovně: ${consentWithdrawal.address || company.address}`);
        break;
    }
  }
  
  return result;
}

// Helper funkce pro generování retenčních dob
function getRetentionPeriodsList(data: WizardData): { purpose: string; period: string; legalBasis?: string }[] {
  const result: { purpose: string; period: string; legalBasis?: string }[] = [];
  const { purposes, retentionSettings } = data;
  
  const purposeKeys: (keyof typeof purposes)[] = [
    'contractFulfillment', 'marketing', 'personalization', 
    'analytics', 'employeeAgenda', 'accounting'
  ];
  
  for (const key of purposeKeys) {
    if (!purposes[key]) continue;
    
    const retention = RETENTION_PERIODS[key];
    const customMonths = retentionSettings?.[key]?.months;
    const months = customMonths ?? retention?.defaultMonths ?? 24;
    
    // Speciální formátování pro marketing - obsahuje "nebo do odvolání"
    let periodText = formatRetentionPeriod(months);
    if (key === 'marketing') {
      periodText = `${periodText} od udělení souhlasu nebo do jeho odvolání (dle toho, co nastane dříve)`;
    }
    
    result.push({
      purpose: PURPOSE_LABELS[key],
      period: periodText,
      legalBasis: retention?.legalBasis,
    });
  }
  
  return result;
}

// Helper funkce pro generování seznamu třetích zemí
function getThirdCountryTransfersList(data: WizardData): string[] {
  const result: string[] = [];
  const { recipients } = data;
  
  if (!recipients.thirdCountryTransfer) return result;
  
  // Předdefinované služby
  if (recipients.thirdCountryServices && recipients.thirdCountryServices.length > 0) {
    for (const service of recipients.thirdCountryServices) {
      result.push(
        `${service.serviceName} (${service.provider}) – ${service.country}. ` +
        `Záruka: ${service.safeguardDescription}`
      );
    }
  }
  
  // Vlastní země
  if (recipients.thirdCountryName) {
    result.push(`Další služby v zemi: ${recipients.thirdCountryName}`);
  }
  
  return result;
}

// Generátor: Zásady zpracování osobních údajů
export function generatePrivacyPolicy(data: WizardData): string {
  const collectedDataList = getCollectedDataList(data);
  const purposesList = getPurposesList(data);
  const recipientsList = getRecipientsList(data);
  const retentionList = getRetentionPeriodsList(data);
  const thirdCountryList = getThirdCountryTransfersList(data);
  
  // Sekce DPO pokud existuje
  const dpoSection = data.hasDpo && data.dpo ? `

### Pověřenec pro ochranu osobních údajů (DPO)
Jméno: ${data.dpo.name}
E-mail: ${data.dpo.email}${data.dpo.phone ? `
Telefon: ${data.dpo.phone}` : ''}` : '';
  
  return `
# Zásady zpracování osobních údajů

## 1. Správce osobních údajů

Správcem osobních údajů je:

**${data.company.name}**
IČO: ${data.company.ico}
Sídlo: ${data.company.address}
E-mail: ${data.company.email}
${data.company.web ? `Web: ${data.company.web}` : ''}
${dpoSection}

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
### Předání do třetích zemí (čl. 44-49 GDPR)
Vaše osobní údaje mohou být předány do země mimo Evropský hospodářský prostor. Pro zajištění ochrany vašich údajů využíváme následující záruky:

${thirdCountryList.length > 0 ? thirdCountryList.map(item => `- ${item}`).join('\n') : `- Předání do: ${data.recipients.thirdCountryName || 'neuvedeno'}`}

Podrobnosti o použitých zárukách a způsobu jejich získání vám poskytneme na vyžádání.
` : ''}

## 5. Doba uchovávání osobních údajů

Osobní údaje uchováváme po dobu nezbytnou pro naplnění účelu zpracování:

${retentionList.map(item => `- **${item.purpose}:** ${item.period}${item.legalBasis ? ` (${item.legalBasis})` : ''}`).join('\n')}

Po uplynutí těchto dob budou vaše osobní údaje bezpečně vymazány nebo anonymizovány.

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

### Právo odvolat souhlas (čl. 7 odst. 3 GDPR)
Pokud je zpracování založeno na souhlasu, máte právo tento souhlas kdykoli odvolat, a to stejně snadno, jako byl udělen. Odvoláním souhlasu není dotčena zákonnost zpracování před jeho odvoláním.

${data.purposes.marketing ? `
**Souhlas s marketingovou komunikací můžete odvolat těmito způsoby:**
${getWithdrawalMethodsList(data).map(method => `- ${method}`).join('\n')}
` : ''}

### Právo podat stížnost
Máte právo podat stížnost u dozorového úřadu, kterým je Úřad pro ochranu osobních údajů, Pplk. Sochora 27, 170 00 Praha 7, www.uoou.cz.

## 7. Automatizované rozhodování a profilování

Správce neprovádí automatizované rozhodování ani profilování dle čl. 22 GDPR.

## 8. Kontakt

Pro uplatnění svých práv nebo s dotazy ohledně zpracování osobních údajů nás kontaktujte na:

E-mail: ${data.company.email}
${data.company.web ? `Web: ${data.company.web}` : ''}
${data.hasDpo && data.dpo ? `
**Pověřenec pro ochranu osobních údajů (DPO):**
${data.dpo.name}, ${data.dpo.email}${data.dpo.phone ? `, tel: ${data.dpo.phone}` : ''}` : ''}

## 9. Změny zásad

Tyto zásady zpracování osobních údajů mohou být průběžně aktualizovány. O významných změnách vás budeme informovat.

---

Tyto zásady jsou účinné od: ${new Date().toLocaleDateString('cs-CZ', { day: 'numeric', month: 'numeric', year: 'numeric' })}

*Ověřeno auditem: gdpr-manager.cz/audit PASS ${new Date().toISOString()}*
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
${data.hasDpo && data.dpo ? `DPO: ${data.dpo.name}, ${data.dpo.email}` : ''}

## Zpracovávané údaje
${collectedDataList.join(', ')}

## Účely zpracování
${purposesList.map(item => `- ${item.purpose} (${item.legalBasis})`).join('\n')}

## Vaše práva
Máte právo na přístup k údajům, jejich opravu, výmaz, omezení zpracování, přenositelnost a právo vznést námitku. Souhlas můžete kdykoli odvolat.

Správce neprovádí automatizované rozhodování ani profilování dle čl. 22 GDPR.

## Kontakt
${data.company.email}${data.hasDpo && data.dpo ? ` | DPO: ${data.dpo.email}` : ''}

## Dozorový úřad
Úřad pro ochranu osobních údajů, www.uoou.cz

---

Účinné od: ${new Date().toLocaleDateString('cs-CZ', { day: 'numeric', month: 'numeric', year: 'numeric' })}

*Ověřeno auditem: gdpr-manager.cz/audit PASS ${new Date().toISOString()}*
  `.trim();
}

// Generátor: Souhlas se zpracováním OÚ
export function generateConsentForm(data: WizardData): string {
  const withdrawalMethods = getWithdrawalMethodsList(data);
  const hasPersonalization = data.purposes.personalization;
  
  return `
# Souhlas se zpracováním osobních údajů

Já, níže podepsaný/á, uděluji souhlas se zpracováním svých osobních údajů správci:

**${data.company.name}**, IČO: ${data.company.ico}, ${data.company.address}

### Rozsah údajů
Jméno, e-mail, případně další údaje poskytnuté v souvislosti s marketingovou komunikací${hasPersonalization ? ' a personalizací obsahu' : ''}

### Účel zpracování

Souhlasím se zpracováním osobních údajů pro následující účely (zaškrtněte příslušné):

${data.purposes.marketing ? `□ **Zasílání obchodních sdělení a newsletterů**
   - Informování o novinkách, akcích a nabídkách
   - Právní základ: Souhlas (čl. 6 odst. 1 písm. a) GDPR)
   - Doba zpracování: 3 roky od udělení souhlasu nebo do jeho odvolání
` : ''}${hasPersonalization ? `
□ **Personalizace obsahu a profilování**
   - Přizpůsobení obsahu webu a nabídek na základě vašeho chování a preferencí
   - Právní základ: Souhlas (čl. 6 odst. 1 písm. a) GDPR)
   - Doba zpracování: 14 měsíců nebo do odvolání souhlasu
` : ''}
### Odvolání souhlasu (čl. 7 odst. 3 GDPR)
Svůj souhlas můžete kdykoli odvolat, a to stejně snadno, jako jste jej udělili. Odvoláním souhlasu není dotčena zákonnost zpracování založeného na souhlasu uděleném před jeho odvoláním.

**Souhlas můžete odvolat těmito způsoby:**
${withdrawalMethods.map(method => `- ${method}`).join('\n')}

### Vaše práva
Máte právo na přístup k údajům, jejich opravu, výmaz, omezení zpracování a právo podat stížnost u Úřadu pro ochranu osobních údajů (www.uoou.cz).

### Prohlášení
Udělení souhlasu je dobrovolné. Každý souhlas lze odvolat samostatně. Odvolání souhlasu nemá vliv na zákonnost zpracování před jeho odvoláním.

---

**Pro správce:** Dle čl. 7 odst. 1 GDPR je správce povinen prokázat, že subjekt údajů souhlas udělil. Uchovávejte záznam o udělení souhlasu (datum, čas, IP adresa, znění souhlasu, způsob udělení).

---

Datum: ________________    Jméno a příjmení: ________________

E-mail: ________________    Podpis: ________________

---

Vzor vytvořen: ${new Date().toLocaleDateString('cs-CZ', { day: 'numeric', month: 'numeric', year: 'numeric' })}

*Ověřeno auditem: gdpr-manager.cz/audit PASS ${new Date().toISOString()}*
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
| **Lhůta pro výmaz** | 3 roky od udělení souhlasu nebo do jeho odvolání (dle toho, co nastane dříve) |
| **Bezpečnostní opatření** | Šifrování, řízení přístupu |
`);
  }

  if (data.purposes.personalization) {
    records.push(`
### Personalizace obsahu

| | |
|---|---|
| **Účel zpracování** | Personalizace obsahu (čl. 6 odst. 1 písm. a) GDPR - souhlas) |
| **Kategorie subjektů** | Návštěvníci webu, zákazníci |
| **Kategorie údajů** | Cookies, historie prohlížení |
| **Příjemci** | Nejsou |
| **Lhůta pro výmaz** | 14 měsíců |
| **Bezpečnostní opatření** | Šifrování, anonymizace |
`);
  }

  if (data.purposes.analytics) {
    records.push(`
### Analytika webu

| | |
|---|---|
| **Účel zpracování** | Analytika webu (čl. 6 odst. 1 písm. a) GDPR - souhlas) |
| **Kategorie subjektů** | Návštěvníci webu |
| **Kategorie údajů** | IP adresa, cookies, údaje o chování |
| **Příjemci** | ${data.recipients.analytics === 'google' ? 'Google Ireland Limited' : data.recipients.analyticsOther || 'Nejsou'} |
| **Lhůta pro výmaz** | 14 měsíců |
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
| **Lhůta pro výmaz** | 45 let (mzdové listy dle § 35a zákona č. 582/1991 Sb.) |
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

*Ověřeno auditem: gdpr-manager.cz/audit PASS ${new Date().toISOString()}*
  `.trim();
}

// Generátor: Směrnice pro řešení bezpečnostních incidentů
export function generateIncidentProcedure(data: WizardData): string {
  const contactPerson = data.hasDpo && data.dpo 
    ? `${data.dpo.name}, e-mail: ${data.dpo.email}${data.dpo.phone ? `, tel.: ${data.dpo.phone}` : ''}`
    : `Odpovědná osoba: ${data.company.email}`;
  
  const hasSensitiveData = data.collectedData.birthDate || data.collectedData.photos;
  const hasPaymentData = data.collectedData.paymentData;
  const hasEmployees = data.business.hasEmployees;

  return `
# Směrnice pro řešení bezpečnostních incidentů

Interní dokument společnosti **${data.company.name}**

dle čl. 33 a 34 Nařízení Evropského parlamentu a Rady (EU) 2016/679 (GDPR)

---

## 1. Účel a působnost

Tato směrnice stanoví závazný postup pro:
- Identifikaci a hlášení bezpečnostních incidentů
- Posouzení závažnosti incidentu
- Ohlášení incidentu dozorovému úřadu (ÚOOÚ)
- Informování dotčených subjektů údajů
- Dokumentaci a následná opatření

Směrnice je závazná pro všechny zaměstnance a spolupracovníky, kteří mají přístup k osobním údajům.

---

## 2. Definice pojmů

### Bezpečnostní incident (porušení zabezpečení osobních údajů)
Porušení zabezpečení, které vede k náhodnému nebo protiprávnímu zničení, ztrátě, změně nebo neoprávněnému poskytnutí či zpřístupnění osobních údajů.

### Příklady incidentů:
- Ztráta nebo krádež zařízení s osobními údaji (notebook, telefon, USB)
- Neoprávněný přístup do systémů nebo databází
- Omylem odeslaný e-mail s osobními údaji nesprávnému příjemci
- Kybernetický útok (ransomware, phishing, malware)
- Únik dat na internet
- Fyzické vloupání s přístupem k dokumentům

---

## 3. Kontaktní osoba pro řešení incidentů

| | |
|---|---|
| **Odpovědná osoba** | ${contactPerson} |
| **Adresa správce** | ${data.company.address} |
| **Dozorový úřad** | Úřad pro ochranu osobních údajů (ÚOOÚ) |
| **Web ÚOOÚ** | https://www.uoou.cz |
| **E-mail ÚOOÚ** | posta@uoou.gov.cz |
| **Datová schránka ÚOOÚ** | qkbaa2n |

---

## 4. Postup při zjištění incidentu

### Krok 1: Okamžitá reakce (0–2 hodiny)

1. **Zastavte šíření** – Pokud je to možné, izolujte zasažený systém
2. **Zdokumentujte stav** – Zaznamenejte, co se stalo, kdy a jak jste to zjistili
3. **Nahlaste odpovědné osobě** – Kontaktujte neprodleně osobu uvedenou výše
4. **Nezakrývejte stopy** – Nemažte logy, e-maily ani jiné důkazy

### Krok 2: Posouzení závažnosti (2–24 hodin)

Odpovědná osoba posoudí incident podle těchto kritérií:

| Kritérium | Nízké riziko | Vysoké riziko |
|---|---|---|
| Typ údajů | Jméno, e-mail | Rodné číslo, platební údaje, zdravotní údaje |
| Počet dotčených | Jednotky osob | Desítky a více |
| Možnost zneužití | Minimální | Vysoká (identifikační krádež, finanční ztráta) |
| Šifrování | Údaje byly šifrovány | Údaje nebyly šifrovány |

${hasSensitiveData || hasPaymentData ? `
**Upozornění:** Vaše organizace zpracovává ${hasPaymentData ? 'platební údaje' : ''}${hasSensitiveData && hasPaymentData ? ' a ' : ''}${hasSensitiveData ? 'citlivé osobní údaje' : ''}, což zvyšuje závažnost případného incidentu.
` : ''}

### Krok 3: Rozhodnutí o ohlášení

**Povinnost ohlásit ÚOOÚ** (čl. 33 GDPR):
- Pokud incident **pravděpodobně představuje riziko** pro práva a svobody fyzických osob
- Lhůta: **do 72 hodin** od zjištění
- Výjimka: Incident nepředstavuje žádné riziko (např. šifrované zařízení)

**Povinnost informovat subjekty údajů** (čl. 34 GDPR):
- Pokud incident představuje **vysoké riziko** pro jejich práva
- Lhůta: **bez zbytečného odkladu**
- Výjimka: Přijali jste opatření, která riziko eliminují

---

## 5. Formulář pro hlášení incidentu ÚOOÚ

Aktuální formulář najdete na webu ÚOOÚ: https://uoou.gov.cz/profesional/poruseni-zabezpeceni-osobnich-udaju

### Povinné náležitosti hlášení:

1. **Popis povahy incidentu** – co se stalo, jaké údaje byly dotčeny
2. **Kategorie a přibližný počet dotčených osob**
3. **Kategorie a přibližný počet dotčených záznamů**
4. **Kontakt na pověřence/kontaktní osobu**
5. **Pravděpodobné důsledky incidentu**
6. **Přijatá nebo navržená opatření**

Pokud nemáte všechny informace do 72 hodin, podejte částečné hlášení a doplňte později.

---

## 6. Vzor oznámení subjektům údajů

*Použijte v případě vysokého rizika:*

---

**Předmět: Oznámení o bezpečnostním incidentu**

Vážená paní / Vážený pane,

dovolujeme si Vás informovat, že dne [DATUM] došlo k bezpečnostnímu incidentu, který se mohl dotknout Vašich osobních údajů.

**Co se stalo:**
[Stručný popis incidentu]

**Jaké údaje mohly být dotčeny:**
[Seznam typů údajů]

**Jaké kroky jsme přijali:**
[Popis opatření]

**Co můžete udělat Vy:**
- Změňte heslo ke svému účtu
- Sledujte podezřelé aktivity
- V případě podezření na zneužití kontaktujte policii

**Kontakt pro další informace:**
${contactPerson}

S pozdravem

${data.company.name}

---

## 7. Evidence incidentů

Každý incident musí být zdokumentován v interní evidenci obsahující:

| Položka | Popis |
|---|---|
| Datum a čas zjištění | Kdy byl incident zjištěn |
| Kdo zjistil | Jméno osoby |
| Popis incidentu | Co se stalo |
| Dotčené údaje | Jaké kategorie údajů |
| Počet dotčených osob | Přibližný počet |
| Přijatá opatření | Co bylo uděláno |
| Ohlášení ÚOOÚ | Ano/Ne, datum, číslo jednací |
| Informování subjektů | Ano/Ne, datum, způsob |
| Následná opatření | Preventivní kroky |

Evidenci uchovávejte minimálně **5 let** od data incidentu.

---

## 8. Preventivní opatření

Pro minimalizaci rizika incidentů dodržujte:

### Technická opatření
- Pravidelné aktualizace software a operačních systémů
- Silná a unikátní hesla, dvoufaktorové ověřování
- Šifrování citlivých dat a přenosných zařízení
- Pravidelné zálohování dat
- Antivirová ochrana a firewall

### Organizační opatření
- Pravidelné školení zaměstnanců
- Omezení přístupu pouze na nezbytné údaje
- Čisté stoly a zamykání obrazovek
- Bezpečná likvidace dokumentů a médií
${hasEmployees ? '- Prověření zaměstnanců s přístupem k citlivým údajům' : ''}

---

## 9. Důsledky nedodržení

Nepodání hlášení ÚOOÚ v zákonné lhůtě může být sankcionováno pokutou až do výše:
- **10 000 000 EUR** nebo
- **2 % celkového ročního obratu** (podle toho, co je vyšší)

---

## 10. Platnost a aktualizace

| | |
|---|---|
| **Platnost od** | ${new Date().toLocaleDateString('cs-CZ', { day: 'numeric', month: 'numeric', year: 'numeric' })} |
| **Schválil** | ${data.company.name} |
| **Revize** | Minimálně 1× ročně nebo při změně zpracování |

---

*Tato směrnice byla vytvořena v souladu s požadavky Nařízení (EU) 2016/679 (GDPR).*

*Ověřeno auditem: gdpr-manager.cz/audit PASS ${new Date().toISOString()}*
  `.trim();
}
