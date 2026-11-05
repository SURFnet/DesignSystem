import { computed, inject, InjectionToken, type Signal, type ValueProvider } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { injectBrnComboboxBase } from '@spartan-ng/brain/combobox';

let listboxId = 0;

export const HlmComboboxListboxId = new InjectionToken<string>('HlmComboboxListboxId');

export function provideHlmComboboxListboxId(): ValueProvider {
  return {
    provide: HlmComboboxListboxId,
    useValue: `hlm-combobox-listbox-${++listboxId}`,
  };
}

export function injectHlmComboboxListboxId(): string | null {
  return inject(HlmComboboxListboxId, { optional: true });
}

/**
 * ARIA links for a combobox input: `aria-controls` points at the open listbox and
 * `aria-activedescendant` at the highlighted option, so screen readers announce the
 * option while focus stays in the input. Both are `null` while the popup is closed.
 */
export function injectHlmComboboxAria(): {
  controls: Signal<string | null>;
  activeDescendant: Signal<string | null>;
} {
  const combobox = injectBrnComboboxBase();
  const listboxId = injectHlmComboboxListboxId();
  // `change` emits the new active index; reading it makes the computed below re-run.
  const activeIndex = toSignal(combobox.keyManager.change, { initialValue: -1 });

  return {
    controls: computed(() => (combobox.isExpanded() ? listboxId : null)),
    activeDescendant: computed(() => {
      activeIndex();
      if (!combobox.isExpanded()) return null;
      return combobox.keyManager.activeItem?.id() ?? null;
    }),
  };
}
