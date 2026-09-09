import { afterRenderEffect, Directive, ElementRef, inject, input, Renderer2 } from '@angular/core';
import { BrnInputOtp } from '@spartan-ng/brain/input-otp';
import { classes } from '../../../utils/src';

@Directive({
  selector: 'brn-input-otp[hlmInputOtp], brn-input-otp[hlm]',
  host: {
    'data-slot': 'input-otp',
    // Consume aria-label on the host so it can be forwarded to the inner <input>.
    '[attr.aria-label]': 'null',
  },
})
export class HlmInputOtp {
  private readonly _elementRef = inject(ElementRef<HTMLElement>);
  private readonly _renderer = inject(Renderer2);
  private readonly _otp = inject(BrnInputOtp);

  private _statusEl: HTMLElement | null = null;

  /** Accessible name applied to the underlying OTP input. */
  public readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });

  /** Screen-reader announcement when every slot is filled, including after paste. */
  public readonly completeAnnouncement = input('Verification code complete');

  constructor() {
    classes(() => 'gap-2 flex items-center has-disabled:opacity-50');

    afterRenderEffect(() => {
      const label = this.ariaLabel();
      const host = this._elementRef.nativeElement;
      const inputEl = host.querySelector('input[data-slot="input-otp"]') as HTMLInputElement | null;
      if (inputEl) {
        if (label) {
          this._renderer.setAttribute(inputEl, 'aria-label', label);
        } else {
          this._renderer.removeAttribute(inputEl, 'aria-label');
        }
      }

      const statusEl = this.ensureStatusEl();
      const value = this._otp.value() ?? '';
      const maxLength = this._otp.maxLength();
      const text = value.length === maxLength ? this.completeAnnouncement() : '';
      this._renderer.setProperty(statusEl, 'textContent', text);
    });
  }

  private ensureStatusEl(): HTMLElement {
    if (this._statusEl) {
      return this._statusEl;
    }

    const existing = this._elementRef.nativeElement.querySelector(
      '[data-slot="input-otp-status"]',
    ) as HTMLElement | null;
    if (existing) {
      this._statusEl = existing;
      return existing;
    }

    const statusEl = this._renderer.createElement('div') as HTMLElement;
    this._renderer.setAttribute(statusEl, 'role', 'status');
    this._renderer.setAttribute(statusEl, 'aria-live', 'polite');
    this._renderer.setAttribute(statusEl, 'aria-atomic', 'true');
    this._renderer.setAttribute(statusEl, 'data-slot', 'input-otp-status');
    this._renderer.addClass(statusEl, 'sr-only');
    this._renderer.appendChild(this._elementRef.nativeElement, statusEl);
    this._statusEl = statusEl;
    return statusEl;
  }
}
