/*
 * Copyright (c) 2025 GDPR Manager
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 */

'use client';

import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';
import { exportToPdfNew } from './pdf-generator';

// Parsování Markdown do struktury pro DOCX
function parseMarkdownForDocx(markdown: string): Paragraph[] {
  const lines = markdown.split('\n');
  const paragraphs: Paragraph[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      paragraphs.push(new Paragraph({ text: '' }));
      continue;
    }

    // H1
    if (trimmed.startsWith('# ')) {
      paragraphs.push(
        new Paragraph({
          text: trimmed.substring(2),
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
        })
      );
      continue;
    }

    // H2
    if (trimmed.startsWith('## ')) {
      paragraphs.push(
        new Paragraph({
          text: trimmed.substring(3),
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 150 },
        })
      );
      continue;
    }

    // H3
    if (trimmed.startsWith('### ')) {
      paragraphs.push(
        new Paragraph({
          text: trimmed.substring(4),
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 200, after: 100 },
        })
      );
      continue;
    }

    // Odrážka
    if (trimmed.startsWith('- ')) {
      paragraphs.push(
        new Paragraph({
          text: trimmed.substring(2),
          bullet: { level: 0 },
        })
      );
      continue;
    }

    // Číslovaný seznam
    const numberedMatch = trimmed.match(/^\d+\.\s+(.*)$/);
    if (numberedMatch) {
      paragraphs.push(
        new Paragraph({
          text: numberedMatch[1],
          numbering: { reference: 'default-numbering', level: 0 },
        })
      );
      continue;
    }

    // Tučný text
    if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: trimmed.slice(2, -2),
              bold: true,
            }),
          ],
        })
      );
      continue;
    }

    // Kurzíva
    if (trimmed.startsWith('*') && trimmed.endsWith('*') && !trimmed.startsWith('**')) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: trimmed.slice(1, -1),
              italics: true,
            }),
          ],
        })
      );
      continue;
    }

    // Horizontální čára
    if (trimmed === '---') {
      paragraphs.push(
        new Paragraph({
          text: '',
          border: {
            bottom: { style: 'single' as const, size: 6, color: 'auto' },
          },
          spacing: { before: 200, after: 200 },
        })
      );
      continue;
    }

    // Tabulka (zjednodušeno - převedeme na text)
    if (trimmed.startsWith('|')) {
      const cells = trimmed.split('|').filter(c => c.trim() && !c.includes('---'));
      if (cells.length > 0) {
        paragraphs.push(
          new Paragraph({
            children: cells.map((cell, i) => 
              new TextRun({
                text: (i > 0 ? ' | ' : '') + cell.trim(),
              })
            ),
          })
        );
      }
      continue;
    }

    // Běžný odstavec - zpracování inline formátování
    const children: TextRun[] = [];
    
    // Jednoduchý regex pro tučný text
    const boldRegex = /\*\*([^*]+)\*\*/g;
    let lastIndex = 0;
    let match;

    while ((match = boldRegex.exec(trimmed)) !== null) {
      if (match.index > lastIndex) {
        children.push(new TextRun({ text: trimmed.slice(lastIndex, match.index) }));
      }
      children.push(new TextRun({ text: match[1], bold: true }));
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < trimmed.length) {
      children.push(new TextRun({ text: trimmed.slice(lastIndex) }));
    }

    if (children.length > 0) {
      paragraphs.push(new Paragraph({ children }));
    } else {
      paragraphs.push(new Paragraph({ text: trimmed }));
    }
  }

  return paragraphs;
}

