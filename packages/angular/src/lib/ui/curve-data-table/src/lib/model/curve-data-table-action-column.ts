import { ICurveDataTableColumn } from '../..';

export class CurveDataTableActionColumn implements ICurveDataTableColumn {
  public header?: string;
  public actions: string[];

  constructor(actions: string[], header?: string) {
    this.header = header;
    this.actions = actions;
  }
}
