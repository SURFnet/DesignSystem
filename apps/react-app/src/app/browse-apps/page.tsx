import { Suspense } from 'react';

import { getApps, parseCategory, parsePage } from '@/lib/apps';
import { buildHref } from '@/lib/url';

import { BrowseAppsClient } from '@/components/browse-apps/browse-apps-client';
import { BrowseAppsView } from '@/components/browse-apps/browse-apps-view';

type SearchParams = Promise<{ search?: string; category?: string; page?: string }>;

export default async function BrowseAppsPage({ searchParams }: { searchParams: SearchParams }) {
  // Static-export build (GitHub Pages): there is no server to re-render on query
  // changes, so filtering runs client-side. We must not read `searchParams` here
  // or the page becomes dynamic and can't be exported. See `next.config.mjs`.
  // The Suspense boundary is required for `useSearchParams()` during prerender.
  if (process.env.NEXT_PUBLIC_STATIC_EXPORT === '1') {
    return (
      <Suspense>
        <BrowseAppsClient />
      </Suspense>
    );
  }

  const params = await searchParams;
  const search = params.search ?? '';
  const category = parseCategory(params.category);
  const page = parsePage(params.page);

  const { items, total, hasMore } = await getApps({ search, category, page });

  // Build the "load more" href from the current query, bumping the page.
  const nextHref = buildHref('/browse-apps', params, { page: page + 1 });

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
