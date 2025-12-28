/*
 * Copyright (c) 2025 GDPR Manager
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 */

// Běžné služby s předáváním dat do třetích zemí
// a jejich právní mechanismy (SCC = Standard Contractual Clauses)

export interface ThirdCountryService {
  id: string;
  name: string;
  provider: string;
  country: string;
  countryCode: string;
  category: 'analytics' | 'marketing' | 'hosting' | 'payment' | 'communication' | 'storage' | 'other';
  safeguard: 'adequacy' | 'scc' | 'bcr' | 'derogation';
  safeguardDescription: string;
  dataProcessorAgreementUrl?: string;
  privacyPolicyUrl?: string;
}

// Typ záruky
export const SAFEGUARD_LABELS: Record<string, string> = {
  adequacy: 'Rozhodnutí o přiměřenosti (čl. 45 GDPR)',
  scc: 'Standardní smluvní doložky (čl. 46 odst. 2 písm. c) GDPR)',
  bcr: 'Závazná podniková pravidla (čl. 47 GDPR)',
  derogation: 'Výjimka (čl. 49 GDPR)',
};

export const THIRD_COUNTRY_SERVICES: ThirdCountryService[] = [
  // Analytika
  {
    id: 'google_analytics',
    name: 'Google Analytics',
    provider: 'Google LLC',
    country: 'USA',
    countryCode: 'US',
    category: 'analytics',
    safeguard: 'scc',
    safeguardDescription: 'EU-U.S. Data Privacy Framework + SCC',
    dataProcessorAgreementUrl: 'https://privacy.google.com/businesses/processorterms/',
    privacyPolicyUrl: 'https://policies.google.com/privacy',
  },
  {
    id: 'hotjar',
    name: 'Hotjar',
    provider: 'Hotjar Ltd.',
    country: 'Malta (EU)',
    countryCode: 'MT',
    category: 'analytics',
    safeguard: 'adequacy',
    safeguardDescription: 'Zpracování v rámci EU/EHP',
  },
  
  // Marketing
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    provider: 'The Rocket Science Group LLC (Intuit)',
    country: 'USA',
    countryCode: 'US',
    category: 'marketing',
    safeguard: 'adequacy',
    safeguardDescription: 'EU-U.S. Data Privacy Framework',
    dataProcessorAgreementUrl: 'https://mailchimp.com/legal/data-processing-addendum/',
    privacyPolicyUrl: 'https://www.intuit.com/privacy/statement/',
  },
  {
    id: 'ecomail',
    name: 'Ecomail',
    provider: 'Ecomail.cz, s.r.o.',
    country: 'Česká republika (EU)',
    countryCode: 'CZ',
    category: 'marketing',
    safeguard: 'adequacy',
    safeguardDescription: 'Zpracování v rámci EU/EHP',
  },
  {
    id: 'smartemailing',
    name: 'SmartEmailing',
    provider: 'SmartEmailing, a.s.',
    country: 'Česká republika (EU)',
    countryCode: 'CZ',
    category: 'marketing',
    safeguard: 'adequacy',
    safeguardDescription: 'Zpracování v rámci EU/EHP',
  },
  {
    id: 'meta_ads',
    name: 'Meta (Facebook) Ads',
    provider: 'Meta Platforms Ireland Ltd.',
    country: 'USA (přes Irsko)',
    countryCode: 'US',
    category: 'marketing',
    safeguard: 'scc',
    safeguardDescription: 'EU-U.S. Data Privacy Framework + SCC',
    privacyPolicyUrl: 'https://www.facebook.com/privacy/policy/',
  },
  
  // Hosting & Cloud
  {
    id: 'aws',
    name: 'Amazon Web Services',
    provider: 'Amazon Web Services, Inc.',
    country: 'USA (EU regiony dostupné)',
    countryCode: 'US',
    category: 'hosting',
    safeguard: 'scc',
    safeguardDescription: 'EU-U.S. Data Privacy Framework + SCC, EU regiony',
    dataProcessorAgreementUrl: 'https://aws.amazon.com/compliance/gdpr-center/',
  },
  {
    id: 'vercel',
    name: 'Vercel',
    provider: 'Vercel Inc.',
    country: 'USA',
    countryCode: 'US',
    category: 'hosting',
    safeguard: 'scc',
    safeguardDescription: 'Standardní smluvní doložky (SCC)',
    dataProcessorAgreementUrl: 'https://vercel.com/legal/dpa',
  },
  {
    id: 'wedos',
    name: 'WEDOS',
    provider: 'WEDOS Internet, a.s.',
    country: 'Česká republika (EU)',
    countryCode: 'CZ',
    category: 'hosting',
    safeguard: 'adequacy',
    safeguardDescription: 'Zpracování v rámci EU/EHP',
  },
  {
    id: 'google_cloud',
    name: 'Google Cloud Platform',
    provider: 'Google LLC',
    country: 'USA (EU regiony dostupné)',
    countryCode: 'US',
    category: 'hosting',
    safeguard: 'scc',
    safeguardDescription: 'EU-U.S. Data Privacy Framework + SCC, EU regiony',
    dataProcessorAgreementUrl: 'https://cloud.google.com/terms/data-processing-addendum',
  },
  
  // Platby
  {
    id: 'stripe',
    name: 'Stripe',
    provider: 'Stripe, Inc.',
    country: 'USA',
    countryCode: 'US',
    category: 'payment',
    safeguard: 'scc',
    safeguardDescription: 'EU-U.S. Data Privacy Framework + SCC',
    dataProcessorAgreementUrl: 'https://stripe.com/legal/dpa',
    privacyPolicyUrl: 'https://stripe.com/privacy',
  },
  {
    id: 'gopay',
    name: 'GoPay',
    provider: 'GOPAY s.r.o.',
    country: 'Česká republika (EU)',
    countryCode: 'CZ',
    category: 'payment',
    safeguard: 'adequacy',
    safeguardDescription: 'Zpracování v rámci EU/EHP',
  },
  {
    id: 'comgate',
    name: 'Comgate',
    provider: 'Comgate Payments, a.s.',
    country: 'Česká republika (EU)',
    countryCode: 'CZ',
    category: 'payment',
    safeguard: 'adequacy',
    safeguardDescription: 'Zpracování v rámci EU/EHP',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    provider: 'PayPal (Europe) S.à r.l. et Cie, S.C.A.',
    country: 'Lucembursko (EU)',
    countryCode: 'LU',
    category: 'payment',
    safeguard: 'adequacy',
    safeguardDescription: 'Zpracování v rámci EU/EHP',
  },
  
  // Komunikace
  {
    id: 'zendesk',
    name: 'Zendesk',
    provider: 'Zendesk, Inc.',
    country: 'USA',
    countryCode: 'US',
    category: 'communication',
    safeguard: 'scc',
    safeguardDescription: 'Standardní smluvní doložky (SCC)',
    dataProcessorAgreementUrl: 'https://www.zendesk.com/company/agreements-and-terms/data-processing-agreement/',
  },
  {
    id: 'intercom',
    name: 'Intercom',
    provider: 'Intercom, Inc.',
    country: 'USA',
    countryCode: 'US',
    category: 'communication',
    safeguard: 'scc',
    safeguardDescription: 'Standardní smluvní doložky (SCC)',
    dataProcessorAgreementUrl: 'https://www.intercom.com/legal/data-processing-agreement',
  },
  
  // Úložiště
  {
    id: 'dropbox',
    name: 'Dropbox',
    provider: 'Dropbox, Inc.',
    country: 'USA',
    countryCode: 'US',
    category: 'storage',
    safeguard: 'scc',
    safeguardDescription: 'EU-U.S. Data Privacy Framework + SCC',
    privacyPolicyUrl: 'https://www.dropbox.com/privacy',
  },
  {
    id: 'google_drive',
    name: 'Google Drive / Workspace',
    provider: 'Google LLC',
    country: 'USA (EU regiony dostupné)',
    countryCode: 'US',
    category: 'storage',
    safeguard: 'scc',
    safeguardDescription: 'EU-U.S. Data Privacy Framework + SCC',
    dataProcessorAgreementUrl: 'https://workspace.google.com/terms/dpa_terms.html',
  },
];

