import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorArrowsDownUp, phosphorDotsThreeVertical } from '@ng-icons/phosphor-icons/regular';
import { HlmButton, HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCheckbox } from '@spartan-ng/helm/checkbox';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmInput } from '@spartan-ng/helm/input';
import { type Meta, type StoryObj } from '@storybook/angular';
import { dataTableContract } from '@surfnet/contracts';
import {
  flexRenderComponent,
  type Column,
  type ColumnDef,
  type Row,
  type Table,
} from '@tanstack/angular-table';

import { HlmDataTableContent } from './hlm-data-table-content';
import { HlmDataTablePagination } from './hlm-data-table-pagination';
import { HlmDataTableToolbar } from './hlm-data-table-toolbar';
import { injectDataTable } from './inject-data-table';

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

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

// ---------------------------------------------------------------------------
// Interactive cell components (mounted by FlexRender via flexRenderComponent)
// ---------------------------------------------------------------------------

@Component({
  selector: 'data-table-select-all',
  imports: [HlmCheckbox],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <hlm-checkbox
      aria-label="Select all"
      [checked]="table().getIsAllPageRowsSelected()"
      [indeterminate]="table().getIsSomePageRowsSelected()"
      (checkedChange)="table().toggleAllPageRowsSelected($event)"
    />
  `,
})
class DataTableSelectAll {
  public readonly table = input.required<Table<Payment>>();
}

@Component({
  selector: 'data-table-select-row',
  imports: [HlmCheckbox],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <hlm-checkbox
      aria-label="Select row"
      [checked]="row().getIsSelected()"
      (checkedChange)="row().toggleSelected($event)"
    />
  `,
})
class DataTableSelectRow {
  public readonly row = input.required<Row<Payment>>();
}

