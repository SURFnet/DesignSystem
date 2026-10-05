import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

import type { Locator, Page } from '@playwright/test';

export const REACT_ORIGIN = 'http://127.0.0.1:6008';
export const ANGULAR_ORIGIN = 'http://127.0.0.1:6009';

export const MODES = ['light', 'dark'] as const;
export type Mode = (typeof MODES)[number];

/** Frozen calendar / relative-time date so date stories don't drift month to month. */
export const FROZEN_DATE = '2026-04-15T12:00:00.000Z';

const VISUAL_TITLE_PREFIXES = ['Components/', 'Foundations/'];
const SKIP_TITLES = new Set(['Components/Spinner']);

const FIXTURES = path.join(process.cwd(), 'tests/visual/fixtures');

const CURVE_FONT_FAMILIES = ['Source Sans 3 Variable', 'Source Sans 3', 'Geist Variable'] as const;

const DATE_STORY = /calendar|date-picker|datepicker/i;

export type StoryType = 'story' | 'docs';

export type StoryEntry = {
  id: string;
  title: string;
  name: string;
  type: StoryType;
  tags?: string[];
};

type StoryIndex = {
  entries: Record<string, StoryEntry>;
};

export type Framework = 'react' | 'angular';

export function loadIndex(framework: Framework): StoryIndex {
  const file = path.join(process.cwd(), 'packages', framework, 'storybook-static', 'index.json');
  if (!existsSync(file)) {
    throw new Error(`Missing ${file}. Run \`pnpm build-storybook\` before visual tests.`);
  }
  return JSON.parse(readFileSync(file, 'utf8')) as StoryIndex;
}

export function visualStories(framework: Framework): StoryEntry[] {
  return Object.values(loadIndex(framework).entries)
    .filter((entry) => {
      if (entry.type !== 'story') return false;
      if (!VISUAL_TITLE_PREFIXES.some((prefix) => entry.title.startsWith(prefix))) return false;
      if (entry.tags?.includes('skip-visual')) return false;
      if (SKIP_TITLES.has(entry.title)) return false;
      return true;
    })
    .sort((a, b) => a.id.localeCompare(b.id));
}

export function isFullPage(story: StoryEntry): boolean {
  return story.tags?.includes('visual-fullpage') === true;
}

export function frameworkFromOrigin(origin: string): Framework {
  return origin === ANGULAR_ORIGIN ? 'angular' : 'react';
}

async function waitForThemeMode(page: Page, mode: Mode): Promise<void> {
  await page.waitForFunction(
    (expectedMode) => {
      const isDark = document.documentElement.classList.contains('dark');
      return expectedMode === 'dark' ? isDark : !isDark;
    },
    mode,
    { timeout: 10_000 },
  );
}

async function loadCurveFonts(page: Page): Promise<void> {
  await page.evaluate(async (families) => {
    await document.fonts.ready;
    for (const family of families) {
      for (const weight of ['400', '500', '600']) {
        await document.fonts.load(`${weight} 16px "${family}"`).catch(() => undefined);
      }
    }
    await document.fonts.ready;
  }, CURVE_FONT_FAMILIES);
}

/** Angular Storybook injects global CSS via webpack `styles` — light wait is enough. */
async function waitForAngularStoryReady(page: Page, mode: Mode): Promise<void> {
  await waitForThemeMode(page, mode);
  await page.locator('#storybook-root').waitFor({ state: 'visible' });
  await loadCurveFonts(page);
}

/** React Storybook sets `data-curve-visual-ready` from preview (fonts + tokens in-browser). */
async function waitForReactStoryReady(page: Page, mode: Mode): Promise<void> {
  await waitForThemeMode(page, mode);
  await page.locator('#storybook-root').waitFor({ state: 'visible' });
  await page.locator('html[data-curve-visual-ready="true"]').waitFor({ timeout: 25_000 });
}

async function waitForStoryReady(page: Page, mode: Mode, framework: Framework): Promise<void> {
  if (framework === 'react') {
    await waitForReactStoryReady(page, mode);
  } else {
    await waitForAngularStoryReady(page, mode);
  }
}

/** Pin Date for calendar stories without Playwright's fake clock (that breaks React/Vite paint). */
async function installFrozenDateIfNeeded(page: Page, storyId: string): Promise<void> {
  if (!DATE_STORY.test(storyId)) {
    return;
  }
  await page.addInitScript((iso) => {
    const fixed = new Date(iso).getTime();
    const NativeDate = Date;
    function PatchedDate(
      ...args: [] | [Date | number | string] | [number, number, number, ...number[]]
    ) {
      if (args.length === 0) {
        return new NativeDate(fixed);
      }
      return new NativeDate(...args);
    }
    PatchedDate.now = () => fixed;
    PatchedDate.parse = NativeDate.parse;
    PatchedDate.UTC = NativeDate.UTC;
    PatchedDate.prototype = NativeDate.prototype;
    // @ts-expect-error — frozen clock for date-picker stories only
    Date = PatchedDate;
  }, FROZEN_DATE);
}

/**
 * Intercept flaky remote images and prefer reduced motion before the Storybook iframe loads.
 */
export async function preparePage(page: Page): Promise<void> {
  await page.emulateMedia({ reducedMotion: 'reduce' });

  await page.route('https://example.com/**', (route) =>
    route.fulfill({ status: 404, body: 'not found' }),
  );

  await page.route(
    /https:\/\/(i\.pravatar\.cc|images\.unsplash\.com|github\.com)\//,
    async (route) => {
      const url = route.request().url();
      const fixture = url.includes('unsplash.com') ? 'photo.png' : 'avatar.png';
      await route.fulfill({
        path: path.join(FIXTURES, fixture),
        contentType: 'image/png',
      });
    },
  );
}

export async function openStory(
  page: Page,
  origin: string,
  storyId: string,
  mode: Mode,
): Promise<void> {
  const framework = frameworkFromOrigin(origin);
  await installFrozenDateIfNeeded(page, storyId);

  const url = new URL('/iframe.html', origin);
  url.searchParams.set('id', storyId);
  url.searchParams.set('viewMode', 'story');
  url.searchParams.set('globals', `theme:default;mode:${mode}`);

  await page.goto(url.toString(), { waitUntil: 'load', timeout: 60_000 });
  await page.waitForFunction(() => document.body.classList.contains('sb-show-main'));
  await waitForStoryReady(page, mode, framework);

  await page.evaluate(async () => {
    await Promise.all(
      [...document.images].map((img) => {
        if (img.complete) return undefined;
        return new Promise<void>((resolve) => {
          img.addEventListener('load', () => resolve(), { once: true });
          img.addEventListener('error', () => resolve(), { once: true });
        });
      }),
    );
  });

  const error = page.locator('#error-message, .sb-errordisplay');
  if (
    await error
      .first()
      .isVisible()
      .catch(() => false)
  ) {
    throw new Error(`Story ${storyId} failed to render:\n${await error.first().innerText()}`);
  }
}

export function storyLocator(page: Page, story: StoryEntry): Locator | Page {
  return isFullPage(story) ? page : page.locator('#storybook-root');
}

export async function screenshotStory(page: Page, story: StoryEntry): Promise<Buffer> {
  const options = { animations: 'disabled' as const, caret: 'hide' as const };
  if (isFullPage(story)) {
    return page.screenshot(options);
  }
  return page.locator('#storybook-root').screenshot(options);
}
