import {
  componentWrapperDecorator,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { selectContract } from '@surfnet/curve-contracts';
import { HlmSelectImports } from '..';
import { HlmSelect } from './hlm-select';

const meta: Meta<HlmSelect> = {
  title: 'Components/Select',
  component: HlmSelect,
  decorators: [
    moduleMetadata({
      imports: [HlmSelectImports],
    }),
    componentWrapperDecorator(
      (story) => story,
      () => ({
        items: [
          { label: 'All', value: 'all' },
          { label: 'Identity', value: 'identity' },
          { label: 'Storage', value: 'storage' },
          { label: 'Marketplace', value: 'marketplace' },
        ],
        fruitItems: [
          { label: 'Apple', value: 'apple' },
          { label: 'Banana', value: 'banana' },
          { label: 'Orange', value: 'orange' },
        ],
        veggieItems: [
          { label: 'Carrot', value: 'carrot' },
          { label: 'Cucumber', value: 'cucumber' },
          { label: 'Tomato', value: 'tomato' },
        ],
        valueToLabel: (value: string) => value.toUpperCase(),
      }),
    ),
  ],
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
};

export default meta;
type Story = StoryObj<HlmSelect>;

/** A select with a placeholder until a value is chosen. */
export const Default: Story = {
  render: () => ({
    template: `
			<hlm-select>
				<hlm-select-trigger class="w-56" aria-label="Category">
					<hlm-select-value placeholder="Pick a category" />
				</hlm-select-trigger>
        <hlm-select-content *hlmSelectPortal>
          @for (item of items; track item.value) {
  					<hlm-select-item [value]="item">{{ item.label }}</hlm-select-item>
          }
				</hlm-select-content>
			</hlm-select>
		`,
  }),
};

/** A pre-selected value with grouped, labelled options. */
export const Grouped: Story = {
  render: () => ({
    template: `
			<hlm-select>
				<hlm-select-trigger class="w-56" aria-label="Category">
					<hlm-select-value placeholder="Pick a food" />
				</hlm-select-trigger>
        <hlm-select-content *hlmSelectPortal>
					<hlm-select-group>
						<hlm-select-label>Fruit</hlm-select-label>
						@for (fruit of fruitItems; track fruit.value) {
    					<hlm-select-item [value]="fruit">{{ fruit.label }}</hlm-select-item>
            }
					</hlm-select-group>
					<hlm-select-separator />
					<hlm-select-group>
						<hlm-select-label>Veggies</hlm-select-label>
						@for (veggie of veggieItems; track veggie.value) {
    					<hlm-select-item [value]="veggie">{{ veggie.label }}</hlm-select-item>
            }
					</hlm-select-group>
				</hlm-select-content>
			</hlm-select>
		`,
  }),
};

/** Disabled trigger. */
export const Disabled: Story = {
  render: () => ({
    template: `
			<hlm-select disabled>
				<hlm-select-trigger class="w-56" aria-label="Category">
					<hlm-select-value placeholder="Category: All" />
				</hlm-select-trigger>
        <hlm-select-content *hlmSelectPortal>
          @for (item of items; track item.value) {
  					<hlm-select-item [value]="item">{{ item.label }}</hlm-select-item>
          }
				</hlm-select-content>
			</hlm-select>
		`,
  }),
};

/** Every trigger size declared in the contract. */
export const Sizes: Story = {
  render: () => ({
    template: `
			<div class="flex items-center gap-3">
				${selectContract.props.sizes
          .map(
            (size) => `
              <!-- You can also use [itemToString] to convert values to labels if you don't have a dedicated label per item -->
							<hlm-select key="${size}" value="all" [itemToString]="valueToLabel">
								<hlm-select-trigger class="w-40" size="${size}" aria-label="Category">
									<hlm-select-value />
								</hlm-select-trigger>
								<hlm-select-content *hlmSelectPortal>
  								@for (item of items; track item.value) {
          					<hlm-select-item value="{{item.value}}">{{ valueToLabel(item.value) }}</hlm-select-item>
                  }
								</hlm-select-content>
							</hlm-select>
						`,
          )
          .join('')}
			</div>
		`,
  }),
};
