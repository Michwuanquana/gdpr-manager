/*
 * Copyright (c) 2025 GDPR Manager
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 */

// Výchozí retenční doby podle typu účelu a právních požadavků
// Doby jsou v měsících (0 = do odvolání souhlasu, -1 = po dobu trvání smlouvy)

export interface RetentionPeriod {
  id: string;
  label: string;
  description: string;
  defaultMonths: number;
  legalBasis?: string;
  customizable: boolean;
}

export interface RetentionConfig {
  purposeId: string;
  months: number;
  customNote?: string;
}

// Speciální hodnoty
export const RETENTION_UNTIL_CONSENT_WITHDRAWAL = 0;
export const RETENTION_DURING_CONTRACT = -1;

export const RETENTION_PERIODS: Record<string, RetentionPeriod> = {
  // Smluvní účely
  contractFulfillment: {
    id: 'contractFulfillment',
    label: 'Plnění smlouvy',
    description: 'Běžná promlčecí lhůta dle NOZ',
    defaultMonths: 36, // 3 roky
    legalBasis: 'Čl. 6 odst. 1 písm. b) GDPR',
    customizable: true,
  },
  
  // Marketing
  marketing: {
    id: 'marketing',
    label: 'Marketing a newsletter',
    description: '3 roky od udělení souhlasu nebo do jeho odvolání (dle toho, co nastane dříve)',
    defaultMonths: 36, // 3 roky nebo do odvolání
    legalBasis: 'Čl. 6 odst. 1 písm. a) GDPR - souhlas',
    customizable: true,
  },
  
  // Personalizace
  personalization: {
    id: 'personalization',
    label: 'Personalizace obsahu',
    description: 'Po dobu aktivního používání služby nebo do odvolání souhlasu',
    defaultMonths: 14, // Shodně s GA4 retencí
    legalBasis: 'Čl. 6 odst. 1 písm. a) GDPR - souhlas',
    customizable: true,
  },
  
  // Analytika
  analytics: {
    id: 'analytics',
    label: 'Analytika webu',
    description: 'Anonymizace nebo smazání po uplynutí doby',
    defaultMonths: 14, // Google Analytics 4 maximum pro bezplatnou verzi
    legalBasis: 'Čl. 6 odst. 1 písm. a) GDPR - souhlas',
    customizable: true,
  },
  
  // Zaměstnanecká agenda
  employeeAgenda: {
    id: 'employeeAgenda',
    label: 'Zaměstnanecká agenda',
    description: 'Po dobu trvání pracovního poměru + zákonná archivace',
    defaultMonths: -1,
    legalBasis: 'Čl. 6 odst. 1 písm. b) a c) GDPR',
    customizable: false,
  },
  
  // Účetnictví
  accounting: {
    id: 'accounting',
    label: 'Účetnictví a daně',
    description: 'Zákonná archivační doba dle zákona o účetnictví',
    defaultMonths: 120, // 10 let
    legalBasis: 'Zákon č. 563/1991 Sb., o účetnictví, § 31',
    customizable: false,
  },
};

// Archivační doby podle českých zákonů
export const LEGAL_RETENTION_PERIODS = {
  accounting: {
    months: 120, // 10 let
    label: 'Účetní doklady',
    law: 'Zákon č. 563/1991 Sb., o účetnictví, § 31',
  },
  tax: {
    months: 120, // 10 let
    label: 'Daňové doklady',
    law: 'Zákon č. 235/2004 Sb., o DPH, § 35',
  },
  employeeRecords: {
    months: 540, // 45 let (pro důchodové účely) - novela od 1.1.2023
    label: 'Mzdové listy',
    law: 'Zákon č. 582/1991 Sb., § 35a odst. 4 písm. d) - novela zákonem č. 455/2022 Sb.',
  },
  contracts: {
    months: 60, // 5 let (promlčecí lhůta)
    label: 'Obchodní smlouvy',
    law: 'Zákon č. 89/2012 Sb., občanský zákoník, § 629',
  },
  warranty: {
    months: 24, // 2 roky (záruční doba)
    label: 'Záruční dokumenty',
    law: 'Zákon č. 89/2012 Sb., občanský zákoník, § 2165',
  },
};

// Formátování doby uchování pro dokumenty
export function formatRetentionPeriod(months: number): string {
  if (months === RETENTION_UNTIL_CONSENT_WITHDRAWAL) {
    return 'do odvolání souhlasu';
  }
  if (months === RETENTION_DURING_CONTRACT) {
    return 'po dobu trvání smluvního vztahu';
  }
  if (months >= 12 && months % 12 === 0) {
    const years = months / 12;
    if (years === 1) return '1 rok';
    if (years >= 2 && years <= 4) return `${years} roky`;
    return `${years} let`;
  }
  if (months === 1) return '1 měsíc';
  if (months >= 2 && months <= 4) return `${months} měsíce`;
  return `${months} měsíců`;
}

// Získání výchozí retenční doby pro účel
export function getDefaultRetention(purposeId: string): number {
  return RETENTION_PERIODS[purposeId]?.defaultMonths ?? 24;
}

// Získání popisu retenční doby pro dokumenty
export function getRetentionDescription(purposeId: string, months?: number): string {
  const period = RETENTION_PERIODS[purposeId];
  if (!period) return 'Dle účelu zpracování';
  
  const actualMonths = months ?? period.defaultMonths;
  const formattedPeriod = formatRetentionPeriod(actualMonths);
  
  if (period.legalBasis) {
    return `${formattedPeriod} (${period.legalBasis})`;
  }
  
  return formattedPeriod;
}
