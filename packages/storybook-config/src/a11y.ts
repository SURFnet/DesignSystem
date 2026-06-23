// Browser-safe a11y config, imported into each framework's preview. Keep it free
// of Node/Playwright deps; those live in `./a11y-audit.ts`.

// WCAG 2.1 AA as axe-core tags. Scopes both the addon panel and the test-runner.
export const WCAG_21_AA_TAGS: string[] = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

// Merge into each preview's `parameters`. `test: 'error'` fails the addon on
// violations.
export const a11yParameters = {
  a11y: {
    options: { runOnly: { type: 'tag', values: WCAG_21_AA_TAGS } },
    test: 'error' as const,
  },
};
