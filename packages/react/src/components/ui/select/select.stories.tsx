import type { Meta, StoryObj } from '@storybook/react-vite';
import { selectContract } from '@surfnet/curve-contracts';

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
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

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
  render: () => (
    <Select items={items}>
      <SelectTrigger className="w-56" aria-label="Category">
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

/** A pre-selected value with grouped, labelled options. */
export const Grouped: Story = {
  render: () => (
    <Select items={allFoodItems} defaultValue={allFoodItems[0]}>
      <SelectTrigger className="w-56" aria-label="Category">
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
  render: () => (
    <Select disabled items={items}>
      <SelectTrigger className="w-56" aria-label="Category">
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

/** Every trigger size declared in the contract. */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {selectContract.props.sizes.map((size) => (
        <Select key={size} items={items} defaultValue={items[0]}>
          <SelectTrigger size={size} className="w-40" title={selectContract.docs.sizes[size]}>
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
      ))}
    </div>
  ),
};
