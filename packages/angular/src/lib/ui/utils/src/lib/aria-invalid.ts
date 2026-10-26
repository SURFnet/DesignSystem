import { BooleanInput } from '@angular/cdk/coercion';
import { afterRenderEffect, booleanAttribute, ElementRef, inject, Renderer2 } from '@angular/core';

/**
 * Transform for an `aria-invalid` override input, matching Brain's combobox: `undefined`
 * (or an empty attribute) means "not set, follow the form control".
 */
export function ariaInvalidOverride(value: BooleanInput): boolean | undefined {
  return value === '' || value === undefined ? undefined : booleanAttribute(value);
}

/**
 * Applies a consumer's `aria-invalid` override on the host. Brain binds `aria-invalid` to the
 * form control's state only, which overwrites a consumer's attribute; this runs after render
 * so the override wins. While no override is set, Brain's binding is left alone.
 */
export function ariaInvalid(
  override: () => boolean | undefined,
  controlInvalid: () => boolean | null | undefined,
) {
  const host = inject(ElementRef<HTMLElement>).nativeElement;
  const renderer = inject(Renderer2);
  let overridden = false;

  afterRenderEffect({
    write: () => {
      // Read both so a control-state change (which Brain re-renders) re-applies the override.
      const value = override();
      const invalid = controlInvalid();

      if (value === undefined) {
        if (!overridden) return;
        // Override removed: restore what Brain's binding would show.
        overridden = false;
      } else {
        overridden = true;
      }

      if (value ?? invalid) {
        renderer.setAttribute(host, 'aria-invalid', 'true');
      } else {
        renderer.removeAttribute(host, 'aria-invalid');
      }
    },
  });
}
