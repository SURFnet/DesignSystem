import { Directive } from '@angular/core';
import { BrnSeparator } from '@spartan-ng/brain/separator';
import { classes } from '../../../utils/src';

// Styling lives in ./hlm-separator.css.
export const hlmSeparatorClass = 'curve-separator';

@Directive({
  selector: '[hlmSeparator],hlm-separator',
  hostDirectives: [{ directive: BrnSeparator, inputs: ['orientation', 'decorative'] }],
  host: {
    'data-slot': 'separator',
  },
})
export class HlmSeparator {
  constructor() {
    classes(() => hlmSeparatorClass);
  }
}
