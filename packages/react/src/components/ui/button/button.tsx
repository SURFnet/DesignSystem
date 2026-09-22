'use client';

import { Button as ButtonPrimitive } from '@base-ui/react/button';
import type { ButtonSizeName, ButtonVariantName } from '@surfnet/curve-contracts';

import { cn } from '@/lib/utils';

import buttonStyles from './button.module.css';

type ButtonModuleClasses = {
  button: string;
  variantDefault: string;
  variantOutline: string;
  variantSecondary: string;
  variantGhost: string;
  variantDestructive: string;
  variantLink: string;
  sizeDefault: string;
  sizeSm: string;
  sizeLg: string;
  sizeIcon: string;
  sizeIconXs: string;
  sizeIconSm: string;
  sizeIconLg: string;
};

const styles = buttonStyles as ButtonModuleClasses;

const variantClass: Record<ButtonVariantName, string> = {
  default: styles.variantDefault,
  outline: styles.variantOutline,
  secondary: styles.variantSecondary,
  ghost: styles.variantGhost,
  destructive: styles.variantDestructive,
  link: styles.variantLink,
};

const sizeClass: Record<ButtonSizeName, string> = {
  default: styles.sizeDefault,
  sm: styles.sizeSm,
  lg: styles.sizeLg,
  icon: styles.sizeIcon,
  'icon-xs': styles.sizeIconXs,
  'icon-sm': styles.sizeIconSm,
  'icon-lg': styles.sizeIconLg,
};

type ButtonVariantsOptions = {
  variant?: ButtonVariantName;
  size?: ButtonSizeName;
  className?: string;
};

function buttonVariants({
  variant = 'default',
  size = 'default',
  className,
}: ButtonVariantsOptions = {}) {
  return cn(styles['button'], variantClass[variant], sizeClass[size], className);
}

type ButtonProps = ButtonPrimitive.Props &
  ButtonVariantsOptions & {
    variant?: ButtonVariantName;
    size?: ButtonSizeName;
  };

function Button({ className, variant = 'default', size = 'default', ...props }: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
}

export { Button, buttonVariants };
