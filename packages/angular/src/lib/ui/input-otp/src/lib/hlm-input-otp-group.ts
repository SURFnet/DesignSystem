import { Directive, inject } from '@angular/core';
import { BrnFieldControl } from '@spartan-ng/brain/field';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmInputOtpGroup],hlm-input-otp-group',
  host: {
    'data-slot': 'input-otp-group',
    '[attr.data-matches-spartan-invalid]': "_fieldControl?.spartanInvalid() ? 'true' : null",
  },
})
export class HlmInputOtpGroup {
  protected readonly _fieldControl = inject(BrnFieldControl, { optional: true });

  constructor() {
    classes(() => 'curve-input-otp-group');
  }
}