@Component({
  selector: 'data-table-email-header',
  imports: [HlmButton, NgIcon],
  providers: [provideIcons({ phosphorArrowsDownUp })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      hlmBtn
      variant="ghost"
      size="sm"
      (click)="column().toggleSorting(column().getIsSorted() === 'asc')"
    >
      Email
      <ng-icon name="phosphorArrowsDownUp" data-icon="inline-end" />
    </button>
  `,
})
class DataTableEmailHeader {
  public readonly column = input.required<Column<Payment>>();
}

@Component({
  selector: 'data-table-row-actions',
  imports: [HlmButtonImports, HlmDropdownMenuImports, NgIcon],
  providers: [provideIcons({ phosphorDotsThreeVertical })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      hlmBtn
      variant="ghost"
      size="icon-sm"
      align="end"
      aria-label="Open menu"
      [hlmDropdownMenuTrigger]="menu"
    >
      <ng-icon name="phosphorDotsThreeVertical" />
    </button>
    <ng-template #menu>
      <hlm-dropdown-menu class="w-48">
        <hlm-dropdown-menu-group>
          <hlm-dropdown-menu-label>Actions</hlm-dropdown-menu-label>
          <button hlmDropdownMenuItem (triggered)="copyId()">Copy payment ID</button>
        </hlm-dropdown-menu-group>
        <hlm-dropdown-menu-separator />
        <button hlmDropdownMenuItem>View customer</button>
        <button hlmDropdownMenuItem>View payment details</button>
      </hlm-dropdown-menu>
    </ng-template>
  `,
})
class DataTableRowActions {
  public readonly payment = input.required<Payment>();

  protected copyId(): void {
    void navigator.clipboard?.writeText(this.payment().id);
  }
}

// ---------------------------------------------------------------------------
// Shared columns
// ---------------------------------------------------------------------------

const columns: ColumnDef<Payment, unknown>[] = [
  {
    id: 'select',
    header: ({ table }) => flexRenderComponent(DataTableSelectAll, { inputs: { table } }),
    cell: ({ row }) => flexRenderComponent(DataTableSelectRow, { inputs: { row } }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => `<span class="capitalize">${row.getValue('status')}</span>`,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => flexRenderComponent(DataTableEmailHeader, { inputs: { column } }),
    cell: ({ row }) => `<span class="lowercase">${row.getValue('email')}</span>`,
  },
  {
    accessorKey: 'amount',
    header: () => `<div class="text-right">Amount</div>`,
    cell: ({ row }) =>
      `<div class="text-right font-medium">${currency.format(row.getValue('amount'))}</div>`,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) =>
      flexRenderComponent(DataTableRowActions, { inputs: { payment: row.original } }),
  },
];

// ---------------------------------------------------------------------------
// Host components (one per story, mirroring the React render functions)
// ---------------------------------------------------------------------------

@Component({
  selector: 'payment-data-table',
  imports: [
    HlmDataTableContent,
    HlmDataTablePagination,
    HlmDataTableToolbar,
    HlmButton,
    HlmInput,
    HlmDropdownMenuImports,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block w-full' },
  template: `
    <div hlmDataTableToolbar>
      <input
        hlmInput
        class="max-w-sm"
        placeholder="Filter emails…"
        [value]="emailFilter()"
        (input)="setEmailFilter($event)"
      />
      <button hlmBtn variant="outline" class="ml-auto" [hlmDropdownMenuTrigger]="columnsMenu">
        Columns
      </button>
      <ng-template #columnsMenu>
        <hlm-dropdown-menu class="w-40">
          @for (column of hideableColumns(); track column.id) {
            <button
              hlmDropdownMenuCheckbox
              class="capitalize"
              [checked]="column.getIsVisible()"
              (triggered)="column.toggleVisibility(!column.getIsVisible())"
            >
              {{ column.id }}
              <hlm-dropdown-menu-checkbox-indicator />
            </button>
          }
        </hlm-dropdown-menu>
      </ng-template>
    </div>
    <hlm-data-table-content [table]="table" [columns]="columns" />
    <hlm-data-table-pagination [table]="table" />
  `,
})
class PaymentDataTable {
  protected readonly _data = signal(data);
  protected readonly columns = columns;
  protected readonly table = injectDataTable(() => ({ data: this._data(), columns: this.columns }));

  protected readonly emailFilter = signal('');

  protected hideableColumns() {
    return this.table.getAllColumns().filter((column) => column.getCanHide());
  }

  protected setEmailFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.emailFilter.set(value);
    this.table.getColumn('email')?.setFilterValue(value);
  }
}

@Component({
  selector: 'empty-data-table',
  imports: [HlmDataTableContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block w-full' },
  template: `
    <hlm-data-table-content
      [table]="table"
      [columns]="columns"
      noResultsLabel="No payments found."
    />
  `,
})
class EmptyDataTable {
  protected readonly columns = columns;
  protected readonly table = injectDataTable<Payment>(() => ({ data: [], columns: this.columns }));
}

@Component({
  selector: 'custom-toolbar-data-table',
  imports: [HlmDataTableContent, HlmDataTablePagination, HlmDataTableToolbar, HlmButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block w-full' },
  template: `
    <div hlmDataTableToolbar class="justify-between">
      <span class="font-medium">Recent payments</span>
      <button hlmBtn size="sm">Export</button>
    </div>
    <hlm-data-table-content [table]="table" [columns]="columns" />
    <hlm-data-table-pagination [table]="table" />
  `,
})
class CustomToolbarDataTable {
  protected readonly _data = signal(data);
  protected readonly columns = columns;
  protected readonly table = injectDataTable(() => ({ data: this._data(), columns: this.columns }));
}

// ---------------------------------------------------------------------------
// Meta + stories
// ---------------------------------------------------------------------------

const meta: Meta = {
  title: 'Components/DataTable',
  parameters: {
    docs: {
      description: {
        component: dataTableContract.description,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Full table: filter input, column-visibility toggle, row selection, sortable Email column,
 * right-aligned Amount, row actions, and Previous/Next pagination.
 */
export const Default: Story = {
  render: () => ({
    moduleMetadata: { imports: [PaymentDataTable] },
    template: '<payment-data-table />',
  }),
};

/** Empty state — no rows to display. */
export const Empty: Story = {
  render: () => ({
    moduleMetadata: { imports: [EmptyDataTable] },
    template: '<empty-data-table />',
  }),
};

/** Custom toolbar layout: heading on the left, action button on the right. */
export const CustomToolbar: Story = {
  render: () => ({
    moduleMetadata: { imports: [CustomToolbarDataTable] },
    template: '<custom-toolbar-data-table />',
  }),
};
