import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorDotsThree } from '@ng-icons/phosphor-icons/regular';
import { classes } from '../../../utils/src';

@Component({
  selector: 'hlm-pagination-ellipsis',
  imports: [NgIcon],
  providers: [provideIcons({ phosphorDotsThree })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-slot': 'pagination-ellipsis' },
  template: `
    <ng-icon name="phosphorDotsThree" />
    <span class="sr-only">{{ srOnlyText() }}</span>
  `,
})
export class HlmPaginationEllipsis {
  /** Screen reader only text for the ellipsis */
  public readonly srOnlyText = input<string>('More pages');

  constructor() {
    classes(
      () =>
        "size-9 [&_ng-icon:not([class*='text-'])]:text-[calc(var(--spacing)*4)] flex items-center justify-center",
    );
  }
}
