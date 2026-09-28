import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: 'kbd[hlmKbdGroup]',
  host: {
    'data-slot': 'kbd-group',
  },
})
export class HlmKbdGroup {
  constructor() {
    // Styling lives in ./hlm-kbd.css.
    classes(() => 'curve-kbd-group');
  }
}
