import type { Meta, StoryObj } from '@storybook/react-vite';
import { checkboxContract } from '@surfnet/contracts';

import { Label } from '@/components/ui/label';

import { Checkbox } from './checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component: checkboxContract.description,
      },
    },
  },
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    disabled: false,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The default checkbox — toggle it via the controls. */
export const Default: Story = {};

/** A checkbox paired with a clickable label. */
export const WithLabel: Story = {
  render: () => (
    <Label className="gap-2">
      <Checkbox defaultChecked />
      Accept terms and conditions
    </Label>
  ),
};

/** Every state side by side. */
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Label className="gap-2">
        <Checkbox />
        Unchecked
      </Label>
      <Label className="gap-2">
        <Checkbox defaultChecked />
        Checked
      </Label>
      <Label className="gap-2">
        <Checkbox indeterminate />
        Indeterminate
      </Label>
      <Label className="gap-2">
        <Checkbox disabled />
        Disabled
      </Label>
      <Label className="gap-2">
        <Checkbox defaultChecked disabled />
        Disabled checked
      </Label>
    </div>
  ),
};
