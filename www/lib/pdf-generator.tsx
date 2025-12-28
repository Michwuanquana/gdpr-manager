/*
 * Copyright (c) 2025 GDPR Manager
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 */

'use client';

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

// Registrace Inter fontu z lokálních souborů
Font.register({
  family: 'Inter',
  fonts: [
    {
      src: '/fonts/static/Inter_18pt-Regular.ttf',
      fontWeight: 'normal',
    },
    {
      src: '/fonts/static/Inter_18pt-Bold.ttf',
      fontWeight: 'bold',
    },
  ],
});

// Definice stylů pro PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    lineHeight: 1.5,
    fontFamily: 'Inter',
    color: '#1e3a5f',
  },
  h1: {
    fontSize: 18,
    marginBottom: 16,
    fontWeight: 'bold',
    color: '#1e3a5f',
  },
  h2: {
    fontSize: 14,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#1e3a5f',
    borderBottom: '2 solid #e2e8f0',
    paddingBottom: 4,
  },
  h3: {
    fontSize: 12,
    marginTop: 16,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#1e3a5f',
  },
  paragraph: {
    marginBottom: 10,
    textAlign: 'justify',
  },
  list: {
    marginBottom: 10,
  },
  listItem: {
    marginBottom: 4,
    marginLeft: 16,
    flexDirection: 'row',
  },
  bullet: {
    width: 12,
  },
  listText: {
    flex: 1,
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
  footer: {
    marginTop: 20,
    paddingTop: 10,
    borderTop: '1 solid #e2e8f0',
    fontSize: 10,
    color: '#64748b',
  },
  table: {
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  tableHeader: {
    backgroundColor: '#f1f5f9',
    fontWeight: 'bold',
  },
  tableCell: {
    padding: 8,
    fontSize: 10,
  },
  tableCellHeader: {
    padding: 8,
    fontSize: 10,
    fontWeight: 'bold',
  },
  hr: {
    marginTop: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  signatureSection: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signatureBox: {
    width: '45%',
  },
  signatureLine: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#1e3a5f',
    paddingTop: 4,
    fontSize: 9,
    textAlign: 'center',
  },
});

// Typ pro markdown elementy
type MarkdownElement = {
  type: 'h1' | 'h2' | 'h3' | 'paragraph' | 'list' | 'hr' | 'table';
  content?: string;
  items?: string[];
  tableData?: { headers: string[]; rows: string[][] };
};

// Parsování Markdown do struktury
function parseMarkdown(markdown: string): MarkdownElement[] {
  const lines = markdown.split('\n');
  const elements: MarkdownElement[] = [];
  let currentList: string[] = [];
  let inTable = false;
  let tableHeaders: string[] = [];
  let tableRows: string[][] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push({ type: 'list', items: currentList });
      currentList = [];
    }
  };

  const flushTable = () => {
    if (tableHeaders.length > 0) {
      elements.push({ type: 'table', tableData: { headers: tableHeaders, rows: tableRows } });
      tableHeaders = [];
      tableRows = [];
      inTable = false;
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      flushTable();
      continue;
    }

    // Tabulka
    if (trimmed.startsWith('|')) {
      if (trimmed.includes('---')) continue; // Separator řádek
      
      const cells = trimmed.split('|').filter(c => c.trim()).map(c => c.trim());
      
      if (!inTable) {
        tableHeaders = cells;
        inTable = true;
      } else {
        tableRows.push(cells);
      }
      continue;
    } else {
      flushTable();
    }

    // H1
    if (trimmed.startsWith('# ')) {
      flushList();
      elements.push({ type: 'h1', content: trimmed.substring(2) });
      continue;
    }

    // H2
    if (trimmed.startsWith('## ')) {
      flushList();
      elements.push({ type: 'h2', content: trimmed.substring(3) });
      continue;
    }

    // H3
    if (trimmed.startsWith('### ')) {
      flushList();
      elements.push({ type: 'h3', content: trimmed.substring(4) });
      continue;
    }

    // Horizontální čára
    if (trimmed === '---') {
      flushList();
      elements.push({ type: 'hr' });
      continue;
    }

    // Seznam
    if (trimmed.startsWith('- ') || trimmed.match(/^\d+\.\s/)) {
      const text = trimmed.startsWith('- ') ? trimmed.substring(2) : trimmed.replace(/^\d+\.\s/, '');
      currentList.push(text);
      continue;
    } else {
      flushList();
    }

    // Paragraph
    elements.push({ type: 'paragraph', content: trimmed });
  }

  flushList();
  flushTable();

  return elements;
}

