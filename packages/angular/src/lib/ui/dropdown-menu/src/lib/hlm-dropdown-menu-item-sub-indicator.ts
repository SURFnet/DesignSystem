import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCaretRight } from '@ng-icons/phosphor-icons/regular';
import { classes } from '@spartan-ng/helm/utils';

@Component({
  selector: 'hlm-dropdown-menu-item-sub-indicator',
  imports: [NgIcon],
  providers: [provideIcons({ phosphorCaretRight })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <ng-icon name="phosphorCaretRight" class="text-base rtl:rotate-180" /> `,
})
export class HlmDropdownMenuItemSubIndicator {
  constructor() {
    classes(() => 'ms-auto size-4');
  }
}
