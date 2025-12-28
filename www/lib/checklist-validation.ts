/*
 * Copyright (c) 2025 GDPR Manager
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 */

import { WizardData } from './types';

export type ChecklistStatus = 'ok' | 'warning' | 'error' | 'info';
export type ChecklistCategory = 'identification' | 'processing' | 'recipients' | 'post_generation';

export interface ChecklistItem {
  id: string;
  label: string;
  category: ChecklistCategory;
  status: ChecklistStatus;
  required: boolean;
  detail?: string;
  linkToStep?: number;
}

export const CATEGORY_LABELS: Record<ChecklistCategory, string> = {
  identification: 'Identifikace správce',
  processing: 'Zpracování údajů',
  recipients: 'Příjemci a předávání',
  post_generation: 'Po vygenerování nezapomeňte',
};

/**
 * Validates wizard data and returns a checklist of items.
 * Used before generating documents to show the user what's complete/missing.
 */
export function validateChecklist(data: WizardData): ChecklistItem[] {
  const items: ChecklistItem[] = [];

  // === IDENTIFICATION ===
  
  items.push({
    id: 'company_name',
    label: 'Název společnosti vyplněn',
    category: 'identification',
    status: data.company.name.trim() ? 'ok' : 'error',
    required: true,
    linkToStep: 0,
  });

  items.push({
    id: 'company_ico',
    label: 'IČO vyplněno',
    category: 'identification',
    status: data.company.ico.trim() ? 'ok' : 'error',
    required: true,
    linkToStep: 0,
  });

  items.push({
    id: 'company_address',
    label: 'Adresa vyplněna',
    category: 'identification',
    status: data.company.address.trim() ? 'ok' : 'error',
    required: true,
    linkToStep: 0,
  });

  items.push({
    id: 'company_email',
    label: 'Kontaktní email vyplněn',
    category: 'identification',
    status: data.company.email.trim() ? 'ok' : 'error',
    required: true,
    linkToStep: 0,
  });

  items.push({
    id: 'dpo',
    label: 'Pověřenec (DPO) vyplněn',
    category: 'identification',
    status: data.hasDpo && data.dpo?.email ? 'ok' : 'warning',
    required: false,
    detail: data.hasDpo ? undefined : 'Volitelné – vyplňte pokud máte DPO',
    linkToStep: 0,
  });

  // === PROCESSING ===

  const hasAnyPurpose = Object.values(data.purposes).some(v => v);
  items.push({
    id: 'purposes',
    label: 'Účely zpracování definovány',
    category: 'processing',
    status: hasAnyPurpose ? 'ok' : 'error',
    required: true,
    linkToStep: 3,
  });

  const hasAnyData = Object.entries(data.collectedData)
    .filter(([key]) => key !== 'otherDescription')
    .some(([, v]) => v);
  items.push({
    id: 'data_categories',
    label: 'Kategorie údajů vybrány',
    category: 'processing',
    status: hasAnyData ? 'ok' : 'error',
    required: true,
    linkToStep: 2,
  });

  // Marketing souhlas - odvolání
  if (data.purposes.marketing) {
    const hasWithdrawalMethods = data.consentWithdrawal?.methods?.length > 0;
    items.push({
      id: 'consent_withdrawal',
      label: 'Způsoby odvolání souhlasu nastaveny',
      category: 'processing',
      status: hasWithdrawalMethods ? 'ok' : 'warning',
      required: false,
      detail: hasWithdrawalMethods ? undefined : 'Doporučeno pro marketing',
      linkToStep: 3,
    });
  }

  // === RECIPIENTS ===

  const hasAnyRecipient = 
    data.recipients.hasAccountant ||
    data.recipients.hostingProvider ||
    data.recipients.paymentGateway ||
    data.recipients.emailMarketing ||
    data.recipients.analytics !== 'none';

  items.push({
    id: 'recipients',
    label: 'Příjemci údajů uvedeni',
    category: 'recipients',
    status: hasAnyRecipient ? 'ok' : 'warning',
    required: false,
    detail: hasAnyRecipient ? undefined : 'Zkontrolujte, zda nepředáváte data třetím stranám',
    linkToStep: 4,
  });

  if (data.recipients.thirdCountryTransfer) {
    const hasThirdCountryDetails = 
      (data.recipients.thirdCountryServices?.length ?? 0) > 0 ||
      data.recipients.thirdCountryName;
    
    items.push({
      id: 'third_country',
      label: 'Přenos do třetích zemí – služby specifikovány',
      category: 'recipients',
      status: hasThirdCountryDetails ? 'ok' : 'warning',
      required: false,
      detail: hasThirdCountryDetails ? undefined : 'Doplňte konkrétní služby a záruky',
      linkToStep: 4,
    });
  }

  // === POST GENERATION (info only) ===

  items.push({
    id: 'post_publish',
    label: 'Zveřejnit Zásady zpracování na webu',
    category: 'post_generation',
    status: 'info',
    required: false,
  });

  if (hasAnyRecipient) {
    items.push({
      id: 'post_contracts',
      label: 'Uzavřít smlouvy se zpracovateli (hosting, účetní...)',
      category: 'post_generation',
      status: 'info',
      required: false,
    });
  }

  items.push({
    id: 'post_incident',
    label: 'Nastavit interní směrnici pro bezpečnostní incidenty',
    category: 'post_generation',
    status: 'info',
    required: false,
  });

  if (data.business.hasEmployees) {
    items.push({
      id: 'post_training',
      label: 'Proškolit zaměstnance v oblasti GDPR',
      category: 'post_generation',
      status: 'info',
      required: false,
    });
  }

  return items;
}

/**
 * Check if there are any blocking errors that prevent generation.
 */
export function hasBlockingErrors(items: ChecklistItem[]): boolean {
  return items.some(item => item.status === 'error' && item.required);
}

/**
 * Get counts by status for summary display.
 */
export function getChecklistSummary(items: ChecklistItem[]): Record<ChecklistStatus, number> {
  return items.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {} as Record<ChecklistStatus, number>);
}

/**
 * Group items by category for display.
 */
export function groupByCategory(items: ChecklistItem[]): Record<ChecklistCategory, ChecklistItem[]> {
  return items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<ChecklistCategory, ChecklistItem[]>);
}
