export type AppCategory = 'Education' | 'Productivity' | 'Security' | 'Research';

export type AppRecord = {
  id: string;
  name: string;
  vendor: string;
  revenue: number;
  category: AppCategory;
  iconUrl?: string;
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
      iconUrl: i % 3 === 2 ? undefined : `https://picsum.photos/seed/surf-app-${i + 1}/48/48`,
    };
  });
}

export const MOCK_APPS: AppRecord[] = makeApps(42);

export const APP_CATEGORIES = ['All', ...CATEGORIES] as const;

export type AppCategoryFilter = (typeof APP_CATEGORIES)[number];
