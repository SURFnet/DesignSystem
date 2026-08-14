import { defineContract } from './define-contract.js';

export const nativeSelectContract = defineContract({
  props: {
    sizes: ['default', 'sm'],
  },
  defaults: {
    sizes: 'default',
  },
  docs: {
    description: 'A styled native <select> element for simple option pickers.',
    sizes: {
      default: 'Standard height for most UI contexts.',
      sm: 'Small — compact forms and toolbars.',
    },
  },
});

export type NativeSelectSizeName = (typeof nativeSelectContract.props.sizes)[number];
