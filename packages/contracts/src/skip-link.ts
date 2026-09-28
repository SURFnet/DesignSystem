import { defineContract } from './define-contract.js';

export const skipLinkContract = defineContract({
  docs: {
    description:
      'A link that lets keyboard and screen-reader users bypass repeated blocks (header, navigation) and jump straight to the main content. Hidden until it receives keyboard focus; place it as the first focusable element on the page and point its href at the id of the target, e.g. <main id="main-content">. On activation it moves focus to the target (adding tabindex="-1" temporarily when the target is not focusable), so the next Tab continues from there — also in apps with a <base href> or client-side router.',
  },
});
