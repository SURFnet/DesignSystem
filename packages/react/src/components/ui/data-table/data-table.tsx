'use client';

import * as React from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type Table as TanStackTable,
  type VisibilityState,
} from '@tanstack/react-table';
import { IconChevronDown } from '@tabler/icons-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DataTableProps<TData, TValue> extends React.ComponentProps<'div'> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  /** The column id to wire the filter input to. Omit to hide the filter input. */
  filterColumn?: string;
  /** Placeholder for the filter input. */
  filterPlaceholder?: string;
  /** Label for the column-visibility menu trigger. */
  columnsLabel?: React.ReactNode;
  /** Content shown in the body when there are no rows. */
  noResultsLabel?: React.ReactNode;
  /** Label for the "previous page" button. */
  previousLabel?: React.ReactNode;
  /** Label for the "next page" button. */
  nextLabel?: React.ReactNode;
  /** Builds the selection-summary text from the selected and total row counts. */
  selectionLabel?: (selectedCount: number, totalCount: number) => React.ReactNode;
  /** Render extra controls into the toolbar, before the column-visibility menu. */
  toolbar?: (table: TanStackTable<TData>) => React.ReactNode;
}

/**
 * A data table built on the `Table` primitive + TanStack Table. Bundles row selection,
 * sorting, text filtering, column visibility, and Previous/Next pagination. Pass the
 * column definitions and data; the component owns the table state.
 */
function DataTable<TData, TValue>({
  columns,
  data,
  filterColumn,
  filterPlaceholder = 'Filter…',
  columnsLabel = 'Columns',
  noResultsLabel = 'No results.',
  previousLabel = 'Previous',
  nextLabel = 'Next',
  selectionLabel = (selectedCount, totalCount) =>
    `${selectedCount} of ${totalCount} row(s) selected.`,
  toolbar,
  className,
  ...props
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  });

  const filterCol = filterColumn ? table.getColumn(filterColumn) : undefined;

  return (
    <div data-slot="data-table" className={cn('w-full', className)} {...props}>
      <div className="flex items-center gap-2 py-4">
        {filterCol ? (
          <Input
            placeholder={filterPlaceholder}
            value={(filterCol.getFilterValue() as string) ?? ''}
            onChange={(event) => filterCol.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
        ) : null}
        {toolbar?.(table)}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" className="ml-auto">
                {columnsLabel}
                <IconChevronDown data-icon="inline-end" />
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
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
      <div className="flex items-center justify-end gap-2 py-4">
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
    </div>
  );
}

export { DataTable, type DataTableProps };
