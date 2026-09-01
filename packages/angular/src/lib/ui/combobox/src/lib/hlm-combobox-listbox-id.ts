import { inject, InjectionToken, type ValueProvider } from '@angular/core';

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
