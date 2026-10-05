import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: 'fieldset[hlmFieldSet]',
  host: { 'data-slot': 'field-set' },
})
export class HlmFieldSet {
  constructor() {
    classes(() => 'curve-field-set');
  }
}
