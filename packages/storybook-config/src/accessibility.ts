/**
 * Shared copy for the Foundations / Accessibility documentation stories.
 * React and Angular both render from these helpers so the two Storybooks stay in
 * sync. No JSX / no framework imports here.
 */

export const ACCESSIBILITY_SKILL_FILE = {
  filename: 'accessibility.skill.md',
  /** Served via Storybook `staticDirs` from this package's `static/` folder. */
  href: './downloads/accessibility.skill.md',
} as const;

export const ACCESSIBILITY_PAGE_INTRO =
  'Curve components ship with accessible primitives: correct roles, keyboard behaviour, and visible focus rings. That is necessary, not sufficient. The screens you compose still need semantic structure, accessible names, and a process that catches regressions before they reach production.';

export interface AccessibilityInstallTarget {
  tool: string;
  path: string;
}

export const ACCESSIBILITY_SKILL_INSTALL: AccessibilityInstallTarget[] = [
  { tool: 'Cursor', path: '.cursor/skills/accessibility/SKILL.md' },
  { tool: 'Claude Code', path: '.claude/skills/accessibility/SKILL.md' },
  { tool: 'Codex / other agents', path: '.agents/skills/accessibility/SKILL.md' },
];

export const ACCESSIBILITY_SKILL_SUMMARY = [
  'Rename the download to SKILL.md and place it in an accessibility folder under your agent’s skills directory (see the table). The YAML frontmatter is required — agents use name and description to decide when to load it.',
  'Once installed, the skill applies whenever the agent writes or reviews UI. Point at a component with “review this for accessibility”, or keep it in the project so it runs without being asked.',
];

export interface AccessibilityLayer {
  layer: string;
  when: string;
  catches: string;
}

export const ACCESSIBILITY_LAYERS: AccessibilityLayer[] = [
  {
    layer: 'Agent skill',
    when: 'While writing and reviewing UI',
    catches: 'Wrong element, missing name, skipped headings, stripped focus styles',
  },
  {
    layer: 'Lint',
    when: 'On save and in pull requests',
    catches: 'Missing labels and alt text, click handlers on non-controls, static ARIA mistakes',
  },
  {
    layer: 'Storybook a11y addon',
    when: 'During visual review of a story',
    catches: 'axe-core violations: contrast, names, ARIA, duplicate ids',
  },
  {
    layer: 'Automated tests + CI',
    when: 'On every pull request',
    catches: 'Regressions on critical flows (forms, navigation, dialogs)',
  },
  {
    layer: 'Keyboard and screen reader',
    when: 'Before shipping a new view',
    catches: 'Focus order, skip links, heading logic, real-world use — things axe cannot see',
  },
];

export interface AccessibilityDocLink {
  label: string;
  href: string;
}

export interface AccessibilityDocSection {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  links?: AccessibilityDocLink[];
}

