import { defineContract } from './define-contract.js';

export const switchContract = defineContract({
  props: {
    sizes: ['default', 'sm'],
  },
  defaults: {
    sizes: 'default',
  },
  docs: {
    description: 'A toggle control for switching a setting on or off.',
    sizes: {
      default: 'Standard size for most UI contexts.',
      sm: 'Small — dense forms and toolbars.',
    },
  },
});

export type SwitchSizeName = (typeof switchContract.props.sizes)[number];
