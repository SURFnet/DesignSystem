import { Directive, input } from '@angular/core';
import { classes } from '../../../utils/src';
import type { ItemMediaVariantName } from '@surfnet/curve-contracts';
import { injectHlmItemMediaConfig } from './hlm-item-token';

const itemMediaVariantClasses = {
  default: 'curve-item-media--variant-default',
  icon: 'curve-item-media--variant-icon',
  image: 'curve-item-media--variant-image',
} satisfies Record<ItemMediaVariantName, string>;

export type ItemMediaVariants = { variant?: ItemMediaVariantName | null };

@Directive({
  selector: '[hlmItemMedia],hlm-item-media',
  host: {
    'data-slot': 'item-media',
    '[attr.data-variant]': 'variant()',
  },
})
export class HlmItemMedia {
  private readonly _config = injectHlmItemMediaConfig();
  public readonly variant = input<ItemMediaVariants['variant']>(this._config.variant);

  constructor() {
    classes(() => ['curve-item-media', itemMediaVariantClasses[this.variant() ?? 'default']]);
  }
}
