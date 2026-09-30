import { Directive, input } from '@angular/core';
import { BrnToggle } from '@spartan-ng/brain/toggle';
import { classes, hlm } from '../../../utils/src';
import type { ToggleSizeName, ToggleVariantName } from '@surfnet/curve-contracts';
import type { ClassValue } from 'clsx';

const toggleVariantClasses = {
  default: 'curve-toggle--variant-default',
  outline: 'curve-toggle--variant-outline',
} satisfies Record<ToggleVariantName, string>;

const toggleSizeClasses = {
  default: 'curve-toggle--size-default',
  sm: 'curve-toggle--size-sm',
  lg: 'curve-toggle--size-lg',
} satisfies Record<ToggleSizeName, string>;

export type ToggleVariants = {
  variant?: ToggleVariantName | null;
  size?: ToggleSizeName | null;
};

export function toggleVariants({
  variant,
  size,
  class: className,
}: ToggleVariants & { class?: ClassValue } = {}): string {
  return hlm(
    'curve-toggle group/toggle',
    toggleVariantClasses[variant ?? 'default'],
    toggleSizeClasses[size ?? 'default'],
    className,
  );
}

@Directive({
  selector: 'button[hlmToggle]',
  hostDirectives: [
    {
      directive: BrnToggle,
      inputs: ['id', 'value', 'disabled', 'state', 'aria-label', 'type'],
      outputs: ['stateChange'],
    },
  ],
  host: {
    'data-slot': 'toggle',
  },
})
export class HlmToggle {
  public readonly variant = input<ToggleVariants['variant']>('default');
  public readonly size = input<ToggleVariants['size']>('default');
  constructor() {
    classes(() =>
      toggleVariants({
        variant: this.variant(),
        size: this.size(),
      }),
    );
  }
}
