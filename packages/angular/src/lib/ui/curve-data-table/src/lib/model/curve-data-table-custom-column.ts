import type { Type } from '@angular/core';
import { ICurveDataTableColumn } from '../..';

/**
 * A custom column that renders an Angular component in each cell, using the complete row record.
 * The Angular counterpart of the React `CurveDataTableCustomColumn` (which takes a render function).
 *
 * By default the component gets the row as its `record` input. Pass `inputs` to map the row to
 * other inputs instead, e.g. `(payment) => ({ status: payment.status })`.
 */
export class CurveDataTableCustomColumn<TData = unknown> implements ICurveDataTableColumn {
  public id: string;
  public header: string;
  public component: Type<unknown>;
  public inputs: (record: TData) => Record<string, unknown>;

  constructor(
    id: string,
    header: string,
    component: Type<unknown>,
    inputs?: (record: TData) => Record<string, unknown>,
  ) {
    this.id = id;
    this.header = header;
    this.component = component;
    this.inputs = inputs ?? ((record) => ({ record }));
  }
}
