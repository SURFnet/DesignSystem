import { CurveDataTableColumnOptions, ICurveDataTableColumn } from '../..';

export class CurveDataTableStringColumn<TFieldType> implements ICurveDataTableColumn {
  public header?: string;
  public fieldName!: string;
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
