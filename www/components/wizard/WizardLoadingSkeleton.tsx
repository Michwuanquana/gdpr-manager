/*
 * Copyright (c) 2025 GDPR Manager
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 */

import { Card, CardContent } from '@/components/ui/card';
import Logo from '@/components/Logo';

/**
 * Skeleton loading component for the wizard page.
 * Used both in loading.tsx (Next.js Suspense) and page.tsx (isLoaded state).
 */
export function WizardLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <Logo className="h-12 w-12 opacity-50" />
            <span className="text-3xl font-bold text-primary/50">GDPR Manager</span>
          </div>
          <div className="h-4 w-64 bg-muted rounded animate-pulse mx-auto" />
        </div>

        {/* Progress skeleton */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
              <div className="h-3 w-16 bg-muted rounded animate-pulse hidden sm:block" />
            </div>
          ))}
        </div>

        {/* Card skeleton */}
        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <div className="space-y-6">
              {/* Title skeleton */}
              <div className="text-center mb-8">
                <div className="h-7 w-48 bg-muted rounded animate-pulse mx-auto mb-2" />
                <div className="h-4 w-72 bg-muted rounded animate-pulse mx-auto" />
              </div>

              {/* Form fields skeleton */}
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                  <div className="h-10 w-full bg-muted rounded animate-pulse" />
                </div>
              ))}

              {/* Loading indicator */}
              <div className="flex items-center justify-center gap-3 py-4">
                <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-muted-foreground font-medium">
                  Načítání formuláře...
                </span>
              </div>

              {/* Navigation skeleton */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <div className="h-10 w-24 bg-muted rounded animate-pulse" />
                <div className="h-10 w-32 bg-primary/30 rounded animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="h-4 w-80 bg-muted rounded animate-pulse mx-auto mt-6" />
      </div>
    </div>
  );
}
