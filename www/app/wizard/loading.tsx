/*
 * Copyright (c) 2025 GDPR Manager
 * All rights reserved.
 *
 * This source code is proprietary and confidential.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 */

import { WizardLoadingSkeleton } from '@/components/wizard/WizardLoadingSkeleton';

/**
 * Next.js App Router loading file.
 * Automatically used as Suspense fallback during client-side navigation.
 */
export default function WizardLoading() {
  return <WizardLoadingSkeleton />;
}