export const ACCESSIBILITY_SECTIONS: AccessibilityDocSection[] = [
  {
    id: 'components',
    title: 'Prefer design-system components',
    paragraphs: [
      'Reach for Curve (or your own design-system primitive) before restyling a div. Buttons, inputs, dialogs, and menus already expose the right role, keyboard behaviour, and focus-visible ring. Composing them incorrectly — wrapping a button in another button, stripping the title from a dialog, replacing a link with a clickable card — is how accessibility regresses even when the primitives are sound.',
    ],
  },
  {
    id: 'storybook',
    title: 'Storybook accessibility addon',
    paragraphs: [
      'Both Curve Storybooks ship @storybook/addon-a11y, which runs axe-core against the current story. Open the Accessibility panel in the addons tray while reviewing a component. Treat violations as bugs, not as noise to click away.',
      'Consuming apps should add the same addon to their own Storybook. Optionally fail CI by running the Storybook test runner with the a11y addon enabled, so a contrast or name regression cannot merge silently.',
    ],
    bullets: [
      'Add @storybook/addon-a11y next to @storybook/addon-docs.',
      'Check the Accessibility panel on every new or changed story.',
      'Wire the Storybook test runner (or equivalent) so axe failures fail the build.',
    ],
    links: [
      {
        label: 'Storybook accessibility tests',
        href: 'https://storybook.js.org/docs/writing-tests/accessibility-testing',
      },
      { label: 'axe-core', href: 'https://github.com/dequelabs/axe-core' },
    ],
  },
  {
    id: 'lint',
    title: 'Lint while you type',
    paragraphs: [
      'A linter catches a class of mistakes at the cursor, before a browser is involved. Enable the accessibility ruleset that matches the template language, and do not disable those rules without a named, reviewed exception.',
    ],
    bullets: [
      'React / JSX: eslint-plugin-jsx-a11y (recommended or strict).',
      'Angular: @angular-eslint template accessibility rules (@angular-eslint/template-accessibility-*).',
      'Vue: eslint-plugin-vuejs-accessibility.',
      'Editor: the axe Accessibility Linter extension for VS Code / Cursor highlights issues in HTML and JSX as you edit.',
    ],
    links: [
      {
        label: 'eslint-plugin-jsx-a11y',
        href: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y',
      },
      {
        label: 'angular-eslint',
        href: 'https://github.com/angular-eslint/angular-eslint',
      },
      {
        label: 'eslint-plugin-vuejs-accessibility',
        href: 'https://github.com/vue-a11y/eslint-plugin-vuejs-accessibility',
      },
    ],
  },
  {
    id: 'tests',
    title: 'Automated tests',
    paragraphs: [
      'Run axe against rendered UI in unit and end-to-end tests. Do not try to axe-scan every pixel of the app; cover the journeys that matter: sign-in, primary forms, navigation, and any dialog or overlay.',
    ],
    bullets: [
      'Component tests: jest-axe or vitest-axe on a rendered snapshot of the component.',
      'End-to-end: @axe-core/playwright or cypress-axe on critical user journeys.',
      'Assert on more than axe when the behaviour is specific: focus moves into a dialog, Escape closes it, the trigger is focused again on close.',
    ],
    links: [
      {
        label: '@axe-core/playwright',
        href: 'https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright',
      },
      { label: 'jest-axe', href: 'https://github.com/nickcolley/jest-axe' },
    ],
  },
  {
    id: 'ci',
    title: 'Continuous integration',
    paragraphs: [
      'Accessibility checks that only run on a local machine will be skipped under deadline pressure. Put a thin, reliable subset on every pull request, and keep slower scans (full Lighthouse, visual regression) on main or a nightly job.',
    ],
    bullets: [
      'PR pipeline: lint (including a11y rules) + unit tests that include jest-axe / equivalent.',
      'PR pipeline: Playwright (or Cypress) smoke with axe on the critical journeys.',
      'Optional on main or nightly: Lighthouse CI accessibility category, pa11y-ci, or a full Storybook test-runner pass.',
      'Do not fail the build on known backlog issues without a tracked exception; do fail it on new violations in touched flows.',
    ],
    links: [
      { label: 'Lighthouse CI', href: 'https://github.com/GoogleChrome/lighthouse-ci' },
      { label: 'pa11y-ci', href: 'https://github.com/pa11y/pa11y-ci' },
    ],
  },
  {
    id: 'manual',
    title: 'Manual checks automation cannot replace',
    paragraphs: [
      'axe and linters do not know whether a heading outline makes sense, whether a control should have been a link, or whether Tab order matches the visual layout. After you build a view, walk it yourself.',
    ],
    bullets: [
      'Tab (and Shift+Tab) through the view: every control is reachable, order matches the layout, focus is never lost.',
      'Chrome DevTools → Elements → Accessibility pane → Headings: one h1, no skipped levels, reads as a table of contents.',
      'The same pane → Name: every input, button, and link has an accessible name. Placeholder is not a name.',
      'Skip link appears on first Tab and jumps to main content.',
      'Screen-reader spot check (VoiceOver, NVDA, or TalkBack) on new flows — especially forms, dialogs, and navigation.',
    ],
    links: [
      { label: 'WCAG 2.2 quick reference', href: 'https://www.w3.org/WAI/WCAG22/quickref/' },
      { label: 'WebAIM', href: 'https://webaim.org/' },
    ],
  },
];
