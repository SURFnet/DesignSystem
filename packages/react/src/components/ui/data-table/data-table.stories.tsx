import type { ComponentType } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { dataTableContract } from '@surfnet/contracts';
import type { ColumnDef } from '@tanstack/react-table';
import { IconArrowsSort, IconDots } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { DataTable, type DataTableProps } from './data-table';

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
        <IconArrowsSort data-icon="inline-end" />
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
                <IconDots />
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

// DataTable is generic; pin the story typings to the Payment instantiation.
const PaymentDataTable = DataTable as ComponentType<DataTableProps<Payment, unknown>>;

const meta = {
  title: 'Components/DataTable',
  component: PaymentDataTable,
  parameters: {
    docs: {
      description: {
        component: dataTableContract.description,
      },
    },
  },
} satisfies Meta<typeof PaymentDataTable>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The full data table: a filter input, a column-visibility menu, row selection, a sortable
 * Email column, a right-aligned Amount, row actions, and Previous/Next pagination.
 */
export const Default: Story = {
  args: {
    columns,
    data,
    filterColumn: 'email',
    filterPlaceholder: 'Filter emails...',
  },
};

/** The empty state shown when there are no rows. */
export const Empty: Story = {
  args: {
    columns,
    data: [],
    filterColumn: 'email',
    filterPlaceholder: 'Filter emails...',
  },
};
