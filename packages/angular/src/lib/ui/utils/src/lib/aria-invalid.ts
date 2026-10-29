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
 * Keeps `aria-invalid` on the host in step with Curve's invalid inputs. Brain binds
 * `aria-invalid` to the form control's state only, which ignores both a consumer's attribute
 * and `forceInvalid`; this runs after render so Curve's value wins.
 *
 * Precedence: an explicit `aria-invalid` override, then `forceInvalid` (so the visual and
 * accessible invalid states stay together), then the form control. While neither an override
 * nor `forceInvalid` is set, Brain's binding is left alone.
 */
export function ariaInvalid(
  override: () => boolean | undefined,
  forceInvalid: () => boolean,
  controlInvalid: () => boolean | null | undefined,
) {
  const host = inject(ElementRef<HTMLElement>).nativeElement;
  const renderer = inject(Renderer2);
  let active = false;

  afterRenderEffect({
    write: () => {
      // Read all three so a control-state change (which Brain re-renders) re-applies ours.
      const value = override();
      const forced = forceInvalid();
      const invalid = controlInvalid();

      if (value === undefined && !forced) {
        if (!active) return;
        // Override and forceInvalid removed: restore what Brain's binding would show.
        active = false;
      } else {
        active = true;
      }

      if (value ?? (forced || invalid)) {
        renderer.setAttribute(host, 'aria-invalid', 'true');
      } else {
        renderer.removeAttribute(host, 'aria-invalid');
      }
    },
  });
}
