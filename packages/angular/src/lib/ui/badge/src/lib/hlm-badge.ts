import { Directive, input } from '@angular/core';
import { classes } from '../../../utils/src';
import type { BadgeVariantName } from '@surfnet/curve-contracts';
import { type VariantProps, cva } from 'class-variance-authority';

const badgeVariantClasses = {
  default: 'bg-primary text-primary-foreground [a]:hover:bg-primary/80',
  secondary: 'bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80',
  info: 'bg-info-subtle text-info-subtle-foreground [a]:hover:bg-info-subtle-hover focus-visible:ring-info/20 dark:focus-visible:ring-info/40',
  success:
    'bg-success-subtle text-success-subtle-foreground [a]:hover:bg-success-subtle-hover focus-visible:ring-success/20 dark:focus-visible:ring-success/40',
  warning:
    'bg-warning-subtle text-warning-subtle-foreground [a]:hover:bg-warning-subtle-hover focus-visible:ring-warning/20 dark:focus-visible:ring-warning/40',
  danger:
    'bg-danger-subtle text-danger-subtle-foreground [a]:hover:bg-danger-subtle-hover focus-visible:ring-danger/20 dark:focus-visible:ring-danger/40',
  outline: 'border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground',
  ghost: 'hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50',
  link: 'text-primary underline-offset-4 hover:underline',
} satisfies Record<BadgeVariantName, string>;

const badgeVariants = cva(
  'h-5 gap-1 rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium transition-all has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5 [&>ng-icon]:text-[calc(var(--spacing)*3)] group/badge focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 inline-flex w-fit shrink-0 items-center justify-center overflow-hidden whitespace-nowrap focus-visible:ring-[3px] [&>ng-icon]:pointer-events-none',
  {
    variants: {
      variant: badgeVariantClasses,
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;

@Directive({
  selector: '[hlmBadge],hlm-badge',
  host: {
    'data-slot': 'badge',
    '[attr.data-variant]': 'variant()',
  },
})
export class HlmBadge {
  public readonly variant = input<BadgeVariants['variant']>('default');

  constructor() {
    classes(() => badgeVariants({ variant: this.variant() }));
  }
}
