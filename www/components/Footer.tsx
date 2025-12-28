/*
 * Copyright (c) 2025 GDPR Manager
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 */

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="py-12 px-4 bg-muted/30 border-t">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo a popis */}
          <div className="md:col-span-2">
            <p className="font-semibold text-foreground text-lg mb-2">GDPR Manager</p>
            <p className="text-sm text-muted-foreground mb-4">
              Bezplatný generátor GDPR dokumentace pro české firmy, živnostníky a e-shopy. 
              Vytvořte si zásady zpracování osobních údajů, souhlasy a další dokumenty za 5 minut.
            </p>
            <p className="text-sm text-muted-foreground">
              Vytvořil{' '}
              <a 
                href="https://adam.porybny.cz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Adam Porybný
              </a>
            </p>
          </div>
          
          {/* Rychlé odkazy */}
          <div>
            <p className="font-semibold text-foreground mb-3">Nástroje</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/wizard" className="text-muted-foreground hover:text-primary transition-colors">
                  Generátor dokumentů
                </Link>
              </li>
              <li>
                <Link href="/audit" className="text-muted-foreground hover:text-primary transition-colors">
                  Právní ověření
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-muted-foreground hover:text-primary transition-colors">
                  Časté dotazy
                </Link>
              </li>
              <li>
                <Link href="/#dokumenty" className="text-muted-foreground hover:text-primary transition-colors">
                  Přehled dokumentů
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Kontakt */}
          <div>
            <p className="font-semibold text-foreground mb-3">Kontakt</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="mailto:adam&#64;porybny.cz"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  adam&#64;porybny.cz
                </a>
              </li>
              <li>
                <a 
                  href="https://adam.porybny.cz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  adam.porybny.cz
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Spodní lišta */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>
            Open source · MIT License ·{' '}
            <a 
              href="https://github.com/Michwuanquana/gdpr-manager" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              GitHub
            </a>
          </p>
          <p className="text-xs text-center md:text-right">
            Dokumenty jsou generovány na základě vašich odpovědí. 
            Pro specifické právní rady doporučujeme konzultaci s právníkem.
          </p>
        </div>
      </div>
    </footer>
  );
}
