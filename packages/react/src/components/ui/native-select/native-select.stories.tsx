import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';
import { nativeSelectContract } from '@surfnet/curve-contracts';

import { Label } from '@/components/ui/label';

import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from './native-select';

const meta = {
  title: 'Components/NativeSelect',
  component: NativeSelect,
  parameters: {
    docs: {
      description: {
        component: nativeSelectContract.docs.description,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: nativeSelectContract.props.sizes,
      description: 'Size of the native select.',
      table: {
        defaultValue: { summary: nativeSelectContract.defaults.sizes },
      },
    },
    disabled: { control: 'boolean' },
    'aria-label': { control: 'text' },
  },
  args: {
    size: nativeSelectContract.defaults.sizes,
    disabled: false,
    'aria-label': 'Select an option',
  },
} satisfies Meta<typeof NativeSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The default native select — rendered with the default args; tweak them via the controls. */
export const Default: Story = {
  render: (args) => (
    <>
      <Label htmlFor="default-select" className="sr-only">
        Select label
      </Label>
      <NativeSelect {...args} id="default-select">
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
        <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
      </NativeSelect>
    </>
  ),
};

/** Composed usage with grouped options, mirroring a real form field. */
export const WithOptionGroups: Story = {
  render: () => (
    <>
      <Label htmlFor="with-option-groups-select" className="sr-only">
        With Option Groups select
      </Label>
      <NativeSelect
        aria-label="Favorite fruit or vegetable"
        id="with-option-groups-select"
        defaultValue="apple"
      >
        <NativeSelectOptGroup label="Fruit">
          <NativeSelectOption value="apple">Apple</NativeSelectOption>
          <NativeSelectOption value="banana">Banana</NativeSelectOption>
          <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
        </NativeSelectOptGroup>
        <NativeSelectOptGroup label="Vegetable">
          <NativeSelectOption value="carrot">Carrot</NativeSelectOption>
          <NativeSelectOption value="potato">Potato</NativeSelectOption>
        </NativeSelectOptGroup>
      </NativeSelect>
    </>
  ),
};

/** Both sizes side by side. */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {nativeSelectContract.props.sizes.map((size) => (
        <React.Fragment key={size}>
          <Label htmlFor={`${nativeSelectContract.docs.sizes[size]}-select`} className="sr-only">
            {nativeSelectContract.docs.sizes[size]} select
          </Label>
          <NativeSelect
            size={size}
            title={nativeSelectContract.docs.sizes[size]}
            id={`${nativeSelectContract.docs.sizes[size]}-select`}
          >
            <NativeSelectOption value="apple">Apple</NativeSelectOption>
            <NativeSelectOption value="banana">Banana</NativeSelectOption>
            <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
          </NativeSelect>
        </React.Fragment>
      ))}
    </div>
  ),
};

/** Disabled state. */
export const Disabled: Story = {
  render: () => (
    <>
      <Label htmlFor="disabled-select" className="sr-only">
        Disabled select
      </Label>
      <NativeSelect id="disabled-select" disabled defaultValue="apple">
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
      </NativeSelect>
    </>
  ),
};

/** Invalid state, driven by `aria-invalid`. */
export const Invalid: Story = {
  render: () => (
    <>
      <Label htmlFor="invalid-select" className="sr-only">
        Invalid select
      </Label>
      <NativeSelect id="invalid-select" aria-invalid defaultValue="">
        <NativeSelectOption value="" disabled>
          Choose an option
        </NativeSelectOption>
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
      </NativeSelect>
    </>
  ),
};
