import { defineContract } from './define-contract.js';

export const nativeRangeContract = defineContract({
  docs: {
    description:
      'A styled native <input type="range">. Prefer Slider for custom thumbs, multiple values, or vertical orientation.',
  },
});
