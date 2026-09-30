import { Directive, input } from '@angular/core';
import { classes } from '../../../utils/src';
import type { ButtonGroupOrientationName } from '@surfnet/curve-contracts';

const buttonGroupOrientationClasses = {
  horizontal: 'curve-button-group--horizontal',
  vertical: 'curve-button-group--vertical',
} satisfies Record<ButtonGroupOrientationName, string>;

@Directive({
  selector: '[hlmButtonGroup],hlm-button-group',
  host: {
    'data-slot': 'button-group',
    role: 'group',
    '[attr.data-orientation]': 'orientation()',
  },
})
export class HlmButtonGroup {
  constructor() {
    classes(() => ['curve-button-group', buttonGroupOrientationClasses[this.orientation()]]);
  }

  public readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
}