// Kategorie služeb
export const SERVICE_CATEGORY_LABELS: Record<string, string> = {
  analytics: 'Analytika',
  marketing: 'Marketing',
  hosting: 'Hosting a cloud',
  payment: 'Platební služby',
  communication: 'Komunikační nástroje',
  storage: 'Cloudové úložiště',
  other: 'Ostatní',
};

// Pomocná funkce pro vyhledání služby
export function findServiceById(id: string): ThirdCountryService | undefined {
  return THIRD_COUNTRY_SERVICES.find(s => s.id === id);
}

// Služby vyžadující transfer mimo EU
export function getThirdCountryServices(): ThirdCountryService[] {
  return THIRD_COUNTRY_SERVICES.filter(s => s.countryCode !== 'CZ' && !['MT', 'LU'].includes(s.countryCode));
}

// Služby s transferem do USA
export function getUSServices(): ThirdCountryService[] {
  return THIRD_COUNTRY_SERVICES.filter(s => s.countryCode === 'US');
}

// Služby zpracovávající data v EU
export function getEUServices(): ThirdCountryService[] {
  return THIRD_COUNTRY_SERVICES.filter(s => ['CZ', 'MT', 'LU', 'IE', 'DE', 'NL'].includes(s.countryCode) || s.safeguard === 'adequacy');
}

// Získání služeb podle kategorie
export function getServicesByCategory(category: string): ThirdCountryService[] {
  return THIRD_COUNTRY_SERVICES.filter(s => s.category === category);
}
