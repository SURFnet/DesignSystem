// Node-only WCAG 2.1 AA audit, run by `@storybook/test-runner`'s `postVisit`
// hook. Kept OUT of the browser preview bundle (it imports Node built-ins,
// Playwright and the test-runner) — consumers reach it via the package's
// `./test-runner` subpath, never the main entry.
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

// Only compute violations (skip building passes/incomplete/inapplicable node
// lists) — the sweep runs axe once per theme/mode, so this keeps each run fast.
const RESULT_TYPES: RunOptions['resultTypes'] = ['violations'];

// Scope axe to the rendered story rather than the whole Storybook chrome. Colors
// still resolve up the real DOM tree, so contrast checks stay accurate.
const STORY_ROOT = '#storybook-root';

// Every theme/mode combination the tokens package ships, so the audit exercises
// the full cascade (`@surfnet/tokens` keys colors on `dark` + `theme-<name>`
// classes on <html>). Contrast-sensitive rules differ per theme, so each combo
// is a distinct audit surface.
const MODES = ['light', 'dark'] as const;
type Mode = (typeof MODES)[number];

// Report directory (one JSON file per story keeps concurrent test-runner
// workers from clobbering a shared file). Override with A11Y_REPORT_DIR.
const REPORT_DIR = resolve(process.env.A11Y_REPORT_DIR ?? 'a11y-report');

// Reflect a theme/mode onto <html> exactly like the `themeSwitcher` decorator,
// so axe sees the same resolved CSS variables a real user would.
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

interface ComboResult {
  theme: string;
  mode: Mode;
  violations: Result[];
}

/**
 * `postVisit` hook for `@storybook/test-runner`: audits the just-rendered story
 * against WCAG 2.1 AA with axe, once per theme/mode combination from
 * `@surfnet/tokens`. Writes a per-story JSON report and throws if any
 * combination has violations (so `test:a11y` exits non-zero).
 */
export async function runStoryA11yAudit(page: Page, context: TestContext): Promise<void> {
  const storyContext = await getStoryContext(page, context);
  const a11y = storyContext.parameters?.a11y as
    | { disable?: boolean; options?: RunOptions }
    | undefined;

  // Respect per-story opt-out (`parameters: { a11y: { disable: true } }`).
  if (a11y?.disable) return;

  await injectAxe(page);

  // Story-level axe options win over the WCAG 2.1 AA default, so a story can
  // waive a specific rule while staying scoped to the same level.
  const runOptions: RunOptions = {
    resultTypes: RESULT_TYPES,
    ...(a11y?.options ?? { runOnly: RUN_ONLY }),
  };

  const results: ComboResult[] = [];
  for (const theme of THEME_NAMES) {
    for (const mode of MODES) {
      await applyTheme(page, theme, mode);
      const violations = await getViolations(page, STORY_ROOT, runOptions);
      results.push({ theme, mode, violations });
    }
  }

  // Restore the story's default look for any later hooks / screenshots.
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
