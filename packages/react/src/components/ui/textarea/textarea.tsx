import * as React from 'react';

import { cn } from '@/lib/utils';
import { useAriaRequired } from '@/components/ui/field/field-context';

import styles from './textarea.module.css';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  // CURVE: required by default unless inside <Field optional> (issue #144).
  const ariaRequired = useAriaRequired(props['aria-required']);
  return (
    <textarea
      data-slot="textarea"
      aria-required={ariaRequired}
      className={cn(styles.textarea, className)}
      {...props}
    />
  );
}

export { Textarea };
