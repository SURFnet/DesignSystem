import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmFieldContent],hlm-field-content',
  host: { 'data-slot': 'field-content' },
})
export class HlmFieldContent {
  constructor() {
    classes(() => 'curve-field-content group/field-content');
  }
}
