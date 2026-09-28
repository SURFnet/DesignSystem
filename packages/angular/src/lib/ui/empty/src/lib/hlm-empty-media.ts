import { Directive, input } from '@angular/core';
import { classes } from '../../../utils/src';
import type { EmptyMediaVariantName } from '@surfnet/curve-contracts';

// Styling lives in ./hlm-empty.css.
const emptyMediaVariantClasses = {
  default: 'curve-empty-media--variant-default',
  icon: 'curve-empty-media--variant-icon',
} satisfies Record<EmptyMediaVariantName, string>;

export type EmptyMediaVariants = { variant?: EmptyMediaVariantName | null };

@Directive({
  selector: '[hlmEmptyMedia],hlm-empty-media',
  host: {
    'data-slot': 'empty-media',
    '[attr.data-variant]': 'variant()',
  },
})
export class HlmEmptyMedia {
  public readonly variant = input<EmptyMediaVariants['variant']>();

  constructor() {
    classes(() => ['curve-empty-media', emptyMediaVariantClasses[this.variant() ?? 'default']]);
  }
}
