import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmButtonGroupText],hlm-button-group-text',
  host: {
    'data-slot': 'button-group-text',
  },
})
export class HlmButtonGroupText {
  constructor() {
    // Styling lives in ./hlm-button-group.css.
    classes(() => 'curve-button-group-text');
  }
}
