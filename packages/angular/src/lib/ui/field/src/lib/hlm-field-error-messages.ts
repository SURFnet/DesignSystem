import { inject, InjectionToken, type Provider } from '@angular/core';
import { injectMicrocopy, microcopy, type Microcopy } from '../../../../microcopy';

/** A message for one validator error key: fixed text, or built from the error's value. */
export type HlmFieldErrorMessage = string | ((error: any) => string);

/** Messages per validator error key (e.g. `required`, `minlength`); `default` covers the rest. */
export type HlmFieldErrorMessages = Record<string, HlmFieldErrorMessage>;

/** Fills `{name}` placeholders in a microcopy text from the validator's error, e.g. `{requiredLength}`. */
const fromError =
  (text: string) =>
  (error: Record<string, unknown>): string =>
    text.replace(/\{(\w+)\}/g, (_, name: string) => String(error?.[name] ?? ''));

/** Curve's messages for Angular's built-in validators, from the given microcopy texts. */
export function fieldErrorMessagesFrom(texts: Microcopy): HlmFieldErrorMessages {
  return {
    required: texts['field.error.required'],
    email: texts['field.error.email'],
    minlength: fromError(texts['field.error.minlength']),
    maxlength: fromError(texts['field.error.maxlength']),
    min: fromError(texts['field.error.min']),
    max: fromError(texts['field.error.max']),
    pattern: texts['field.error.pattern'],
    default: texts['field.error.default'],
  };
}

/** Curve's default (English) messages for Angular's built-in validators. */
export const HLM_FIELD_ERROR_DEFAULT_MESSAGES: HlmFieldErrorMessages = fieldErrorMessagesFrom(
  microcopy.en,
);

/**
 * Your own messages for an empty `hlm-field-error`, on top of Curve's messages in the current
 * language (`provideCurveMicrocopy()`). Empty by default; set it with `provideHlmFieldErrorMessages`.
 */
export const HLM_FIELD_ERROR_MESSAGES = new InjectionToken<HlmFieldErrorMessages>(
  'HlmFieldErrorMessages',
  { providedIn: 'root', factory: () => ({}) },
);

/** Curve's messages in the current language, with your own messages from the injector on top. */
export function injectFieldErrorMessages(): HlmFieldErrorMessages {
  return { ...fieldErrorMessagesFrom(injectMicrocopy()), ...inject(HLM_FIELD_ERROR_MESSAGES) };
}

/**
 * Sets the messages an empty `hlm-field-error` shows, per validator error key. Merges over the
 * messages from a parent injector and Curve's own texts, so you only list what changes.
 */
export function provideHlmFieldErrorMessages(messages: HlmFieldErrorMessages): Provider {
  return {
    provide: HLM_FIELD_ERROR_MESSAGES,
    useFactory: () => ({
      ...inject(HLM_FIELD_ERROR_MESSAGES, { skipSelf: true, optional: true }),
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
