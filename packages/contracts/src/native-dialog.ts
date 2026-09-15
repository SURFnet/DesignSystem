import { defineContract } from './define-contract.js';

export const nativeDialogContract = defineContract({
  docs: {
    description:
      'A styled native <dialog> element with showModal/close support. Prefer the Base UI Dialog when you need focus trapping, nested overlays, or composable header/footer primitives.',
  },
});
