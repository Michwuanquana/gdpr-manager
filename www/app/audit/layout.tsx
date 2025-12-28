/*
 * Copyright (c) 2025 GDPR Manager
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 */

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Právní ověření šablon | AI Audit | GDPR Manager',
  description: 'Šablony GDPR dokumentů prošly nezávislým auditem modely OpenAI o3-pro, Anthropic Claude Opus 4.5 a Google Gemini 3 Pro. Ověřený soulad s GDPR a zákonem č. 110/2019 Sb.',
  keywords: 'GDPR audit, právní ověření, AI audit, o3-pro, Claude Opus, Gemini, GDPR dokumentace, zákon 110/2019',
  alternates: {
    canonical: '/audit',
  },
  openGraph: {
    title: 'AI audit potvrdil soulad s GDPR | GDPR Manager',
    description: 'Nezávislé ověření třemi nejpokročilejšími AI modely. Šablony odpovídají požadavkům GDPR a českého zákona.',
    type: 'website',
    locale: 'cs_CZ',
    url: 'https://gdpr-manager.cz/audit',
    siteName: 'GDPR Manager',
  },
  twitter: {
    card: 'summary',
    title: 'Právní ověření šablon | GDPR Manager',
    description: 'Šablony GDPR dokumentů prošly nezávislým AI auditem.',
  },
};

export default function AuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
