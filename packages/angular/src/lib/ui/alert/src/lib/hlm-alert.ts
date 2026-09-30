import { Directive, input } from '@angular/core';
import { classes } from '../../../utils/src';
import type { AlertVariantName } from '@surfnet/curve-contracts';

const alertVariantClasses = {
  default: 'curve-alert--variant-default',
  info: 'curve-alert--variant-info',
  success: 'curve-alert--variant-success',
  warning: 'curve-alert--variant-warning',
  danger: 'curve-alert--variant-danger',
} satisfies Record<AlertVariantName, string>;

export type AlertVariants = { variant?: AlertVariantName | null };

@Directive({
  selector: 'hlm-alert,[hlmAlert]',
  host: {
    'data-slot': 'alert',
    role: 'alert',
  },
})
export class HlmAlert {
  public readonly variant = input<AlertVariants['variant']>('default');

  constructor() {
    classes(() => ['curve-alert group/alert', alertVariantClasses[this.variant() ?? 'default']]);
  }
}
