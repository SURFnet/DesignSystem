import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCaretDown } from '@ng-icons/phosphor-icons/regular';
import { BrnSelectScrollDown } from '@spartan-ng/brain/select';
import { classes } from '../../../utils/src/lib/hlm';

@Component({
  selector: 'hlm-select-scroll-down',
  imports: [NgIcon],
  providers: [provideIcons({ phosphorCaretDown })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [BrnSelectScrollDown],
  template: ` <ng-icon name="phosphorCaretDown" /> `,
})
export class HlmSelectScrollDown {
  constructor() {
    classes(
      () =>
        "bg-popover z-10 flex cursor-default items-center justify-center py-1 [&_ng-icon:not([class*='text-'])]:text-[calc(var(--spacing)*4)] sticky bottom-0 w-full data-hidden:hidden",
    );
  }
}
