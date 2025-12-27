import type { Metadata } from 'next';
import { Inter, Source_Serif_4, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
});

const sourceSerif = Source_Serif_4({ 
  subsets: ['latin', 'latin-ext'],
  variable: '--font-serif',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin', 'latin-ext'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'GDPR Manager - Generátor GDPR dokumentace',
  description:
    'Vygenerujte si kompletní GDPR dokumentaci pro vaši firmu během několika minut. Zásady zpracování osobních údajů, souhlasy a záznamy o činnostech zpracování.',
  keywords: 'GDPR, osobní údaje, dokumentace, zásady zpracování, souhlas, OSVČ, firma, Česká republika',
  authors: [{ name: 'GDPR Manager' }],
  openGraph: {
    title: 'GDPR Manager - Generátor GDPR dokumentace',
    description: 'Vygenerujte si kompletní GDPR dokumentaci pro vaši firmu během několika minut.',
    type: 'website',
    locale: 'cs_CZ',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={`${inter.variable} ${sourceSerif.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
