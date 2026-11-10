'use client';

import * as React from 'react';
import type { RowData } from '@tanstack/react-table';
import {
  ArrowsDownUpIcon,
  DotsThreeIcon,
  ImageIcon,
  MagnifyingGlassIcon,
} from '@phosphor-icons/react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DataTableContent,
  DataTablePagination,
  DataTableToolbar,
  useDataTable,
  type DataTableColumnDef,
} from '@/components/ui/data-table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';

import {
  CurveDataTableActionColumn,
  CurveDataTableCustomColumn,
  CurveDataTableImageColumn,
  CurveDataTableSelectionColumn,
  CurveDataTableStringColumn,
  type CurveDataTableRowEvent,
  type ICurveDataTableColumn,
} from './curve-data-table-columns';
import styles from './curve-data-table.module.css';

interface CurveDataTableProps<TData extends RowData> extends Omit<
  React.ComponentProps<'div'>,
  'children'
> {
  data: TData[];
  columns: ICurveDataTableColumn[];
  /** Field name to search on. `null` (the default) hides the search field. */
  searchColumn?: string | null;
  hasColumnFilter?: boolean;
  /** Called when someone picks an action from a row's "⋯" menu. */
  onRowActionTriggered?: (event: CurveDataTableRowEvent<TData>) => void;
}

/**
 * React counterpart of the Angular `curve-data-table`.
 */
function CurveDataTable<TData extends RowData>({
  data,
  columns,
  searchColumn = null,
  hasColumnFilter = true,
  onRowActionTriggered,
  className,
  ...props
}: CurveDataTableProps<TData>) {
  // Keep the latest callback in a ref so the column definitions don't have to be rebuilt
  // (and the table re-created) every time the parent passes a new function.
  const onRowActionRef = React.useRef(onRowActionTriggered);
  React.useEffect(() => {
    onRowActionRef.current = onRowActionTriggered;
  });

  // Turn the Curve column classes into TanStack column definitions. Only redo this when
  // the `columns` prop itself changes.
  const tableColumns = React.useMemo(
    () =>
      createColumns<TData>(columns, (event) => {
        onRowActionRef.current?.(event);
      }),
    [columns],
  );

  const table = useDataTable({ data, columns: tableColumns });
  const searchTarget = searchColumn ? table.getColumn(searchColumn) : undefined;
  const hideableColumns = table.getAllColumns().filter((column) => column.getCanHide());

  return (
    <div data-slot="curve-data-table" className={cn(styles.root, className)} {...props}>
      {searchColumn || hasColumnFilter ? (
        <DataTableToolbar>
          {searchColumn ? (
            <InputGroup className={styles.search}>
              <InputGroupAddon>
                <MagnifyingGlassIcon aria-hidden />
              </InputGroupAddon>
              <InputGroupInput
                aria-label={`Search ${searchColumn}`}
                placeholder={`Search ${searchColumn}...`}
                value={(searchTarget?.getFilterValue() as string | undefined) ?? ''}
                onChange={(event) => searchTarget?.setFilterValue(event.target.value)}
              />
            </InputGroup>
          ) : null}
          {hasColumnFilter ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="outline" className={styles.columnsButton}>
                    Columns
                  </Button>
                }
              />
              <DropdownMenuContent align="end" className={styles.columnsMenu}>
                {hideableColumns.map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className={styles.columnToggle}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </DataTableToolbar>
      ) : null}
      <DataTableContent table={table} columns={tableColumns} />
      <DataTablePagination table={table} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Column building (mirrors `createColumns()` in the Angular component)
// ---------------------------------------------------------------------------

function createColumns<TData extends RowData>(
  columns: ICurveDataTableColumn[],
  onRowAction: (event: CurveDataTableRowEvent<TData>) => void,
): DataTableColumnDef<TData>[] {
  const result: DataTableColumnDef<TData>[] = [];

  for (const column of columns) {
    if (column instanceof CurveDataTableSelectionColumn) {
      result.push(createSelectionColumn<TData>());
    } else if (column instanceof CurveDataTableStringColumn) {
      result.push(createStringColumn<TData>(column));
    } else if (column instanceof CurveDataTableCustomColumn) {
      result.push(createCustomColumn<TData>(column));
    } else if (column instanceof CurveDataTableImageColumn) {
      result.push(createImageColumn<TData>(column));
    } else if (column instanceof CurveDataTableActionColumn) {
      result.push(createActionColumn<TData>(column, onRowAction));
    }
  }

  return result;
}

function createSelectionColumn<TData extends RowData>(): DataTableColumnDef<TData> {
  return {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Select row"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };
}

function createStringColumn<TData extends RowData>(
  column: CurveDataTableStringColumn,
): DataTableColumnDef<TData> {
  const { fieldName, header, displayMethod, sortable } = column;

  return {
    accessorKey: fieldName,
    header: sortable
      ? ({ column: tableColumn }) => (
          <Button
            variant="ghost"
            size="sm"
            className={styles.sortButton}
            onClick={() => tableColumn.toggleSorting(tableColumn.getIsSorted() === 'asc')}
          >
            {header}
            <ArrowsDownUpIcon data-icon="inline-end" />
          </Button>
        )
      : header,
    cell: ({ row }) => {
      const value = row.getValue(fieldName);
      // Numbers are right-aligned, like in the Angular version.
      const isNumber = typeof value === 'number';
      return <div className={isNumber ? styles.valueEnd : undefined}>{displayMethod(value)}</div>;
    },
  } as DataTableColumnDef<TData>;
}

function createCustomColumn<TData extends RowData>(
  column: CurveDataTableCustomColumn<TData>,
): DataTableColumnDef<TData> {
  const { id, header, render } = column;

  return {
    id,
    accessorFn: () => undefined,
    header,
    cell: ({ row }) => render(row.original),
  };
}

function createImageColumn<TData extends RowData>(
  column: CurveDataTableImageColumn,
): DataTableColumnDef<TData> {
  const { fieldName, header } = column;

  return {
    accessorKey: fieldName,
    header,
    cell: ({ row }) => {
      const imageUrl = row.getValue<string | undefined>(fieldName);
      return imageUrl ? (
        <img src={imageUrl} width={40} height={40} alt="" className={styles.image} />
      ) : (
        <ImageIcon size={40} aria-hidden />
      );
    },
  } as DataTableColumnDef<TData>;
}

function createActionColumn<TData extends RowData>(
  column: CurveDataTableActionColumn,
  onRowAction: (event: CurveDataTableRowEvent<TData>) => void,
): DataTableColumnDef<TData> {
  const { actions, header } = column;

  return {
    id: 'actions',
    header,
    enableHiding: false,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" size="icon-sm" aria-label="Open action menu">
              <DotsThreeIcon />
            </Button>
          }
        />
        <DropdownMenuContent align="start" className={styles.actionsMenu}>
          {actions.map((action) => (
            <DropdownMenuItem
              key={action}
              onClick={() => onRowAction({ action, record: row.original })}
            >
              {action}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  };
}

export { CurveDataTable, type CurveDataTableProps };
