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
 * The messages for a control's errors (or only `validator`'s), without duplicates: a string error
 * as-is — e.g. a JsonForms or server message — else the message for its key, else `default`.
 */
export function fieldErrorMessages(
  errors: Record<string, unknown>,
  messages: HlmFieldErrorMessages,
  validator?: string,
): string[] {
  const resolve = (message: HlmFieldErrorMessage | undefined, error: unknown) =>
    typeof message === 'function' ? message(error) : message;
  const keys = validator ? [validator] : Object.keys(errors);
  const result = keys
    .filter((key) => key in errors)
    .map((key) => {
      const error = errors[key];
      if (typeof error === 'string' && error.trim()) return error;
      return resolve(messages[key] ?? messages['default'], error);
    })
    .filter((message): message is string => !!message);
  return [...new Set(result)];
}
