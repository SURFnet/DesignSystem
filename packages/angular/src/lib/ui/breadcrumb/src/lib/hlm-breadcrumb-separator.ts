import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCaretRight } from '@ng-icons/phosphor-icons/regular';
import { classes } from '../../../utils/src/lib/hlm';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[hlmBreadcrumbSeparator]',
  imports: [NgIcon],
  providers: [provideIcons({ phosphorCaretRight })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'breadcrumb-separator',
    role: 'presentation',
    'aria-hidden': 'true',
  },
  template: `
    <ng-content>
      <ng-icon name="phosphorCaretRight" />
    </ng-content>
  `,
})
export class HlmBreadcrumbSeparator {
  constructor() {
    classes(() => '[&>ng-icon]:text-[calc(var(--spacing)*3.5)] [&>ng-icon]:flex');
  }
}
