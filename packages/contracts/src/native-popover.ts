import { defineContract } from './define-contract.js';

export const nativePopoverContract = defineContract({
  docs: {
    description:
      'Floating content using the native Popover API (`popover` + `popovertarget`). Prefer Base UI Popover when you need positioning props, portals, or animation parity with other overlays.',
  },
});
