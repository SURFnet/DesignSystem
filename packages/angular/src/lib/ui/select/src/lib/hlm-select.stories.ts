import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { selectContract } from '@surfnet/contracts';
import { HlmSelect } from './hlm-select';
import { HlmSelectImports } from '..';

const meta: Meta<HlmSelect> = {
  title: 'Components/Select',
  component: HlmSelect,
  decorators: [
    moduleMetadata({
      imports: [HlmSelectImports],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: selectContract.description,
      },
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
				<hlm-select-trigger class="w-56">
					<hlm-select-value placeholder="Category: All" />
				</hlm-select-trigger>
        <hlm-select-content *hlmSelectPortal>
					<hlm-select-item value="all">All</hlm-select-item>
					<hlm-select-item value="identity">Identity</hlm-select-item>
					<hlm-select-item value="storage">Storage</hlm-select-item>
					<hlm-select-item value="marketplace">Marketplace</hlm-select-item>
				</hlm-select-content>
			</hlm-select>
		`,
  }),
};

/** A pre-selected value with grouped, labelled options. */
export const Grouped: Story = {
  render: () => ({
    template: `
			<hlm-select value="identity">
				<hlm-select-trigger class="w-56">
					<hlm-select-value placeholder="Pick a category" />
				</hlm-select-trigger>
        <hlm-select-content *hlmSelectPortal>
					<hlm-select-group>
						<hlm-select-label>Categories</hlm-select-label>
						<hlm-select-item value="identity">Identity</hlm-select-item>
						<hlm-select-item value="storage">Storage</hlm-select-item>
						<hlm-select-item value="marketplace">Marketplace</hlm-select-item>
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
				<hlm-select-trigger class="w-56">
					<hlm-select-value placeholder="Category: All" />
				</hlm-select-trigger>
        <hlm-select-content *hlmSelectPortal>
					<hlm-select-item value="all">All</hlm-select-item>
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
				${selectContract.sizes
          .map(
            (size) => `
							<hlm-select key="${size}" value="all">
								<hlm-select-trigger class="w-40" size="${size}">
									<hlm-select-value />
								</hlm-select-trigger>
								<hlm-select-content *hlmSelectPortal>
									<hlm-select-item value="all" selected>All</hlm-select-item>
									<hlm-select-item value="identity">Identity</hlm-select-item>
								</hlm-select-content>
							</hlm-select>
						`,
          )
          .join('')}
			</div>
		`,
  }),
};
