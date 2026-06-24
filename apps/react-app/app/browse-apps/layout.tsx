import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { AppShell } from '@/app/components/app-shell';
import { getSessionUser } from '@/app/lib/session';

export default async function BrowseAppsLayout({ children }: { children: ReactNode }) {
  const user = await getSessionUser();
  if (!user) {
    redirect('/login');
  }

  return <AppShell user={user}>{children}</AppShell>;
}