// Export do DOCX
export async function exportToDocx(markdown: string, filename: string): Promise<void> {
  const paragraphs = parseMarkdownForDocx(markdown);

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: paragraphs,
      },
    ],
    numbering: {
      config: [
        {
          reference: 'default-numbering',
          levels: [
            {
              level: 0,
              format: 'decimal' as const,
              text: '%1.',
              alignment: AlignmentType.START,
            },
          ],
        },
      ],
    },
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${filename}.docx`);
}

// Export do PDF pomocí @react-pdf/renderer
export async function exportToPdf(markdown: string, filename: string): Promise<void> {
  await exportToPdfNew(markdown, filename);
}

// Jednoduchý Markdown -> HTML konvertor
function markdownToHtml(markdown: string): string {
  let html = markdown
    // Escape HTML
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    
    // Nadpisy
    .replace(/^### (.+)$/gm, '<h3 style="color: #1e3a5f; margin-top: 1.5em; margin-bottom: 0.5em;">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="color: #1e3a5f; margin-top: 2em; margin-bottom: 0.75em; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.25em;">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 style="color: #1e3a5f; margin-bottom: 1em; font-size: 1.75em;">$1</h1>')
    
    // Tučný text
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    
    // Kurzíva
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    
    // Odrážky
    .replace(/^- (.+)$/gm, '<li style="margin-left: 1.5em;">$1</li>')
    
    // Číslované seznamy
    .replace(/^\d+\. (.+)$/gm, '<li style="margin-left: 1.5em;">$1</li>')
    
    // Horizontální čára
    .replace(/^---$/gm, '<hr style="border: none; border-top: 1px solid #e2e8f0; margin: 1.5em 0;">')
    
    // Checkbox
    .replace(/☐/g, '☐')
    
    // Odstavce
    .replace(/\n\n/g, '</p><p style="margin-bottom: 0.75em;">')
    
    // Nové řádky
    .replace(/\n/g, '<br>');

  // Zabalení tabulek
  html = html.replace(/(\|.+\|<br>)+/g, (match) => {
    const rows = match.split('<br>').filter(r => r.trim());
    let tableHtml = '<table style="width: 100%; border-collapse: collapse; margin: 1em 0;">';
    
    rows.forEach((row, index) => {
      if (row.includes('---')) return;
      const cells = row.split('|').filter(c => c.trim());
      const tag = index === 0 ? 'th' : 'td';
      const style = index === 0 
        ? 'background: #f1f5f9; font-weight: bold; padding: 8px; border: 1px solid #e2e8f0; text-align: left;'
        : 'padding: 8px; border: 1px solid #e2e8f0;';
      
      tableHtml += '<tr>';
      cells.forEach(cell => {
        tableHtml += `<${tag} style="${style}">${cell.trim()}</${tag}>`;
      });
      tableHtml += '</tr>';
    });
    
    tableHtml += '</table>';
    return tableHtml;
  });

  return `<div style="font-family: 'Segoe UI', sans-serif; color: #1e3a5f; max-width: 100%; word-wrap: break-word; overflow-wrap: break-word;"><p style="margin-bottom: 0.75em; word-wrap: break-word;">${html}</p></div>`;
}

// Vytvoření DOCX blob bez stažení
async function createDocxBlob(markdown: string): Promise<Blob> {
  const paragraphs = parseMarkdownForDocx(markdown);

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: paragraphs,
      },
    ],
    numbering: {
      config: [
        {
          reference: 'default-numbering',
          levels: [
            {
              level: 0,
              format: 'decimal' as const,
              text: '%1.',
              alignment: AlignmentType.START,
            },
          ],
        },
      ],
    },
  });

  return await Packer.toBlob(doc);
}

// Vytvoření PDF blob bez stažení
async function createPdfBlob(markdown: string): Promise<Blob> {
  const html2pdf = (await import('html2pdf.js')).default;
  
  const html = markdownToHtml(markdown);
  
  const container = document.createElement('div');
  container.innerHTML = html;
  container.style.cssText = `
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 11pt;
    line-height: 1.5;
    color: #1e3a5f;
    padding: 0;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    word-wrap: break-word;
    overflow-wrap: break-word;
  `;

  const opt = {
    margin: [15, 15, 15, 15] as [number, number, number, number],
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: { 
      scale: 2, 
      useCORS: true,
      windowWidth: 794,
      width: 794
    },
    jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] as ('avoid-all' | 'css' | 'legacy')[] }
  };

  return await html2pdf().set(opt).from(container).outputPdf('blob');
}

// Export všech dokumentů do ZIP
export async function exportAllToZip(
  documents: { filename: string; markdown: string }[],
  format: 'pdf' | 'docx',
  zipFilename: string
): Promise<void> {
  const JSZip = (await import('jszip')).default;
  const zip = new JSZip();

  for (const doc of documents) {
    let blob: Blob;
    const ext = format === 'pdf' ? 'pdf' : 'docx';
    
    if (format === 'pdf') {
      blob = await createPdfBlob(doc.markdown);
    } else {
      blob = await createDocxBlob(doc.markdown);
    }
    
    zip.file(`${doc.filename}.${ext}`, blob);
  }

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  saveAs(zipBlob, `${zipFilename}-${format}.zip`);
}
