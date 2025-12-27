'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Lock, FileText, ArrowRight } from 'lucide-react';
import Logo from '@/components/Logo';
import { Footer } from '@/components/Footer';
import { DonateModal } from '@/components/DonateModal';

export default function Home() {
  const [showDonateModal, setShowDonateModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <header className="py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <Logo className="h-10 w-10" />
          <span className="text-xl font-semibold text-primary">GDPR Manager</span>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            100% zdarma, bez registrace
            <span className="mx-1">•</span>
            <button 
              onClick={() => setShowDonateModal(true)}
              className="underline hover:text-emerald-600 transition-colors cursor-pointer"
            >
              Proč zadarmo?
            </button>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
            GDPR dokumentace
            <br />
            <span className="text-emerald-600">za 5 minut</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Projděte jednoduchým průvodcem a získejte kompletní GDPR dokumenty připravené 
            k použití. Pro české firmy, živnostníky a weby.
          </p>

          <Link href="/wizard">
            <Button size="lg" className="text-lg px-8 py-6 h-auto gap-2">
              Začít generovat dokumenty
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Výhody */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-primary mb-12">
            Proč GDPR Manager?
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Rychle a jednoduše</h3>
                <p className="text-sm text-muted-foreground">
                  5 jednoduchých kroků a máte hotovo. Žádné složité právnické formuláře.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Soukromí na prvním místě</h3>
                <p className="text-sm text-muted-foreground">
                  Vaše data zůstávají jen ve vašem prohlížeči. Nic se nikam neposílá.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Export do PDF i DOCX</h3>
                <p className="text-sm text-muted-foreground">
                  Stáhněte dokumenty v profesionálním formátu připraveném k použití.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Dokumenty */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-primary mb-4">
            Jaké dokumenty získáte?
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Kompletní sada GDPR dokumentů přizpůsobená vašemu podnikání
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Zásady zpracování osobních údajů</h3>
                    <p className="text-sm text-muted-foreground">
                      Kompletní dokument pro zveřejnění na webu. Obsahuje vše, co vyžaduje GDPR.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Informační povinnost</h3>
                    <p className="text-sm text-muted-foreground">
                      Zkrácená verze pro přiložení k formulářům a objednávkám.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Souhlas se zpracováním</h3>
                    <p className="text-sm text-muted-foreground">
                      Vzor souhlasu pro marketing včetně textu pro checkbox.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Záznamy o činnostech zpracování</h3>
                    <p className="text-sm text-muted-foreground">
                      Interní dokument vyžadovaný článkem 30 GDPR.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">
            Připraveni splnit GDPR?
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            Začněte hned a mějte dokumenty hotové během pár minut.
          </p>
          <Link href="/wizard">
            <Button size="lg" variant="secondary" className="text-lg px-8 gap-2">
              Spustit průvodce
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />

      <DonateModal
        isOpen={showDonateModal}
        onClose={() => setShowDonateModal(false)}
        onAction={() => setShowDonateModal(false)}
        actionText="Rozumím, jdu na to!"
        title="Proč je to zadarmo?"
        description={
          <>
            <p>
              Ahoj! Jsem Adam a tohle je můj způsob, jak pomoct malým firmám a živnostníkům.
            </p>
            <p>
              Vím, jak otravné je řešit GDPR. Právníci jsou drazí, vzory na internetu jsou 
              buď zastaralé, nebo vypadají, jako by je psal robot pro roboty. A přitom to 
              většina z nás potřebuje jen &bdquo;mít v pořádku&ldquo;.
            </p>
            <p>
              Tak jsem to udělal jednoduše – <strong>žádná registrace, žádné skryté poplatky, 
              žádné &bdquo;premium funkce&ldquo;</strong>. Prostě to použijte a mějte klid.
            </p>
            <p className="text-gray-800 font-medium">
              Pokud vám to pomohlo a chcete mi hodit kafe (nebo dvě ☕), budu rád. 
              Ale není to povinné – důležité je, že vám to funguje.
            </p>
          </>
        }
      />
    </div>
  );
}
