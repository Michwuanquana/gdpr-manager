/*
 * Copyright (c) 2025 GDPR Manager
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 */

import { WizardData } from './types';

/**
 * Demonstrační data s placeholdery pro ukázku generovaných dokumentů
 * Používá se na stránce /audit pro stažení vzorových dokumentů
 */
export const DEMO_WIZARD_DATA: WizardData = {
  company: {
    name: '[Název vaší společnosti s.r.o.]',
    ico: '12345678',
    address: '[Ulice 123, 100 00 Praha 1]',
    email: 'info@vase-spolecnost.cz',
    web: 'www.vase-spolecnost.cz',
  },
  
  business: {
    type: 'eshop',
    hasEmployees: true,
    employeeCount: 5,
    hasWebForms: true,
  },
  
  collectedData: {
    name: true,
    email: true,
    phone: true,
    address: true,
    birthDate: false,
    paymentData: true,
    ipCookies: true,
    photos: false,
    other: true,
    otherDescription: 'Historie objednávek',
  },
  
  purposes: {
    contractFulfillment: true,
    marketing: true,
    personalization: true,
    analytics: true,
    employeeAgenda: true,
    accounting: true,
  },
  
  hasDpo: false,
  
  consentWithdrawal: {
    methods: ['email', 'unsubscribe_link', 'web_form'],
    email: 'info@vase-spolecnost.cz',
    webFormUrl: 'www.vase-spolecnost.cz/gdpr-odvolani',
  },
  
  recipients: {
    hasAccountant: true,
    hostingProvider: '[Název hostingové služby]',
    paymentGateway: 'GoPay',
    emailMarketing: 'Mailchimp',
    analytics: 'google',
    thirdCountryTransfer: true,
    thirdCountryServices: [
      {
        serviceId: 'google-analytics',
        serviceName: 'Google Analytics',
        provider: 'Google LLC',
        country: 'USA',
        safeguard: 'adequacy',
        safeguardDescription: 'Rozhodnutí Evropské komise o přiměřenosti ochrany (Data Privacy Framework)',
      },
      {
        serviceId: 'mailchimp',
        serviceName: 'Mailchimp',
        provider: 'The Rocket Science Group LLC (Intuit Inc.)',
        country: 'USA',
        safeguard: 'adequacy',
        safeguardDescription: 'EU-U.S. Data Privacy Framework (rozhodnutí o přiměřenosti)',
      },
    ],
  },
  
  retentionSettings: {
    contractFulfillment: { months: 36 }, // 3 roky - běžná promlčecí lhůta
    marketing: { months: 36 }, // 3 roky nebo do odvolání souhlasu
    personalization: { months: 14 }, // 14 měsíců (shodně s GA4)
    analytics: { months: 14 }, // Google Analytics 4 (max. pro bezplatnou verzi)
    employeeAgenda: { months: 540 }, // 45 let (mzdové listy dle § 35a zák. č. 582/1991 Sb.)
    accounting: { months: 120 }, // 10 let
  },
};
