import type { Meta, StoryObj } from '@storybook/react-vite';
import { labelContract } from '@surfnet/contracts';

import { Input } from '@/components/ui/input';

import { Label } from './label';

const meta = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    docs: {
      description: {
        component: labelContract.description,
      },
    },
  },
  args: {
    children: 'Email',
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A standalone label. */
export const Default: Story = {};

/** A label wired to an input through `htmlFor`. */
export const WithInput: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@surf.nl" />
    </div>
  ),
};
