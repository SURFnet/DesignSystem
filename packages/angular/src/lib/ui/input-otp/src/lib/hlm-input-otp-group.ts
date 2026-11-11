import { Directive, inject, input } from '@angular/core';
import { BrnFieldControl } from '@spartan-ng/brain/field';
import type { InputOtpVariantName } from '@surfnet/curve-contracts';
import { classes } from '../../../utils/src';

// CURVE: `with-spacing` variant from Figma (issue #262).
const inputOtpGroupVariantClasses = {
  default: '',
  'with-spacing': 'curve-input-otp-group--variant-with-spacing',
} satisfies Record<InputOtpVariantName, string>;

export type InputOtpGroupVariants = { variant?: InputOtpVariantName | null };

@Directive({
  selector: '[hlmInputOtpGroup],hlm-input-otp-group',
  host: {
    'data-slot': 'input-otp-group',
    '[attr.data-variant]': 'variant() ?? "default"',
    '[attr.data-matches-spartan-invalid]': "_fieldControl?.spartanInvalid() ? 'true' : null",
  },
})
export class HlmInputOtpGroup {
  protected readonly _fieldControl = inject(BrnFieldControl, { optional: true });

  /** `with-spacing` gives each slot its own rounded border, with a gap between slots. */
  public readonly variant = input<InputOtpGroupVariants['variant']>('default');

  constructor() {
    classes(() => [
      'curve-input-otp-group',
      inputOtpGroupVariantClasses[this.variant() ?? 'default'],
    ]);
  }
}
