import { defineContract } from './define-contract.js';

export const toggleContract = defineContract({
  props: {
    variants: ['default', 'outline'],
    sizes: ['default', 'sm', 'lg'],
  },
  defaults: {
    variants: 'default',
    sizes: 'default',
  },
  docs: {
    description: 'A two-state button that can be either on or off.',
    variants: {
      default: 'No border, transparent background until pressed.',
      outline: 'Bordered, transparent fill.',
    },
    sizes: {
      default: 'Standard height for most UI contexts.',
      sm: 'Small — secondary controls, filter bars.',
      lg: 'Large — prominent controls.',
    },
  },
});

export type ToggleVariantName = (typeof toggleContract.props.variants)[number];
export type ToggleSizeName = (typeof toggleContract.props.sizes)[number];
