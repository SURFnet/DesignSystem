'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { Input } from '@surfnet/react';

import { buildHref } from '@/app/lib/url';

/**
 * Search box that writes the query into the URL (`?search=`). Only typing
 * navigates (debounced) — reading from the URL stays one-directional, so
 * unrelated navigations (e.g. "load more") never clobber the query.
 */
export function AppsSearch({ defaultValue }: { defaultValue: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  function onChange(value: string) {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      // A new query resets pagination back to the first page.
      router.replace(buildHref(pathname, searchParams, { search: value, page: null }), {
        scroll: false,
      });
    }, 250);
  }

  return (
    <div className="relative w-full max-w-xs">
      <MagnifyingGlassIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        defaultValue={defaultValue}
        placeholder="Search apps…"
        onChange={(event) => onChange(event.target.value)}
        className="pl-9"
        aria-label="Search apps"
      />
    </div>
  );
}
