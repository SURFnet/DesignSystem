import { ColumnDef, Table as TanStackTable } from '@tanstack/react-table';
import * as React from '../../../../../../node_modules/.pnpm/react@19.2.7/node_modules/react';
interface DataTableToolbarProps extends React.ComponentProps<'div'> {
}
declare function DataTableToolbar({ className, ...props }: DataTableToolbarProps): React.JSX.Element;
interface DataTableContentProps<TData> extends React.ComponentProps<'div'> {
    table: TanStackTable<TData>;
    columns: ColumnDef<TData, unknown>[];
    /** Content shown in the body when there are no rows. */
    noResultsLabel?: React.ReactNode;
}
declare function DataTableContent<TData>({ table, columns, noResultsLabel, className, ...props }: DataTableContentProps<TData>): React.JSX.Element;
interface DataTablePaginationProps<TData> extends React.ComponentProps<'div'> {
    table: TanStackTable<TData>;
    /** Label for the "previous page" button. */
    previousLabel?: React.ReactNode;
    /** Label for the "next page" button. */
    nextLabel?: React.ReactNode;
    /** Builds the selection-summary text from the selected and total row counts. */
    selectionLabel?: (selectedCount: number, totalCount: number) => React.ReactNode;
}
declare function DataTablePagination<TData>({ table, previousLabel, nextLabel, selectionLabel, className, ...props }: DataTablePaginationProps<TData>): React.JSX.Element;
export { DataTableContent, DataTablePagination, DataTableToolbar, type DataTableContentProps, type DataTablePaginationProps, type DataTableToolbarProps, };
