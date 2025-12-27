'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { CollectedData, DATA_TYPE_LABELS } from '@/lib/types';
import { AlertTriangle } from 'lucide-react';

interface Step3DataProps {
  data: CollectedData;
  onChange: (data: CollectedData) => void;
}

const dataFields: (keyof CollectedData)[] = [
  'name',
  'email',
  'phone',
  'address',
  'birthDate',
  'paymentData',
  'ipCookies',
  'photos',
  'other',
];

const dataDescriptions: Record<keyof CollectedData, string> = {
  name: 'Jméno zákazníků, klientů nebo návštěvníků',
  email: 'E-mailové adresy pro komunikaci nebo marketing',
  phone: 'Telefonní čísla pro kontakt',
  address: 'Doručovací nebo fakturační adresy',
  birthDate: 'Datum narození pro ověření věku nebo smlouvy',
  paymentData: 'Čísla karet, bankovní účty (obvykle zpracovává platební brána)',
  ipCookies: 'Analytika, logování, personalizace',
  photos: 'Profilové fotky, galerie, dokumenty s fotografiemi',
  other: 'Jakékoli další osobní údaje',
  otherDescription: '',
};

export function Step3Data({ data, onChange }: Step3DataProps) {
  const handleCheckChange = (field: keyof CollectedData, checked: boolean) => {
    const newData = { ...data, [field]: checked };
    if (field === 'other' && !checked) {
      newData.otherDescription = undefined;
    }
    onChange(newData);
  };

  const selectedCount = dataFields.filter((field) => data[field]).length;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-primary mb-2">Jaká data sbíráte?</h2>
        <p className="text-muted-foreground">
          Vyberte všechny kategorie osobních údajů, které zpracováváte.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            <strong>Pozor:</strong> Osobní údaje jsou jakékoli informace, které mohou přímo 
            nebo nepřímo identifikovat fyzickou osobu. Vyberte vše, co se vás týká.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {dataFields.map((field) => (
          <div
            key={field}
            className={`border rounded-lg p-4 transition-all ${
              data[field]
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <Checkbox
                id={field}
                checked={data[field] as boolean}
                onCheckedChange={(checked) => handleCheckChange(field, checked === true)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label htmlFor={field} className="font-medium cursor-pointer">
                  {DATA_TYPE_LABELS[field]}
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {dataDescriptions[field]}
                </p>
              </div>
            </div>

            {field === 'other' && data.other && (
              <div className="mt-3 ml-7">
                <Input
                  placeholder="Popište jaké další údaje sbíráte..."
                  value={data.otherDescription || ''}
                  onChange={(e) =>
                    onChange({ ...data, otherDescription: e.target.value })
                  }
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center pt-4 border-t">
        <p className="text-sm text-muted-foreground">
          Vybráno <span className="font-semibold text-primary">{selectedCount}</span> z{' '}
          {dataFields.length} kategorií
        </p>
      </div>
    </div>
  );
}
