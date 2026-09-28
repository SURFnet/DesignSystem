import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: 'brn-switch-thumb[hlm],[hlmSwitchThumb]',
})
export class HlmSwitchThumb {
  constructor() {
    // Styling lives in ./hlm-switch.css.
    classes(() => 'curve-switch-thumb');
  }
}
