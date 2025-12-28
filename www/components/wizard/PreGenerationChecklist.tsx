/*
 * Copyright (c) 2025 GDPR Manager
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 */

'use client';

import { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WizardData } from '@/lib/types';
import {
  validateChecklist,
  hasBlockingErrors,
  groupByCategory,
  CATEGORY_LABELS,
  ChecklistItem,
  ChecklistCategory,
} from '@/lib/checklist-validation';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  ChevronLeft,
  FileCheck,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

interface PreGenerationChecklistProps {
  data: WizardData;
  onBack: () => void;
  onGenerate: () => void;
  onGoToStep: (step: number) => void;
}

const STATUS_ICONS: Record<string, React.ReactNode> = {
  ok: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
  error: <XCircle className="w-5 h-5 text-red-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
};

const STATUS_STYLES: Record<string, string> = {
  ok: 'bg-emerald-50 border-emerald-200',
  warning: 'bg-amber-50 border-amber-200',
  error: 'bg-red-50 border-red-200',
  info: 'bg-blue-50 border-blue-200',
};

export function PreGenerationChecklist({
  data,
  onBack,
  onGenerate,
  onGoToStep,
}: PreGenerationChecklistProps) {
  const checklistItems = useMemo(() => validateChecklist(data), [data]);
  const groupedItems = useMemo(() => groupByCategory(checklistItems), [checklistItems]);
  const hasErrors = useMemo(() => hasBlockingErrors(checklistItems), [checklistItems]);

  const okCount = checklistItems.filter(i => i.status === 'ok').length;
  const warningCount = checklistItems.filter(i => i.status === 'warning').length;
  const errorCount = checklistItems.filter(i => i.status === 'error').length;

  const categoryOrder: ChecklistCategory[] = [
    'identification',
    'processing',
    'recipients',
    'post_generation',
  ];

  const renderItem = (item: ChecklistItem) => (
    <div
      key={item.id}
      className={`flex items-start gap-3 p-3 rounded-lg border ${STATUS_STYLES[item.status]}`}
    >
      <div className="flex-shrink-0 mt-0.5">{STATUS_ICONS[item.status]}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-sm font-medium ${
            item.status === 'error' ? 'text-red-800' :
            item.status === 'warning' ? 'text-amber-800' :
            item.status === 'info' ? 'text-blue-800' :
            'text-emerald-800'
          }`}>
            {item.label}
          </span>
          {item.status === 'error' && (
            <span className="text-xs bg-red-200 text-red-800 px-1.5 py-0.5 rounded">
              Povinné
            </span>
          )}
        </div>
        {item.detail && (
          <p className={`text-xs mt-1 ${
            item.status === 'warning' ? 'text-amber-700' :
            item.status === 'info' ? 'text-blue-700' :
            'text-muted-foreground'
          }`}>
            {item.detail}
          </p>
        )}
      </div>
      {item.linkToStep !== undefined && item.status !== 'ok' && item.status !== 'info' && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onGoToStep(item.linkToStep!)}
          className="flex-shrink-0 text-xs h-7"
        >
          Doplnit
        </Button>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          <FileCheck className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-primary mb-2">
          Kontrola před vygenerováním
        </h2>
        <p className="text-muted-foreground">
          Zkontrolujte, že máte vše potřebné pro kompletní GDPR dokumentaci.
        </p>
      </div>

      {/* Summary badges */}
      <div className="flex justify-center gap-4 flex-wrap">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-sm">
          <CheckCircle2 className="w-4 h-4" />
          {okCount} v pořádku
        </div>
        {warningCount > 0 && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-800 rounded-full text-sm">
            <AlertTriangle className="w-4 h-4" />
            {warningCount} volitelné
          </div>
        )}
        {errorCount > 0 && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-800 rounded-full text-sm">
            <XCircle className="w-4 h-4" />
            {errorCount} chybí
          </div>
        )}
      </div>

      {/* Checklist categories */}
      <div className="space-y-6">
        {categoryOrder.map((category) => {
          const items = groupedItems[category];
          if (!items?.length) return null;

          return (
            <Card key={category} className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-primary">
                  {CATEGORY_LABELS[category]}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {items.map(renderItem)}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* AI Audit badge */}
      <div className="bg-gradient-to-r from-primary/5 to-emerald-50 border border-primary/20 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-primary flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-primary">
              Šablony ověřeny nezávislým AI právním auditem
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              o3-pro, Claude Opus 4.5, Gemini 2.5 Pro
            </p>
          </div>
          <a
            href="/audit"
            target="_blank"
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            Více info
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Error message if blocking */}
      {hasErrors && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex gap-3">
            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-800">
                Před generováním doplňte povinné údaje
              </p>
              <p className="text-xs text-red-700 mt-1">
                Klikněte na &quot;Doplnit&quot; u červeně označených položek.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ChevronLeft className="w-4 h-4" />
          Zpět
        </Button>
        <Button
          onClick={onGenerate}
          disabled={hasErrors}
          className="gap-2"
        >
          <FileCheck className="w-4 h-4" />
          Vygenerovat dokumenty
        </Button>
      </div>
    </div>
  );
}
