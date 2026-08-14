import { ChangeDetectionStrategy, Component, input, OnInit, output, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorMagnifyingGlass } from '@ng-icons/phosphor-icons/regular';
import { flexRenderComponent, type ColumnDef, type Table } from '@tanstack/angular-table';
import { DataTableActionCell } from './curve-data-table-action-cell';
import { DataTableImageCell } from './curve-data-table-image-cell';
import { DataTableSelectAll } from './curve-data-table-select-all';
import { DataTableSelectRowCell } from './curve-data-table-select-row-cell';
import { DataTableStringCell } from './curve-data-table-string-cell';
import { DataTableHeaderSortable } from './curve-data-table-header-sortable';
import { CurveDataTableRowEvent } from './model/curve-data-table-row-event';
import { HlmButtonImports } from '../../../button/src';
import {
  CurveDataTableActionColumn,
  CurveDataTableImageColumn,
  CurveDataTableSelectionColumn,
  CurveDataTableStringColumn,
  ICurveDataTableColumn,
} from '..';
import { HlmDataTableImports, injectDataTable } from '../../../data-table/src';
import { HlmDropdownMenuImports } from '../../../dropdown-menu/src';
import { HlmInputImports } from '../../../input/src';
import { HlmInputGroupImports } from '../../../input-group/src';

@Component({
  selector: 'curve-data-table',
  templateUrl: './curve-data-table.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HlmButtonImports,
    HlmDataTableImports,
    HlmDropdownMenuImports,
    HlmInputImports,
    HlmInputGroupImports,
    NgIcon,
  ],
  providers: [
    provideIcons({
      phosphorMagnifyingGlass,
    }),
  ],
})
export class CurveDataTableComponent<TData> implements OnInit {
  public data = input.required<TData[]>();
  public columns = input.required<ICurveDataTableColumn[]>();
  public searchColumn = input<string | null>(null);
  public hasColumnFilter = input<boolean>(true);
  public rowActionTriggered = output<CurveDataTableRowEvent<TData>>();

  protected tanstackColumns!: ColumnDef<TData, unknown>[];
  protected table!: Table<TData>;
  protected readonly appFilter = signal('');

  ngOnInit(): void {
    this.tanstackColumns = this.createColumns();

    this.table = injectDataTable(() => ({ data: this.data(), columns: this.tanstackColumns }));
  }

  protected hideableColumns() {
    return this.table.getAllColumns().filter((column) => column.getCanHide());
  }

  protected setAppFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.appFilter.set(value);
    this.table.getColumn(this.searchColumn()!)?.setFilterValue(value);
  }

  private createColumns(): ColumnDef<TData, unknown>[] {
    const columns: ColumnDef<TData, unknown>[] = [];

    this.columns().forEach((column) => {
      if (column instanceof CurveDataTableSelectionColumn) {
        columns.push(this.createCheckboxColumn());
      }
      if (column instanceof CurveDataTableStringColumn) {
        columns.push(
          this.createStringColumn(
            column.fieldName,
            column.header,
            column.displayMethod,
            column.sortable,
          ),
        );
      } else if (column instanceof CurveDataTableImageColumn) {
        columns.push(this.createImageColumn(column.fieldName, column.header));
      } else if (column instanceof CurveDataTableActionColumn) {
        columns.push(this.createActionColumn(column.actions, column.header));
      }
    });

    return columns;
  }

  private createCheckboxColumn(): ColumnDef<TData, unknown> {
    const column: ColumnDef<TData, unknown> = {
      id: 'select',
      header: ({ table }) => flexRenderComponent(DataTableSelectAll<TData>, { inputs: { table } }),
      cell: ({ row }) => flexRenderComponent(DataTableSelectRowCell<TData>, { inputs: { row } }),
      enableSorting: false,
      enableHiding: false,
    };

    return column;
  }

  private createStringColumn(
    fieldName: string,
    header?: string,
    displayMethod?: (value: any) => string,
    sortable: boolean = false,
  ): ColumnDef<TData, unknown> {
    const column: ColumnDef<TData, unknown> = {
      accessorKey: fieldName,
      header: sortable
        ? ({ column }) =>
            flexRenderComponent(DataTableHeaderSortable<TData>, {
              inputs: { column, label: header },
            })
        : header,
      cell: ({ row }) => {
        const value = row.getValue<string>(fieldName);
        const isNumber = typeof row.getValue(fieldName) === 'number';
        const displayValue = displayMethod ? displayMethod(value) : value;
        return flexRenderComponent(DataTableStringCell, {
          inputs: { value: displayValue, alignRight: isNumber },
        });
      },
    };

    return column;
  }

  private createImageColumn(fieldName: string, header?: string): ColumnDef<TData, unknown> {
    const column: ColumnDef<TData, unknown> = {
      accessorKey: fieldName,
      header: header,
      cell: ({ row }) =>
        flexRenderComponent(DataTableImageCell, {
          inputs: { imageUrl: row.getValue<string>(fieldName) },
        }),
    };

    return column;
  }

  private createActionColumn(actions: string[], header?: string): ColumnDef<TData, unknown> {
    const column: ColumnDef<TData, unknown> = {
      id: 'actions',
      header: header,
      enableHiding: false,
      cell: ({ row }) =>
        flexRenderComponent(DataTableActionCell, {
          inputs: { record: row.original, actions: actions },
          outputs: {
            actionTriggered: (event: CurveDataTableRowEvent<TData>) => {
              this.rowActionTriggered.emit(event);
            },
          },
        }),
    };

    return column;
  }
}
