'use client';

import { createContext, useContext } from 'react';
import type { FieldNecessityName } from '@surfnet/curve-contracts';

// CURVE: fields are required by default (issue #144). Internal: not re-exported from the
// barrel, so `Field optional` stays the only public way to mark a field optional.
export const FieldContext = createContext<{ necessity: FieldNecessityName } | null>(null);

/** `true` unless inside a `<Field optional>`. Outside a Field: required. */
export function useFieldRequired() {
  return useContext(FieldContext)?.necessity !== 'optional';
}

/** `aria-required` for a form control: an explicit value wins, otherwise the Field decides. */
export function useAriaRequired(own: React.AriaAttributes['aria-required']) {
  const required = useFieldRequired();
  return own ?? (required || undefined);
}
