import { defineContract } from './define-contract.js';

export const alertDialogContract = defineContract({
  props: {
    sizes: ['default', 'sm'],
  },
  defaults: {
    sizes: 'default',
  },
  docs: {
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
    sizes: {
      default: 'Roomy content with a left-aligned header from the `sm` breakpoint up.',
      sm: 'Compact content that keeps a centered header and a two-column footer.',
    },
  },
});

export type AlertDialogSizeName = (typeof alertDialogContract.props.sizes)[number];
