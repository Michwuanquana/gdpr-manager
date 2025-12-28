/*
 * Copyright (c) 2025 GDPR Manager
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ArrowRight, 
  CheckCircle2,
  XCircle,
  ChevronDown,
  AlertTriangle,
  Download,
  FileText
} from 'lucide-react';
import Logo from '@/components/Logo';
import { Footer } from '@/components/Footer';
import { exportDemoDocuments } from '@/lib/demo-export';
import { AuditMarkdown } from '@/components/audit/AuditMarkdown';

// Data o AI modelech - finální audity (po úpravách)
const aiModels = [
  {
    id: 'gemini',
    name: 'Google Gemini 3 Pro',
    company: 'Google DeepMind',
    iconBg: 'bg-white',
    cardBg: 'bg-slate-50',
    icon: '/ai-icons/gemini.svg',
    auditFile: '/audit/gemini-3-pro.md',
    verdict: 'PASS' as const,
    description: 'Nejvýkonnější model od Google DeepMind. Kombinuje multimodální schopnosti s pokročilým porozuměním jazyku a faktickou přesností.',
    details: [
      'Šablony odpovídají požadavkům zákona č. 110/2019 Sb.',
      'Kategorie osobních údajů jsou správně definovány',
      'Příjemci údajů jsou identifikováni v souladu s GDPR',
      'Bezpečnostní opatření jsou přiměřeně popsána',
    ],
  },
  {
    id: 'o3-pro',
    name: 'OpenAI o3-pro',
    company: 'OpenAI',
    iconBg: 'bg-white',
    cardBg: 'bg-slate-50',
    icon: '/ai-icons/openai.svg',
    auditFile: '/audit/openai-o3-pro.md',
    verdict: 'PASS' as const,
    description: 'Nejpokročilejší reasoning model od OpenAI. Specializuje se na komplexní analytické úlohy vyžadující hluboké porozumění kontextu a logické odvozování.',
    details: [
      'Struktura dokumentů odpovídá požadavkům GDPR',
      'Právní základy jsou správně přiřazeny k účelům zpracování',
      'Informace pro subjekty údajů jsou kompletní a srozumitelné',
      'Záznamy o činnostech obsahují všechny povinné náležitosti dle čl. 30',
    ],
  },
  {
    id: 'opus',
    name: 'Anthropic Claude Opus 4.5',
    company: 'Anthropic',
    iconBg: 'bg-white',
    cardBg: 'bg-slate-50',
    icon: '/ai-icons/claude.svg',
    auditFile: '/audit/claude-opus-4-5.md',
    verdict: 'PASS' as const,
    description: 'Vlajkový model společnosti Anthropic. Vyniká v přesnosti, bezpečnosti a schopnosti pracovat s rozsáhlými dokumenty a právními texty.',
    details: [
      'Dokumentace splňuje formální náležitosti dle Nařízení 2016/679',
      'Retenční lhůty jsou správně nastaveny podle účelů zpracování',
      'Práva subjektů údajů jsou vyčerpávajícím způsobem popsána',
      'Formulace jsou v souladu s českou právní terminologií',
    ],
  },
];

// Původní audit před úpravami
const originAudit = {
  id: 'gemini-origin',
  name: 'Google Gemini 3 Pro',
  company: 'Google DeepMind',
  subtitle: 'Původní audit (před úpravami)',
  iconBg: 'bg-white',
  cardBg: 'bg-red-50',
  icon: '/ai-icons/gemini.svg',
  auditFile: '/audit/gemini-3-pro_origin.md',
  verdict: 'FAIL' as const,
  description: 'Hloubkový právní audit, který odhalil kritické nedostatky v původní verzi šablon. Na základě tohoto auditu byl systém komplexně přepracován.',
  details: [
    'Chybný právní základ u cookies a analytiky (oprávněný zájem místo souhlasu)',
    'Nekonzistentní informace o transferech do USA (SCCs vs DPF)',
    'Chybný kontaktní email ÚOOÚ',
    'Rozpory v retenčních dobách mezi dokumenty',
  ],
};

export default function AuditPage() {
  const [expandedModel, setExpandedModel] = useState<string | null>(null);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isExportingDocx, setIsExportingDocx] = useState(false);
  const [auditContents, setAuditContents] = useState<Record<string, string>>({});
  const [loadingAudit, setLoadingAudit] = useState<string | null>(null);
  const [showMethodology, setShowMethodology] = useState(false);
  const [methodologyContent, setMethodologyContent] = useState<string>('');
  const [showOriginAudit, setShowOriginAudit] = useState(false);
  const [originAuditContent, setOriginAuditContent] = useState<string>('');

  const toggleModel = async (id: string) => {
    if (expandedModel === id) {
      setExpandedModel(null);
      return;
    }
    
    setExpandedModel(id);
    
    const model = aiModels.find(m => m.id === id);
    if (model && !auditContents[id]) {
      setLoadingAudit(id);
      try {
        const response = await fetch(model.auditFile);
        const content = await response.text();
        setAuditContents(prev => ({ ...prev, [id]: content }));
      } catch (error) {
        console.error('Chyba při načítání auditu:', error);
        setAuditContents(prev => ({ ...prev, [id]: 'Nepodařilo se načíst obsah auditu.' }));
      } finally {
        setLoadingAudit(null);
      }
    }
  };

  const toggleMethodology = async () => {
    if (!showMethodology && !methodologyContent) {
      try {
        const response = await fetch('/audit/prompt.md');
        const content = await response.text();
        setMethodologyContent(content);
      } catch (error) {
        console.error('Chyba při načítání metodologie:', error);
        setMethodologyContent('Nepodařilo se načíst metodologii.');
      }
    }
    setShowMethodology(!showMethodology);
  };

  const toggleOriginAudit = async () => {
    if (!showOriginAudit && !originAuditContent) {
      try {
        const response = await fetch(originAudit.auditFile);
        const content = await response.text();
        setOriginAuditContent(content);
      } catch (error) {
        console.error('Chyba při načítání původního auditu:', error);
        setOriginAuditContent('Nepodařilo se načíst audit.');
      }
    }
    setShowOriginAudit(!showOriginAudit);
  };

  const handleExportDemo = async (format: 'pdf' | 'docx') => {
    const setExporting = format === 'pdf' ? setIsExportingPdf : setIsExportingDocx;
    setExporting(true);
    try {
      await exportDemoDocuments(format);
    } catch (error) {
      console.error('Chyba při exportu demo dokumentů:', error);
      alert('Nepodařilo se exportovat vzorové dokumenty. Zkuste to prosím znovu.');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="py-4 px-4 border-b border-border/40">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <Logo className="h-9 w-9" />
            <span className="text-lg font-semibold text-primary">GDPR Manager</span>
          </Link>
        </div>
      </header>

      {/* Hero - čistý, jednoduchý */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Právní ověření šablon
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Šablony dokumentů prošly nezávislým auditem třemi AI modely. 
            Všechny potvrdily soulad s GDPR a zákonem č. 110/2019 Sb.
          </p>
          
          {/* Právní upozornění - inline, méně výrazné */}
          <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg text-sm">
            <AlertTriangle className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground">Upozornění:</span>{' '}
              Tento nástroj nenahrazuje právní poradenství. Pro specifické případy doporučujeme konzultaci s právníkem.
            </p>
          </div>
        </div>
      </section>

      {/* AI Modely - rozklikávací */}
      <section className="py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Výsledky auditu
          </h2>

          <div className="space-y-3">
            {aiModels.map((model) => (
              <Card 
                key={model.id} 
                className={`overflow-hidden transition-all duration-200 ${model.cardBg} border-0 ${
                  expandedModel === model.id ? 'ring-2 ring-primary/50' : ''
                }`}
              >
                <button
                  onClick={() => toggleModel(model.id)}
                  className="w-full text-left"
                >
                  <div className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 ${model.iconBg} rounded-full flex items-center justify-center shadow-sm`}>
                        <Image 
                          src={model.icon} 
                          alt={model.name} 
                          width={20} 
                          height={20}
                          className="w-5 h-5"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{model.name}</h3>
                        <p className="text-sm text-muted-foreground">{model.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${
                        model.verdict === 'PASS' 
                          ? 'text-emerald-700 bg-emerald-100' 
                          : 'text-red-700 bg-red-100'
                      }`}>
                        {model.verdict === 'PASS' ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5" />
                        )}
                        {model.verdict}
                      </span>
                      <ChevronDown 
                        className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
                          expandedModel === model.id ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>
                </button>

                {/* Expandovaný obsah */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedModel === model.id ? 'max-h-[800px] overflow-y-auto' : 'max-h-0'
                  }`}
                >
                  <div className="px-5 pb-5 pt-2 bg-white/80 border-t border-black/5">
                    <p className="text-sm text-muted-foreground mb-4">
                      {model.description}
                    </p>
                    
                    {loadingAudit === model.id ? (
                      <div className="bg-muted/30 rounded-lg p-6 text-center">
                        <p className="text-sm text-muted-foreground">Načítám audit...</p>
                      </div>
                    ) : auditContents[model.id] ? (
                      <div className="bg-slate-50 rounded-lg p-5 max-h-[500px] overflow-y-auto">
                        <AuditMarkdown content={auditContents[model.id]} />
                      </div>
                    ) : (
                      <div className="bg-muted/30 rounded-lg p-4">
                        <p className="text-sm font-medium text-foreground mb-3">Hlavní zjištění:</p>
                        <ul className="space-y-2">
                          {model.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-muted-foreground">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Metodologie - pod modely, diskrétní */}
          <div className="mt-6 pt-6 border-t border-border/50">
            <button
              onClick={toggleMethodology}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Metodologie auditu</span>
              <ChevronDown 
                className={`w-4 h-4 transition-transform duration-200 ${
                  showMethodology ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {showMethodology && (
              <div className="mt-4 bg-slate-50 rounded-lg p-5 max-h-[400px] overflow-y-auto">
                {methodologyContent ? (
                  <AuditMarkdown content={methodologyContent} />
                ) : (
                  <p className="text-sm text-muted-foreground">Načítám...</p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Původní audit - FAIL */}
      <section className="py-8 px-4 border-t border-border/30">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Proces ladění
            </h2>
            <p className="text-sm text-muted-foreground">
              Původní verze šablon prošla hloubkovým auditem, který odhalil kritické nedostatky. 
              Na základě těchto zjištění byl systém komplexně přepracován a následně úspěšně ověřen všemi třemi modely.
            </p>
          </div>

          <Card 
            className={`overflow-hidden transition-all duration-200 ${originAudit.cardBg} border-0 ${
              showOriginAudit ? 'ring-2 ring-red-200' : ''
            }`}
          >
            <button
              onClick={toggleOriginAudit}
              className="w-full text-left"
            >
              <div className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 ${originAudit.iconBg} rounded-full flex items-center justify-center shadow-sm`}>
                    <Image 
                      src={originAudit.icon} 
                      alt={originAudit.name} 
                      width={20} 
                      height={20}
                      className="w-5 h-5"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{originAudit.name}</h3>
                    <p className="text-sm text-muted-foreground">{originAudit.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full text-red-700 bg-red-100">
                    <XCircle className="w-3.5 h-3.5" />
                    FAIL
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
                      showOriginAudit ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </div>
            </button>

            <div 
              className={`overflow-hidden transition-all duration-300 ${
                showOriginAudit ? 'max-h-[800px] overflow-y-auto' : 'max-h-0'
              }`}
            >
              <div className="px-5 pb-5 pt-2 bg-white/80 border-t border-red-100">
                <p className="text-sm text-muted-foreground mb-4">
                  {originAudit.description}
                </p>
                
                {originAuditContent ? (
                  <div className="bg-slate-50 rounded-lg p-5 max-h-[500px] overflow-y-auto">
                    <AuditMarkdown content={originAuditContent} />
                  </div>
                ) : (
                  <div className="bg-red-50/50 rounded-lg p-4">
                    <p className="text-sm font-medium text-foreground mb-3">Kritické nedostatky:</p>
                    <ul className="space-y-2">
                      {originAudit.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Vzorové dokumenty - kompaktní */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Vzorové dokumenty
              </h2>
              <p className="text-sm text-muted-foreground">
                Stáhněte si ukázku všech 5 GDPR dokumentů s demonstračními daty.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => handleExportDemo('pdf')}
                disabled={isExportingPdf}
                size="sm"
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                {isExportingPdf ? 'Generuji...' : 'PDF'}
              </Button>
              <Button
                onClick={() => handleExportDemo('docx')}
                disabled={isExportingDocx}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                {isExportingDocx ? 'Generuji...' : 'DOCX'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - méně agresivní */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            Vytvořte si vlastní dokumentaci
          </h2>
          <p className="text-muted-foreground mb-6">
            5 jednoduchých kroků. Ověřené šablony připravené k použití.
          </p>
          <Link href="/wizard">
            <Button size="lg" className="gap-2">
              Spustit průvodce
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
