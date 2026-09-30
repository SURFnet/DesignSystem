import { computed, Directive, input } from '@angular/core';
import { BrnToggleGroupItem } from '@spartan-ng/brain/toggle-group';
import { toggleVariants, ToggleVariants } from '../../../toggle/src';
import { classes } from '../../../utils/src';
import { injectHlmToggleGroup } from './hlm-toggle-group.token';

@Directive({
  selector: 'button[hlmToggleGroupItem]',
  hostDirectives: [
    {
      directive: BrnToggleGroupItem,
      inputs: ['id', 'value', 'disabled', 'state', 'aria-label', 'type'],
      outputs: ['stateChange'],
    },
  ],
  host: {
    'data-slot': 'toggle-group-item',
    '[attr.data-variant]': '_variant()',
    '[attr.data-size]': '_size()',
    '[attr.data-spacing]': '_toggleGroup.spacing()',
  },
})
export class HlmToggleGroupItem {
  protected readonly _toggleGroup = injectHlmToggleGroup();

  public readonly variant = input<ToggleVariants['variant']>('default');
  public readonly size = input<ToggleVariants['size']>('default');

  protected readonly _variant = computed(() => this._toggleGroup.variant() || this.variant());
  protected readonly _size = computed(() => this._toggleGroup.size() || this.size());

  constructor() {
    classes(() => [
      'curve-toggle-group-item',
      toggleVariants({
        variant: this._variant(),
        size: this._size(),
      }),
    ]);
  }
}
