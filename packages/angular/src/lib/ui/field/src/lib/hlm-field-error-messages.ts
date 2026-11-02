import { inject, InjectionToken, type Provider } from '@angular/core';

/** A message for one validator error key: fixed text, or built from the error's value. */
export type HlmFieldErrorMessage = string | ((error: any) => string);

/** Messages per validator error key (e.g. `required`, `minlength`); `default` covers the rest. */
export type HlmFieldErrorMessages = Record<string, HlmFieldErrorMessage>;

/** Curve's default messages for Angular's built-in validators. */
export const HLM_FIELD_ERROR_DEFAULT_MESSAGES: HlmFieldErrorMessages = {
  required: 'Dit veld is verplicht.',
  email: 'Vul een geldig e-mailadres in.',
  minlength: ({ requiredLength }) => `Vul minimaal ${requiredLength} tekens in.`,
  maxlength: ({ requiredLength }) => `Vul maximaal ${requiredLength} tekens in.`,
  min: ({ min }) => `De waarde moet minimaal ${min} zijn.`,
  max: ({ max }) => `De waarde mag maximaal ${max} zijn.`,
  pattern: 'De invoer heeft niet het juiste formaat.',
  default: 'Deze invoer is ongeldig.',
};

export const HLM_FIELD_ERROR_MESSAGES = new InjectionToken<HlmFieldErrorMessages>(
  'HlmFieldErrorMessages',
  { providedIn: 'root', factory: () => HLM_FIELD_ERROR_DEFAULT_MESSAGES },
);

/**
 * Sets the messages an empty `hlm-field-error` shows, per validator error key. Merges over the
 * messages from a parent injector (Curve's defaults at the root), so you only list what changes.
 */
export function provideHlmFieldErrorMessages(messages: HlmFieldErrorMessages): Provider {
  return {
    provide: HLM_FIELD_ERROR_MESSAGES,
    useFactory: () => ({
      ...(inject(HLM_FIELD_ERROR_MESSAGES, { skipSelf: true, optional: true }) ??
        HLM_FIELD_ERROR_DEFAULT_MESSAGES),
      ...messages,
    }),
  };
}

/**
 * The message for a control's errors: the first error (or `validator`'s) whose value is a string
 * — e.g. a JsonForms or server message — or whose key has a message; otherwise `default`.
 */
export function fieldErrorMessage(
  errors: Record<string, unknown>,
  messages: HlmFieldErrorMessages,
  validator?: string,
): string | null {
  const keys = validator ? [validator] : Object.keys(errors);
  for (const key of keys) {
    if (!(key in errors)) continue;
    const error = errors[key];
    if (typeof error === 'string' && error.trim()) return error;
    const message = messages[key];
    if (message !== undefined) return typeof message === 'function' ? message(error) : message;
  }
  const fallback = messages['default'];
  if (fallback === undefined) return null;
  return typeof fallback === 'function' ? fallback(undefined) : fallback;
}
