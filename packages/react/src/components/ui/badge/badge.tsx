'use client';

import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import type { BadgeVariantName } from '@surfnet/curve-contracts';

import { cn } from '@/lib/utils';

import badgeStyles from './badge.module.css';

type BadgeModuleClasses = {
  badge: string;
  variantDefault: string;
  variantSecondary: string;
  variantInfo: string;
  variantSuccess: string;
  variantWarning: string;
  variantDanger: string;
  variantOutline: string;
  variantGhost: string;
  variantLink: string;
};

const styles = badgeStyles as BadgeModuleClasses;

const variantClass: Record<BadgeVariantName, string> = {
  default: styles.variantDefault,
  secondary: styles.variantSecondary,
  info: styles.variantInfo,
  success: styles.variantSuccess,
  warning: styles.variantWarning,
  danger: styles.variantDanger,
  outline: styles.variantOutline,
  ghost: styles.variantGhost,
  link: styles.variantLink,
};

type BadgeVariantsOptions = {
  variant?: BadgeVariantName;
  className?: string;
};

function badgeVariants({ variant = 'default', className }: BadgeVariantsOptions = {}) {
  return cn(styles.badge, variantClass[variant], className);
}

function Badge({
  className,
  variant = 'default',
  render,
  ...props
}: useRender.ComponentProps<'span'> & BadgeVariantsOptions) {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: badgeVariants({ variant, className }),
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
