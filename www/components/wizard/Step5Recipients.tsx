'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { DataRecipients } from '@/lib/types';
import { AlertTriangle } from 'lucide-react';

interface Step5RecipientsProps {
  data: DataRecipients;
  onChange: (data: DataRecipients) => void;
}

export function Step5Recipients({ data, onChange }: Step5RecipientsProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-primary mb-2">Komu data předáváte?</h2>
        <p className="text-muted-foreground">
          Uveďte všechny třetí strany, kterým předáváte osobní údaje.
        </p>
      </div>

      <div className="space-y-6">
        {/* Účetní */}
        <div className="border rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="hasAccountant"
              checked={data.hasAccountant}
              onCheckedChange={(checked) =>
                onChange({ ...data, hasAccountant: checked === true })
              }
              className="mt-1"
            />
            <div>
              <Label htmlFor="hasAccountant" className="font-medium cursor-pointer">
                Účetní / daňový poradce
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Externí účetní, kterému předáváte faktury a účetní doklady
              </p>
            </div>
          </div>
        </div>

        {/* Hosting */}
        <div className="border rounded-lg p-4 space-y-3">
          <div>
            <Label htmlFor="hostingProvider" className="font-medium">
              Poskytovatel hostingu
            </Label>
            <p className="text-sm text-muted-foreground">
              Kde běží váš web/aplikace (např. Wedos, Forpsi, AWS, Vercel)
            </p>
          </div>
          <Input
            id="hostingProvider"
            placeholder="např. Wedos Internet, a.s."
            value={data.hostingProvider || ''}
            onChange={(e) => onChange({ ...data, hostingProvider: e.target.value })}
          />
        </div>

        {/* Platební brána */}
        <div className="border rounded-lg p-4 space-y-3">
          <div>
            <Label htmlFor="paymentGateway" className="font-medium">
              Platební brána
            </Label>
            <p className="text-sm text-muted-foreground">
              Pokud přijímáte online platby (např. GoPay, Stripe, Comgate)
            </p>
          </div>
          <Input
            id="paymentGateway"
            placeholder="např. GoPay s.r.o."
            value={data.paymentGateway || ''}
            onChange={(e) => onChange({ ...data, paymentGateway: e.target.value })}
          />
        </div>

        {/* Email marketing */}
        <div className="border rounded-lg p-4 space-y-3">
          <div>
            <Label htmlFor="emailMarketing" className="font-medium">
              E-mail marketing nástroj
            </Label>
            <p className="text-sm text-muted-foreground">
              Pokud používáte pro rozesílání newsletterů (např. Mailchimp, Ecomail)
            </p>
          </div>
          <Input
            id="emailMarketing"
            placeholder="např. Ecomail.cz, s.r.o."
            value={data.emailMarketing || ''}
            onChange={(e) => onChange({ ...data, emailMarketing: e.target.value })}
          />
        </div>

        {/* Analytika */}
        <div className="border rounded-lg p-4 space-y-3">
          <div>
            <Label className="font-medium">Analytika webu</Label>
            <p className="text-sm text-muted-foreground mb-3">
              Nástroje pro sledování návštěvnosti
            </p>
          </div>
          <div className="space-y-2">
            {[
              { value: 'none' as const, label: 'Nepoužíváme analytiku' },
              { value: 'google' as const, label: 'Google Analytics' },
              { value: 'other' as const, label: 'Jiný nástroj' },
            ].map((option) => (
              <div
                key={option.value}
                className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  data.analytics === option.value
                    ? 'border-primary bg-primary/5'
                    : 'border-transparent hover:bg-muted'
                }`}
                onClick={() => onChange({ ...data, analytics: option.value })}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    data.analytics === option.value
                      ? 'border-primary'
                      : 'border-muted-foreground'
                  }`}
                >
                  {data.analytics === option.value && (
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </div>
                <span>{option.label}</span>
              </div>
            ))}
          </div>
          {data.analytics === 'other' && (
            <Input
              placeholder="Jaký nástroj používáte?"
              value={data.analyticsOther || ''}
              onChange={(e) => onChange({ ...data, analyticsOther: e.target.value })}
              className="mt-2"
            />
          )}
        </div>

        {/* Třetí země */}
        <div className="border rounded-lg p-4 space-y-3">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="thirdCountryTransfer"
              checked={data.thirdCountryTransfer}
              onCheckedChange={(checked) =>
                onChange({
                  ...data,
                  thirdCountryTransfer: checked === true,
                  thirdCountryName: checked ? data.thirdCountryName : undefined,
                })
              }
              className="mt-1"
            />
            <div>
              <Label htmlFor="thirdCountryTransfer" className="font-medium cursor-pointer">
                Předáváme data mimo EU/EHP
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Např. při použití amerických služeb (Google, Meta, AWS US)
              </p>
            </div>
          </div>
          {data.thirdCountryTransfer && (
            <Input
              placeholder="Do jaké země? (např. USA)"
              value={data.thirdCountryName || ''}
              onChange={(e) => onChange({ ...data, thirdCountryName: e.target.value })}
              className="ml-7"
            />
          )}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            <strong>Důležité:</strong> Při předávání dat mimo EU musíte zajistit odpovídající 
            záruky (standardní smluvní doložky, rozhodnutí o odpovídající ochraně apod.).
          </p>
        </div>
      </div>
    </div>
  );
}
