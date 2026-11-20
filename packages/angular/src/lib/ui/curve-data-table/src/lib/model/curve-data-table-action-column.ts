import { CurveDataTableColumnOptions, ICurveDataTableColumn } from '../..';

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
