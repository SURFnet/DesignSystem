import { booleanAttribute, Directive, input } from '@angular/core';
import type { BooleanInput } from '@angular/cdk/coercion';
import { classes } from '../../../utils/src';

@Directive({
  selector: 'fieldset[hlmFieldSet]',
  // CURVE: `optional` marks the whole group optional (issue #144): the legend gets the
  // "(optioneel)" suffix and the controls inside drop `aria-required`.
  host: {
    'data-slot': 'field-set',
    '[attr.data-optional]': 'optional() ? "true" : null',
  },
})
export class HlmFieldSet {
  /** Mark this group of fields optional. Groups are required by default. */
  public readonly optional = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

  constructor() {
    classes(() => 'curve-field-set');
  }
}
