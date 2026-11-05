import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { type RowData } from '@tanstack/angular-table';
import type { DataTable } from '../../../data-table/src';
import { HlmCheckbox } from '../../../checkbox/src';

@Component({
  selector: 'data-table-select-all',
  imports: [HlmCheckbox],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <hlm-checkbox
      aria-label="Select all"
      [checked]="table().getIsAllPageRowsSelected()"
      [indeterminate]="table().getIsSomePageRowsSelected() && !table().getIsAllPageRowsSelected()"
      (checkedChange)="table().toggleAllPageRowsSelected($event)"
    />
  `,
})
export class DataTableSelectAll<TRecord extends RowData> {
  public readonly table = input.required<DataTable<TRecord>>();
}
