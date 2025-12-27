'use client';

import { Progress } from '@/components/ui/progress';
import { Check } from 'lucide-react';

interface WizardProgressProps {
  currentStep: number;
  totalSteps: number;
}

const stepLabels = [
  'Základní info',
  'Podnikání',
  'Sbíraná data',
  'Účely',
  'Příjemci',
];

export function WizardProgress({ currentStep, totalSteps }: WizardProgressProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {stepLabels.map((label, index) => (
          <div
            key={index}
            className={`flex flex-col items-center flex-1 ${
              index < currentStep
                ? 'text-emerald-600'
                : index === currentStep
                ? 'text-primary font-semibold'
                : 'text-muted-foreground'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm mb-1 transition-all ${
                index < currentStep
                  ? 'bg-emerald-600 text-white'
                  : index === currentStep
                  ? 'bg-primary text-white'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
            </div>
            <span className="text-xs text-center hidden sm:block">{label}</span>
          </div>
        ))}
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}
