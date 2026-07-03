import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { labelContract } from '@surfnet/curve-contracts';
import { HlmLabel } from '..';
import { HlmField, HlmInput } from '../../../../../public-api';

const meta: Meta<HlmLabel> = {
  title: 'Components/Label',
  component: HlmLabel,
  decorators: [
    moduleMetadata({
      imports: [HlmField, HlmInput],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: labelContract.description,
      },
    },
  },
  args: {
    children: 'Email',
  },
};

export default meta;
type Story = StoryObj<HlmLabel>;

/** A standalone label. */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
			<div ${argsToTemplate(args)}>
				<label hlmLabel>
					{{children}}
    		</label>
			</div>
		`,
  }),
};

/** A label wired to an input through `htmlFor`. */
export const WithInput: Story = {
  render: () => ({
    template: `
			<div class="w-full max-w-md">
				<div hlmField class="w-72">
					<label hlmLabel for="email">Email</label>
					<input hlmInput id="email" placeholder="you@surf.nl"/>
				</div>
			</div>
		`,
  }),
};
