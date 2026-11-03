'use client';

import * as React from 'react';
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
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_basic,
  sortFn_datetime,
  sortFn_text,
  tableFeatures,
  useTable,
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type ReactTable,
  type RowData,
  type RowSelectionState,
  type SortingState,
  type ColumnVisibilityState,
} from '@tanstack/react-table';

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

/** The table instance `useDataTable` returns. */
type DataTable<TData extends RowData> = ReactTable<DataTableFeatures, TData>;

interface UseDataTableOptions<TData extends RowData> {
  data: TData[];
  columns: DataTableColumnDef<TData>[];
  initialSorting?: SortingState;
  initialColumnFilters?: ColumnFiltersState;
  initialColumnVisibility?: ColumnVisibilityState;
  initialPagination?: PaginationState;
}

function useDataTable<TData extends RowData>({
  data,
  columns,
  initialSorting = [],
  initialColumnFilters = [],
  initialColumnVisibility = {},
  initialPagination = { pageIndex: 0, pageSize: 10 },
}: UseDataTableOptions<TData>): DataTable<TData> {
  const [sorting, setSorting] = React.useState<SortingState>(initialSorting);
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>(initialColumnFilters);
  const [columnVisibility, setColumnVisibility] =
    React.useState<ColumnVisibilityState>(initialColumnVisibility);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [pagination, setPagination] = React.useState<PaginationState>(initialPagination);

  return useTable({
    features: dataTableFeatures,
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: { sorting, columnFilters, columnVisibility, rowSelection, pagination },
  });
}

export {
  dataTableFeatures,
  useDataTable,
  type DataTable,
  type DataTableColumnDef,
  type DataTableFeatures,
  type UseDataTableOptions,
};
