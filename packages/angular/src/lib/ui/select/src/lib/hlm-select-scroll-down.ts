import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCaretDown } from '@ng-icons/phosphor-icons/regular';
import { BrnSelectScrollDown } from '@spartan-ng/brain/select';
import { classes } from '../../../utils/src';

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
    classes(() => 'curve-select-scroll curve-select-scroll--down');
  }
}
