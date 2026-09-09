// WCAG 2.1 AA audit run by the test-runner's `postVisit` hook. Reached via the
// package's `./test-runner` subpath, never the main entry.
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { getStoryContext } from '@storybook/test-runner';
import type { TestContext } from '@storybook/test-runner';
import type { Result, RunOptions } from 'axe-core';
import { getViolations, injectAxe } from 'axe-playwright';
import type { Page } from 'playwright-core';

import { WCAG_21_AA_TAGS } from './a11y.js';
import { THEME_NAMES } from './themes.js';

const RUN_ONLY: RunOptions['runOnly'] = { type: 'tag', values: WCAG_21_AA_TAGS };
const RESULT_TYPES: RunOptions['resultTypes'] = ['violations'];

// Scope axe to the rendered story, not the Storybook chrome.
const STORY_ROOT = '#storybook-root';

const MODES = ['light', 'dark'] as const;
type Mode = (typeof MODES)[number];

// One file per story so concurrent workers don't clobber a shared report.
const REPORT_DIR = resolve(process.env.A11Y_REPORT_DIR ?? '.a11y-report');

// Reflect theme/mode onto <html> like the `themeSwitcher` decorator does.
async function applyTheme(page: Page, theme: string, mode: Mode): Promise<void> {
  await page.evaluate(
    ({ theme, mode }) => {
      const root = document.documentElement;
      for (const c of Array.from(root.classList)) {
        if (c.startsWith('theme-')) root.classList.remove(c);
      }
      root.classList.toggle('dark', mode === 'dark');
      if (theme && theme !== 'default') root.classList.add(`theme-${theme}`);
    },
    { theme, mode },
  );
}

type ViolationWithScreenshot = Result & { screenshot?: string };

interface ComboResult {
  theme: string;
  mode: Mode;
  violations: ViolationWithScreenshot[];
}

const SCREENSHOT_DIR = resolve(REPORT_DIR, 'screenshots');

// Screenshots the first offending element of a violation, for the PR comment.
// Best-effort: axe targets aren't guaranteed to resolve to a single visible
// element (off-screen, zero-size, or inside a nested frame), so failures here
// must never break the audit itself.
async function captureViolationScreenshot(
  page: Page,
  storyId: string,
  theme: string,
  mode: Mode,
  violation: Result,
): Promise<string | undefined> {
  // Only handle the plain, single-selector case; skip cross-frame/shadow-dom
  // targets (arrays-within-the-array) rather than guess at a locator for them.
  const target = violation.nodes?.[0]?.target;
  const selector = target?.length === 1 && typeof target[0] === 'string' ? target[0] : undefined;
  if (!selector) return undefined;

  try {
    const locator = page.locator(selector).first();
    if ((await locator.count()) === 0) return undefined;
    await locator.scrollIntoViewIfNeeded({ timeout: 2000 });
    const file = `${storyId}__${theme}-${mode}__${violation.id}.png`.replace(
      /[^a-z0-9._-]+/gi,
      '_',
    );
    mkdirSync(SCREENSHOT_DIR, { recursive: true });
    await locator.screenshot({ path: resolve(SCREENSHOT_DIR, file), timeout: 5000 });
    return file;
  } catch {
    return undefined;
  }
}

/**
 * Audits the rendered story against WCAG 2.1 AA, once per theme/mode from
 * `@surfnet/curve-tokens`. Writes a per-story JSON report and throws on violations.
 */
export async function runStoryA11yAudit(page: Page, context: TestContext): Promise<void> {
  const storyContext = await getStoryContext(page, context);
  const a11y = storyContext.parameters?.a11y as
    | { disable?: boolean; options?: RunOptions }
    | undefined;

  if (a11y?.disable) return;

  await injectAxe(page);

  // Stop color transitions/animations mid-flight so contrast reads the settled
  // value, and wait for fonts so large-text thresholds use real metrics.
  await page.addStyleTag({
    content: '*,*::before,*::after{transition:none!important;animation:none!important}',
  });
  await page.evaluate(() => document.fonts?.ready);

  const runOptions: RunOptions = {
    resultTypes: RESULT_TYPES,
    ...(a11y?.options ?? { runOnly: RUN_ONLY }),
  };

  const results: ComboResult[] = [];
  for (const theme of THEME_NAMES) {
    for (const mode of MODES) {
      await applyTheme(page, theme, mode);
      const violations: ViolationWithScreenshot[] = await getViolations(
        page,
        STORY_ROOT,
        runOptions,
      );
      for (const violation of violations) {
        violation.screenshot = await captureViolationScreenshot(
          page,
          context.id,
          theme,
          mode,
          violation,
        );
      }
      results.push({ theme, mode, violations });
    }
  }

  // Restore the default look for later hooks.
  await applyTheme(page, 'default', 'light');

  const total = results.reduce((n, r) => n + r.violations.length, 0);
  const report = {
    id: context.id,
    title: storyContext.title,
    name: storyContext.name,
    tags: WCAG_21_AA_TAGS,
    themesTested: THEME_NAMES.length,
    modesTested: MODES.length,
    totalViolations: total,
    results,
  };

  mkdirSync(REPORT_DIR, { recursive: true });
  const file = `${context.id.replace(/[^a-z0-9-]+/gi, '_')}.json`;
  writeFileSync(resolve(REPORT_DIR, file), JSON.stringify(report, null, 2) + '\n', 'utf8');

  if (total > 0) {
    const offending = results
      .filter((r) => r.violations.length)
      .map((r) => {
        const rules = r.violations.map((v) => v.id).join(', ');
        return `  ${r.theme}/${r.mode}: ${r.violations.length} (${rules})`;
      })
      .join('\n');
    throw new Error(
      `a11y (WCAG 2.1 AA) violations in "${storyContext.title} / ${storyContext.name}":\n${offending}`,
    );
  }
}
