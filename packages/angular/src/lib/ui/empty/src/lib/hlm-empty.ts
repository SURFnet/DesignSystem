import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmEmpty],hlm-empty',
  host: { 'data-slot': 'empty' },
})
export class HlmEmpty {
  constructor() {
    // Styling lives in ./hlm-empty.css.
    classes(() => 'curve-empty');
  }
}
