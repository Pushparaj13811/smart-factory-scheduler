// Suspense wrapper component for lazy-loaded routes

import { Suspense, type ReactNode } from 'react';
import { PageLoader } from '@/components/common/PageLoader/PageLoader';

interface SuspenseWrapperProps {
  children: ReactNode;
}

export function SuspenseWrapper({ children }: SuspenseWrapperProps) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}
