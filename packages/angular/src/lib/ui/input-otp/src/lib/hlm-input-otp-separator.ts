import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorMinus } from '@ng-icons/phosphor-icons/regular';
import { HlmIcon } from '../../../icon/src';
import { classes } from '../../../utils/src';

@Component({
  selector: 'hlm-input-otp-separator',
  imports: [HlmIcon, NgIcon],
  providers: [provideIcons({ phosphorMinus })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'separator',
    'data-slot': 'input-otp-separator',
  },
  template: ` <ng-icon hlm name="phosphorMinus" /> `,
})
export class HlmInputOtpSeparator {
  constructor() {
    classes(
      () => "[&_ng-icon:not([class*='text-'])]:text-[calc(var(--spacing)*4)] flex items-center",
    );
  }
}
