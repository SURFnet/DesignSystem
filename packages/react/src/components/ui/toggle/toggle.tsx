'use client';

import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';
import type { ToggleSizeName, ToggleVariantName } from '@surfnet/curve-contracts';

import { cn } from '@/lib/utils';

import toggleStyles from './toggle.module.css';

type ToggleModuleClasses = {
  toggle: string;
  variantDefault: string;
  variantOutline: string;
  sizeDefault: string;
  sizeSm: string;
  sizeLg: string;
};

const styles = toggleStyles as ToggleModuleClasses;

const variantClass: Record<ToggleVariantName, string> = {
  default: styles.variantDefault,
  outline: styles.variantOutline,
};

const sizeClass: Record<ToggleSizeName, string> = {
  default: styles.sizeDefault,
  sm: styles.sizeSm,
  lg: styles.sizeLg,
};

export type ToggleVariantsOptions = {
  variant?: ToggleVariantName;
  size?: ToggleSizeName;
  className?: string;
};

function toggleVariants({
  variant = 'default',
  size = 'default',
  className,
}: ToggleVariantsOptions = {}) {
  return cn(styles.toggle, variantClass[variant], sizeClass[size], className);
}

type ToggleProps = TogglePrimitive.Props & ToggleVariantsOptions;

function Toggle({ className, variant = 'default', size = 'default', ...props }: ToggleProps) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      data-variant={variant}
      data-size={size}
      className={toggleVariants({ variant, size, className })}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
