'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

import styles from './native-dialog.module.css';

const NativeDialog = React.forwardRef<HTMLDialogElement, React.ComponentProps<'dialog'>>(
  function NativeDialog({ className, ...props }, ref) {
    return (
      <dialog
        ref={ref}
        data-slot="native-dialog"
        className={cn(styles.dialog, className)}
        {...props}
      />
    );
  },
);

function NativeDialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="native-dialog-header" className={cn(styles.header, className)} {...props} />
  );
}

function NativeDialogTitle({ className, ...props }: React.ComponentProps<'h2'>) {
  return <h2 data-slot="native-dialog-title" className={cn(styles.title, className)} {...props} />;
}

function NativeDialogDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="native-dialog-description"
      className={cn(styles.description, className)}
      {...props}
    />
  );
}

function NativeDialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="native-dialog-footer" className={cn(styles.footer, className)} {...props} />
  );
}

type NativeDialogCloseProps = React.ComponentProps<'button'> & {
  dialogRef?: React.RefObject<HTMLDialogElement | null>;
};

function NativeDialogClose({ className, dialogRef, onClick, ...props }: NativeDialogCloseProps) {
  return (
    <button
      type="button"
      data-slot="native-dialog-close"
      className={cn(styles.close, className)}
      onClick={(event) => {
        dialogRef?.current?.close();
        onClick?.(event);
      }}
      {...props}
    />
  );
}

export {
  NativeDialog,
  NativeDialogClose,
  NativeDialogDescription,
  NativeDialogFooter,
  NativeDialogHeader,
  NativeDialogTitle,
};
