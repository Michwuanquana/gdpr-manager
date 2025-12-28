/*
 * Copyright (c) 2025 GDPR Manager
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 */

'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { BusinessInfo, BusinessType, BUSINESS_TYPE_LABELS } from '@/lib/types';

interface Step2BusinessProps {
  data: BusinessInfo;
  onChange: (data: BusinessInfo) => void;
}

export function Step2Business({ data, onChange }: Step2BusinessProps) {
  const handleTypeChange = (type: BusinessType) => {
    onChange({ ...data, type, typeOther: type === 'other' ? data.typeOther : undefined });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-primary mb-2">Čím se zabýváte?</h2>
        <p className="text-muted-foreground">
          Na základě typu vašeho podnikání přizpůsobíme dokumenty vašim potřebám.
        </p>
      </div>

      <div className="space-y-4">
        <Label className="text-base font-semibold">Typ podnikání</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(Object.entries(BUSINESS_TYPE_LABELS) as [BusinessType, string][]).map(
            ([value, label]) => (
              <div
                key={value}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  data.type === value
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleTypeChange(value)}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      data.type === value ? 'border-primary' : 'border-muted-foreground'
                    }`}
                  >
                    {data.type === value && (
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <span className="font-medium">{label}</span>
                </div>
              </div>
            )
          )}
        </div>

        {data.type === 'other' && (
          <div className="space-y-2 mt-2">
            <Label htmlFor="typeOther">Specifikujte typ podnikání</Label>
            <Input
              id="typeOther"
              placeholder="např. Vzdělávací agentura"
              value={data.typeOther || ''}
              onChange={(e) => onChange({ ...data, typeOther: e.target.value })}
            />
          </div>
        )}
      </div>

      <div className="space-y-4 pt-4 border-t">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="hasEmployees"
            checked={data.hasEmployees}
            onCheckedChange={(checked) =>
              onChange({
                ...data,
                hasEmployees: checked === true,
                employeeCount: checked ? data.employeeCount : undefined,
              })
            }
          />
          <div className="space-y-1">
            <Label htmlFor="hasEmployees" className="font-medium cursor-pointer">
              Máme zaměstnance
            </Label>
            <p className="text-sm text-muted-foreground">
              Včetně DPP a DPČ - ovlivňuje potřebu zaměstnanecké agendy
            </p>
          </div>
        </div>

        {data.hasEmployees && (
          <div className="ml-7 space-y-2">
            <Label htmlFor="employeeCount">Počet zaměstnanců</Label>
            <Input
              id="employeeCount"
              type="number"
              min="1"
              placeholder="např. 5"
              value={data.employeeCount || ''}
              onChange={(e) =>
                onChange({ ...data, employeeCount: parseInt(e.target.value) || undefined })
              }
              className="w-32"
            />
          </div>
        )}

        <div className="flex items-start space-x-3">
          <Checkbox
            id="hasWebForms"
            checked={data.hasWebForms}
            onCheckedChange={(checked) =>
              onChange({ ...data, hasWebForms: checked === true })
            }
          />
          <div className="space-y-1">
            <Label htmlFor="hasWebForms" className="font-medium cursor-pointer">
              Máme web s formuláři
            </Label>
            <p className="text-sm text-muted-foreground">
              Kontaktní formuláře, objednávky, registrace, newsletter atd.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
