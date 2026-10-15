import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { HlmLabel } from '../../../label/src';
import { classes } from '../../../utils/src';
import { HlmField } from './hlm-field';

@Component({
  selector: '[hlmFieldLabel],hlm-field-label',
  hostDirectives: [HlmLabel],
  host: { 'data-slot': 'field-label' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  // CURVE: "(optioneel)" suffix when the surrounding field is optional (issue #144).
  template: `
    <ng-content />
    @if (_field?.optional()) {
      <span data-slot="field-optional" class="curve-field-optional">{{ optionalText() }}</span>
    }
  `,
})
export class HlmFieldLabel {
  protected readonly _field = inject(HlmField, { optional: true });

  /** Suffix shown when the surrounding field is `optional`. */
  public readonly optionalText = input('(optioneel)');

  constructor() {
    // Adds to hlmLabel's `curve-label`; `group/field-label` and `peer/field-label` stay as hooks.
    classes(() => 'curve-field-label group/field-label peer/field-label');
  }
}
