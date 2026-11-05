import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorArrowsDownUp } from '@ng-icons/phosphor-icons/regular';
import { type Column, type RowData } from '@tanstack/angular-table';
import { HlmButton } from '../../../button/src';
import type { DataTableFeatures } from '../../../data-table/src';

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
      class="curve-data-table-sort-button"
      (click)="column().toggleSorting(column().getIsSorted() === 'asc')"
    >
      {{ label() }}
      <ng-icon name="phosphorArrowsDownUp" data-icon="inline-end" />
    </button>
  `,
})
export class DataTableHeaderSortable<TData extends RowData> {
  public readonly label = input.required<string>();
  public readonly column = input.required<Column<DataTableFeatures, TData, unknown>>();
}
