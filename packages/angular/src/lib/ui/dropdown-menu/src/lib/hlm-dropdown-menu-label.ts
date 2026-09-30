import { type BooleanInput } from '@angular/cdk/coercion';
import { booleanAttribute, Directive, input } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmDropdownMenuLabel],hlm-dropdown-menu-label',
  host: {
    'data-slot': 'dropdown-menu-label',
    '[attr.data-inset]': 'inset() ? "" : null',
  },
})
export class HlmDropdownMenuLabel {
  constructor() {
    classes(() => 'curve-dropdown-menu-label');
  }

  public readonly inset = input<boolean, BooleanInput>(false, {
    transform: booleanAttribute,
  });
}
