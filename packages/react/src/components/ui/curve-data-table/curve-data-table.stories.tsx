import type { Meta, StoryObj } from '@storybook/react-vite';
import { curveDataTableContract } from '@surfnet/curve-contracts';

import { Badge } from '@/components/ui/badge';
import { CurveDataTable } from './curve-data-table';
import {
  CurveDataTableActionColumn,
  CurveDataTableCustomColumn,
  CurveDataTableSelectionColumn,
  CurveDataTableStringColumn,
  type CurveDataTableRowEvent,
  type ICurveDataTableColumn,
} from './curve-data-table-columns';

// ---------------------------------------------------------------------------
// Shared fixtures (same data as the Angular story)
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
  { id: '5kma53ae', amount: 475.22, status: 'success', email: 'alma.lawson@example.com' },
  { id: 'bhqecj4p', amount: 275.43, status: 'failed', email: 'dolores.chambers@example.com' },
];

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' });

// Defined once, outside the story, so the table isn't rebuilt on every render.
const columns: ICurveDataTableColumn[] = [
  new CurveDataTableSelectionColumn(),
  new CurveDataTableCustomColumn<Payment>('status', 'Status', (payment) => {
    const variants = {
      pending: 'secondary',
      processing: 'outline',
      success: 'success',
      failed: 'danger',
    } as const;

    return <Badge variant={variants[payment.status]}>{payment.status}</Badge>;
  }),
  new CurveDataTableStringColumn('email', 'Email', undefined, true),
  new CurveDataTableStringColumn<number>('amount', 'Amount', (value) => currency.format(value)),
  new CurveDataTableActionColumn(['Copy payment ID', 'View customer', 'View payment details']),
];

function copyId(event: CurveDataTableRowEvent<Payment>) {
  void navigator.clipboard?.writeText(event.record.id);
}

// ---------------------------------------------------------------------------
// Meta + stories
// ---------------------------------------------------------------------------

const meta = {
  title: 'Components/CurveDataTable',
  // Unverified: shadcn/ui WCAG 2.2 AA audit (thefrontkit, 2026).
  tags: ['a11y-gap'],
  component: CurveDataTable,
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
      description: 'The column the search field filters on. `null` hides the search field.',
    },
    hasColumnFilter: {
      control: 'boolean',
      description: 'Show the "Columns" menu for hiding and showing columns.',
    },
    data: { control: false },
    columns: { control: false },
  },
  args: {
    data,
    columns,
    searchColumn: 'email',
    hasColumnFilter: true,
    onRowActionTriggered: copyId as (event: CurveDataTableRowEvent<unknown>) => void,
  },
} satisfies Meta<typeof CurveDataTable>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Full table: filter input, column-visibility toggle, row selection, sortable Email column,
 * right-aligned Amount, row actions, and Previous/Next pagination.
 * NOTE:
 * - Filtering on amount currently does not work, because the search compares text.
 * - Cells can't take extra CSS classes yet (for example to change text case). Numbers are
 *   right-aligned automatically.
 * - Each column has one type, so a column with an image and text together isn't supported.
 */
export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `const columns: ICurveDataTableColumn[] = [
  new CurveDataTableSelectionColumn(),
  new CurveDataTableStringColumn('status', 'Status'),
  new CurveDataTableStringColumn('email', 'Email', undefined, true), // sortable
  new CurveDataTableStringColumn<number>('amount', 'Amount', (value) => currency.format(value)),
  new CurveDataTableActionColumn(['Copy payment ID', 'View customer', 'View payment details']),
];

<CurveDataTable
  data={payments}
  columns={columns}
  searchColumn="email"
  onRowActionTriggered={(event) => navigator.clipboard.writeText(event.record.id)}
/>`,
      },
    },
  },
};
