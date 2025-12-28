/*
 * Copyright (c) 2025 GDPR Manager
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 */

'use client';

import { ReactElement } from 'react';

interface AuditMarkdownProps {
  content: string;
}

export function AuditMarkdown({ content }: AuditMarkdownProps) {
  // Jednoduchý Markdown renderer pro audit dokumenty
  const lines = content.split('\n');
  const elements: ReactElement[] = [];

  let currentList: string[] = [];
  let inCodeBlock = false;
  let codeLines: string[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-1 my-3 ml-4">
          {currentList.map((item, i) => (
            <li key={i} className="text-sm" dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  const flushCodeBlock = () => {
    if (codeLines.length > 0) {
      elements.push(
        <pre key={`code-${elements.length}`} className="bg-slate-100 border-l-4 border-primary/30 p-4 rounded-r text-sm overflow-x-auto my-3 font-mono">
          <code className="font-mono">{codeLines.join('\n')}</code>
        </pre>
      );
      codeLines = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();

    // Code blocks
    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        flushCodeBlock();
        inCodeBlock = false;
      } else {
        flushList();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    if (!trimmed) {
      flushList();
      elements.push(<div key={`space-${elements.length}`} className="h-2" />);
      continue;
    }

    // H1
    if (trimmed.startsWith('# ')) {
      flushList();
      elements.push(
        <h1 key={`h1-${elements.length}`} className="text-2xl font-bold text-primary mt-6 mb-3">
          {trimmed.substring(2)}
        </h1>
      );
      continue;
    }

    // H2
    if (trimmed.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={`h2-${elements.length}`} className="text-xl font-semibold text-primary mt-5 mb-2">
          {trimmed.substring(3)}
        </h2>
      );
      continue;
    }

    // H3
    if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={`h3-${elements.length}`} className="text-lg font-semibold mt-4 mb-2">
          {trimmed.substring(4)}
        </h3>
      );
      continue;
    }

    // Horizontal rule
    if (trimmed.match(/^-{3,}$/)) {
      flushList();
      elements.push(<hr key={`hr-${elements.length}`} className="my-4 border-t-2" />);
      continue;
    }

    // List items
    if (trimmed.match(/^[•\-\*]\s/) || trimmed.match(/^\d+\.\s/)) {
      const text = trimmed.replace(/^[•\-\*]\s/, '').replace(/^\d+\.\s/, '');
      currentList.push(text);
      continue;
    }

    // Table rows (simple detection)
    if (trimmed.startsWith('|')) {
      flushList();
      // Skip table processing for now, just show as text
      elements.push(
        <p key={`p-${elements.length}`} className="text-sm font-mono bg-gray-50 p-1 my-1">
          {trimmed}
        </p>
      );
      continue;
    }

    // Regular paragraph
    flushList();
    
    // Check for special markers
    if (trimmed.startsWith('✓') || trimmed.startsWith('PASS')) {
      elements.push(
        <p key={`p-${elements.length}`} className="text-sm my-2 text-emerald-700 font-medium">
          {trimmed}
        </p>
      );
    } else if (trimmed.includes('FAIL') || trimmed.includes('výhrady')) {
      elements.push(
        <p key={`p-${elements.length}`} className="text-sm my-2 text-amber-700">
          {trimmed}
        </p>
      );
    } else {
      elements.push(
        <p key={`p-${elements.length}`} className="text-sm my-2 text-gray-700">
          {trimmed}
        </p>
      );
    }
  }

  flushList();
  flushCodeBlock();

  return (
    <div className="prose prose-sm max-w-none font-mono border-l-4 border-primary/30 pl-4">
      {elements}
    </div>
  );
}
