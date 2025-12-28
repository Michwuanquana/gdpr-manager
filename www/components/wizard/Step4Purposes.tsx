/*
 * Copyright (c) 2025 GDPR Manager
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 */

'use client';

import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { 
  ProcessingPurposes, 
  PURPOSE_LABELS, 
  ConsentWithdrawal, 
  WithdrawalMethod,
  WITHDRAWAL_METHOD_LABELS,
  RetentionSettings 
} from '@/lib/types';
import { RetentionPeriodsSection } from './RetentionPeriodsSection';
import { Info, Mail, Link2, Globe, Phone, Building, MapPin } from 'lucide-react';

interface Step4PurposesProps {
  data: ProcessingPurposes;
  onChange: (data: ProcessingPurposes) => void;
  hasEmployees: boolean;
  consentWithdrawal: ConsentWithdrawal;
  onConsentWithdrawalChange: (data: ConsentWithdrawal) => void;
  companyEmail: string;
  companyAddress: string;
  retentionSettings: RetentionSettings;
  onRetentionChange: (settings: RetentionSettings) => void;
}

const purposeDescriptions: Record<keyof ProcessingPurposes, string> = {
  contractFulfillment:
    'Zpracování objednávek, poskytování služeb, komunikace se zákazníky',
  marketing:
    'Newsletter, propagační e-maily, cílená reklama (vyžaduje souhlas)',
  personalization:
    'Přizpůsobení obsahu webu na základě chování uživatele',
  analytics:
    'Google Analytics, Hotjar, sledování návštěvnosti a chování na webu',
  employeeAgenda:
    'Mzdy, pracovní smlouvy, docházka, benefity',
  accounting:
    'Faktury, daňová přiznání, účetní doklady',
};

const legalBasis: Record<keyof ProcessingPurposes, string> = {
  contractFulfillment: 'Plnění smlouvy',
  marketing: 'Souhlas',
  personalization: 'Souhlas',
  analytics: 'Souhlas',
  employeeAgenda: 'Právní povinnost',
  accounting: 'Právní povinnost',
};

