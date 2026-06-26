import { type Meta, type StoryObj } from '@storybook/angular';
import { tableContract } from '@surfnet/contracts';
import { HlmTable } from './hlm-table';
import { Component, Input } from '@angular/core';
import { HlmTableImports } from '..';

const meta: Meta<HlmTable> = {
  title: 'Components/Table',
  component: HlmTable,
  parameters: {
    docs: {
      description: {
        component: tableContract.description,
      },
    },
  },
};

export default meta;
type Story = StoryObj<HlmTable>;

const apps = [
  { name: 'SURFconext', category: 'Identity', status: 'Active' },
  { name: 'SURFdrive', category: 'Storage', status: 'Active' },
  { name: 'SURFspot', category: 'Marketplace', status: 'Inactive' },
];

@Component({
  selector: 'simple-table',
  imports: [HlmTableImports],
  template: `
    <div hlmTableContainer>
      <table hlmTable class="w-[28rem]">
        <caption hlmTableCaption>
          A list of available apps.
        </caption>
        <thead hlmTableHeader>
          <tr hlmTableRow>
            <th hlmTableHead>Name</th>
            <th hlmTableHead>Category</th>
            <th hlmTableHead class="text-right">Status</th>
          </tr>
        </thead>
        <tbody hlmTableBody>
          @for (app of apps; track app) {
            <tr hlmTableRow [key]="app.name">
              <td hlmTableCell class="font-medium">{{ app.name }}</td>
              <td hlmTableCell>{{ app.category }}</td>
              <td hlmTableCell class="text-right">{{ app.status }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
class SimpleTable {
  @Input() apps!: { name: string; category: string; status: string };
}

/** A basic table with a header, body, and caption. */
export const MenuButtonVariants: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [SimpleTable],
    },
    props: { apps: apps },
    template: '<simple-table [apps]="apps"></simple-table>',
  }),
};
