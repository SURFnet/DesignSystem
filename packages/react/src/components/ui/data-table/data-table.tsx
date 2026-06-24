'use client';

import * as React from 'react';
import { flexRender, type ColumnDef, type Table as TanStackTable } from '@tanstack/react-table';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DataTableToolbarProps extends React.ComponentProps<'div'> {}

function DataTableToolbar({ className, ...props }: DataTableToolbarProps) {
  return (
    <div
      data-slot="data-table-toolbar"
      className={cn('flex items-center gap-2 py-4', className)}
      {...props}
    />
  );
}

interface DataTableContentProps<TData> extends React.ComponentProps<'div'> {
  table: TanStackTable<TData>;
  columns: ColumnDef<TData, unknown>[];
  /** Content shown in the body when there are no rows. */
  noResultsLabel?: React.ReactNode;
}

function DataTableContent<TData>({
  table,
  columns,
  noResultsLabel = 'No results.',
  className,
  ...props
}: DataTableContentProps<TData>) {
  return (
    <div
      data-slot="data-table-content"
      className={cn('overflow-hidden rounded-md border', className)}
      {...props}
    >
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {noResultsLabel}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

interface DataTablePaginationProps<TData> extends React.ComponentProps<'div'> {
  table: TanStackTable<TData>;
  /** Label for the "previous page" button. */
  previousLabel?: React.ReactNode;
  /** Label for the "next page" button. */
  nextLabel?: React.ReactNode;
  /** Builds the selection-summary text from the selected and total row counts. */
  selectionLabel?: (selectedCount: number, totalCount: number) => React.ReactNode;
}

function DataTablePagination<TData>({
  table,
  previousLabel = 'Previous',
  nextLabel = 'Next',
  selectionLabel = (selectedCount, totalCount) =>
    `${selectedCount} of ${totalCount} row(s) selected.`,
  className,
  ...props
}: DataTablePaginationProps<TData>) {
  return (
    <div
      data-slot="data-table-pagination"
      className={cn('flex items-center justify-end gap-2 py-4', className)}
      {...props}
    >
      <div className="flex-1 text-sm text-muted-foreground">
        {selectionLabel(
          table.getFilteredSelectedRowModel().rows.length,
          table.getFilteredRowModel().rows.length,
        )}
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {previousLabel}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {nextLabel}
        </Button>
      </div>
    </div>
  );
}

export {
  DataTableContent,
  DataTablePagination,
  DataTableToolbar,
  type DataTableContentProps,
  type DataTablePaginationProps,
  type DataTableToolbarProps,
};
