import type { Meta, StoryObj } from '@storybook/react-vite';
import { nativeSelectContract } from '@surfnet/curve-contracts';

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
  },
  args: {
    size: nativeSelectContract.defaults.sizes,
    disabled: false,
  },
} satisfies Meta<typeof NativeSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The default native select — rendered with the default args; tweak them via the controls. */
export const Default: Story = {
  render: (args) => (
    <NativeSelect {...args}>
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
      <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
    </NativeSelect>
  ),
};

/** Composed usage with grouped options, mirroring a real form field. */
export const WithOptionGroups: Story = {
  render: () => (
    <NativeSelect aria-label="Favorite fruit or vegetable" defaultValue="apple">
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
  ),
};

/** Both sizes side by side. */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {nativeSelectContract.props.sizes.map((size) => (
        <NativeSelect key={size} size={size} title={nativeSelectContract.docs.sizes[size]}>
          <NativeSelectOption value="apple">Apple</NativeSelectOption>
          <NativeSelectOption value="banana">Banana</NativeSelectOption>
          <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
        </NativeSelect>
      ))}
    </div>
  ),
};

/** Disabled state. */
export const Disabled: Story = {
  render: () => (
    <NativeSelect disabled defaultValue="apple">
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
    </NativeSelect>
  ),
};

/** Invalid state, driven by `aria-invalid`. */
export const Invalid: Story = {
  render: () => (
    <NativeSelect aria-invalid defaultValue="">
      <NativeSelectOption value="" disabled>
        Choose an option
      </NativeSelectOption>
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
    </NativeSelect>
  ),
};
