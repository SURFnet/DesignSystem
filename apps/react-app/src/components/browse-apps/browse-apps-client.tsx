'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { parseCategory, parsePage, selectApps } from '@/lib/apps';
import { buildHref } from '@/lib/url';

import { BrowseAppsView } from './browse-apps-view';

/**
 * Client-rendered browse-apps page, used only in the static-export build (see
 * `next.config.mjs`). GitHub Pages has no server to re-render on `?search=` /
 * `?category=` / `?page=` changes, so the query is read from the URL in the
 * browser (`useSearchParams`) and filtered client-side with the same
 * `selectApps` logic the server path uses. Navigation from the search box,
 * category filter, and "load more" updates the URL, which re-runs this hook.
 */
export function BrowseAppsClient() {
  const searchParams = useSearchParams();

  const search = searchParams.get('search') ?? '';
  const category = parseCategory(searchParams.get('category'));
  const page = parsePage(searchParams.get('page'));

  const { items, total, hasMore } = useMemo(
    () => selectApps({ search, category, page }),
    [search, category, page],
  );

  const nextHref = buildHref('/browse-apps', searchParams, { page: page + 1 });

  return (
    <BrowseAppsView
      search={search}
      category={category}
      items={items}
      total={total}
      hasMore={hasMore}
      nextHref={nextHref}
    />
  );
}
