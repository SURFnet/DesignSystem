import {
  afterRenderEffect,
  computed,
  ElementRef,
  inject,
  Renderer2,
  signal,
  type Signal,
} from '@angular/core';
import { HlmField } from './hlm-field';

/**
 * `aria-required` for a form control (issue #144): fields are required by default. Precedence:
 * the consumer's explicit `own` value, then the control's own `optional` input, then the
 * surrounding `hlmField`. Returns `'true'` or `null`, ready for an `[attr.aria-required]` binding.
 */
export function injectAriaRequired(
  own: Signal<boolean | undefined> = signal(undefined),
  optional: Signal<boolean> = signal(false),
): Signal<'true' | null> {
  const field = inject(HlmField, { optional: true });
  return computed(() => {
    const required = own() ?? (optional() ? false : !field?.optional());
    return required ? 'true' : null;
  });
}

/** Writes `aria-required` onto an element a Brain component renders inside this host. */
export function syncAriaRequired(selector: string, value: Signal<'true' | null>): void {
  const host = inject<ElementRef<HTMLElement>>(ElementRef);
  const renderer = inject(Renderer2);
  afterRenderEffect(() => {
    const required = value();
    const el = host.nativeElement.querySelector(selector);
    if (!el) return;
    if (required) {
      renderer.setAttribute(el, 'aria-required', required);
    } else {
      renderer.removeAttribute(el, 'aria-required');
    }
  });
}

/** Parses an `aria-required` input; an absent value stays `undefined` so the Field default applies. */
export function ariaRequiredAttribute(value: unknown): boolean | undefined {
  if (value === undefined || value === null) return undefined;
  return value !== false && value !== 'false';
}
