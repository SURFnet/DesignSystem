import { signal, type WritableSignal } from '@angular/core';
import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_arrIncludes,
  filterFn_equals,
  filterFn_inDateRange,
  filterFn_inNumberRange,
  filterFn_includesString,
  filterFn_weakEquals,
  injectTable,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_basic,
  sortFn_datetime,
  sortFn_text,
  tableFeatures,
  type AngularTable,
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnVisibilityState,
  type PaginationState,
  type Row,
  type RowData,
  type RowSelectionState,
  type SortingState,
  type Updater,
} from '@tanstack/angular-table';

/**
 * The TanStack Table features every Curve data table uses. The filter and sort functions are
 * the ones TanStack's `'auto'` mode picks from, so columns sort and filter like they did in v8.
 */
const dataTableFeatures = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  filterFns: {
    arrIncludes: filterFn_arrIncludes,
    equals: filterFn_equals,
    inDateRange: filterFn_inDateRange,
    inNumberRange: filterFn_inNumberRange,
    includesString: filterFn_includesString,
    weakEquals: filterFn_weakEquals,
  },
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    basic: sortFn_basic,
    datetime: sortFn_datetime,
    text: sortFn_text,
  },
});

type DataTableFeatures = typeof dataTableFeatures;

/** A column definition for a Curve data table. */
type DataTableColumnDef<TData extends RowData, TValue = unknown> = ColumnDef<
  DataTableFeatures,
  TData,
  TValue
>;

/** The table instance `injectDataTable` returns. */
type DataTable<TData extends RowData> = AngularTable<DataTableFeatures, TData>;

interface InjectDataTableOptions<TData extends RowData> {
  data: TData[];
  columns: DataTableColumnDef<TData>[];
  /** Derive a stable row id (e.g. from a record's id) so row selection survives data changes. */
  getRowId?: (originalRow: TData, index: number, parent?: Row<DataTableFeatures, TData>) => string;
  initialSorting?: SortingState;
  initialColumnFilters?: ColumnFiltersState;
  initialColumnVisibility?: ColumnVisibilityState;
  initialPagination?: PaginationState;
}

/** Apply a TanStack `Updater` (value or `(old) => new`) to a writable signal. */
function applyUpdater<T>(state: WritableSignal<T>): (updater: Updater<T>) => void {
  return (updater) =>
    state.set(typeof updater === 'function' ? (updater as (old: T) => T)(state()) : updater);
}

/**
 * Angular analog of React's `useDataTable`. Wraps `injectTable` with the
 * sorted, filtered and paginated row models and manages sorting, column-filter,
 * column-visibility, row-selection and pagination state with signals.
 *
 * Must be called from an injection context (a component constructor or field initializer),
 * since `injectTable` injects. Pass an options factory so reactive `data` re-renders
 * the table:
 *
 * ```ts
 * readonly table = injectDataTable(() => ({ data: this.data(), columns }));
 * ```
 */
function injectDataTable<TData extends RowData>(
  options: () => InjectDataTableOptions<TData>,
): DataTable<TData> {
  const initial = options();

  const sorting = signal<SortingState>(initial.initialSorting ?? []);
  const columnFilters = signal<ColumnFiltersState>(initial.initialColumnFilters ?? []);
  const columnVisibility = signal<ColumnVisibilityState>(initial.initialColumnVisibility ?? {});
  const rowSelection = signal<RowSelectionState>({});
  const pagination = signal<PaginationState>(
    initial.initialPagination ?? { pageIndex: 0, pageSize: 10 },
  );

  return injectTable(() => {
    const { data, columns, getRowId } = options();
    return {
      features: dataTableFeatures,
      data,
      columns,
      getRowId,
      state: {
        sorting: sorting(),
        columnFilters: columnFilters(),
        columnVisibility: columnVisibility(),
        rowSelection: rowSelection(),
        pagination: pagination(),
      },
      onSortingChange: applyUpdater(sorting),
      onColumnFiltersChange: applyUpdater(columnFilters),
      onColumnVisibilityChange: applyUpdater(columnVisibility),
      onRowSelectionChange: applyUpdater(rowSelection),
      onPaginationChange: applyUpdater(pagination),
    };
  });
}

export {
  dataTableFeatures,
  injectDataTable,
  type DataTable,
  type DataTableColumnDef,
  type DataTableFeatures,
  type InjectDataTableOptions,
};
