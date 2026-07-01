import { signal, type WritableSignal } from '@angular/core';
import {
  createAngularTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type Table,
  type Updater,
  type VisibilityState,
} from '@tanstack/angular-table';

interface InjectDataTableOptions<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  initialSorting?: SortingState;
  initialColumnFilters?: ColumnFiltersState;
  initialColumnVisibility?: VisibilityState;
  initialPagination?: PaginationState;
}

/** Apply a TanStack `Updater` (value or `(old) => new`) to a writable signal. */
function applyUpdater<T>(state: WritableSignal<T>): (updater: Updater<T>) => void {
  return (updater) =>
    state.set(typeof updater === 'function' ? (updater as (old: T) => T)(state()) : updater);
}

/**
 * Angular analog of React's `useDataTable`. Wraps `createAngularTable` with the core,
 * sorted, filtered and paginated row models and manages sorting, column-filter,
 * column-visibility, row-selection and pagination state with signals.
 *
 * Must be called from an injection context (a component constructor or field initializer),
 * since `createAngularTable` injects. Pass an options factory so reactive `data` re-renders
 * the table:
 *
 * ```ts
 * readonly table = injectDataTable(() => ({ data: this.data(), columns }));
 * ```
 */
function injectDataTable<TData>(options: () => InjectDataTableOptions<TData>): Table<TData> {
  const initial = options();

  const sorting = signal<SortingState>(initial.initialSorting ?? []);
  const columnFilters = signal<ColumnFiltersState>(initial.initialColumnFilters ?? []);
  const columnVisibility = signal<VisibilityState>(initial.initialColumnVisibility ?? {});
  const rowSelection = signal<RowSelectionState>({});
  const pagination = signal<PaginationState>(
    initial.initialPagination ?? { pageIndex: 0, pageSize: 10 },
  );

  return createAngularTable(() => {
    const { data, columns } = options();
    return {
      data,
      columns,
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
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    };
  });
}

export { injectDataTable, type InjectDataTableOptions };
