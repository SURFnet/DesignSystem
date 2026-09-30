import { Directive, input } from '@angular/core';
import { classes } from '../../../utils/src';
import type { ItemSizeName, ItemVariantName } from '@surfnet/curve-contracts';
import { injectHlmItemConfig } from './hlm-item-token';

// Styling lives in ./hlm-item.css; `group/item` stays as a hook for consumers' Tailwind.
const itemVariantClasses = {
  default: 'curve-item--variant-default',
  outline: 'curve-item--variant-outline',
  muted: 'curve-item--variant-muted',
} satisfies Record<ItemVariantName, string>;

const itemSizeClasses = {
  default: 'curve-item--size-default',
  sm: 'curve-item--size-sm',
  xs: 'curve-item--size-xs',
} satisfies Record<ItemSizeName, string>;

export type ItemVariants = {
  variant?: ItemVariantName | null;
  size?: ItemSizeName | null;
};

@Directive({
  selector: '[hlmItem],hlm-item',
  host: {
    'data-slot': 'item',
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size()',
  },
})
export class HlmItem {
  private readonly _config = injectHlmItemConfig();
  public readonly variant = input<ItemVariants['variant']>(this._config.variant);
  public readonly size = input<ItemVariants['size']>(this._config.size);

  constructor() {
    classes(() => [
      'curve-item group/item',
      itemVariantClasses[this.variant() ?? 'default'],
      itemSizeClasses[this.size() ?? 'default'],
    ]);
  }
}
