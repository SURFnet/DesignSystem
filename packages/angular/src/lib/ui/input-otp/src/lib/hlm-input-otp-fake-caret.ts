import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'hlm-input-otp-fake-caret',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="curve-input-otp-caret">
      <div class="curve-input-otp-caret-line"></div>
    </div>
  `,
})
export class HlmInputOtpFakeCaret {}
