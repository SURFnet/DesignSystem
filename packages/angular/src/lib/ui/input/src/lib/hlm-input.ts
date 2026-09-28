import { Directive } from '@angular/core';
import { BrnFieldControlDescribedBy } from '@spartan-ng/brain/field';
import { BrnInput } from '@spartan-ng/brain/input';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmInput]',
  hostDirectives: [
    { directive: BrnInput, inputs: ['id', 'forceInvalid'] },
    BrnFieldControlDescribedBy,
  ],
})
export class HlmInput {
  constructor() {
    // Styling lives in ./hlm-input.css (bundled into the package's styles.css).
    classes(() => 'curve-input');
  }
}
