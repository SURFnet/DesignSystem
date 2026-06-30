import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCheck } from '@ng-icons/phosphor-icons/regular';
import { classes } from '../../../utils/src/lib/hlm';

@Component({
  selector: 'hlm-dropdown-menu-checkbox-indicator',
  imports: [NgIcon],
  providers: [provideIcons({ phosphorCheck })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <ng-icon class="text-base" name="phosphorCheck" /> `,
})
export class HlmDropdownMenuCheckboxIndicator {
  constructor() {
    classes(
      () =>
        'pointer-events-none absolute left-2 flex size-3.5 items-center justify-center opacity-0 group-data-[checked]:opacity-100',
    );
  }
}
