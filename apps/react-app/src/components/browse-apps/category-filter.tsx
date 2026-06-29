'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@surfnet/react';

import { APP_CATEGORIES } from '@/lib/mock-data';
import { buildHref } from '@/lib/url';

/**
 * Category dropdown that writes the selection into the URL (`?category=`).
 */
export function CategoryFilter({ value }: { value: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function onChange(next: string | null) {
    // A new filter resets pagination back to the first page.
    router.replace(
      buildHref(pathname, searchParams, {
        category: next && next !== 'All' ? next : null,
        page: null,
      }),
      { scroll: false },
    );
  }

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-auto gap-2">
        <span className="text-muted-foreground">Categorie:</span>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {APP_CATEGORIES.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
