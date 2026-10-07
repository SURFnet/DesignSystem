import * as React from 'react';

import { cn } from '@/lib/utils';
import { useAriaRequired } from '@/components/ui/field';

import styles from './textarea.module.css';

function Textarea({
  className,
  optional,
  ...props
}: React.ComponentProps<'textarea'> & {
  /**
   * Mark this control optional, e.g. when it isn't inside a `Field`. Inside a Field, prefer
   * `<Field optional>` so the label gets its "(optioneel)" suffix too.
   */
  optional?: boolean;
}) {
  // CURVE: required by default unless `optional` or inside <Field optional> (issue #144).
  const ariaRequired = useAriaRequired(props['aria-required'], props.required, optional);
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
