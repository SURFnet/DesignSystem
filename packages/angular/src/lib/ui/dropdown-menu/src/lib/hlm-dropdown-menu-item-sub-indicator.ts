import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCaretRight } from '@ng-icons/phosphor-icons/regular';
import { classes } from '../../../utils/src';

@Component({
  selector: 'hlm-dropdown-menu-item-sub-indicator',
  imports: [NgIcon],
  providers: [provideIcons({ phosphorCaretRight })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-icon name="phosphorCaretRight" class="curve-dropdown-menu-sub-indicator-icon" />
  `,
})
export class HlmDropdownMenuItemSubIndicator {
  constructor() {
    classes(() => 'curve-dropdown-menu-sub-indicator');
  }
}
