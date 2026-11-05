import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { classes } from '../../../utils/src';
import { HlmFieldSet } from './hlm-field-set';

@Component({
  selector: 'legend[hlmFieldLegend]',
  host: {
    'data-slot': 'field-legend',
    '[attr.data-variant]': 'variant()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  // CURVE: "(optioneel)" suffix when the surrounding fieldset is optional (issue #144).
  template: `
    <ng-content />
    @if (_fieldSet?.optional()) {
      <span data-slot="field-optional" class="curve-field-optional">{{ optionalText() }}</span>
    }
  `,
})
export class HlmFieldLegend {
  protected readonly _fieldSet = inject(HlmFieldSet, { optional: true });

  public readonly variant = input<'label' | 'legend'>('legend');

  /** Suffix shown when the surrounding fieldset is `optional`. */
  public readonly optionalText = input('(optioneel)');

  constructor() {
    classes(() => 'curve-field-legend');
  }
}
