import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Row } from '@tanstack/angular-table';
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
export class DataTableSelectRowCell<TRecord> {
  public readonly row = input.required<Row<TRecord>>();
}
