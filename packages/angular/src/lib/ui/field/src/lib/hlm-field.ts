import { booleanAttribute, Directive, input } from '@angular/core';
import type { BooleanInput } from '@angular/cdk/coercion';
import { BrnField } from '@spartan-ng/brain/field';
import { classes } from '../../../utils/src';
import type { FieldNecessityName, FieldOrientationName } from '@surfnet/curve-contracts';

const fieldOrientationClasses = {
  vertical: 'curve-field--vertical',
  horizontal: 'curve-field--horizontal',
  responsive: 'curve-field--responsive',
} satisfies Record<FieldOrientationName, string>;

// CURVE: fields are required by default (issue #144). `optional` drives both the label's
// "(optioneel)" suffix and the controls' `aria-required`.
const fieldNecessityAttrs = {
  required: null,
  optional: 'true',
} satisfies Record<FieldNecessityName, string | null>;

export type FieldVariants = { orientation?: FieldOrientationName | null };

@Directive({
  selector: '[hlmField],hlm-field',
  hostDirectives: [{ directive: BrnField, inputs: ['data-invalid', 'forceInvalid'] }],
  // CURVE: a11y — no role="group" (upstream adds it): a single field isn't a group, and inside a
  // choice-card label it blanks the label's text for axe. Group fields with hlmFieldSet instead.
  host: {
    'data-slot': 'field',
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-optional]': '_optionalAttr()',
  },
})
export class HlmField {
  public readonly orientation = input<FieldVariants['orientation']>('vertical');

  /** Mark this field optional. Fields are required by default. */
  public readonly optional = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

  protected readonly _optionalAttr = () =>
    fieldNecessityAttrs[this.optional() ? 'optional' : 'required'];

  constructor() {
    // `group/field` stays as a hook for consumers' Tailwind.
    classes(() => [
      'curve-field group/field',
      fieldOrientationClasses[this.orientation() ?? 'vertical'],
    ]);
  }
}
