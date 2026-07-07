import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Table } from '@tanstack/angular-table';
import { HlmCheckbox } from '../../../checkbox/src';

@Component({
  selector: 'data-table-select-all',
  imports: [HlmCheckbox],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <hlm-checkbox
      aria-label="Select all"
      [checked]="table().getIsAllPageRowsSelected()"
      [indeterminate]="table().getIsSomePageRowsSelected()"
      (checkedChange)="table().toggleAllPageRowsSelected($event)"
    />
  `,
})
export class DataTableSelectAll<TRecord> {
  public readonly table = input.required<Table<TRecord>>();
}
