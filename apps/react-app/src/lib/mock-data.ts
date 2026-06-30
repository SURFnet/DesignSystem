// Mock backend data for the demo app. In a real consumer this would come from the
// SURF Access API; here it lives in-memory and is read directly by the server page.

export type AppCategory = 'Education' | 'Productivity' | 'Security' | 'Research';

export type AppRecord = {
  id: string;
  name: string;
  vendor: string;
  /** Monthly revenue in USD. */
  revenue: number;
  category: AppCategory;
  /** Avatar image for the app icon. */
  iconUrl: string;
};

export type SessionUser = {
  name: string;
  organisation: string;
  email: string;
  avatarUrl: string;
};

export const MOCK_USER: SessionUser = {
  name: 'Freek Vonk',
  organisation: 'Universiteit Leiden',
  email: 'freek.vonk@universiteitleiden.nl',
  avatarUrl: 'https://i.pravatar.cc/80?img=68',
};

const VENDORS = [
  '10voordeleraar-loa1',
  '10voordeleraar-loa2-without-interaction-with-mail',
  'SURFconext',
  'Eduroam',
  'Microsoft',
];

const NAMES = [
  '10voordeleraar-loa1',
  '10voordeleraar-loa2-without-interaction-with-mail',
  'SURFconext dashboard',
  'Eduroam onboarding',
  'Microsoft 365 for education',
  'Zoom for education',
  'Kaltura video',
  'Canvas LMS',
];

const CATEGORIES: AppCategory[] = ['Education', 'Productivity', 'Security', 'Research'];

// Deterministic generator so the list is stable across requests (no Math.random:
// keeps server/client output in sync and the demo reproducible).
function makeApps(count: number): AppRecord[] {
  return Array.from({ length: count }, (_, i) => {
    const name = NAMES[i % NAMES.length]!;
    const vendor = VENDORS[i % VENDORS.length]!;
    return {
      id: `app-${i + 1}`,
      name,
      vendor,
      revenue: 199,
      category: CATEGORIES[i % CATEGORIES.length]!,
      iconUrl: `https://picsum.photos/seed/surf-app-${i + 1}/48/48`,
    };
  });
}

export const MOCK_APPS: AppRecord[] = makeApps(42);

export const APP_CATEGORIES = ['All', ...CATEGORIES] as const;
export type AppCategoryFilter = (typeof APP_CATEGORIES)[number];
