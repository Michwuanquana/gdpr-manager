'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CompanyInfo } from '@/lib/types';
import { Lightbulb } from 'lucide-react';

interface Step1CompanyProps {
  data: CompanyInfo;
  onChange: (data: CompanyInfo) => void;
}

export function Step1Company({ data, onChange }: Step1CompanyProps) {
  const handleChange = (field: keyof CompanyInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-primary mb-2">Základní informace o firmě</h2>
        <p className="text-muted-foreground">
          Tyto údaje budou použity jako identifikace správce osobních údajů ve všech dokumentech.
        </p>
      </div>

      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Název firmy / Jméno OSVČ *</Label>
          <Input
            id="name"
            placeholder="např. Jan Novák nebo Novák s.r.o."
            value={data.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ico">IČO *</Label>
          <Input
            id="ico"
            placeholder="např. 12345678"
            value={data.ico}
            onChange={(e) => handleChange('ico', e.target.value)}
            maxLength={8}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Sídlo / Adresa *</Label>
          <Input
            id="address"
            placeholder="např. Hlavní 123, 110 00 Praha 1"
            value={data.address}
            onChange={(e) => handleChange('address', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Kontaktní e-mail *</Label>
          <Input
            id="email"
            type="email"
            placeholder="např. info@mojefirma.cz"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="web">Web (volitelné)</Label>
          <Input
            id="web"
            type="url"
            placeholder="např. https://www.mojefirma.cz"
            value={data.web || ''}
            onChange={(e) => handleChange('web', e.target.value)}
          />
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <div className="flex gap-3">
          <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800">
            <strong>Tip:</strong> Ujistěte se, že všechny údaje jsou správné. Tyto informace 
            budou uvedeny ve všech vygenerovaných dokumentech jako identifikace správce osobních údajů.
          </p>
        </div>
      </div>
    </div>
  );
}
