'use client';

import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';
import type { BadgeVariantName } from '@surfnet/curve-contracts';

import { cn } from '@/lib/utils';

const badgeVariantClasses = {
  default: 'bg-primary text-primary-foreground [a]:hover:bg-primary/80',
  secondary: 'bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80',
  info: 'bg-info-subtle text-info-subtle-foreground focus-visible:ring-info/20 dark:focus-visible:ring-info/40 [a]:hover:bg-info-subtle-hover',
  success:
    'bg-success-subtle text-success-subtle-foreground focus-visible:ring-success/20 dark:focus-visible:ring-success/40 [a]:hover:bg-success-subtle-hover',
  warning:
    'bg-warning-subtle text-warning-subtle-foreground focus-visible:ring-warning/20 dark:focus-visible:ring-warning/40 [a]:hover:bg-warning-subtle-hover',
  danger:
    'bg-danger-subtle text-danger-subtle-foreground focus-visible:ring-danger/20 dark:focus-visible:ring-danger/40 [a]:hover:bg-danger-subtle-hover',
  outline: 'border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground',
  ghost: 'hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50',
  link: 'text-primary underline-offset-4 hover:underline',
} satisfies Record<BadgeVariantName, string>;

const badgeVariants = cva(
  'group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!',
  {
    variants: {
      variant: badgeVariantClasses,
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function Badge({
  className,
  variant = 'default',
  render,
  ...props
}: useRender.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props,
    ),
    render,
    state: {
      slot: 'badge',
      variant,
    },
  });
}

export { Badge, badgeVariants };
