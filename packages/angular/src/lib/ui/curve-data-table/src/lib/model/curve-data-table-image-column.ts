import { ICurveDataTableColumn } from '../..';

export class CurveDataTableImageColumn implements ICurveDataTableColumn {
  public header?: string;
  public fieldName!: string;

  constructor(fieldName: string, header?: string) {
    this.header = header;
    this.fieldName = fieldName;
  }
}
