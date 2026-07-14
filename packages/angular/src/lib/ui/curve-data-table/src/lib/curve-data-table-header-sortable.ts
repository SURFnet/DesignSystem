import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorArrowsDownUp } from '@ng-icons/phosphor-icons/regular';
import { Column } from '@tanstack/angular-table';
import { HlmButton } from '../../../button/src';

@Component({
  selector: 'data-table-header-sortable',
  imports: [HlmButton, NgIcon],
  providers: [provideIcons({ phosphorArrowsDownUp })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      hlmBtn
      variant="ghost"
      size="sm"
      (click)="column().toggleSorting(column().getIsSorted() === 'asc')"
    >
      {{ label() }}
      <ng-icon name="phosphorArrowsDownUp" data-icon="inline-end" />
    </button>
  `,
})
export class DataTableHeaderSortable<TData> {
  public readonly label = input.required<string>();
  public readonly column = input.required<Column<TData>>();
}
