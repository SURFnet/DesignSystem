import { Directive } from '@angular/core';
import { BrnSelectPlaceholder } from '@spartan-ng/brain/select';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmSelectPlaceholder],hlm-select-placeholder',
  hostDirectives: [BrnSelectPlaceholder],
  host: { 'data-slot': 'select-placeholder' },
})
export class HlmSelectPlaceholder {
  constructor() {
    classes(() => 'curve-select-placeholder');
  }
}
