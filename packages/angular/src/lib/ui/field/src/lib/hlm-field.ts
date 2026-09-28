import { Directive, input } from '@angular/core';
import { BrnField } from '@spartan-ng/brain/field';
import { classes } from '../../../utils/src';
import type { FieldOrientationName } from '@surfnet/curve-contracts';

// Styling lives in ./hlm-field.css.
const fieldOrientationClasses = {
  vertical: 'curve-field--vertical',
  horizontal: 'curve-field--horizontal',
  responsive: 'curve-field--responsive',
} satisfies Record<FieldOrientationName, string>;

export type FieldVariants = { orientation?: FieldOrientationName | null };

@Directive({
  selector: '[hlmField],hlm-field',
  hostDirectives: [{ directive: BrnField, inputs: ['data-invalid', 'forceInvalid'] }],
  host: {
    role: 'group',
    'data-slot': 'field',
    '[attr.data-orientation]': 'orientation()',
  },
})
export class HlmField {
  public readonly orientation = input<FieldVariants['orientation']>('vertical');

  constructor() {
    // `group/field` stays as a hook for consumers' Tailwind.
    classes(() => [
      'curve-field group/field',
      fieldOrientationClasses[this.orientation() ?? 'vertical'],
    ]);
  }
}
