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

/**
 * Intercept flaky remote images, freeze the clock, and prefer reduced motion
 * before the Storybook iframe loads.
 */
export async function preparePage(page: Page): Promise<void> {
  await page.clock.install({ time: new Date(FROZEN_DATE) });
  await page.clock.resume();
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
  const url = new URL('/iframe.html', origin);
  url.searchParams.set('id', storyId);
  url.searchParams.set('viewMode', 'story');
  url.searchParams.set('globals', `theme:default;mode:${mode}`);

  await page.goto(url.toString(), { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => document.body.classList.contains('sb-show-main'));
  await page.locator('#storybook-root').waitFor({ state: 'attached' });
  await page.evaluate(async () => {
    await document.fonts.ready;
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
