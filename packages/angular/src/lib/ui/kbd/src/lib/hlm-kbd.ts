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
    classes(() => 'curve-kbd');
  }
}
