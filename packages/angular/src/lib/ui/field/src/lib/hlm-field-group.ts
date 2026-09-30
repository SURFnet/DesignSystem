import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmFieldGroup],hlm-field-group',
  host: { 'data-slot': 'field-group' },
})
export class HlmFieldGroup {
  constructor() {
    // `group/field-group` stays as a hook for consumers' Tailwind.
    classes(() => 'curve-field-group group/field-group');
  }
}
