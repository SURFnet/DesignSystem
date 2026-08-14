import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { switchContract } from '@surfnet/curve-contracts';

import { Label } from '@/components/ui/label';

import { Switch } from './switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    docs: {
      description: {
        component: switchContract.docs.description,
      },
    },
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: switchContract.props.sizes,
      description: switchContract.props.sizes
        .map((size) => `\`${size}\` — ${switchContract.docs.sizes[size]}`)
        .join('\n\n'),
      table: {
        defaultValue: { summary: switchContract.defaults.sizes },
      },
    },
    disabled: { control: 'boolean' },
  },
  args: {
    size: switchContract.defaults.sizes,
    disabled: false,
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A controlled switch driven by React state — the typical usage pattern. */
export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(true);
    return <Switch {...args} checked={checked} onCheckedChange={setChecked} />;
  },
};

/** A switch paired with a clickable label. */
export const WithLabel: Story = {
  render: () => (
    <Label className="gap-2">
      <Switch defaultChecked />
      Enable notifications
    </Label>
  ),
};

/** Every size declared in the contract. */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      {switchContract.props.sizes.map((size) => (
        <Label key={size} className="gap-2">
          <Switch size={size} defaultChecked title={switchContract.docs.sizes[size]} />
          {size}
        </Label>
      ))}
    </div>
  ),
};

/** Every state side by side. */
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Label className="gap-2">
        <Switch />
        Unchecked
      </Label>
      <Label className="gap-2">
        <Switch defaultChecked />
        Checked
      </Label>
      <Label className="gap-2">
        <Switch disabled />
        Disabled
      </Label>
      <Label className="gap-2">
        <Switch defaultChecked disabled />
        Disabled checked
      </Label>
    </div>
  ),
};
