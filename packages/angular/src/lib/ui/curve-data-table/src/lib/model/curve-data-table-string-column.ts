import { ICurveDataTableColumn } from '../..';

export class CurveDataTableStringColumn<TFieldType> implements ICurveDataTableColumn {
  public header?: string;
  public fieldName!: string;
  public sortable?: boolean;
  public displayMethod?: (fieldValue: TFieldType) => string;

  constructor(
    fieldName: string,
    header?: string,
    displayMethod?: (fieldValue: TFieldType) => string,
    sortable = false,
  ) {
    this.header = header;
    this.fieldName = fieldName;
    this.sortable = sortable;
    this.displayMethod = displayMethod
      ? displayMethod
      : (fieldValue: TFieldType) => `${fieldValue}`;
  }
}
