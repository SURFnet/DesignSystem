import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmInputOtpGroup],hlm-input-otp-group',
  host: { 'data-slot': 'input-otp-group' },
})
export class HlmInputOtpGroup {
  constructor() {
    classes(() => 'curve-input-otp-group');
  }
}
