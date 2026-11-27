import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { type Row, type RowData } from '@tanstack/angular-table';
import type { DataTableFeatures } from '../../../data-table/src';
import { HlmCheckbox } from '../../../checkbox/src';
import { injectMicrocopy } from '../../../../microcopy';

@Component({
  selector: 'data-table-select-row',
  imports: [HlmCheckbox],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <hlm-checkbox
      [aria-label]="label"
      [checked]="row().getIsSelected()"
      (checkedChange)="row().toggleSelected($event)"
    />
  `,
})
export class DataTableSelectRowCell<TRecord extends RowData> {
  protected readonly label = injectMicrocopy()['data-table.select-row'];
  public readonly row = input.required<Row<DataTableFeatures, TRecord>>();
}
