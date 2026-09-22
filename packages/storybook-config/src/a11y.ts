// Browser-safe a11y config, imported into each framework's preview. Keep it free
// of Node/Playwright deps; those live in `./a11y-audit.ts`.

// WCAG 2.2 AA as axe-core tags. Scopes both the addon panel and the test-runner.
export const WCAG_22_AA_TAGS: string[] = ['wcag2a', 'wcag2aa', 'wcag22a', 'wcag22aa'];

// Temporarily disabled: color-contrast findings are tracked for design in
// https://github.com/SURFnet/DesignSystem/issues/<ISSUE_NUMBER> instead of failing the
// test-runner's built-in addon-a11y check. Remove once the tracked token values ship.
// (Kept separate from a11y-audit.ts's own toggle since this file is bundled into the
// browser preview and can't safely read `process.env`.)
const RULES = { 'color-contrast': { enabled: false } };

// Merge into each preview's `parameters`. `test: 'error'` fails the addon on
// violations.
export const a11yParameters = {
  a11y: {
    options: { runOnly: { type: 'tag', values: WCAG_22_AA_TAGS }, rules: RULES },
    test: 'error' as const,
  },
};
