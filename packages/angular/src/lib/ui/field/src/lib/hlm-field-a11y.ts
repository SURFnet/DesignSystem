import {
  afterRenderEffect,
  computed,
  ElementRef,
  inject,
  Renderer2,
  signal,
  type Signal,
} from '@angular/core';
import { BrnFieldA11yService } from '@spartan-ng/brain/field';

// CURVE: a11y (issue #273). Internal: not re-exported from the field barrel. Links a control
// that Brain renders inside a Curve host to the surrounding field's description and error.

/**
 * `aria-describedby` for a control: the consumer's own ids plus the surrounding `hlmField`'s
 * description and (visible) error ids. Returns `null` when there are none.
 */
export function injectFieldDescribedBy(
  own: Signal<string | null | undefined> = signal(null),
): Signal<string | null> {
  const a11y = inject(BrnFieldA11yService, { optional: true });
  return computed(() => {
    const ids = [own(), a11y?.describedBy()].flatMap((value) => value?.split(/\s+/) ?? []);
    const unique = [...new Set(ids.filter(Boolean))];
    return unique.length ? unique.join(' ') : null;
  });
}

/** Writes an attribute onto every element matching `selector` that a Brain component renders inside this host. */
export function syncAttribute(
  selector: string,
  name: string,
  value: Signal<string | null | undefined>,
): void {
  const host = inject<ElementRef<HTMLElement>>(ElementRef);
  const renderer = inject(Renderer2);
  afterRenderEffect(() => {
    const current = value();
    for (const el of host.nativeElement.querySelectorAll(selector)) {
      if (current) {
        renderer.setAttribute(el, name, current);
      } else {
        renderer.removeAttribute(el, name);
      }
    }
  });
}
