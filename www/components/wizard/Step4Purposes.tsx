'use client';

import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ProcessingPurposes, PURPOSE_LABELS } from '@/lib/types';
import { Info } from 'lucide-react';

interface Step4PurposesProps {
  data: ProcessingPurposes;
  onChange: (data: ProcessingPurposes) => void;
  hasEmployees: boolean;
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
  personalization: 'Oprávněný zájem',
  analytics: 'Oprávněný zájem',
  employeeAgenda: 'Právní povinnost',
  accounting: 'Právní povinnost',
};

export function Step4Purposes({ data, onChange, hasEmployees }: Step4PurposesProps) {
  const handleCheckChange = (field: keyof ProcessingPurposes, checked: boolean) => {
    onChange({ ...data, [field]: checked });
  };

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

      <div className="text-center pt-4 border-t">
        <p className="text-sm text-muted-foreground">
          Vybráno <span className="font-semibold text-primary">{selectedCount}</span> z{' '}
          {purposes.length} účelů
        </p>
      </div>
    </div>
  );
}
