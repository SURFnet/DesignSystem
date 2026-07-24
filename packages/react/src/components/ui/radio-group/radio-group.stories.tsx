import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { radioGroupContract } from '@surfnet/curve-contracts';

import { FieldDescription, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field';
import { Label } from '@/components/ui/label';

import { RadioGroup, RadioGroupItem } from './radio-group';

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    docs: {
      description: {
        component: radioGroupContract.docs.description,
      },
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
  },
  args: {
    disabled: false,
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A controlled radio group driven by React state — the typical usage pattern. */
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('comfortable');
    return (
      <RadioGroup {...args} value={value} onValueChange={setValue}>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="default" id="r1" />
          <Label htmlFor="r1">Default</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="comfortable" id="r2" />
          <Label htmlFor="r2">Comfortable</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="compact" id="r3" />
          <Label htmlFor="r3">Compact</Label>
        </div>
      </RadioGroup>
    );
  },
};

/**
 * A realistic composed example: a `FieldSet` with a legend and description groups the
 * radio group, and each option's `Label` doubles as the click target for its item.
 */
export const InFieldset: Story = {
  render: () => (
    <FieldSet className="w-80">
      <FieldLegend>Notification preference</FieldLegend>
      <FieldDescription>Choose how you&apos;d like to receive updates.</FieldDescription>
      <RadioGroup defaultValue="email">
        <div className="flex items-center gap-3">
          <RadioGroupItem value="email" id="notif-email" />
          <FieldLabel htmlFor="notif-email">Email</FieldLabel>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="push" id="notif-push" />
          <FieldLabel htmlFor="notif-push">Push notification</FieldLabel>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="none" id="notif-none" />
          <FieldLabel htmlFor="notif-none">None</FieldLabel>
        </div>
      </RadioGroup>
    </FieldSet>
  ),
};

/** Disabling a single item versus disabling the whole group. */
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <RadioGroup defaultValue="comfortable" className="w-fit">
        <div className="flex items-center gap-3">
          <RadioGroupItem value="default" id="d1" disabled />
          <Label htmlFor="d1">Default (item disabled)</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="comfortable" id="d2" />
          <Label htmlFor="d2">Comfortable</Label>
        </div>
      </RadioGroup>
      <RadioGroup defaultValue="comfortable" disabled className="w-fit">
        <div className="flex items-center gap-3">
          <RadioGroupItem value="default" id="d3" />
          <Label htmlFor="d3">Default</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="comfortable" id="d4" />
          <Label htmlFor="d4">Comfortable (group disabled)</Label>
        </div>
      </RadioGroup>
    </div>
  ),
};

/** Invalid state, driven by `aria-invalid` on the selected item. */
export const Invalid: Story = {
  render: () => (
    <RadioGroup defaultValue="one" className="w-fit">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="one" id="i1" aria-invalid />
        <Label htmlFor="i1">Option one</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="two" id="i2" aria-invalid />
        <Label htmlFor="i2">Option two</Label>
      </div>
    </RadioGroup>
  ),
};
