import { Directive } from '@angular/core';
import { HlmLabel } from '../../../label/src';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmFieldLabel],hlm-field-label',
  hostDirectives: [HlmLabel],
  host: { 'data-slot': 'field-label' },
})
export class HlmFieldLabel {
  constructor() {
    // Adds to hlmLabel's `curve-label`; `group/field-label` and `peer/field-label` stay as hooks.
    classes(() => 'curve-field-label group/field-label peer/field-label');
  }
}
