import type { Meta, StoryObj } from '@storybook/react-vite';
import { checkboxContract } from '@surfnet/curve-contracts';
import { useState } from 'react';

import { Label } from '@/components/ui/label';

import { Checkbox } from './checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component: checkboxContract.docs.description,
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=18692-39410&t=vT3gKkMDSpQaeqci-4',
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
  },
  args: {
    disabled: false,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A controlled checkbox driven by React state — the typical usage pattern. */
export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(true);
    return (
      <Checkbox {...args} checked={checked} onCheckedChange={setChecked} aria-label="Checkbox" />
    );
  },
};

/** A checkbox paired with a clickable label. */
export const WithLabel: Story = {
  render: (args) => (
    <Label className="gap-2">
      <Checkbox defaultChecked {...args} />
      Accept terms and conditions
    </Label>
  ),
};

/** An unchecked checkbox. */
export const Unchecked: Story = {
  render: (args) => (
    <Label className="gap-2">
      <Checkbox {...args} />
      Unchecked
    </Label>
  ),
};

/** A checked checkbox. */
export const Checked: Story = {
  render: (args) => (
    <Label className="gap-2">
      <Checkbox defaultChecked {...args} />
      Checked
    </Label>
  ),
};

/** An indeterminate checkbox. */
export const Indeterminate: Story = {
  render: (args) => (
    <Label className="gap-2">
      <Checkbox indeterminate {...args} />
      Indeterminate
    </Label>
  ),
};

/** A disabled unchecked checkbox. */
export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <Label className="gap-2">
      <Checkbox {...args} />
      Disabled
    </Label>
  ),
};

/** A disabled checked checkbox. */
export const DisabledChecked: Story = {
  args: { disabled: true },
  render: (args) => (
    <Label className="gap-2">
      <Checkbox defaultChecked {...args} />
      Disabled checked
    </Label>
  ),
};

/** A required checkbox left unchecked: the field shows its error message. */
export const Invalid: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Label className="gap-2" data-invalid>
        <Checkbox {...args} checked={checked} onCheckedChange={setChecked} aria-invalid />I accept
        the terms
      </Label>
    );
  },
};
