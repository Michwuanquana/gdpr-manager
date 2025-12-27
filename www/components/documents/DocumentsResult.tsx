'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WizardData } from '@/lib/types';
import { DocumentPreview } from './DocumentPreview';
import {
  generatePrivacyPolicy,
  generateInfoObligation,
  generateConsentForm,
  generateProcessingRecords,
} from '@/lib/document-generator';
import { exportToPdf, exportToDocx, exportAllToZip } from '@/lib/export';
import { CheckCircle2, ChevronLeft, RotateCcw, Archive } from 'lucide-react';
import { DonateModal } from '@/components/DonateModal';

interface DocumentsResultProps {
  data: WizardData;
  onBack: () => void;
}

type DocumentType = 'privacy' | 'info' | 'consent' | 'records';

interface DocumentInfo {
  id: DocumentType;
  title: string;
  description: string;
  filename: string;
  generator: (data: WizardData) => string;
}

const documents: DocumentInfo[] = [
  {
    id: 'privacy',
    title: 'Zásady zpracování osobních údajů',
    description: 'Kompletní dokument pro zveřejnění na webu',
    filename: 'zasady-zpracovani-osobnich-udaju',
    generator: generatePrivacyPolicy,
  },
  {
    id: 'info',
    title: 'Informační povinnost',
    description: 'Zkrácená verze pro formuláře a objednávky',
    filename: 'informacni-povinnost',
    generator: generateInfoObligation,
  },
  {
    id: 'consent',
    title: 'Souhlas se zpracováním OÚ',
    description: 'Vzor souhlasu pro marketing',
    filename: 'souhlas-se-zpracovanim',
    generator: generateConsentForm,
  },
  {
    id: 'records',
    title: 'Záznamy o činnostech zpracování',
    description: 'Interní dokument dle čl. 30 GDPR',
    filename: 'zaznamy-o-cinnostech-zpracovani',
    generator: generateProcessingRecords,
  },
];

export function DocumentsResult({ data, onBack }: DocumentsResultProps) {
  const [activeDocument, setActiveDocument] = useState<DocumentType>('privacy');
  const [isExporting, setIsExporting] = useState(false);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [pendingExport, setPendingExport] = useState<{ type: 'single' | 'all', format: 'pdf' | 'docx', doc?: DocumentInfo } | null>(null);
  const [hasShownModal, setHasShownModal] = useState(false);

  const handleExportPdf = async (doc: DocumentInfo) => {
    if (!hasShownModal) {
      setPendingExport({ type: 'single', format: 'pdf', doc });
      setShowDonateModal(true);
      setHasShownModal(true);
    } else {
      await executeExport({ type: 'single', format: 'pdf', doc });
    }
  };

  const handleExportDocx = async (doc: DocumentInfo) => {
    if (!hasShownModal) {
      setPendingExport({ type: 'single', format: 'docx', doc });
      setShowDonateModal(true);
      setHasShownModal(true);
    } else {
      await executeExport({ type: 'single', format: 'docx', doc });
    }
  };

  const handleExportAll = async (format: 'pdf' | 'docx') => {
    if (!hasShownModal) {
      setPendingExport({ type: 'all', format });
      setShowDonateModal(true);
      setHasShownModal(true);
    } else {
      await executeExport({ type: 'all', format });
    }
  };

  const executeExport = async (exportConfig: { type: 'single' | 'all', format: 'pdf' | 'docx', doc?: DocumentInfo }) => {
    setIsExporting(true);
    try {
      if (exportConfig.type === 'single' && exportConfig.doc) {
        const markdown = exportConfig.doc.generator(data);
        if (exportConfig.format === 'pdf') {
          await exportToPdf(markdown, exportConfig.doc.filename);
        } else {
          await exportToDocx(markdown, exportConfig.doc.filename);
        }
      } else if (exportConfig.type === 'all') {
        const docsToExport = documents.map(doc => ({
          filename: doc.filename,
          markdown: doc.generator(data)
        }));
        await exportAllToZip(docsToExport, exportConfig.format, 'gdpr-dokumenty');
      }
    } catch (error) {
      console.error('Chyba při exportu:', error);
      alert('Nastala chyba při exportu. Zkuste to prosím znovu.');
    }
    setIsExporting(false);
  };

  const startExport = async () => {
    if (!pendingExport) return;
    
    await executeExport(pendingExport);
    setShowDonateModal(false);
    setPendingExport(null);
  };

  const activeDoc = documents.find((d) => d.id === activeDocument)!;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-primary mb-2">Vaše dokumenty jsou připraveny!</h2>
        <p className="text-muted-foreground">
          Vygenerovali jsme pro vás 4 GDPR dokumenty na míru. Prohlédněte si je a stáhněte.
        </p>
      </div>

      {/* Hromadný export */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold">Stáhnout všechny dokumenty</h3>
              <p className="text-sm text-muted-foreground">Uložte si všechny 4 dokumenty najednou</p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => handleExportAll('pdf')}
                disabled={isExporting}
                className="bg-red-600 hover:bg-red-700 gap-2"
              >
                <Archive className="w-4 h-4" />
                ZIP (PDF)
              </Button>
              <Button
                onClick={() => handleExportAll('docx')}
                disabled={isExporting}
                variant="outline"
                className="gap-2"
              >
                <Archive className="w-4 h-4" />
                ZIP (DOCX)
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Přepínač dokumentů */}
      <div className="flex flex-wrap gap-2">
        {documents.map((doc) => (
          <Button
            key={doc.id}
            variant={activeDocument === doc.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveDocument(doc.id)}
          >
            {doc.title}
          </Button>
        ))}
      </div>

      {/* Náhled dokumentu */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>{activeDoc.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{activeDoc.description}</p>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => handleExportPdf(activeDoc)}
              disabled={isExporting}
              className="bg-red-600 hover:bg-red-700"
            >
              PDF
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleExportDocx(activeDoc)}
              disabled={isExporting}
            >
              DOCX
            </Button>
          </div>
        </CardHeader>
        <CardContent className="border-t pt-4">
          <div className="max-h-[500px] overflow-y-auto pr-4">
            <DocumentPreview data={data} documentType={activeDocument} />
          </div>
        </CardContent>
      </Card>

      {/* Zpět */}
      <div className="flex justify-between pt-4 border-t">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ChevronLeft className="w-4 h-4" />
          Upravit odpovědi
        </Button>
        <Button
          variant="link"
          onClick={() => window.location.reload()}
          className="text-muted-foreground gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Začít znovu
        </Button>
      </div>

      <DonateModal
        isOpen={showDonateModal}
        onClose={() => {
          setShowDonateModal(false);
          setPendingExport(null);
        }}
        onAction={startExport}
        actionText={
          pendingExport?.type === 'all' 
            ? `Stáhnout ZIP (${pendingExport?.format?.toUpperCase()})` 
            : `Stáhnout ${pendingExport?.format?.toUpperCase()}`
        }
        isLoading={isExporting}
        title="Ještě moment..."
        description={
          <>
            <p>
              Super, za chvíli budete mít {pendingExport?.type === 'all' ? 'všechny dokumenty v jednom ZIP souboru' : 'dokument'}! 📦
            </p>
            <p>
              Tenhle nástroj jsem vytvořil, protože věřím, že GDPR nemusí být noční můra. 
              Žádná registrace, žádné poplatky – prostě to funguje.
            </p>
            <p className="text-gray-800 font-medium">
              Pokud vám to ušetřilo čas a nervy, můžete mi hodit na kafe. 
              Není to povinné, ale potěší to ☕
            </p>
          </>
        }
      />
    </div>
  );
}
