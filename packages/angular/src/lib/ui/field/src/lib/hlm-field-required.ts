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

// CURVE: fields are required by default (issue #144). Internal: not re-exported from the
// field barrel, so `hlmField optional` stays the only public way to mark a field optional.

/**
 * `aria-required` for a form control: an explicit value wins, otherwise the surrounding
 * `hlmField` decides (required unless `optional`). Returns `'true'` or `null` for `[attr.aria-required]`.
 */
export function injectAriaRequired(
  own: Signal<boolean | undefined> = signal(undefined),
): Signal<'true' | null> {
  const field = inject(HlmField, { optional: true });
  return computed(() => ((own() ?? !field?.optional()) ? 'true' : null));
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
