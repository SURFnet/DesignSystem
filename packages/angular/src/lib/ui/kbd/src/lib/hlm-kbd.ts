import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: 'kbd[hlmKbd]',
  host: {
    'data-slot': 'kbd',
  },
})
export class HlmKbd {
  constructor() {
    // Styling lives in ./hlm-kbd.css.
    classes(() => 'curve-kbd');
  }
}
