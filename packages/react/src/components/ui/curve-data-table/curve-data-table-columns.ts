/**
 * Column descriptions for `CurveDataTable`. Same classes and constructor arguments as the
 * Angular `curve-data-table`, so a table is configured the same way in both frameworks.
 */
import type { ReactNode } from 'react';

export type CurveDataTableAlignment = 'left' | 'center' | 'right';
export interface CurveDataTableColumnOptions {
  align?: CurveDataTableAlignment;
  sortable?: boolean;
}

/** Base shape of every Curve data table column. */
export interface ICurveDataTableColumn {
  header?: string;
  options?: CurveDataTableColumnOptions;
}

/** A checkbox column for selecting rows, with a "select all" checkbox in the header. */
export class CurveDataTableSelectionColumn implements ICurveDataTableColumn {
  public header?: string;
}

/** A text column. Numbers are right-aligned automatically. */
export class CurveDataTableStringColumn<TFieldType = unknown> implements ICurveDataTableColumn {
  public header?: string;
  public fieldName: string;
  public displayMethod: (fieldValue: TFieldType) => string;
  public options: CurveDataTableColumnOptions;

  constructor(
    fieldName: string,
    header?: string,
    displayMethod?: (fieldValue: TFieldType) => string,
    options: CurveDataTableColumnOptions = {},
  ) {
    this.fieldName = fieldName;
    this.header = header;
    this.displayMethod = displayMethod ?? ((fieldValue) => `${fieldValue}`);
    this.options = options;
  }
}

/** A 40×40 image column. Rows without an image URL show a placeholder icon. */
export class CurveDataTableImageColumn implements ICurveDataTableColumn {
  public header?: string;
  public fieldName: string;

  constructor(fieldName: string, header?: string) {
    this.header = header;
    this.fieldName = fieldName;
  }
}

/** A "⋯" menu per row. Picking an action calls `onRowActionTriggered`. */
export class CurveDataTableActionColumn implements ICurveDataTableColumn {
  public header?: string;
  public actions: string[];
  public options: CurveDataTableColumnOptions;

  constructor(actions: string[], header?: string, options: CurveDataTableColumnOptions = {}) {
    this.header = header;
    this.actions = actions;
    this.options = options;
  }
}

/** What `onRowActionTriggered` receives: the action label and the row's data. */
export interface CurveDataTableRowEvent<TData> {
  action: string;
  record: TData;
}

/** A custom React column that renders a cell using the complete row record. */
export class CurveDataTableCustomColumn<TData = unknown> implements ICurveDataTableColumn {
  constructor(
    public id: string,
    public header: string,
    public render: (record: TData) => ReactNode,
  ) {}
}
