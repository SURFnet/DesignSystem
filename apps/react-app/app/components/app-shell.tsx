'use client';

import type { ReactNode } from 'react';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@surfnet/react';

import { AppSidebar } from '@/app/components/app-sidebar';
import type { SessionUser } from '@/app/lib/mock-data';

/**
 * Client shell for the authenticated area. Holds everything that pulls in
 * `@surfnet/react` (which is a client-only bundle), so the surrounding layout
 * can stay a Server Component and do the auth check.
 */
export function AppShell({ user, children }: { user: SessionUser; children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4 md:hidden">
          <SidebarTrigger />
          <span className="text-sm font-medium">SURF Access</span>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
