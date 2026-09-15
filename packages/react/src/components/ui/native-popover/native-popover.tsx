'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

import styles from './native-popover.module.css';

type NativePopoverProps = React.ComponentProps<'div'> & {
  popover?: 'auto' | 'manual' | '';
};

function NativePopover({ className, popover = 'auto', ...props }: NativePopoverProps) {
  return (
    <div
      data-slot="native-popover"
      popover={popover}
      className={cn(styles.popover, className)}
      {...props}
    />
  );
}

type NativePopoverTriggerProps = React.ComponentProps<'button'> & {
  popoverTarget: string;
};

function NativePopoverTrigger({
  className,
  popoverTarget,
  type = 'button',
  ...props
}: NativePopoverTriggerProps) {
  return (
    <button
      type={type}
      data-slot="native-popover-trigger"
      popoverTarget={popoverTarget}
      className={cn(styles.trigger, className)}
      {...props}
    />
  );
}

function NativePopoverHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="native-popover-header" className={cn(styles.header, className)} {...props} />
  );
}

function NativePopoverTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="native-popover-title" className={cn(styles.title, className)} {...props} />
  );
}

function NativePopoverDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="native-popover-description"
      className={cn(styles.description, className)}
      {...props}
    />
  );
}

export {
  NativePopover,
  NativePopoverDescription,
  NativePopoverHeader,
  NativePopoverTitle,
  NativePopoverTrigger,
};
