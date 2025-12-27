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
  title: 'GDPR dokumentace zdarma | Generátor pro firmy a OSVČ | GDPR Manager',
  description:
    'Generátor GDPR dokumentace zdarma ✓ Zásady zpracování osobních údajů, souhlasy, záznamy o činnostech. Pro firmy, OSVČ a e-shopy. Hotovo za 5 minut.',
  keywords: 'GDPR, GDPR dokumentace, zásady zpracování osobních údajů, GDPR pro firmy, GDPR pro OSVČ, GDPR vzor zdarma, ochrana osobních údajů, GDPR e-shop, GDPR checklist',
  authors: [{ name: 'GDPR Manager' }],
  metadataBase: new URL('https://gdpr-manager.cz'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'GDPR dokumentace zdarma | Generátor pro firmy a OSVČ',
    description: 'Generátor GDPR dokumentace zdarma ✓ Zásady zpracování osobních údajů, souhlasy, záznamy o činnostech. Pro firmy, OSVČ a e-shopy. Hotovo za 5 minut.',
    type: 'website',
    locale: 'cs_CZ',
    url: 'https://gdpr-manager.cz',
    siteName: 'GDPR Manager',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GDPR dokumentace zdarma | Generátor pro firmy a OSVČ',
    description: 'Generátor GDPR dokumentace zdarma ✓ Zásady zpracování osobních údajů, souhlasy, záznamy o činnostech. Pro firmy, OSVČ a e-shopy.',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo-icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

// Schema.org strukturovaná data pro lepší SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://gdpr-manager.cz/#webapp',
      name: 'GDPR Manager',
      url: 'https://gdpr-manager.cz',
      description: 'Generátor GDPR dokumentace pro české firmy a OSVČ. Zásady zpracování osobních údajů, souhlasy, záznamy o činnostech zpracování.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      browserRequirements: 'Requires JavaScript',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'CZK',
      },
      featureList: [
        'Zásady zpracování osobních údajů',
        'Informační povinnost',
        'Souhlas se zpracováním',
        'Záznamy o činnostech zpracování',
        'Export do PDF a DOCX',
      ],
      inLanguage: 'cs',
    },
    {
      '@type': 'Organization',
      '@id': 'https://gdpr-manager.cz/#organization',
      name: 'GDPR Manager',
      url: 'https://gdpr-manager.cz',
      logo: 'https://gdpr-manager.cz/logo-full.svg',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://gdpr-manager.cz/#website',
      url: 'https://gdpr-manager.cz',
      name: 'GDPR Manager',
      description: 'Generátor GDPR dokumentace zdarma pro firmy a OSVČ',
      publisher: {
        '@id': 'https://gdpr-manager.cz/#organization',
      },
      inLanguage: 'cs',
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://gdpr-manager.cz/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Musím mít GDPR dokumentaci jako OSVČ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ano, pokud zpracováváte osobní údaje zákazníků, klientů nebo zaměstnanců. GDPR se vztahuje na všechny podnikatele bez ohledu na velikost – od živnostníků až po velké korporace.',
          },
        },
        {
          '@type': 'Question',
          name: 'Je generátor GDPR dokumentace opravdu zdarma?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ano, 100% zdarma bez registrace a bez skrytých poplatků. Všechny dokumenty můžete stáhnout v PDF i DOCX formátu.',
          },
        },
        {
          '@type': 'Question',
          name: 'Jsou vygenerované GDPR dokumenty právně závazné?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Dokumenty jsou připraveny podle aktuální legislativy GDPR a odpovídají požadavkům Úřadu pro ochranu osobních údajů. Pro specifické právní rady doporučujeme konzultaci s právníkem.',
          },
        },
        {
          '@type': 'Question',
          name: 'Potřebuji GDPR dokumentaci pro e-shop?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Rozhodně ano. E-shopy zpracovávají velké množství osobních údajů – jména, adresy, e-maily, platební údaje. Musíte mít na webu zveřejněné zásady zpracování osobních údajů.',
          },
        },
        {
          '@type': 'Question',
          name: 'Jak často musím GDPR dokumenty aktualizovat?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Dokumenty byste měli aktualizovat vždy, když se změní způsob zpracování osobních údajů – například přidáte nový marketingový nástroj nebo změníte poskytovatele hostingu.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={`${inter.variable} ${sourceSerif.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
