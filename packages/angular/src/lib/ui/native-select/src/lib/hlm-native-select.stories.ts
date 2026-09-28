import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { nativeSelectContract } from '@surfnet/curve-contracts';

import { HlmNativeSelect, HlmNativeSelectImports } from '..';
import { HlmLabel } from '../../../label/src';

const meta: Meta<HlmNativeSelect> = {
  title: 'Components/NativeSelect',
  component: HlmNativeSelect,
  decorators: [
    moduleMetadata({
      imports: [HlmNativeSelectImports, HlmLabel],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: nativeSelectContract.docs.description,
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=21886-14793',
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
      <label hlmLabel for="default-select" class="sr-only">Select label</label>
      <hlm-native-select ${argsToTemplate(args)} selectId="default-select">
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
      <label hlmLabel for="with-option-groups-select" class="sr-only">With Option Groups select</label>
      <hlm-native-select aria-label="Favorite fruit or vegetable" selectId="with-option-groups-select">
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
        <label hlmLabel for="default-sized-select" class="sr-only">Default sized select</label>
        <hlm-native-select size="default" title="${nativeSelectContract.docs.sizes.default}" selectId="default-sized-select">
          <option hlmNativeSelectOption value="apple">Apple</option>
          <option hlmNativeSelectOption value="banana">Banana</option>
          <option hlmNativeSelectOption value="cherry">Cherry</option>
        </hlm-native-select>
        <label hlmLabel for="sm-select" class="sr-only">Small select</label>
        <hlm-native-select size="sm" title="${nativeSelectContract.docs.sizes.sm}" selectId="sm-select">
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
      <label hlmLabel for="disabled-select" class="sr-only">Disabled select</label>
      <hlm-native-select selectId="disabled-select" disabled value="apple">
        <option hlmNativeSelectOption value="apple" selected>Apple</option>
        <option hlmNativeSelectOption value="banana">Banana</option>
      </hlm-native-select>
    `,
  }),
};

/** Invalid state, forced via `forceInvalid`. */
export const Invalid: Story = {
  render: () => ({
    template: `
    <label hlmLabel for="invalid-select" class="sr-only">Invalid select</label>
      <hlm-native-select selectId="invalid-select" forceInvalid value="">
        <option hlmNativeSelectOption value="" disabled>Choose an option</option>
        <option hlmNativeSelectOption value="apple">Apple</option>
        <option hlmNativeSelectOption value="banana">Banana</option>
      </hlm-native-select>
    `,
  }),
};
