import type { Meta, StoryObj } from '@storybook/react-vite';
import { dataTableContract } from '@surfnet/curve-contracts';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowsDownUpIcon, DotsThreeIcon } from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

import { DataTableContent, DataTablePagination, DataTableToolbar } from './data-table';
import { useDataTable } from './use-data-table';

// ---------------------------------------------------------------------------
// Shared fixtures
// ---------------------------------------------------------------------------

type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

const data: Payment[] = [
  { id: 'm5gr84i9', amount: 630.44, status: 'success', email: 'michael.mitc@example.com' },
  { id: '3u1reuv4', amount: 767.5, status: 'success', email: 'felicia.reid@example.com' },
  { id: 'derv1ws0', amount: 396.84, status: 'processing', email: 'georgia.young@example.com' },
  { id: '5kma53ae', amount: 475.22, status: 'success', email: 'alma.lawson@example.com' },
  { id: 'bhqecj4p', amount: 275.43, status: 'failed', email: 'dolores.chambers@example.com' },
];

const columns: ColumnDef<Payment>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <span className="capitalize">{row.getValue('status')}</span>,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Email
        <ArrowsDownUpIcon data-icon="inline-end" />
      </Button>
    ),
    cell: ({ row }) => <span className="lowercase">{row.getValue('email')}</span>,
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon-sm" aria-label="Open menu">
                <DotsThreeIcon />
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
                Copy payment ID
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const meta = {
  title: 'Components/DataTable',
  parameters: {
    docs: {
      description: {
        component: dataTableContract.docs.description,
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/**
 * Full table: filter input, column-visibility toggle, row selection, sortable Email
 * column, right-aligned Amount, row actions, and Previous/Next pagination.
 */
export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `function PaymentTable() {
  const table = useDataTable({ data, columns });
  const emailCol = table.getColumn('email');

  return (
    <div className="w-full">
      <DataTableToolbar>
        <Input
          placeholder="Filter emails…"
          value={(emailCol?.getFilterValue() as string) ?? ''}
          onChange={(e) => emailCol?.setFilterValue(e.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" className="ml-auto">
                Columns
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((col) => col.getCanHide())
              .map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  className="capitalize"
                  checked={col.getIsVisible()}
                  onCheckedChange={(value) => col.toggleVisibility(!!value)}
                >
                  {col.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </DataTableToolbar>
      <DataTableContent table={table} columns={columns} />
      <DataTablePagination table={table} />
    </div>
  );
}`,
      },
    },
  },
  render: () => {
    function PaymentTable() {
      const table = useDataTable({ data, columns });
      const emailCol = table.getColumn('email');

      return (
        <div className="w-full">
          <DataTableToolbar>
            <Input
              placeholder="Filter emails…"
              value={(emailCol?.getFilterValue() as string) ?? ''}
              onChange={(e) => emailCol?.setFilterValue(e.target.value)}
              className="max-w-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="outline" className="ml-auto">
                    Columns
                  </Button>
                }
              />
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((col) => col.getCanHide())
                  .map((col) => (
                    <DropdownMenuCheckboxItem
                      key={col.id}
                      className="capitalize"
                      checked={col.getIsVisible()}
                      onCheckedChange={(value) => col.toggleVisibility(!!value)}
                    >
                      {col.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </DataTableToolbar>
          <DataTableContent table={table} columns={columns} />
          <DataTablePagination table={table} />
        </div>
      );
    }
    return <PaymentTable />;
  },
};

/** Empty state — no rows to display. */
export const Empty: Story = {
  parameters: {
    docs: {
      source: {
        code: `function EmptyTable() {
  const table = useDataTable({ data: [], columns });
  return (
    <div className="w-full">
      <DataTableContent table={table} columns={columns} noResultsLabel="No payments found." />
    </div>
  );
}`,
      },
    },
  },
  render: () => {
    function EmptyTable() {
      const table = useDataTable({ data: [], columns });
      return (
        <div className="w-full">
          <DataTableContent table={table} columns={columns} noResultsLabel="No payments found." />
        </div>
      );
    }
    return <EmptyTable />;
  },
};

/** Custom toolbar layout: heading on the left, action button on the right. */
export const CustomToolbar: Story = {
  parameters: {
    docs: {
      source: {
        code: `function CustomTable() {
  const table = useDataTable({ data, columns });
  return (
    <div className="w-full">
      <DataTableToolbar className="justify-between">
        <span className="font-medium">Recent payments</span>
        <Button size="sm">Export</Button>
      </DataTableToolbar>
      <DataTableContent table={table} columns={columns} />
      <DataTablePagination table={table} />
    </div>
  );
}`,
      },
    },
  },
  render: () => {
    function CustomTable() {
      const table = useDataTable({ data, columns });
      return (
        <div className="w-full">
          <DataTableToolbar className="justify-between">
            <span className="font-medium">Recent payments</span>
            <Button size="sm">Export</Button>
          </DataTableToolbar>
          <DataTableContent table={table} columns={columns} />
          <DataTablePagination table={table} />
        </div>
      );
    }
    return <CustomTable />;
  },
};
