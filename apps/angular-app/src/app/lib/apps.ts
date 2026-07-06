import { APP_CATEGORIES, AppCategoryFilter, AppRecord, MOCK_APPS } from './mock-data';

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

export function parseCategory(value: string | null | undefined): AppCategoryFilter {
  return (APP_CATEGORIES as readonly string[]).includes(value ?? '')
    ? (value as AppCategoryFilter)
    : 'All';
}

export function parsePage(value: string | null | undefined): number {
  return Math.max(1, Number(value ?? '1') || 1);
}

export function getApps({ search, category, page }: AppsQuery): AppsResult {
  const normalizedSearch = search.trim().toLowerCase();
  const filtered = MOCK_APPS.filter((app) => {
    const matchesSearch = !normalizedSearch || app.name.toLowerCase().includes(normalizedSearch);
    const matchesCategory = category === 'All' || app.category === category;
    return matchesSearch && matchesCategory;
  });
  const items = filtered.slice(0, page * APPS_PAGE_SIZE);
  return { items, total: filtered.length, hasMore: items.length < filtered.length };
}
