import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCircle } from '@ng-icons/phosphor-icons/regular';
import { classes } from '../../../utils/src/lib/hlm';

@Component({
  selector: 'hlm-dropdown-menu-radio-indicator',
  imports: [NgIcon],
  providers: [provideIcons({ phosphorCircle })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <ng-icon name="phosphorCircle" class="text-[0.5rem] *:[svg]:fill-current" /> `,
})
export class HlmDropdownMenuRadioIndicator {
  constructor() {
    classes(
      () =>
        'pointer-events-none absolute start-2 flex size-3.5 items-center justify-center opacity-0 group-data-[checked]:opacity-100',
    );
  }
}
