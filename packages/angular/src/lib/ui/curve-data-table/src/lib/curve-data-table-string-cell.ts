import { Component, ChangeDetectionStrategy, computed, input } from '@angular/core';
import type { CurveDataTableAlignment } from './model/curve-data-table-column';

@Component({
  selector: 'data-table-string-cell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div [attr.class]="alignClass()">
    {{ value() }}
  </div>`,
})
export class DataTableStringCell {
  public readonly value = input.required<string>();
  public readonly align = input.required<CurveDataTableAlignment>();

  protected readonly alignClass = computed(() => `curve-data-table-value--${this.align()}`);
}
