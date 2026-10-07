'use client';

import * as React from 'react';
import { CaretDownIcon } from '@phosphor-icons/react';
import type { NativeSelectSizeName } from '@surfnet/curve-contracts';

import { cn } from '@/lib/utils';
import { useAriaRequired } from '@/components/ui/field';

import styles from './native-select.module.css';

type NativeSelectProps = Omit<React.ComponentProps<'select'>, 'size'> & {
  size?: NativeSelectSizeName;
};

function NativeSelect({ className, size = 'default', ...props }: NativeSelectProps) {
  // CURVE: required by default unless inside <Field optional> (issue #144).
  const ariaRequired = useAriaRequired(props['aria-required'], props.required);
  return (
    <div
      className={cn(styles.wrapper, className)}
      data-slot="native-select-wrapper"
      data-size={size}
    >
      <select
        data-slot="native-select"
        data-size={size}
        aria-required={ariaRequired}
        className={styles.select}
        {...props}
      />
      <CaretDownIcon className={styles.icon} aria-hidden="true" data-slot="native-select-icon" />
    </div>
  );
}

function NativeSelectOption({ className, ...props }: React.ComponentProps<'option'>) {
  return (
    <option data-slot="native-select-option" className={cn(styles.option, className)} {...props} />
  );
}

function NativeSelectOptGroup({ className, ...props }: React.ComponentProps<'optgroup'>) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn(styles.option, className)}
      {...props}
    />
  );
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption };
