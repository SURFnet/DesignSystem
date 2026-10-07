'use client';

import { createContext, useContext, useMemo } from 'react';
import type { FieldNecessityName, FieldOrientationName } from '@surfnet/curve-contracts';

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

import styles from './field.module.css';

function FieldSet({ className, ...props }: React.ComponentProps<'fieldset'>) {
  return <fieldset data-slot="field-set" className={cn(styles.set, className)} {...props} />;
}

function FieldLegend({
  className,
  variant = 'legend',
  ...props
}: React.ComponentProps<'legend'> & { variant?: 'legend' | 'label' }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(styles.legend, className)}
      {...props}
    />
  );
}

function FieldGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="field-group" className={cn(styles.group, className)} {...props} />;
}

// CURVE: fields are required by default (issue #144). `Field optional` flips both the
// label's "(optioneel)" suffix and the controls' `aria-required` from one place.
const FieldContext = createContext<{ necessity: FieldNecessityName } | null>(null);

const fieldNecessityAttrs = {
  required: undefined,
  optional: 'true',
} satisfies Record<FieldNecessityName, string | undefined>;

/** `true` unless the control sits in a `<Field optional>`. Outside a Field: required. */
function useFieldRequired() {
  return useContext(FieldContext)?.necessity !== 'optional';
}

/**
 * `aria-required` for a form control. Precedence: the consumer's own `aria-required`, then
 * `required`, then the control's own `optional` prop, then the surrounding Field (required by default).
 */
function useAriaRequired(
  own: React.AriaAttributes['aria-required'],
  required?: boolean,
  optional?: boolean,
) {
  const fieldRequired = useFieldRequired();
  if (own !== undefined) return own;
  if (required !== undefined) return required || undefined;
  if (optional !== undefined) return !optional || undefined;
  return fieldRequired || undefined;
}

export type FieldVariantsOptions = {
  orientation?: FieldOrientationName;
  className?: string;
};

function fieldVariants({ className }: FieldVariantsOptions = {}) {
  return cn(styles.field, className);
}

function Field({
  className,
  orientation = 'vertical',
  optional = false,
  ...props
}: React.ComponentProps<'div'> &
  FieldVariantsOptions & {
    /** Mark this field optional. Fields are required by default. */
    optional?: boolean;
  }) {
  const necessity: FieldNecessityName = optional ? 'optional' : 'required';
  const context = useMemo(() => ({ necessity }), [necessity]);
  // CURVE: a11y — no role="group" (upstream adds it): a single field isn't a group, and inside a
  // choice-card label it blanks the label's text for axe. Group fields with FieldSet instead.
  return (
    <FieldContext.Provider value={context}>
      <div
        data-slot="field"
        data-orientation={orientation}
        data-optional={fieldNecessityAttrs[necessity]}
        className={fieldVariants({ orientation, className })}
        {...props}
      />
    </FieldContext.Provider>
  );
}

function FieldContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="field-content" className={cn(styles.fieldContent, className)} {...props} />
  );
}

function FieldLabel({
  className,
  children,
  optionalText = '(optioneel)',
  ...props
}: React.ComponentProps<typeof Label> & {
  /** Suffix shown when the surrounding Field is `optional`. */
  optionalText?: React.ReactNode;
}) {
  const required = useFieldRequired();
  return (
    <Label data-slot="field-label" className={cn(styles.fieldLabel, className)} {...props}>
      {children}
      {!required && (
        <span data-slot="field-optional" className={styles.optional}>
          {optionalText}
        </span>
      )}
    </Label>
  );
}

function FieldTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="field-label" className={cn(styles.fieldTitle, className)} {...props} />;
}

function FieldDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p data-slot="field-description" className={cn(styles.description, className)} {...props} />
  );
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  children?: React.ReactNode;
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(styles.separator, className)}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children ? (
        <span className={styles.separatorContent} data-slot="field-separator-content">
          {children}
        </span>
      ) : null}
    </div>
  );
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<'div'> & {
  errors?: Array<{ message?: string } | undefined>;
}) {
  const content = useMemo(() => {
    if (children) {
      return children;
    }

    if (!errors?.length) {
      return null;
    }

    const uniqueErrors = [...new Map(errors.map((error) => [error?.message, error])).values()];

    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message;
    }

    return (
      <ul className={styles.errorList}>
        {uniqueErrors.map((error, index) => error?.message && <li key={index}>{error.message}</li>)}
      </ul>
    );
  }, [children, errors]);

  if (!content) {
    return null;
  }

  return (
    <div role="alert" data-slot="field-error" className={cn(styles.error, className)} {...props}>
      {content}
    </div>
  );
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
  fieldVariants,
  useFieldRequired,
  useAriaRequired,
};