// Formátování textu (zpracování ** a *)
function formatText(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Bold **text**
    const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
    if (boldMatch && boldMatch.index !== undefined) {
      if (boldMatch.index > 0) {
        parts.push(<Text key={key++}>{remaining.substring(0, boldMatch.index)}</Text>);
      }
      parts.push(
        <Text key={key++} style={styles.bold}>
          {boldMatch[1]}
        </Text>
      );
      remaining = remaining.substring(boldMatch.index + boldMatch[0].length);
      continue;
    }

    // Italic *text* (ale ne **)
    const italicMatch = remaining.match(/(?<!\*)\*([^*]+)\*(?!\*)/);
    if (italicMatch && italicMatch.index !== undefined) {
      if (italicMatch.index > 0) {
        parts.push(<Text key={key++}>{remaining.substring(0, italicMatch.index)}</Text>);
      }
      parts.push(
        <Text key={key++} style={styles.italic}>
          {italicMatch[1]}
        </Text>
      );
      remaining = remaining.substring(italicMatch.index + italicMatch[0].length);
      continue;
    }

    // Žádný match, přidat zbytek
    parts.push(<Text key={key++}>{remaining}</Text>);
    break;
  }

  return parts;
}

// Komponenta PDF dokumentu
const PDFDocument: React.FC<{ markdown: string }> = ({ markdown }) => {
  const elements = parseMarkdown(markdown);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {elements.map((element, index) => {
          switch (element.type) {
            case 'h1':
              return (
                <Text key={index} style={styles.h1}>
                  {element.content}
                </Text>
              );
            case 'h2':
              return (
                <Text key={index} style={styles.h2}>
                  {element.content}
                </Text>
              );
            case 'h3':
              return (
                <Text key={index} style={styles.h3}>
                  {element.content}
                </Text>
              );
            case 'paragraph':
              return (
                <Text key={index} style={styles.paragraph}>
                  {formatText(element.content || '')}
                </Text>
              );
            case 'list':
              return (
                <View key={index} style={styles.list}>
                  {element.items?.map((item, i) => (
                    <View key={i} style={styles.listItem}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.listText}>{formatText(item)}</Text>
                    </View>
                  ))}
                </View>
              );
            case 'hr':
              return <View key={index} style={styles.hr} />;
            case 'table':
              return (
                <View key={index} style={styles.table}>
                  {/* Header row */}
                  <View style={[styles.tableRow, styles.tableHeader]}>
                    {element.tableData?.headers.map((header, i) => (
                      <Text
                        key={i}
                        style={[
                          styles.tableCellHeader,
                          { width: `${100 / element.tableData!.headers.length}%` },
                        ]}
                      >
                        {header}
                      </Text>
                    ))}
                  </View>
                  {/* Data rows */}
                  {element.tableData?.rows.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.tableRow}>
                      {row.map((cell, cellIndex) => (
                        <Text
                          key={cellIndex}
                          style={[
                            styles.tableCell,
                            { width: `${100 / element.tableData!.headers.length}%` },
                          ]}
                        >
                          {formatText(cell)}
                        </Text>
                      ))}
                    </View>
                  ))}
                </View>
              );
            default:
              return null;
          }
        })}
      </Page>
    </Document>
  );
};

// Export funkce
export async function exportToPdfNew(markdown: string, filename: string): Promise<void> {
  const blob = await pdf(<PDFDocument markdown={markdown} />).toBlob();
  saveAs(blob, `${filename}.pdf`);
}
