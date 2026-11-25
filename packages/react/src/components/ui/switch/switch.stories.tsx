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

/** A switch paired with a clickable label. */
export const WithLabel: Story = {
  render: () => (
    <Label className="gap-2">
      <Switch defaultChecked />
      Enable notifications
    </Label>
  ),
};

/** Small size — compact forms and toolbars. */
export const Sm: Story = {
  render: () => (
    <Label className="gap-2">
      <Switch size="sm" defaultChecked title={switchContract.docs.sizes.sm} />
      Small switch
    </Label>
  ),
};

/** An unchecked switch. */
export const Unchecked: Story = {
  render: () => (
    <Label className="gap-2">
      <Switch />
      Unchecked
    </Label>
  ),
};

/** A checked switch. */
export const Checked: Story = {
  render: () => (
    <Label className="gap-2">
      <Switch defaultChecked />
      Checked
    </Label>
  ),
};

/** A disabled unchecked switch. */
export const Disabled: Story = {
  render: () => (
    <Label className="gap-2">
      <Switch disabled />
      Disabled
    </Label>
  ),
};

/** A disabled checked switch. */
export const DisabledChecked: Story = {
  render: () => (
    <Label className="gap-2">
      <Switch defaultChecked disabled />
      Disabled checked
    </Label>
  ),
};
