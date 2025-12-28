/*
 * Copyright (c) 2025 GDPR Manager
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 */

'use client';

import { DEMO_WIZARD_DATA } from './demo-data';
import {
  generatePrivacyPolicy,
  generateInfoObligation,
  generateConsentForm,
  generateProcessingRecords,
  generateIncidentProcedure,
} from './document-generator';
import { exportAllToZip } from './export';

/**
 * Exportuje všechny vzorové GDPR dokumenty do ZIP souboru
 * Používá demonstrační data s placeholdery
 */
export async function exportDemoDocuments(format: 'pdf' | 'docx'): Promise<void> {
  const documents = [
    {
      filename: '1-zasady-zpracovani-osobnich-udaju',
      markdown: generatePrivacyPolicy(DEMO_WIZARD_DATA),
    },
    {
      filename: '2-informacni-povinnost',
      markdown: generateInfoObligation(DEMO_WIZARD_DATA),
    },
    {
      filename: '3-souhlas-se-zpracovanim',
      markdown: generateConsentForm(DEMO_WIZARD_DATA),
    },
    {
      filename: '4-zaznamy-o-cinnostech-zpracovani',
      markdown: generateProcessingRecords(DEMO_WIZARD_DATA),
    },
    {
      filename: '5-smernice-oznameni-incidentu',
      markdown: generateIncidentProcedure(DEMO_WIZARD_DATA),
    },
  ];

  await exportAllToZip(documents, format, 'gdpr-dokumentace-vzor');
}
