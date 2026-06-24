import type { Meta, StoryObj } from '@storybook/react-vite';
import { tableContract } from '@surfnet/contracts';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';

const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    docs: {
      description: {
        component: tableContract.description,
      },
    },
  },
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

const apps = [
  { name: 'SURFconext', category: 'Identity', status: 'Active' },
  { name: 'SURFdrive', category: 'Storage', status: 'Active' },
  { name: 'SURFspot', category: 'Marketplace', status: 'Inactive' },
];

/** A basic table with a header, body, and caption. */
export const Default: Story = {
  render: () => (
    <Table className="w-[28rem]">
      <TableCaption>A list of available apps.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {apps.map((app) => (
          <TableRow key={app.name}>
            <TableCell className="font-medium">{app.name}</TableCell>
            <TableCell>{app.category}</TableCell>
            <TableCell className="text-right">{app.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
