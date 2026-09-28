import { NumberInput } from '@angular/cdk/coercion';
import { Directive, input, numberAttribute } from '@angular/core';
import { BrnToggleGroup } from '@spartan-ng/brain/toggle-group';
import type { ToggleGroupOrientationName } from '@surfnet/curve-contracts';
import { ToggleVariants } from '../../../toggle/src';
import { classes } from '../../../utils/src';
import { provideHlmToggleGroup } from './hlm-toggle-group.token';

@Directive({
  selector: '[hlmToggleGroup],hlm-toggle-group',
  providers: [provideHlmToggleGroup(HlmToggleGroup)],
  hostDirectives: [
    {
      directive: BrnToggleGroup,
      inputs: ['type', 'value', 'nullable', 'disabled'],
      outputs: ['valueChange'],
    },
  ],
  host: {
    'data-slot': 'toggle-group',
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size()',
    '[attr.data-spacing]': 'spacing()',
    '[attr.data-orientation]': 'orientation()',
    '[style.--gap]': 'spacing()',
  },
})
export class HlmToggleGroup {
  public readonly variant = input<ToggleVariants['variant']>('default');
  public readonly size = input<ToggleVariants['size']>('default');
  public readonly spacing = input<number, NumberInput>(0, { transform: numberAttribute });
  public readonly orientation = input<ToggleGroupOrientationName>('horizontal');

  constructor() {
    // Styling lives in ./hlm-toggle-group.css; `group/toggle-group` stays as a hook for consumers' Tailwind.
    classes(() => 'curve-toggle-group group/toggle-group');
  }
}
