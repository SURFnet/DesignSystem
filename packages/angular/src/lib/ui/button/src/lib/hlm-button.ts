import { Directive, input, signal } from '@angular/core';
import { BrnButton } from '@spartan-ng/brain/button';
import { classes } from '@spartan-ng/helm/utils';
import type { ButtonSizeName, ButtonVariantName } from '@surfnet/contracts';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ClassValue } from 'clsx';
import { injectBrnButtonConfig } from './hlm-button.token';

const variantClasses = {
  default: 'bg-background-primary text-foreground-primary hover:bg-background-primary-hover',
  outline:
    'border-border-default bg-background-default hover:bg-background-item-hover hover:text-foreground-item-hover aria-expanded:bg-background-item-hover aria-expanded:text-foreground-item-hover shadow-xs',
  secondary:
    'bg-background-secondary text-foreground-secondary aria-expanded:bg-background-secondary aria-expanded:text-foreground-secondary hover:bg-background-secondary-hover',
  ghost:
    'hover:bg-background-item-hover hover:text-foreground-item-hover aria-expanded:bg-background-item-hover aria-expanded:text-foreground-item-hover',
  destructive:
    'bg-background-error-subtle hover:bg-background-error-subtle-hover text-foreground-error focus-visible:border-border-error focus-visible:ring-ring-default-error/20',
  link: 'text-background-primary underline-offset-4 hover:underline',
} satisfies Record<ButtonVariantName, string>;

const sizeClasses = {
  default:
    'h-9 gap-1.5 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
  xs: "h-6 gap-1 rounded-[min(var(--radius-md),8px)] px-2 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_ng-icon:not([class*='text-'])]:text-[calc(var(--spacing)*3)]",
  sm: 'h-8 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5',
  lg: 'h-10 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
  icon: 'size-9',
  'icon-xs':
    "size-6 rounded-[min(var(--radius-md),8px)] in-data-[slot=button-group]:rounded-md [&_ng-icon:not([class*='text-'])]:text-[calc(var(--spacing)*3)]",
  'icon-sm': 'size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-md',
  'icon-lg': 'size-10',
} satisfies Record<ButtonSizeName, string>;

export const buttonVariants = cva(
  "focus-visible:border-ring-default focus-visible:ring-ring-default/50 data-[matches-spartan-invalid=true]:ring-ring-default-error/20 data-[matches-spartan-invalid=true]:border-border-error rounded-md border border-transparent bg-clip-padding text-sm font-medium focus-visible:ring-3 active:not-aria-[haspopup]:translate-y-px data-[matches-spartan-invalid=true]:ring-3 [&_ng-icon:not([class*='text-'])]:text-[calc(var(--spacing)*4)] group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-all outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_ng-icon]:pointer-events-none [&_ng-icon]:shrink-0",
  {
    variants: {
      variant: variantClasses,
      size: sizeClasses,
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

@Directive({
  selector: 'button[hlmBtn], a[hlmBtn]',
  exportAs: 'hlmBtn',
  hostDirectives: [{ directive: BrnButton, inputs: ['disabled'] }],
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
