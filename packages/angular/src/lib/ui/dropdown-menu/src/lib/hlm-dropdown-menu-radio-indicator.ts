import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCircle } from '@ng-icons/phosphor-icons/regular';
import { classes } from '../../../utils/src';

@Component({
  selector: 'hlm-dropdown-menu-radio-indicator',
  imports: [NgIcon],
  providers: [provideIcons({ phosphorCircle })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <ng-icon name="phosphorCircle" class="curve-dropdown-menu-radio-dot" /> `,
})
export class HlmDropdownMenuRadioIndicator {
  constructor() {
    classes(() => 'curve-dropdown-menu-indicator');
  }
}
