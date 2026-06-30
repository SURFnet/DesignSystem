import { Directive } from '@angular/core';
import { classes } from '../../../utils/src/lib/hlm';

@Directive({
  selector: '[hlmFieldContent],hlm-field-content',
  host: { 'data-slot': 'field-content' },
})
export class HlmFieldContent {
  constructor() {
    classes(() => 'gap-1 group/field-content flex flex-1 flex-col leading-snug');
  }
}
