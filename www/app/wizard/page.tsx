'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WizardProgress } from '@/components/wizard/WizardProgress';
import { Step1Company } from '@/components/wizard/Step1Company';
import { Step2Business } from '@/components/wizard/Step2Business';
import { Step3Data } from '@/components/wizard/Step3Data';
import { Step4Purposes } from '@/components/wizard/Step4Purposes';
import { Step5Recipients } from '@/components/wizard/Step5Recipients';
import { DocumentsResult } from '@/components/documents/DocumentsResult';
import { WizardData, defaultWizardData } from '@/lib/types';
import { FlaskConical, ChevronLeft, ChevronRight, Coffee } from 'lucide-react';
import Logo from '@/components/Logo';
import { Footer } from '@/components/Footer';
import { DonateModal } from '@/components/DonateModal';

const STORAGE_KEY = 'gdpr-wizard-data';
const TOTAL_STEPS = 5;

// Testovací data pro dev prostředí
const testData: WizardData = {
  company: {
    name: 'Testovací Firma s.r.o.',
    ico: '12345678',
    address: 'Příkladná 123, 110 00 Praha 1',
    email: 'info@testovacifirma.cz',
    web: 'https://www.testovacifirma.cz',
  },
  business: {
    type: 'eshop',
    hasEmployees: true,
    employeeCount: 5,
    hasWebForms: true,
  },
  collectedData: {
    name: true,
    email: true,
    phone: true,
    address: true,
    birthDate: false,
    paymentData: true,
    ipCookies: true,
    photos: false,
    other: false,
  },
  purposes: {
    contractFulfillment: true,
    marketing: true,
    personalization: true,
    analytics: true,
    employeeAgenda: true,
    accounting: true,
  },
  recipients: {
    hasAccountant: true,
    hostingProvider: 'Wedos Internet, a.s.',
    paymentGateway: 'GoPay s.r.o.',
    emailMarketing: 'Ecomail.cz, s.r.o.',
    analytics: 'google',
    thirdCountryTransfer: true,
    thirdCountryName: 'USA',
  },
};

export default function WizardPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<WizardData>(defaultWizardData);
  const [isComplete, setIsComplete] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDev, setIsDev] = useState(false);
  const [showDonateModal, setShowDonateModal] = useState(false);


  // Detekce dev prostředí
  useEffect(() => {
    const hostname = window.location.hostname;
    setIsDev(hostname === 'gdpr.yrx.cz' || hostname === 'localhost');
  }, []);

  // Načtení z localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setData({ ...defaultWizardData, ...parsed.data });
        setCurrentStep(parsed.step || 0);
      } catch (e) {
        console.error('Chyba při načítání uložených dat:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Uložení do localStorage
  useEffect(() => {
    if (isLoaded && !isComplete) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ data, step: currentStep }));
    }
  }, [data, currentStep, isLoaded, isComplete]);

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsComplete(true);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleBack = () => {
    if (isComplete) {
      setIsComplete(false);
      setCurrentStep(TOTAL_STEPS - 1);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFillTestData = () => {
    setData(testData);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return (
          data.company.name.trim() !== '' &&
          data.company.ico.trim() !== '' &&
          data.company.address.trim() !== '' &&
          data.company.email.trim() !== ''
        );
      case 1:
        return true;
      case 2:
        return Object.values(data.collectedData).some((v) => v === true);
      case 3:
        return Object.values(data.purposes).some((v) => v === true);
      case 4:
        return true;
      default:
        return true;
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary">Načítání...</div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <Link href="/" className="inline-flex items-center gap-3 hover:opacity-80 transition-opacity">
              <Logo className="h-10 w-10" />
              <span className="text-2xl font-bold text-primary">GDPR Manager</span>
            </Link>
          </div>
          <DocumentsResult data={data} onBack={handleBack} />
          
          {/* Decentní tlačítko na kafe */}
          <div className="text-center mt-8 pt-6 border-t border-dashed">
            <button
              onClick={() => setShowDonateModal(true)}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-600 transition-colors"
            >
              <Coffee className="w-4 h-4" />
              Pomohlo vám to? Kupte mi kafe ☕
            </button>
          </div>
        </div>

        {/* Modal Proč zadarmo / Donate */}
        <DonateModal
          isOpen={showDonateModal}
          onClose={() => setShowDonateModal(false)}
          onAction={() => setShowDonateModal(false)}
          actionText="Zavřít"
          title="Díky, že jste to dotáhli až sem!"
          description={
            <>
              <p>
                Jsem rád, že vám GDPR Manager pomohl. Stálo mě to spoustu času, 
                ale věřím, že to má smysl.
              </p>
              <p>
                Žádná registrace, žádné skryté poplatky, žádné &bdquo;premium funkce&ldquo;. 
                Prostě nástroj, který funguje.
              </p>
              <p className="text-gray-800 font-medium">
                Pokud chcete podpořit další vývoj, budu rád za jakoukoliv částku. 
                Ale hlavně – ať vám ty dokumenty dobře slouží! 🙌
              </p>
            </>
          }
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-4 hover:opacity-80 transition-opacity">
            <Logo className="h-12 w-12" />
            <h1 className="text-3xl font-bold text-primary">GDPR Manager</h1>
          </Link>
          <p className="text-muted-foreground">
            Vygenerujte si GDPR dokumenty na míru během 5 minut
          </p>
        </div>

        <WizardProgress currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        <Card className="shadow-lg">
          <CardContent className="pt-6">
            {currentStep === 0 && (
              <Step1Company
                data={data.company}
                onChange={(company) => setData({ ...data, company })}
              />
            )}
            {currentStep === 1 && (
              <Step2Business
                data={data.business}
                onChange={(business) => setData({ ...data, business })}
              />
            )}
            {currentStep === 2 && (
              <Step3Data
                data={data.collectedData}
                onChange={(collectedData) => setData({ ...data, collectedData })}
              />
            )}
            {currentStep === 3 && (
              <Step4Purposes
                data={data.purposes}
                onChange={(purposes) => setData({ ...data, purposes })}
                hasEmployees={data.business.hasEmployees}
              />
            )}
            {currentStep === 4 && (
              <Step5Recipients
                data={data.recipients}
                onChange={(recipients) => setData({ ...data, recipients })}
              />
            )}

            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Zpět
              </Button>
              <div className="flex gap-2">
                {isDev && (
                  <Button
                    variant="outline"
                    onClick={handleFillTestData}
                    className="text-amber-600 border-amber-300 hover:bg-amber-50 gap-2"
                  >
                    <FlaskConical className="w-4 h-4" />
                    Test data
                  </Button>
                )}
                <Button onClick={handleNext} disabled={!canProceed()} className="gap-2">
                  {currentStep === TOTAL_STEPS - 1 ? 'Vygenerovat dokumenty' : 'Pokračovat'}
                  {currentStep !== TOTAL_STEPS - 1 && <ChevronRight className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6 mb-8">
          Vaše data zůstávají pouze ve vašem prohlížeči a nikam se neodesílají.
        </p>
      </div>
      <Footer />
    </div>
  );
}
