'use client';

import { cn } from '@/lib/utils';

import styles from './native-fieldset.module.css';

function NativeFieldset({ className, ...props }: React.ComponentProps<'fieldset'>) {
  return (
    <fieldset data-slot="native-fieldset" className={cn(styles.fieldset, className)} {...props} />
  );
}

function NativeLegend({ className, ...props }: React.ComponentProps<'legend'>) {
  return <legend data-slot="native-legend" className={cn(styles.legend, className)} {...props} />;
}

function NativeFieldsetContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="native-fieldset-content" className={cn(styles.content, className)} {...props} />
  );
}

function NativeFieldsetRow({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="native-fieldset-row" className={cn(styles.row, className)} {...props} />;
}

function NativeFieldsetLabel({ className, ...props }: React.ComponentProps<'label'>) {
  return (
    <label data-slot="native-fieldset-label" className={cn(styles.label, className)} {...props} />
  );
}

function NativeFieldsetHint({ className, ...props }: React.ComponentProps<'p'>) {
  return <p data-slot="native-fieldset-hint" className={cn(styles.hint, className)} {...props} />;
}

export {
  NativeFieldset,
  NativeFieldsetContent,
  NativeFieldsetHint,
  NativeFieldsetLabel,
  NativeFieldsetRow,
  NativeLegend,
};
