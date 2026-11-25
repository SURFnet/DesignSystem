export type CurveDataTableAlignment = 'left' | 'center' | 'right';

export interface CurveDataTableColumnOptions {
  align?: CurveDataTableAlignment;
  sortable?: boolean;
}

export interface ICurveDataTableColumn {
  header?: string;
  options?: CurveDataTableColumnOptions;
}
