// Server-side data access for apps: the server page reads this directly, so the
// filtering/pagination logic lives in one place.
import { APP_CATEGORIES, MOCK_APPS, type AppCategoryFilter, type AppRecord } from './mock-data';

export const APPS_PAGE_SIZE = 8;

export type AppsQuery = {
  search: string;
  category: AppCategoryFilter;
  page: number;
};

export type AppsResult = {
  items: AppRecord[];
  total: number;
  hasMore: boolean;
};

/** Normalise a raw category string to a valid filter, defaulting to 'All'. */
export function parseCategory(value: string | undefined | null): AppCategoryFilter {
  return (APP_CATEGORIES as readonly string[]).includes(value ?? '')
    ? (value as AppCategoryFilter)
    : 'All';
}

/** Parse a 1-based page from a raw string, clamping to >= 1. */
export function parsePage(value: string | undefined | null): number {
  return Math.max(1, Number(value ?? '1') || 1);
}

export async function getApps({ search, category, page }: AppsQuery): Promise<AppsResult> {
  const normalizedSearch = search.trim().toLowerCase();

  // Simulate backend latency so server-rendered loading is realistic.
  await new Promise((resolve) => setTimeout(resolve, 300));

  const filtered = MOCK_APPS.filter((app) => {
    const matchesSearch = !normalizedSearch || app.name.toLowerCase().includes(normalizedSearch);
    const matchesCategory = category === 'All' || app.category === category;
    return matchesSearch && matchesCategory;
  });

  const items = filtered.slice(0, page * APPS_PAGE_SIZE);

  return {
    items,
    total: filtered.length,
    hasMore: items.length < filtered.length,
  };
}
