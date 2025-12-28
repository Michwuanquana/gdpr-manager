/*
 * Copyright (c) 2025 GDPR Manager
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 */

'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { DataRecipients, ThirdCountryTransfer } from '@/lib/types';
import { 
  THIRD_COUNTRY_SERVICES, 
  SERVICE_CATEGORY_LABELS,
  ThirdCountryService 
} from '@/lib/third-country-services';
import { AlertTriangle, Globe, ChevronDown, ChevronUp } from 'lucide-react';

interface Step5RecipientsProps {
  data: DataRecipients;
  onChange: (data: DataRecipients) => void;
}

export function Step5Recipients({ data, onChange }: Step5RecipientsProps) {
  const [showAllServices, setShowAllServices] = useState(false);

  // Pomocná funkce pro přidání/odebrání služby třetí země
  const toggleThirdCountryService = (service: ThirdCountryService, checked: boolean) => {
    const currentServices = data.thirdCountryServices || [];
    
    if (checked) {
      const newTransfer: ThirdCountryTransfer = {
        serviceId: service.id,
        serviceName: service.name,
        provider: service.provider,
        country: service.country,
        safeguard: service.safeguard,
        safeguardDescription: service.safeguardDescription,
      };
      onChange({
        ...data,
        thirdCountryTransfer: true,
        thirdCountryServices: [...currentServices, newTransfer],
      });
    } else {
      const newServices = currentServices.filter(s => s.serviceId !== service.id);
      onChange({
        ...data,
        thirdCountryTransfer: newServices.length > 0 || !!data.thirdCountryName,
        thirdCountryServices: newServices,
      });
    }
  };

  const isServiceSelected = (serviceId: string): boolean => {
    return data.thirdCountryServices?.some(s => s.serviceId === serviceId) || false;
  };

  // Seskupit služby podle kategorie
  const servicesByCategory = THIRD_COUNTRY_SERVICES.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, ThirdCountryService[]>);

  // Populární služby pro rychlý výběr
  const popularServices = THIRD_COUNTRY_SERVICES.filter(s => 
    ['google_analytics', 'mailchimp', 'stripe', 'aws', 'meta_ads'].includes(s.id)
  );

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

        {/* Třetí země - rozšířená sekce */}
        <div className="border rounded-lg p-4 space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="thirdCountryTransfer"
              checked={data.thirdCountryTransfer}
              onCheckedChange={(checked) =>
                onChange({
                  ...data,
                  thirdCountryTransfer: checked === true,
                  thirdCountryName: checked ? data.thirdCountryName : undefined,
                  thirdCountryServices: checked ? data.thirdCountryServices : [],
                })
              }
              className="mt-1"
            />
            <div>
              <Label htmlFor="thirdCountryTransfer" className="font-medium cursor-pointer flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Předáváme data mimo EU/EHP
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Např. při použití amerických služeb (Google, Meta, AWS US)
              </p>
            </div>
          </div>

          {data.thirdCountryTransfer && (
            <div className="ml-7 space-y-4">
              {/* Rychlý výběr populárních služeb */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Rychlý výběr běžných služeb:</Label>
                <div className="flex flex-wrap gap-2">
                  {popularServices.map((service) => {
                    const isSelected = isServiceSelected(service.id);
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => toggleThirdCountryService(service, !isSelected)}
                        className={`px-3 py-1.5 text-sm rounded-full border transition-all ${
                          isSelected
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-muted hover:bg-muted/80 border-border'
                        }`}
                      >
                        {service.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Rozbalovací seznam všech služeb */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowAllServices(!showAllServices)}
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  {showAllServices ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  {showAllServices ? 'Skrýt' : 'Zobrazit'} všechny služby ({THIRD_COUNTRY_SERVICES.length})
                </button>

                {showAllServices && (
                  <div className="mt-3 space-y-4">
                    {Object.entries(servicesByCategory).map(([category, services]) => (
                      <div key={category}>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">
                          {SERVICE_CATEGORY_LABELS[category]}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {services.map((service) => {
                            const isSelected = isServiceSelected(service.id);
                            const isEU = service.safeguard === 'adequacy';
                            return (
                              <div
                                key={service.id}
                                className={`border rounded-lg p-3 transition-all ${
                                  isSelected
                                    ? 'border-primary bg-primary/5'
                                    : 'border-border hover:border-primary/30'
                                }`}
                              >
                                <div className="flex items-start gap-2">
                                  <Checkbox
                                    id={`service-${service.id}`}
                                    checked={isSelected}
                                    onCheckedChange={(checked) => 
                                      toggleThirdCountryService(service, checked === true)
                                    }
                                    className="mt-0.5"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <Label 
                                      htmlFor={`service-${service.id}`}
                                      className="font-medium cursor-pointer text-sm flex items-center gap-2"
                                    >
                                      {service.name}
                                      {isEU && (
                                        <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                                          EU
                                        </span>
                                      )}
                                    </Label>
                                    <p className="text-xs text-muted-foreground truncate">
                                      {service.provider}
                                    </p>
                                    {isSelected && (
                                      <p className="text-xs text-primary mt-1">
                                        {service.safeguardDescription}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Vybrané služby */}
              {(data.thirdCountryServices?.length ?? 0) > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-blue-900 mb-2">
                    Vybrané služby ({data.thirdCountryServices?.length}):
                  </h4>
                  <div className="space-y-2">
                    {data.thirdCountryServices?.map((service) => (
                      <div key={service.serviceId} className="text-sm text-blue-800 flex items-start gap-2">
                        <span>•</span>
                        <div>
                          <strong>{service.serviceName}</strong> ({service.provider})
                          <br />
                          <span className="text-xs">{service.country} – {service.safeguardDescription}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Vlastní země */}
              <div>
                <Label htmlFor="thirdCountryName" className="text-sm">
                  Jiná služba/země (volitelně):
                </Label>
                <Input
                  id="thirdCountryName"
                  placeholder="Např. vlastní server v Kanadě"
                  value={data.thirdCountryName || ''}
                  onChange={(e) => onChange({ ...data, thirdCountryName: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
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
