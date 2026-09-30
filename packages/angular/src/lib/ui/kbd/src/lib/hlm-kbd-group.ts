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
    classes(() => 'curve-kbd-group');
  }
}
