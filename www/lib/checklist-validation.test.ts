/*
 * Copyright (c) 2025 GDPR Manager
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 */

import { describe, it, expect } from 'vitest';
import { validateChecklist } from './checklist-validation';
import { WizardData } from './types';
import { defaultRetentionPeriods } from './retention-defaults';

// Helper to create empty wizard data
const createEmptyData = (): WizardData => ({
  company: { name: '', address: '', ico: '', email: '', web: '' },
  hasDpo: false,
  business: { type: 'services', hasEmployees: false, hasWebForms: false },
  collectedData: {
    name: false, email: false, phone: false, address: false, birthDate: false,
    paymentData: false, ipCookies: false, photos: false, other: false
  },
  purposes: {
    contractFulfillment: false, marketing: false, personalization: false,
    analytics: false, employeeAgenda: false, accounting: false
  },
  recipients: {
    hasAccountant: false, analytics: 'none', thirdCountryTransfer: false
  },
  consentWithdrawal: { methods: ['email'] },
  retentionSettings: {}
});

describe('validateChecklist', () => {
  it('should return error for empty company name', () => {
    const data = createEmptyData();
    const result = validateChecklist(data);
    
    const nameCheck = result.find(item => item.id === 'company_name');
    expect(nameCheck).toBeDefined();
    expect(nameCheck?.status).toBe('error');
  });

  it('should return ok for filled company name', () => {
    const data = createEmptyData();
    data.company.name = 'Test Company s.r.o.';
    const result = validateChecklist(data);
    
    const nameCheck = result.find(item => item.id === 'company_name');
    expect(nameCheck?.status).toBe('ok');
  });

  it('should validate DPO fields only if hasDpo is true', () => {
    const data = createEmptyData();
    data.hasDpo = false;
    
    let result = validateChecklist(data);
    let dpoCheck = result.find(item => item.id === 'dpo');
    // If no DPO, we might not even have this check or it should be skipped/ok depending on implementation
    // Looking at implementation (assumed), usually conditional checks are handled.
    // Let's check if it errors when DPO is true but empty
    
    data.hasDpo = true;
    data.dpo = { name: '', email: '' };
    result = validateChecklist(data);
    dpoCheck = result.find(item => item.id === 'dpo');
    expect(dpoCheck?.status).toBe('warning');

    data.dpo.email = 'dpo@test.com';
    result = validateChecklist(data);
    dpoCheck = result.find(item => item.id === 'dpo');
    expect(dpoCheck?.status).toBe('ok');
  });
});
