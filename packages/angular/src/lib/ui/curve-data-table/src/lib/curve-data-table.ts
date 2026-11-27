import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Injector,
  input,
  OnInit,
  output,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorMagnifyingGlass } from '@ng-icons/phosphor-icons/regular';
import { flexRenderComponent, type RowData } from '@tanstack/angular-table';
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
  CurveDataTableCustomColumn,
  CurveDataTableImageColumn,
  CurveDataTableSelectionColumn,
  CurveDataTableStringColumn,
  ICurveDataTableColumn,
} from '..';
import {
  HlmDataTableImports,
  injectDataTable,
  type DataTable,
  type DataTableColumnDef,
} from '../../../data-table/src';
import { HlmDropdownMenuImports } from '../../../dropdown-menu/src';
import { injectMicrocopy } from '../../../../microcopy';
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
export class CurveDataTableComponent<TData extends RowData> implements OnInit {
  public data = input.required<TData[]>();
  public columns = input.required<ICurveDataTableColumn[]>();
  public searchColumn = input<string | null>(null);

  private readonly _texts = injectMicrocopy();

  protected readonly searchLabel = computed(() =>
    this._texts['curve-data-table.search'].replace('{column}', this.searchColumn() ?? ''),
  );
  protected readonly searchPlaceholder = computed(() =>
    this._texts['curve-data-table.search-placeholder'].replace(
      '{column}',
      this.searchColumn() ?? '',
    ),
  );
  protected readonly columnsLabel = this._texts['curve-data-table.columns'];
  public hasColumnFilter = input<boolean>(true);
  public rowActionTriggered = output<CurveDataTableRowEvent<TData>>();

  protected tanstackColumns!: DataTableColumnDef<TData>[];
  protected table!: DataTable<TData>;
  protected readonly appFilter = signal('');
  private readonly injector = inject(Injector);

  ngOnInit(): void {
    this.tanstackColumns = this.createColumns();

    // The column inputs are only set by now, so build the table here inside the component's
    // injection context (`injectTable` needs one).
    this.table = runInInjectionContext(this.injector, () =>
      injectDataTable(() => ({ data: this.data(), columns: this.tanstackColumns })),
    );
  }

  protected hideableColumns() {
    return this.table.getAllColumns().filter((column) => column.getCanHide());
  }

  protected setAppFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.appFilter.set(value);
    this.table.getColumn(this.searchColumn()!)?.setFilterValue(value);
  }

  private createColumns(): DataTableColumnDef<TData>[] {
    const columns: DataTableColumnDef<TData>[] = [];

    this.columns().forEach((column) => {
      if (column instanceof CurveDataTableSelectionColumn) {
        columns.push(this.createCheckboxColumn());
      }
      if (column instanceof CurveDataTableStringColumn) {
        columns.push(this.createStringColumn(column));
      } else if (column instanceof CurveDataTableCustomColumn) {
        columns.push(this.createCustomColumn(column));
      } else if (column instanceof CurveDataTableImageColumn) {
        columns.push(this.createImageColumn(column.fieldName, column.header));
      } else if (column instanceof CurveDataTableActionColumn) {
        columns.push(this.createActionColumn(column));
      }
    });

    return columns;
  }

  private createCheckboxColumn(): DataTableColumnDef<TData> {
    const column: DataTableColumnDef<TData> = {
      id: 'select',
      header: ({ table }) => flexRenderComponent(DataTableSelectAll<TData>, { inputs: { table } }),
      cell: ({ row }) => flexRenderComponent(DataTableSelectRowCell<TData>, { inputs: { row } }),
      enableSorting: false,
      enableHiding: false,
    };

    return column;
  }

  private createStringColumn(
    column: CurveDataTableStringColumn<unknown>,
  ): DataTableColumnDef<TData> {
    const { fieldName, header, displayMethod, options } = column;
    const { align, sortable = false } = options;

    const columnDef: DataTableColumnDef<TData> = {
      accessorKey: fieldName,
      header: sortable
        ? ({ column }) =>
            flexRenderComponent(DataTableHeaderSortable<TData>, {
              inputs: { column, label: header },
            })
        : header,
      cell: ({ row }) => {
        const value = row.getValue(fieldName);
        // Numbers are right-aligned by default, unless the column sets its own alignment.
        const alignment = align ?? (typeof value === 'number' ? 'right' : 'left');
        return flexRenderComponent(DataTableStringCell, {
          inputs: { value: displayMethod(value), align: alignment },
        });
      },
    };

    return columnDef;
  }

  private createCustomColumn(column: CurveDataTableCustomColumn<TData>): DataTableColumnDef<TData> {
    const { id, header, component, inputs } = column;

    const columnDef: DataTableColumnDef<TData> = {
      id,
      accessorFn: () => undefined,
      header,
      cell: ({ row }) => flexRenderComponent(component, { inputs: inputs(row.original) }),
    };

    return columnDef;
  }

  private createImageColumn(fieldName: string, header?: string): DataTableColumnDef<TData> {
    const column: DataTableColumnDef<TData> = {
      accessorKey: fieldName,
      header: header,
      cell: ({ row }) =>
        flexRenderComponent(DataTableImageCell, {
          inputs: { imageUrl: row.getValue<string>(fieldName) },
        }),
    };

    return column;
  }

  private createActionColumn(column: CurveDataTableActionColumn): DataTableColumnDef<TData> {
    const { actions, header, options } = column;

    const columnDef: DataTableColumnDef<TData> = {
      id: 'actions',
      header: header,
      enableHiding: false,
      cell: ({ row }) =>
        flexRenderComponent(DataTableActionCell, {
          inputs: { record: row.original, actions: actions, align: options.align },
          outputs: {
            actionTriggered: (event: CurveDataTableRowEvent<TData>) => {
              this.rowActionTriggered.emit(event);
            },
          },
        }),
    };

    return columnDef;
  }
}
