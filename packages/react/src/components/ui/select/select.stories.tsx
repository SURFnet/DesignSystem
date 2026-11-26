import type { Meta, StoryObj } from '@storybook/react-vite';
import { selectContract, type SelectTriggerSizeName } from '@surfnet/curve-contracts';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './select';

// `size` lives on SelectTrigger rather than the Select root, so widen the story args to
// expose it as a control next to the root's `disabled`.
type SelectStoryArgs = React.ComponentProps<typeof Select> & { size?: SelectTriggerSizeName };

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component: selectContract.docs.description,
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=118-1264',
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: [...selectContract.props.sizes],
      description: 'Size of the select trigger.',
      table: {
        type: {
          summary: selectContract.props.sizes.join(' | '),
        },
        defaultValue: { summary: selectContract.defaults.sizes },
      },
    },
    disabled: { control: 'boolean' },
  },
  args: {
    size: selectContract.defaults.sizes,
    disabled: false,
  },
} satisfies Meta<SelectStoryArgs>;

export default meta;

type Story = StoryObj<SelectStoryArgs>;

const items = [
  { label: 'All', value: 'all' },
  { label: 'Identity', value: 'identity' },
  { label: 'Storage', value: 'storage' },
  { label: 'Marketplace', value: 'marketplace' },
];
const fruitItems = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
];
const veggieItems = [
  { label: 'Carrot', value: 'carrot' },
  { label: 'Cucumber', value: 'cucumber' },
  { label: 'Tomato', value: 'tomato' },
];
const allFoodItems = [...fruitItems, ...veggieItems];

/** A select with a placeholder until a value is chosen. */
export const Default: Story = {
  render: ({ size, ...args }) => (
    <Select {...args} items={items}>
      <SelectTrigger size={size} className="w-56" aria-label="Category">
        <SelectValue placeholder="Category: All" />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem value={item.value}>{item.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
};

/** Small size — compact forms and toolbars. */
export const SizeSm: Story = {
  args: { size: 'sm' },
  render: ({ size, ...args }) => (
    <div className="flex items-center gap-3">
      <Select {...args} items={items} defaultValue={items[0]}>
        <SelectTrigger size={size} className="w-40" title={selectContract.docs.sizes.sm}>
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ),
};

/** A pre-selected value with grouped, labelled options. */
export const Grouped: Story = {
  render: ({ size, ...args }) => (
    <Select {...args} items={allFoodItems} defaultValue={allFoodItems[0]}>
      <SelectTrigger size={size} className="w-56" aria-label="Category">
        <SelectValue placeholder="Pick a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          {fruitItems.map((fruit) => (
            <SelectItem key={fruit.value} value={fruit.value}>
              {fruit.label}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Veggies</SelectLabel>
          {veggieItems.map((veggie) => (
            <SelectItem key={veggie.value} value={veggie.value}>
              {veggie.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

/** Disabled trigger. */
export const Disabled: Story = {
  args: { disabled: true },
  render: ({ size, ...args }) => (
    <Select {...args} items={items}>
      <SelectTrigger size={size} className="w-56" aria-label="Category">
        <SelectValue placeholder="Category: All" />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
};

/** Invalid state, driven by `aria-invalid` on the trigger. */
export const Invalid: Story = {
  render: ({ size, ...args }) => (
    <Select {...args} items={items} defaultValue="">
      <SelectTrigger size={size} className="w-56" aria-label="Category" aria-invalid>
        <SelectValue placeholder="Pick a category" />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
};
