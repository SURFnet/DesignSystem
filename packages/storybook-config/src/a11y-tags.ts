/** Known WCAG gap — maps to the sidebar error icon. */
export const A11Y_GAP_TAG = 'a11y-gap';

/** Minor a11y concern — maps to the sidebar warning icon. */
export const A11Y_MINOR_TAG = 'a11y-minor';

/**
 * Shared `main.ts` `tags` config so both Storybooks expose the same sidebar
 * filters. Empty options: no default include/exclude, just a named filter.
 */
export const a11yTagConfig = {
  [A11Y_GAP_TAG]: {},
  [A11Y_MINOR_TAG]: {},
};
