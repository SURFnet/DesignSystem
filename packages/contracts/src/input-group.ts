import { defineContract } from './define-contract.js';

export const inputGroupContract = defineContract({
  docs: {
    description:
      'Composable input wrapper that supports leading/trailing icons, buttons, and prefix text via addon slots.',
  },
});
