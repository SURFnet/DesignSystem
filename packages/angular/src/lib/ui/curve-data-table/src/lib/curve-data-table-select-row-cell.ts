import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { type Row, type RowData } from '@tanstack/angular-table';
import type { DataTableFeatures } from '../../../data-table/src';
import { HlmCheckbox } from '../../../checkbox/src';

@Component({
  selector: 'data-table-select-row',
  imports: [HlmCheckbox],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <hlm-checkbox
      aria-label="Select row"
      [checked]="row().getIsSelected()"
      (checkedChange)="row().toggleSelected($event)"
    />
  `,
})
export class DataTableSelectRowCell<TRecord extends RowData> {
  public readonly row = input.required<Row<DataTableFeatures, TRecord>>();
}
