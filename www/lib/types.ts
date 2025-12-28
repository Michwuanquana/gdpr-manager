/*
 * Copyright (c) 2025 GDPR Manager
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 */

// Typy pro GDPR Manager Wizard

export interface CompanyInfo {
  name: string;
  ico: string;
  address: string;
  email: string;
  web?: string;
}

export type BusinessType = 'eshop' | 'services' | 'saas' | 'blog' | 'other';

export interface BusinessInfo {
  type: BusinessType;
  typeOther?: string;
  hasEmployees: boolean;
  employeeCount?: number;
  hasWebForms: boolean;
}

export interface CollectedData {
  name: boolean;
  email: boolean;
  phone: boolean;
  address: boolean;
  birthDate: boolean;
  paymentData: boolean;
  ipCookies: boolean;
  photos: boolean;
  other: boolean;
  otherDescription?: string;
}

export interface ProcessingPurposes {
  contractFulfillment: boolean;
  marketing: boolean;
  personalization: boolean;
  analytics: boolean;
  employeeAgenda: boolean;
  accounting: boolean;
}

// Způsoby odvolání souhlasu (čl. 7 odst. 3 GDPR)
export type WithdrawalMethod = 'email' | 'unsubscribe_link' | 'web_form' | 'phone' | 'post' | 'in_person';

export interface ConsentWithdrawal {
  methods: WithdrawalMethod[];
  email?: string;  // Předvyplní se z company.email
  webFormUrl?: string;
  phone?: string;
  address?: string;  // Předvyplní se z company.address
}

export const WITHDRAWAL_METHOD_LABELS: Record<WithdrawalMethod, string> = {
  email: 'E-mailem',
  unsubscribe_link: 'Odkazem v newsletteru',
  web_form: 'Formulářem na webu',
  phone: 'Telefonicky',
  post: 'Písemně poštou',
  in_person: 'Osobně na provozovně',
};

// DPO - Pověřenec pro ochranu osobních údajů (čl. 37 GDPR)
export interface DPOInfo {
  name: string;
  email: string;
  phone?: string;
}

export interface DataRecipients {
  hasAccountant: boolean;
  hostingProvider?: string;
  paymentGateway?: string;
  emailMarketing?: string;
  analytics: 'google' | 'other' | 'none';
  analyticsOther?: string;
  thirdCountryTransfer: boolean;
  thirdCountryName?: string;
  // Nové: Detaily předávání do třetích zemí
  thirdCountryServices?: ThirdCountryTransfer[];
}

// Předávání do třetích zemí s právním mechanismem
export interface ThirdCountryTransfer {
  serviceId: string;  // ID z third-country-services.ts nebo 'custom'
  serviceName: string;
  provider: string;
  country: string;
  safeguard: 'adequacy' | 'scc' | 'bcr' | 'derogation';
  safeguardDescription: string;
}

// Konfigurace retenčních dob
export interface RetentionSettings {
  [purposeId: string]: {
    months: number;
    customNote?: string;
  };
}

export interface WizardData {
  company: CompanyInfo;
  business: BusinessInfo;
  collectedData: CollectedData;
  purposes: ProcessingPurposes;
  recipients: DataRecipients;
  // Nové: DPO (Pověřenec pro ochranu osobních údajů)
  hasDpo: boolean;
  dpo?: DPOInfo;
  // Nové: Způsoby odvolání souhlasu
  consentWithdrawal: ConsentWithdrawal;
  // Nové: Retenční doby
  retentionSettings: RetentionSettings;
}

export const defaultWizardData: WizardData = {
  company: {
    name: '',
    ico: '',
    address: '',
    email: '',
    web: '',
  },
  business: {
    type: 'services',
    hasEmployees: false,
    hasWebForms: false,
  },
  collectedData: {
    name: false,
    email: false,
    phone: false,
    address: false,
    birthDate: false,
    paymentData: false,
    ipCookies: false,
    photos: false,
    other: false,
  },
  purposes: {
    contractFulfillment: false,
    marketing: false,
    personalization: false,
    analytics: false,
    employeeAgenda: false,
    accounting: false,
  },
  recipients: {
    hasAccountant: false,
    analytics: 'none',
    thirdCountryTransfer: false,
  },
  // Nové: DPO
  hasDpo: false,
  // Nové: Odvolání souhlasu - výchozí metody
  consentWithdrawal: {
    methods: ['email', 'unsubscribe_link'],
  },
  // Nové: Retenční doby - výchozí hodnoty
  retentionSettings: {},
};

export const BUSINESS_TYPE_LABELS: Record<BusinessType, string> = {
  eshop: 'E-shop',
  services: 'Poskytování služeb',
  saas: 'SaaS / Software',
  blog: 'Blog / Média',
  other: 'Jiné',
};

export const DATA_TYPE_LABELS: Record<keyof CollectedData, string> = {
  name: 'Jméno a příjmení',
  email: 'E-mailová adresa',
  phone: 'Telefonní číslo',
  address: 'Adresa bydliště',
  birthDate: 'Datum narození',
  paymentData: 'Platební údaje',
  ipCookies: 'IP adresy / cookies',
  photos: 'Fotografie',
  other: 'Jiné údaje',
  otherDescription: 'Popis jiných údajů',
};

export const PURPOSE_LABELS: Record<keyof ProcessingPurposes, string> = {
  contractFulfillment: 'Plnění smlouvy (objednávky, služby)',
  marketing: 'Marketing a newsletter',
  personalization: 'Personalizace obsahu',
  analytics: 'Analytika webu',
  employeeAgenda: 'Zaměstnanecká agenda',
  accounting: 'Účetnictví a daně',
};
