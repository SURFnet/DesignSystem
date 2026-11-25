import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';
import { curveDataTableContract } from '@surfnet/curve-contracts';
import type { BadgeVariantName } from '@surfnet/curve-contracts';
import { HlmBadge } from '../../../badge/src';
import {
  CurveDataTableActionColumn,
  CurveDataTableCustomColumn,
  CurveDataTableImports,
  CurveDataTableSelectionColumn,
  CurveDataTableStringColumn,
  ICurveDataTableColumn,
} from '..';
import { CurveDataTableRowEvent } from './model/curve-data-table-row-event';

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
  { id: 'm5gr84i9', amount: 630.44, status: 'success', email: 'Michael.MITC@example.com' },
  { id: '3u1reuv4', amount: 767.5, status: 'success', email: 'felicia.reid@example.com' },
  { id: 'derv1ws0', amount: 396.84, status: 'processing', email: 'Georgia.Young@example.com' },
  { id: '5kma53ae', amount: 47512, status: 'success', email: 'alma.lawson@example.com' },
  { id: 'bhqecj4p', amount: 275.43, status: 'failed', email: 'dolores.chambers@example.com' },
];

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' });

// ---------------------------------------------------------------------------
// Custom cell: renders the payment status as a badge
// ---------------------------------------------------------------------------

const statusVariants: Record<Payment['status'], BadgeVariantName> = {
  pending: 'secondary',
  processing: 'outline',
  success: 'success',
  failed: 'danger',
};

@Component({
  selector: 'payment-status-cell',
  imports: [HlmBadge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span hlmBadge [variant]="variant()">{{ record().status }}</span>`,
})
class PaymentStatusCell {
  public readonly record = input.required<Payment>();
  protected readonly variant = computed(() => statusVariants[this.record().status]);
}

// ---------------------------------------------------------------------------
// Shared columns
// ---------------------------------------------------------------------------

const columns: ICurveDataTableColumn[] = [
  new CurveDataTableSelectionColumn(),
  new CurveDataTableCustomColumn<Payment>('status', 'Status', PaymentStatusCell),
  new CurveDataTableStringColumn('email', 'Email', undefined, {
    sortable: true,
  }),
  new CurveDataTableStringColumn('amount', 'Amount', (value: number) => currency.format(value), {
    sortable: true,
    align: 'left',
  }),
  new CurveDataTableActionColumn(['Copy payment ID', 'View customer', 'View payment details']),
];

// ---------------------------------------------------------------------------
// Basic render component that uses the data and columns above
// ---------------------------------------------------------------------------

@Component({
  selector: 'default-data-table',
  imports: [CurveDataTableImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <curve-data-table
      [data]="data"
      [columns]="columns"
      [searchColumn]="searchColumn()"
      [hasColumnFilter]="hasColumnFilter()"
      (rowActionTriggered)="copyId($event)"
    ></curve-data-table>
  `,
})
class DefaultDataTable {
  public searchColumn = input.required<string>();
  public hasColumnFilter = input.required<boolean>();
  public readonly data = data;
  public readonly columns = columns;

  protected copyId(event: CurveDataTableRowEvent<Payment>): void {
    void navigator.clipboard?.writeText(event.record.id);
  }
}

// ---------------------------------------------------------------------------
// Meta + stories
// ---------------------------------------------------------------------------

const meta: Meta = {
  title: 'Components/CurveDataTable',
  // Unverified: shadcn/ui WCAG 2.2 AA audit (thefrontkit, 2026).
  tags: ['a11y-gap'],
  parameters: {
    docs: {
      description: {
        component: curveDataTableContract.docs.description,
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=18759-269141&t=vT3gKkMDSpQaeqci-0',
    },
  },
  argTypes: {
    searchColumn: {
      control: 'inline-radio',
      options: ['status', 'email', 'amount', null],
      description:
        "Stel in op welke kolom gefilterd kan worden. Bij 'null' wordt het filter verborgen.",
    },
  },
  args: {
    searchColumn: 'email',
    hasColumnFilter: true,
  },
};

export default meta;
type Story = StoryObj;

/**
 * Full table: filter input, column-visibility toggle, row selection, sortable Email and Amount
 * columns, row actions, and Previous/Next pagination.
 *
 * Custom column: `CurveDataTableCustomColumn` renders your own component in each cell. It gets the
 * row as its `record` input, or pass a 4th argument to map the row to other inputs.
 *
 * Column options: pass `{ sortable, align }` as the last argument of a string or action column.
 * `align` is `'left' | 'center' | 'right'`; without it, numbers align right and text aligns left.
 * NOTE:
 * - Filtering on amount currenty does not work. This interactive option is not present in the other data-table component.
 * - This component does currently not support passing CSS classes to cells, for example tailing utility classes for rendering uppercase or lowercase. Numbers are right-aligned by default; override with the `align` option.
 * - For mixed content (e.g. an image and text in one cell), use a `CurveDataTableCustomColumn`.
 */
export const Default: Story = {
  parameters: {
    docs: {
      source: {
        language: 'ts',
        code: `// 1. A component for the custom cell. It gets the whole row as its \`record\` input.
@Component({
  selector: 'payment-status-cell',
  imports: [HlmBadge],
  template: \`<span hlmBadge [variant]="variant()">{{ record().status }}</span>\`,
})
class PaymentStatusCell {
  public readonly record = input.required<Payment>();
  protected readonly variant = computed(() => statusVariants[this.record().status]);
}

// 2. The columns. Options ({ sortable, align }) go last on string and action columns.
const columns: ICurveDataTableColumn[] = [
  new CurveDataTableSelectionColumn(),
  new CurveDataTableCustomColumn<Payment>('status', 'Status', PaymentStatusCell),
  // Or map the row to other inputs:
  // new CurveDataTableCustomColumn<Payment>('status', 'Status', StatusBadge, (p) => ({ status: p.status })),
  new CurveDataTableStringColumn('email', 'Email', undefined, { sortable: true }),
  new CurveDataTableStringColumn('amount', 'Amount', (value: number) => currency.format(value), {
    sortable: true,
    align: 'left',
  }),
  new CurveDataTableActionColumn(['Copy payment ID', 'View customer', 'View payment details']),
];

// 3. The table, in your component's template.
<curve-data-table
  [data]="payments"
  [columns]="columns"
  searchColumn="email"
  (rowActionTriggered)="copyId($event)"
/>`,
      },
    },
  },
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [DefaultDataTable] },
    template: `<default-data-table ${argsToTemplate(args)}></default-data-table>`,
  }),
};
