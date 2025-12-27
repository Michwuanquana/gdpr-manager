'use client';

import { WizardData } from '@/lib/types';
import {
  generatePrivacyPolicy,
  generateInfoObligation,
  generateConsentForm,
  generateProcessingRecords,
} from '@/lib/document-generator';

interface DocumentPreviewProps {
  data: WizardData;
  documentType: 'privacy' | 'info' | 'consent' | 'records';
}

export function DocumentPreview({ data, documentType }: DocumentPreviewProps) {
  const getDocument = () => {
    switch (documentType) {
      case 'privacy':
        return generatePrivacyPolicy(data);
      case 'info':
        return generateInfoObligation(data);
      case 'consent':
        return generateConsentForm(data);
      case 'records':
        return generateProcessingRecords(data);
    }
  };

  const markdown = getDocument();

  // Jednoduchý Markdown renderer
  const renderMarkdown = (md: string) => {
    const lines = md.split('\n');
    const elements: JSX.Element[] = [];
    let listItems: string[] = [];

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-1 my-2">
            {listItems.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            ))}
          </ul>
        );
        listItems = [];
      }
    };

    const formatInline = (text: string) => {
      return text
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>');
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      if (!trimmed) {
        flushList();
        return;
      }

      if (trimmed.startsWith('# ')) {
        flushList();
        elements.push(
          <h1 key={index} className="text-2xl font-bold text-primary mt-6 mb-4">
            {trimmed.substring(2)}
          </h1>
        );
        return;
      }

      if (trimmed.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={index} className="text-xl font-semibold text-primary mt-5 mb-3 border-b pb-2">
            {trimmed.substring(3)}
          </h2>
        );
        return;
      }

      if (trimmed.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={index} className="text-lg font-semibold text-primary mt-4 mb-2">
            {trimmed.substring(4)}
          </h3>
        );
        return;
      }

      if (trimmed.startsWith('- ')) {
        listItems.push(trimmed.substring(2));
        return;
      }

      if (trimmed === '---') {
        flushList();
        elements.push(<hr key={index} className="my-4 border-border" />);
        return;
      }

      if (trimmed.startsWith('|')) {
        flushList();
        // Jednoduchá tabulka
        const cells = trimmed.split('|').filter((c) => c.trim() && !c.includes('---'));
        if (cells.length > 0) {
          elements.push(
            <div key={index} className="flex gap-2 py-1 text-sm">
              {cells.map((cell, i) => (
                <span
                  key={i}
                  className={i === 0 ? 'font-semibold min-w-[200px]' : 'flex-1'}
                  dangerouslySetInnerHTML={{ __html: formatInline(cell.trim()) }}
                />
              ))}
            </div>
          );
        }
        return;
      }

      flushList();
      elements.push(
        <p
          key={index}
          className="my-2"
          dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }}
        />
      );
    });

    flushList();
    return elements;
  };

  return (
    <div className="prose prose-sm max-w-none text-foreground">
      {renderMarkdown(markdown)}
    </div>
  );
}
