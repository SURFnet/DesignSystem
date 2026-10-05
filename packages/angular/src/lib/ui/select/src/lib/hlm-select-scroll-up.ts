import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCaretUp } from '@ng-icons/phosphor-icons/regular';
import { BrnSelectScrollUp } from '@spartan-ng/brain/select';
import { classes } from '../../../utils/src';

@Component({
  selector: 'hlm-select-scroll-up',
  imports: [NgIcon],
  providers: [provideIcons({ phosphorCaretUp })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [BrnSelectScrollUp],
  template: ` <ng-icon name="phosphorCaretUp" /> `,
})
export class HlmSelectScrollUp {
  constructor() {
    classes(() => 'curve-select-scroll curve-select-scroll--up');
  }
}
