import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { type RowData } from '@tanstack/angular-table';
import type { DataTable } from '../../../data-table/src';
import { HlmCheckbox } from '../../../checkbox/src';
import { injectMicrocopy } from '../../../../microcopy';

@Component({
  selector: 'data-table-select-all',
  imports: [HlmCheckbox],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <hlm-checkbox
      [aria-label]="label"
      [checked]="table().getIsAllPageRowsSelected()"
      [indeterminate]="table().getIsSomePageRowsSelected() && !table().getIsAllPageRowsSelected()"
      (checkedChange)="table().toggleAllPageRowsSelected($event)"
    />
  `,
})
export class DataTableSelectAll<TRecord extends RowData> {
  protected readonly label = injectMicrocopy()['data-table.select-all'];
  public readonly table = input.required<DataTable<TRecord>>();
}
