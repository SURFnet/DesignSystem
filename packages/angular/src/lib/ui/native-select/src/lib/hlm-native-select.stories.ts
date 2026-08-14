import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { nativeSelectContract } from '@surfnet/curve-contracts';

import { HlmNativeSelect, HlmNativeSelectImports } from '..';

const meta: Meta<HlmNativeSelect> = {
  title: 'Components/NativeSelect',
  component: HlmNativeSelect,
  decorators: [
    moduleMetadata({
      imports: [HlmNativeSelectImports],
    }),
  ],
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
      options: [...nativeSelectContract.props.sizes],
      description: 'Size of the native select.',
      table: {
        type: {
          summary: nativeSelectContract.props.sizes.join(' | '),
        },
        defaultValue: { summary: nativeSelectContract.defaults.sizes },
      },
    },
    disabled: { control: 'boolean' },
  },
  args: {
    size: nativeSelectContract.defaults.sizes,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<HlmNativeSelect>;

/** The default native select — rendered with the default args; tweak them via the controls. */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <hlm-native-select ${argsToTemplate(args)}>
        <option hlmNativeSelectOption value="apple">Apple</option>
        <option hlmNativeSelectOption value="banana">Banana</option>
        <option hlmNativeSelectOption value="cherry">Cherry</option>
      </hlm-native-select>
    `,
  }),
};

/** Composed usage with grouped options, mirroring a real form field. */
export const WithOptionGroups: Story = {
  render: () => ({
    template: `
      <hlm-native-select aria-label="Favorite fruit or vegetable" value="apple">
        <optgroup hlmNativeSelectOptGroup label="Fruit">
          <option hlmNativeSelectOption value="apple">Apple</option>
          <option hlmNativeSelectOption value="banana">Banana</option>
          <option hlmNativeSelectOption value="cherry">Cherry</option>
        </optgroup>
        <optgroup hlmNativeSelectOptGroup label="Vegetable">
          <option hlmNativeSelectOption value="carrot">Carrot</option>
          <option hlmNativeSelectOption value="potato">Potato</option>
        </optgroup>
      </hlm-native-select>
    `,
  }),
};

/** Both sizes side by side. */
export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <hlm-native-select size="default" title="${nativeSelectContract.docs.sizes.default}">
          <option hlmNativeSelectOption value="apple">Apple</option>
          <option hlmNativeSelectOption value="banana">Banana</option>
          <option hlmNativeSelectOption value="cherry">Cherry</option>
        </hlm-native-select>
        <hlm-native-select size="sm" title="${nativeSelectContract.docs.sizes.sm}">
          <option hlmNativeSelectOption value="apple">Apple</option>
          <option hlmNativeSelectOption value="banana">Banana</option>
          <option hlmNativeSelectOption value="cherry">Cherry</option>
        </hlm-native-select>
      </div>
    `,
  }),
};

/** Disabled state. */
export const Disabled: Story = {
  render: () => ({
    template: `
      <hlm-native-select disabled value="apple">
        <option hlmNativeSelectOption value="apple">Apple</option>
        <option hlmNativeSelectOption value="banana">Banana</option>
      </hlm-native-select>
    `,
  }),
};

/** Invalid state, forced via `forceInvalid`. */
export const Invalid: Story = {
  render: () => ({
    template: `
      <hlm-native-select forceInvalid value="">
        <option hlmNativeSelectOption value="" disabled>Choose an option</option>
        <option hlmNativeSelectOption value="apple">Apple</option>
        <option hlmNativeSelectOption value="banana">Banana</option>
      </hlm-native-select>
    `,
  }),
};
