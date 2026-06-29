import type { ReactNode } from 'react';

import { AppShell } from '@/components/app-shell';
import { MOCK_USER } from '@/lib/mock-data';

export default function BrowseAppsLayout({ children }: { children: ReactNode }) {
  return <AppShell user={MOCK_USER}>{children}</AppShell>;
}
