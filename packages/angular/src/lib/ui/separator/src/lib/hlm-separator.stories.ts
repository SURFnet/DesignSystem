import { type Meta, type StoryObj, argsToTemplate, moduleMetadata } from '@storybook/angular';
import { separatorContract } from '@surfnet/contracts';
import { HlmSeparator, HlmSeparatorImports } from '..';

const meta: Meta<HlmSeparator> = {
  title: 'Components/Separator',
  component: HlmSeparator,
  decorators: [
    moduleMetadata({
      imports: [HlmSeparatorImports],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: separatorContract.description,
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: separatorContract.orientations,
      description: separatorContract.orientations
        .map(
          (orientation) => `\`${orientation}\` — ${separatorContract.orientationDocs[orientation]}`,
        )
        .join('\n\n'),
      table: {
        defaultValue: { summary: separatorContract.defaultOrientation },
      },
    },
  },
  args: {
    orientation: separatorContract.defaultOrientation,
  },
};

export default meta;
type Story = StoryObj<HlmSeparator>;

/** Interactive playground — flip `orientation` in the controls to see both directions. */
export const Default: Story = {
  render: ({ ...args }) => ({
    props: args,
    template: `
			<div class="
				{{orientation === 'vertical'
					? 'flex h-5 items-center gap-3 text-sm'
					: 'flex w-72 flex-col gap-3 text-sm'
				}}"
			>
				<span>One</span>
 				<hlm-separator ${argsToTemplate(args)} />
				<span>Two</span>
			</div>
		`,
  }),
};

/** A horizontal divider between stacked blocks of text. */
export const Horizontal: Story = {
  render: () => ({
    template: `
			<div class="w-72">
				<p class="text-sm">SURF Design System</p>
				<hlm-separator orientation="horizontal" class="my-3" /> 
				<p class="text-sm text-muted-foreground">Components for React and Angular.</p>
			</div>
		`,
  }),
};

/** A vertical divider between inline items. */
export const Vertical: Story = {
  render: () => ({
    template: `
			<div class="flex h-5 items-center gap-3 text-sm">
				<span>Docs</span>
				<hlm-separator orientation="vertical" /> 
				<span>Source</span>
				<hlm-separator orientation="vertical" /> 
				<span>Storybook</span>
			</div>
		`,
  }),
};
