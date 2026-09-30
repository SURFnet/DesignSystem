'use client';

import * as React from 'react';
import type { AlertVariantName } from '@surfnet/curve-contracts';

import { cn } from '@/lib/utils';

import alertStyles from './alert.module.css';

type AlertModuleClasses = {
  alert: string;
  variantDefault: string;
  variantInfo: string;
  variantSuccess: string;
  variantWarning: string;
  variantDanger: string;
  title: string;
  description: string;
  action: string;
};

const styles = alertStyles as AlertModuleClasses;

const variantClass: Record<AlertVariantName, string> = {
  default: styles.variantDefault,
  info: styles.variantInfo,
  success: styles.variantSuccess,
  warning: styles.variantWarning,
  danger: styles.variantDanger,
};

type AlertProps = React.ComponentProps<'div'> & {
  variant?: AlertVariantName;
};

function Alert({ className, variant = 'default', ...props }: AlertProps) {
  return (
    <div
      data-slot="alert"
      role="alert"
      data-variant={variant}
      className={cn(styles.alert, variantClass[variant], className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="alert-title" className={cn(styles.title, className)} {...props} />;
}

function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="alert-description" className={cn(styles.description, className)} {...props} />
  );
}

function AlertAction({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="alert-action" className={cn(styles.action, className)} {...props} />;
}

export { Alert, AlertTitle, AlertDescription, AlertAction };
