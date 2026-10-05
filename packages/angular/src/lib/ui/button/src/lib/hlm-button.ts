import { Directive, input, signal } from '@angular/core';
import { BrnButton } from '@spartan-ng/brain/button';
import { classes, hlm } from '../../../utils/src';
import type { ButtonSizeName, ButtonVariantName } from '@surfnet/curve-contracts';
import type { ClassValue } from 'clsx';
import { injectBrnButtonConfig } from './hlm-button.token';

// Variant/size are modifier classes rather than only data attributes so that
// `buttonVariants()` also works on elements that aren't an `hlmBtn` host
// (calendar nav, pagination links, tab scroll buttons, …).
const variantClasses = {
  default: 'curve-button--variant-default',
  outline: 'curve-button--variant-outline',
  secondary: 'curve-button--variant-secondary',
  ghost: 'curve-button--variant-ghost',
  destructive: 'curve-button--variant-destructive',
  link: 'curve-button--variant-link',
} satisfies Record<ButtonVariantName, string>;

const sizeClasses = {
  default: 'curve-button--size-default',
  sm: 'curve-button--size-sm',
  lg: 'curve-button--size-lg',
  icon: 'curve-button--size-icon',
  'icon-xs': 'curve-button--size-icon-xs',
  'icon-sm': 'curve-button--size-icon-sm',
  'icon-lg': 'curve-button--size-icon-lg',
} satisfies Record<ButtonSizeName, string>;

export type ButtonVariants = {
  variant?: ButtonVariantName | null;
  size?: ButtonSizeName | null;
};

export function buttonVariants({
  variant,
  size,
  class: className,
}: ButtonVariants & { class?: ClassValue } = {}): string {
  return hlm(
    'curve-button',
    variantClasses[variant ?? 'default'],
    sizeClasses[size ?? 'default'],
    className,
  );
}

@Directive({
  selector: 'button[hlmBtn], a[hlmBtn]',
  exportAs: 'hlmBtn',
  hostDirectives: [{ directive: BrnButton, inputs: ['disabled'] }],
  // No data-variant/data-size host attributes: the modifier classes carry them,
  // and a bare [data-size] would trip ancestors' `:has([data-size=…])` rules
  // (e.g. the item group gap).
  host: { 'data-slot': 'button' },
})
export class HlmButton {
  private readonly _config = injectBrnButtonConfig();

  private readonly _additionalClasses = signal<ClassValue>('');

  public readonly variant = input<ButtonVariants['variant']>(this._config.variant);

  public readonly size = input<ButtonVariants['size']>(this._config.size);

  constructor() {
    classes(() => [
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this._additionalClasses(),
    ]);
  }

  setClass(classes: string): void {
    this._additionalClasses.set(classes);
  }
}
