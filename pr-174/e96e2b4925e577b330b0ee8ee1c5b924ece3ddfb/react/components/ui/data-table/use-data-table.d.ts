import { ColumnDef, ColumnFiltersState, PaginationState, SortingState, Table as TanStackTable, VisibilityState } from '@tanstack/react-table';
interface UseDataTableOptions<TData> {
    data: TData[];
    columns: ColumnDef<TData, unknown>[];
    initialSorting?: SortingState;
    initialColumnFilters?: ColumnFiltersState;
    initialColumnVisibility?: VisibilityState;
    initialPagination?: PaginationState;
}
declare function useDataTable<TData>({ data, columns, initialSorting, initialColumnFilters, initialColumnVisibility, initialPagination, }: UseDataTableOptions<TData>): TanStackTable<TData>;
export { useDataTable, type UseDataTableOptions };
