import { Directive, input } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: 'legend[hlmFieldLegend]',
  host: {
    'data-slot': 'field-legend',
    '[attr.data-variant]': 'variant()',
  },
})
export class HlmFieldLegend {
  public readonly variant = input<'label' | 'legend'>('legend');

  constructor() {
    classes(() => 'curve-field-legend');
  }
}
