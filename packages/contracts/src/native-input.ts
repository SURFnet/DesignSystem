import { defineContract } from './define-contract.js';

export const nativeInputContract = defineContract({
  props: {
    sizes: ['default', 'sm'],
  },
  defaults: {
    sizes: 'default',
  },
  docs: {
    description:
      'A styled native <input> for text-like types (text, email, password, number, search, url, tel, date, time, etc.). Prefer the Base UI Input when you need consistent behavior with other form primitives.',
    sizes: {
      default: 'Standard height for most UI contexts.',
      sm: 'Small — compact forms and toolbars.',
    },
  },
});

export type NativeInputSizeName = (typeof nativeInputContract.props.sizes)[number];
