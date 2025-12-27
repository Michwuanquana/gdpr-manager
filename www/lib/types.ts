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

export interface DataRecipients {
  hasAccountant: boolean;
  hostingProvider?: string;
  paymentGateway?: string;
  emailMarketing?: string;
  analytics: 'google' | 'other' | 'none';
  analyticsOther?: string;
  thirdCountryTransfer: boolean;
  thirdCountryName?: string;
}

export interface WizardData {
  company: CompanyInfo;
  business: BusinessInfo;
  collectedData: CollectedData;
  purposes: ProcessingPurposes;
  recipients: DataRecipients;
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
