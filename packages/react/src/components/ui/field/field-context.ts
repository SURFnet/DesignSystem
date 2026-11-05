'use client';

import { createContext, useContext } from 'react';
import type { FieldNecessityName } from '@surfnet/curve-contracts';

// CURVE: fields are required by default (issue #144). Internal: not re-exported from the
// barrel, so `Field optional` / `FieldSet optional` stay the only public way to mark a field optional.
export const FieldContext = createContext<{ necessity: FieldNecessityName } | null>(null);

/** Set by `<FieldSet optional>`: the legend shows the suffix, the controls inside drop `aria-required`. */
export const FieldSetContext = createContext<{ necessity: FieldNecessityName } | null>(null);

/** `true` unless inside a `<FieldSet optional>`. */
export function useFieldSetRequired() {
  return useContext(FieldSetContext)?.necessity !== 'optional';
}

/** `true` unless inside a `<Field optional>`. Outside a Field: required. */
export function useFieldRequired() {
  return useContext(FieldContext)?.necessity !== 'optional';
}

/**
 * `aria-required` for a form control: an explicit value wins, otherwise the Field and FieldSet
 * decide (required unless either is `optional`).
 */
export function useAriaRequired(own: React.AriaAttributes['aria-required']) {
  const fieldRequired = useFieldRequired();
  const fieldSetRequired = useFieldSetRequired();
  const required = fieldRequired && fieldSetRequired;
  return own ?? (required || undefined);
}
