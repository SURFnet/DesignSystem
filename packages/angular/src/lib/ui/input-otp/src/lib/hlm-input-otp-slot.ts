import type { NumberInput } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, inject, input, numberAttribute } from '@angular/core';
import { BrnFieldControl } from '@spartan-ng/brain/field';
import { BrnInputOtpSlot } from '@spartan-ng/brain/input-otp';
import { classes } from '../../../utils/src';
import { HlmInputOtpFakeCaret } from './hlm-input-otp-fake-caret';

@Component({
  selector: 'hlm-input-otp-slot',
  imports: [BrnInputOtpSlot, HlmInputOtpFakeCaret],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'input-otp-slot',
    '[attr.data-matches-spartan-invalid]': "_fieldControl?.spartanInvalid() ? 'true' : null",
  },
  template: `
    <brn-input-otp-slot [index]="index()">
      <hlm-input-otp-fake-caret />
    </brn-input-otp-slot>
  `,
})
export class HlmInputOtpSlot {
  protected readonly _fieldControl = inject(BrnFieldControl, { optional: true });

  /** The index of the slot to render the char or a fake caret */
  public readonly index = input.required<number, NumberInput>({ transform: numberAttribute });

  constructor() {
    classes(() => 'curve-input-otp-slot');
  }
}
