import { Directive, input } from '@angular/core';
import { classes } from '../../../utils/src';
import type { BadgeVariantName } from '@surfnet/curve-contracts';

const badgeVariantClasses = {
  default: 'curve-badge--variant-default',
  secondary: 'curve-badge--variant-secondary',
  info: 'curve-badge--variant-info',
  success: 'curve-badge--variant-success',
  warning: 'curve-badge--variant-warning',
  danger: 'curve-badge--variant-danger',
  outline: 'curve-badge--variant-outline',
  ghost: 'curve-badge--variant-ghost',
  link: 'curve-badge--variant-link',
} satisfies Record<BadgeVariantName, string>;

export type BadgeVariants = { variant?: BadgeVariantName | null };

@Directive({
  selector: '[hlmBadge],hlm-badge',
  host: {
    'data-slot': 'badge',
    '[attr.data-variant]': 'variant() ?? "default"',
  },
})
export class HlmBadge {
  public readonly variant = input<BadgeVariants['variant']>('default');

  constructor() {
    classes(() => ['curve-badge', badgeVariantClasses[this.variant() ?? 'default']]);
  }
}
