import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'data-table-string-cell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div [attr.class]="alignRight() ? 'text-right' : ''">{{ value() }}</div>`,
})
export class DataTableStringCell {
  public readonly value = input.required<string>();
  public readonly alignRight = input.required<boolean>();
}
