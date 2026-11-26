import { useState, type ComponentProps } from 'react';
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
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=60-438',
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
    return (
      <Switch
        {...args}
        aria-label="Enable notifications"
        checked={checked}
        onCheckedChange={setChecked}
      />
    );
  },
};

const renderLabelled =
  (label: string, extra: Partial<ComponentProps<typeof Switch>> = {}): Story['render'] =>
  (args) => (
    <Label className="gap-2">
      <Switch {...args} {...extra} />
      {label}
    </Label>
  );

/** A switch paired with a clickable label. */
export const WithLabel: Story = {
  render: renderLabelled('Enable notifications', { defaultChecked: true }),
};

/** Small size — compact forms and toolbars. */
export const Sm: Story = {
  args: { size: 'sm' },
  render: renderLabelled('Small switch', {
    defaultChecked: true,
    title: switchContract.docs.sizes.sm,
  }),
};

/** An unchecked switch. */
export const Unchecked: Story = {
  render: renderLabelled('Unchecked'),
};

/** A checked switch. */
export const Checked: Story = {
  render: renderLabelled('Checked', { defaultChecked: true }),
};

/** A disabled unchecked switch. */
export const Disabled: Story = {
  args: { disabled: true },
  render: renderLabelled('Disabled'),
};

/** A disabled checked switch. */
export const DisabledChecked: Story = {
  args: { disabled: true },
  render: renderLabelled('Disabled checked', { defaultChecked: true }),
};
