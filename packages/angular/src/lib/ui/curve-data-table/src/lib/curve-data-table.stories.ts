import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';
import { curveDataTableContract } from '@surfnet/curve-contracts';
import {
  CurveDataTableActionColumn,
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
  { id: '5kma53ae', amount: 475.22, status: 'success', email: 'alma.lawson@example.com' },
  { id: 'bhqecj4p', amount: 275.43, status: 'failed', email: 'dolores.chambers@example.com' },
];

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

// ---------------------------------------------------------------------------
// Shared columns
// ---------------------------------------------------------------------------

const columns: ICurveDataTableColumn[] = [
  new CurveDataTableSelectionColumn(),
  new CurveDataTableStringColumn('status', 'Status'),
  new CurveDataTableStringColumn('email', 'Email', undefined, true),
  new CurveDataTableStringColumn('amount', 'Amount', (value: number) => currency.format(value)),
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
  parameters: {
    docs: {
      description: {
        component: curveDataTableContract.description,
      },
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
 * Full table: filter input, column-visibility toggle, row selection, sortable Email column,
 * right-aligned Amount, row actions, and Previous/Next pagination.
 * NOTE:
 * - Filtering on amount currenty does not work. This interactive option is not present in the other data-table component.
 * - This component does currently not support passing CSS classes to cells, for example tailing utility classes for rendering uppercase or lowercase. Right-alignment of numbers is currently automatic.
 * - For simplicity, the image column is a separate column, whereas in the other data-table component it is in the 'App' column.
 */
export const Default: Story = {
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [DefaultDataTable] },
    template: `<default-data-table ${argsToTemplate(args)}></default-data-table>`,
  }),
};
