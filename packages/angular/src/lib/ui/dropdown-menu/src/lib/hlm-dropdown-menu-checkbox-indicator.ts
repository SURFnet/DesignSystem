import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCheck } from '@ng-icons/phosphor-icons/regular';
import { classes } from '../../../utils/src';

@Component({
  selector: 'hlm-dropdown-menu-checkbox-indicator',
  imports: [NgIcon],
  providers: [provideIcons({ phosphorCheck })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <ng-icon class="curve-dropdown-menu-indicator-icon" name="phosphorCheck" /> `,
})
export class HlmDropdownMenuCheckboxIndicator {
  constructor() {
    classes(() => 'curve-dropdown-menu-indicator curve-dropdown-menu-indicator--checkbox');
  }
}
