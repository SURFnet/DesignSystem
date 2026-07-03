import type { Meta, StoryObj } from '@storybook/react-vite';
import { selectContract } from '@surfnet/curve-contracts';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './select';

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component: selectContract.description,
      },
    },
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A select with a placeholder until a value is chosen. */
export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Category: All" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="identity">Identity</SelectItem>
        <SelectItem value="storage">Storage</SelectItem>
        <SelectItem value="marketplace">Marketplace</SelectItem>
      </SelectContent>
    </Select>
  ),
};

/** A pre-selected value with grouped, labelled options. */
export const Grouped: Story = {
  render: () => (
    <Select defaultValue="identity">
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Pick a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          <SelectItem value="identity">Identity</SelectItem>
          <SelectItem value="storage">Storage</SelectItem>
          <SelectItem value="marketplace">Marketplace</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

/** Disabled trigger. */
export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Category: All" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
      </SelectContent>
    </Select>
  ),
};

/** Every trigger size declared in the contract. */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {selectContract.sizes.map((size) => (
        <Select key={size} defaultValue="all">
          <SelectTrigger size={size} className="w-40" title={selectContract.sizeDocs[size]}>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="identity">Identity</SelectItem>
          </SelectContent>
        </Select>
      ))}
    </div>
  ),
};
