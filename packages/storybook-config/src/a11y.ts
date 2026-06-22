// Browser-safe a11y config. This module is imported into each framework's
// `.storybook/preview.ts`, so it must NOT pull in Node built-ins, Playwright or
// the test-runner — those live in `./a11y-audit.ts`, behind the package's
// `./test-runner` subpath, which only the test-runner configs import.

// WCAG 2.1 Level AA, expressed as the axe-core tag set. Both the interactive
// addon-a11y panel and the headless test-runner are scoped to exactly these
// tags, so a finding in one is a finding in the other.
export const WCAG_21_AA_TAGS: string[] = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

// Preview-level parameters. Merge into each framework's preview `parameters`
// (next to `sharedParameters`). `options.runOnly` scopes the manual panel to
// WCAG 2.1 AA; `test: 'error'` makes the addon treat violations as failures.
export const a11yParameters = {
  a11y: {
    options: { runOnly: { type: 'tag', values: WCAG_21_AA_TAGS } },
    test: 'error' as const,
  },
};