export function Step4Purposes({ 
  data, 
  onChange, 
  hasEmployees,
  consentWithdrawal,
  onConsentWithdrawalChange,
  companyEmail,
  companyAddress,
  retentionSettings,
  onRetentionChange,
}: Step4PurposesProps) {
  const handleCheckChange = (field: keyof ProcessingPurposes, checked: boolean) => {
    onChange({ ...data, [field]: checked });
  };

  const handleWithdrawalMethodChange = (method: WithdrawalMethod, checked: boolean) => {
    const currentMethods = consentWithdrawal.methods || [];
    const newMethods = checked
      ? [...currentMethods, method]
      : currentMethods.filter(m => m !== method);
    onConsentWithdrawalChange({ ...consentWithdrawal, methods: newMethods });
  };

  const withdrawalMethods: { method: WithdrawalMethod; icon: React.ReactNode; needsInput?: boolean }[] = [
    { method: 'email', icon: <Mail className="w-4 h-4" /> },
    { method: 'unsubscribe_link', icon: <Link2 className="w-4 h-4" /> },
    { method: 'web_form', icon: <Globe className="w-4 h-4" />, needsInput: true },
    { method: 'phone', icon: <Phone className="w-4 h-4" />, needsInput: true },
    { method: 'post', icon: <MapPin className="w-4 h-4" /> },
    { method: 'in_person', icon: <Building className="w-4 h-4" /> },
  ];

  const purposes: (keyof ProcessingPurposes)[] = [
    'contractFulfillment',
    'marketing',
    'personalization',
    'analytics',
    'employeeAgenda',
    'accounting',
  ];

  const selectedCount = purposes.filter((p) => data[p]).length;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-primary mb-2">Za jakým účelem data zpracováváte?</h2>
        <p className="text-muted-foreground">
          Každý účel zpracování musí mít právní základ. Vyberte všechny relevantní účely.
        </p>
      </div>

      <div className="space-y-3">
        {purposes.map((purpose) => {
          const isDisabled = purpose === 'employeeAgenda' && !hasEmployees;

          return (
            <div
              key={purpose}
              className={`border rounded-lg p-4 transition-all ${
                isDisabled
                  ? 'opacity-50 cursor-not-allowed'
                  : data[purpose]
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <Checkbox
                  id={purpose}
                  checked={data[purpose]}
                  onCheckedChange={(checked) => handleCheckChange(purpose, checked === true)}
                  disabled={isDisabled}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Label
                      htmlFor={purpose}
                      className={`font-medium ${isDisabled ? '' : 'cursor-pointer'}`}
                    >
                      {PURPOSE_LABELS[purpose]}
                    </Label>
                    <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                      {legalBasis[purpose]}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {purposeDescriptions[purpose]}
                  </p>
                  {isDisabled && (
                    <p className="text-xs text-amber-600 mt-1">
                      Dostupné pouze pokud máte zaměstnance (nastaveno v kroku 2)
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Právní základy zpracování</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li><strong>Plnění smlouvy</strong> – nutné pro poskytnutí služby/produktu</li>
              <li><strong>Souhlas</strong> – subjekt aktivně souhlasil (lze odvolat)</li>
              <li><strong>Oprávněný zájem</strong> – váš legitimní zájem nepřevažuje práva subjektu</li>
              <li><strong>Právní povinnost</strong> – ukládá vám to zákon</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sekce odvolání souhlasu - zobrazí se jen při marketingu */}
      {data.marketing && (
        <div className="border-2 border-emerald-200 bg-emerald-50 rounded-lg p-5">
          <h3 className="font-semibold text-emerald-900 mb-2 flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Jak lze odvolat souhlas s marketingem?
          </h3>
          <p className="text-sm text-emerald-800 mb-4">
            Dle čl. 7 odst. 3 GDPR musí být odvolání souhlasu stejně snadné jako jeho udělení. 
            Vyberte způsoby, kterými mohou zákazníci souhlas odvolat.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {withdrawalMethods.map(({ method, icon }) => {
              const isChecked = consentWithdrawal.methods?.includes(method) || false;
              return (
                <div key={method}>
                  <div className={`border rounded-lg p-3 transition-all ${
                    isChecked ? 'border-emerald-500 bg-white' : 'border-emerald-200'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id={`withdrawal-${method}`}
                        checked={isChecked}
                        onCheckedChange={(checked) => handleWithdrawalMethodChange(method, checked === true)}
                      />
                      <Label htmlFor={`withdrawal-${method}`} className="flex items-center gap-2 cursor-pointer text-sm">
                        {icon}
                        {WITHDRAWAL_METHOD_LABELS[method]}
                      </Label>
                    </div>
                    {/* Extra input pro web_form a phone */}
                    {isChecked && method === 'web_form' && (
                      <Input
                        className="mt-2 text-sm"
                        placeholder="URL formuláře (volitelné)"
                        value={consentWithdrawal.webFormUrl || ''}
                        onChange={(e) => onConsentWithdrawalChange({ ...consentWithdrawal, webFormUrl: e.target.value })}
                      />
                    )}
                    {isChecked && method === 'phone' && (
                      <Input
                        className="mt-2 text-sm"
                        placeholder="Telefonní číslo"
                        value={consentWithdrawal.phone || ''}
                        onChange={(e) => onConsentWithdrawalChange({ ...consentWithdrawal, phone: e.target.value })}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-emerald-700">
            <strong>Tip:</strong> E-mail ({companyEmail || 'váš kontaktní e-mail'}) a adresa ({companyAddress || 'vaše adresa'}) 
            budou použity z údajů o firmě.
          </p>
        </div>
      )}

      {/* Retenční doby - zobrazí se pokud je vybrán alespoň jeden účel */}
      {selectedCount > 0 && (
        <div className="border-t pt-6">
          <RetentionPeriodsSection
            purposes={data}
            retentionSettings={retentionSettings}
            onChange={onRetentionChange}
          />
        </div>
      )}

      <div className="text-center pt-4 border-t">
        <p className="text-sm text-muted-foreground">
          Vybráno <span className="font-semibold text-primary">{selectedCount}</span> z{' '}
          {purposes.length} účelů
        </p>
      </div>
    </div>
  );
}
