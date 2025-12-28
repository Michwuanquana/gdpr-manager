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
import { CompanyInfo, DPOInfo } from '@/lib/types';
import { Lightbulb, ShieldCheck } from 'lucide-react';

interface Step1CompanyProps {
  data: CompanyInfo;
  onChange: (data: CompanyInfo) => void;
  hasDpo: boolean;
  dpo?: DPOInfo;
  onDpoChange: (hasDpo: boolean, dpo?: DPOInfo) => void;
}

export function Step1Company({ data, onChange, hasDpo, dpo, onDpoChange }: Step1CompanyProps) {
  const handleChange = (field: keyof CompanyInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleDpoChange = (field: keyof DPOInfo, value: string) => {
    onDpoChange(hasDpo, { ...dpo, [field]: value } as DPOInfo);
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

      {/* DPO sekce */}
      <div className="border-2 border-dashed border-muted rounded-lg p-5 mt-6">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="hasDpo"
            checked={hasDpo}
            onCheckedChange={(checked) => onDpoChange(checked === true, checked ? dpo : undefined)}
            className="mt-1"
          />
          <div className="flex-1">
            <Label htmlFor="hasDpo" className="font-medium cursor-pointer flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Máme pověřence pro ochranu osobních údajů (DPO)
            </Label>
            <p className="text-sm text-muted-foreground mt-1">
              Některé organizace musí mít DPO dle čl. 37 GDPR (orgány veřejné moci, 
              systematické monitorování, zpracování citlivých údajů ve velkém rozsahu).
            </p>
          </div>
        </div>

        {hasDpo && (
          <div className="mt-4 pl-7 space-y-4 border-t pt-4">
            <div className="space-y-2">
              <Label htmlFor="dpoName">Jméno DPO *</Label>
              <Input
                id="dpoName"
                placeholder="např. Ing. Jan Novák"
                value={dpo?.name || ''}
                onChange={(e) => handleDpoChange('name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dpoEmail">E-mail DPO *</Label>
              <Input
                id="dpoEmail"
                type="email"
                placeholder="např. dpo@mojefirma.cz"
                value={dpo?.email || ''}
                onChange={(e) => handleDpoChange('email', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dpoPhone">Telefon DPO (volitelné)</Label>
              <Input
                id="dpoPhone"
                type="tel"
                placeholder="např. +420 123 456 789"
                value={dpo?.phone || ''}
                onChange={(e) => handleDpoChange('phone', e.target.value)}
              />
            </div>
          </div>
        )}
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
