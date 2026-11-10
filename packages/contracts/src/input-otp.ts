import { defineContract } from './define-contract.js';

export const inputOtpContract = defineContract({
  props: {
    variants: ['default', 'with-spacing'],
  },
  defaults: {
    variants: 'default',
  },
  docs: {
    description: 'A one-time-password input split across individual character slots.',
    variants: {
      default: 'Slots joined into one bordered strip, sharing their borders.',
      'with-spacing': 'Each slot is its own rounded box, with a gap between slots.',
    },
  },
});

export type InputOtpVariantName = (typeof inputOtpContract.props.variants)[number];
