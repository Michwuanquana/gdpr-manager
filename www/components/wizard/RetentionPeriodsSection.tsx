/*
 * Copyright (c) 2025 GDPR Manager
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 */

'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ProcessingPurposes, RetentionSettings, PURPOSE_LABELS } from '@/lib/types';
import { 
  RETENTION_PERIODS, 
  formatRetentionPeriod,
  RETENTION_UNTIL_CONSENT_WITHDRAWAL,
  RETENTION_DURING_CONTRACT
} from '@/lib/retention-defaults';
import { Clock, Info } from 'lucide-react';

interface RetentionPeriodsSectionProps {
  purposes: ProcessingPurposes;
  retentionSettings: RetentionSettings;
  onChange: (settings: RetentionSettings) => void;
}

export function RetentionPeriodsSection({
  purposes,
  retentionSettings,
  onChange,
}: RetentionPeriodsSectionProps) {
  // Získat aktivní účely
  const activePurposes = Object.entries(purposes)
    .filter(([, isActive]) => isActive)
    .map(([key]) => key);

  if (activePurposes.length === 0) {
    return null;
  }

  const handleChange = (purposeId: string, months: number) => {
    onChange({
      ...retentionSettings,
      [purposeId]: {
        ...retentionSettings[purposeId],
        months,
      },
    });
  };

  const getMonths = (purposeId: string): number => {
    if (retentionSettings[purposeId]?.months !== undefined) {
      return retentionSettings[purposeId].months;
    }
    return RETENTION_PERIODS[purposeId]?.defaultMonths ?? 24;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Clock className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-lg">Doby uchování údajů</h3>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        Pro každý účel zpracování je nastavena výchozí doba uchování podle GDPR a českých zákonů.
        Některé doby jsou pevně dané zákonem a nelze je měnit.
      </p>

      <div className="space-y-3">
        {activePurposes.map((purposeId) => {
          const period = RETENTION_PERIODS[purposeId];
          const currentMonths = getMonths(purposeId);
          const isFixed = period && !period.customizable;
          
          return (
            <div
              key={purposeId}
              className={`border rounded-lg p-4 ${
                isFixed ? 'bg-muted/50' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <Label className="font-medium">
                    {PURPOSE_LABELS[purposeId as keyof ProcessingPurposes]}
                  </Label>
                  {period && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {period.description}
                    </p>
                  )}
                  {period?.legalBasis && (
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Info className="w-3 h-3" />
                      {period.legalBasis}
                    </p>
                  )}
                </div>
                
                <div className="w-40 flex-shrink-0">
                  {isFixed ? (
                    <div className="text-right">
                      <span className="text-sm font-medium text-primary">
                        {formatRetentionPeriod(currentMonths)}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        (zákonná doba)
                      </p>
                    </div>
                  ) : currentMonths === RETENTION_UNTIL_CONSENT_WITHDRAWAL ? (
                    <div className="text-right">
                      <span className="text-sm font-medium text-primary">
                        do odvolání souhlasu
                      </span>
                    </div>
                  ) : currentMonths === RETENTION_DURING_CONTRACT ? (
                    <div className="text-right">
                      <span className="text-sm font-medium text-primary">
                        po dobu smlouvy
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min={1}
                        max={120}
                        value={currentMonths}
                        onChange={(e) => handleChange(purposeId, parseInt(e.target.value) || 24)}
                        className="w-20 text-center"
                      />
                      <span className="text-sm text-muted-foreground">měs.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Proč jsou některé doby pevné?</p>
            <p>
              Některé doby uchování vyplývají přímo ze zákona (např. účetní doklady 10 let, 
              mzdové listy 30 let). Tyto doby nelze zkrátit, ale můžete je prodloužit 
              pokud máte oprávněný důvod.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
