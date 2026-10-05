import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmFieldTitle],hlm-field-title',
  host: { 'data-slot': 'field-label' },
})
export class HlmFieldTitle {
  constructor() {
    classes(() => 'curve-field-title');
  }
}
