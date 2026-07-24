import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { resizableContract, type ResizableDirectionName } from '@surfnet/curve-contracts';

import { HlmResizableGroup, HlmResizableImports } from '..';

// `direction` is contributed by the BrnResizableGroup host directive rather than
// HlmResizableGroup itself, so widen the story args to expose it as a control.
type ResizableGroupArgs = HlmResizableGroup & {
  direction: ResizableDirectionName;
};

const meta: Meta<ResizableGroupArgs> = {
  title: 'Components/Resizable',
  component: HlmResizableGroup,
  decorators: [
    moduleMetadata({
      imports: [HlmResizableImports],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: resizableContract.docs.description,
      },
    },
  },
  argTypes: {
    direction: {
      control: 'inline-radio',
      options: resizableContract.props.directions,
      description: resizableContract.props.directions
        .map((direction) => `\`${direction}\` — ${resizableContract.docs.directions[direction]}`)
        .join('\n\n'),
      table: {
        defaultValue: { summary: resizableContract.defaults.directions },
      },
    },
  },
  args: {
    direction: resizableContract.defaults.directions,
  },
};

export default meta;
type Story = StoryObj<ResizableGroupArgs>;

/** Two panels split side by side; tweak `direction` via the controls. */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
			<div hlmResizableGroup ${argsToTemplate(args)} class="h-64 w-full max-w-md rounded-lg border">
				<div hlmResizablePanel [defaultSize]="50">
					<div class="flex h-full items-center justify-center p-6">
						<span class="font-mono text-sm">One</span>
					</div>
				</div>
				<hlm-resizable-handle withHandle />
				<div hlmResizablePanel [defaultSize]="50">
					<div class="flex h-full items-center justify-center p-6">
						<span class="font-mono text-sm">Two</span>
					</div>
				</div>
			</div>
		`,
  }),
};

/** Panels stacked top to bottom instead of side by side. */
export const Vertical: Story = {
  render: () => ({
    template: `
			<div hlmResizableGroup direction="vertical" class="h-64 w-full max-w-md rounded-lg border">
				<div hlmResizablePanel [defaultSize]="50">
					<div class="flex h-full items-center justify-center p-6">
						<span class="font-mono text-sm">Top</span>
					</div>
				</div>
				<hlm-resizable-handle withHandle />
				<div hlmResizablePanel [defaultSize]="50">
					<div class="flex h-full items-center justify-center p-6">
						<span class="font-mono text-sm">Bottom</span>
					</div>
				</div>
			</div>
		`,
  }),
};

/**
 * A realistic composed layout: a sidebar and inspector flank a main content area, which
 * itself nests a vertical group to split content from a console.
 */
export const ComposedLayout: Story = {
  render: () => ({
    template: `
			<div hlmResizableGroup class="h-80 w-full max-w-3xl rounded-lg border">
				<div hlmResizablePanel [defaultSize]="20" [minSize]="15">
					<div class="flex h-full flex-col gap-1 p-4">
						<span class="text-sm font-medium">Sidebar</span>
						<span class="text-xs text-muted-foreground">Navigation</span>
					</div>
				</div>
				<hlm-resizable-handle withHandle />
				<div hlmResizablePanel [defaultSize]="55">
					<div hlmResizableGroup direction="vertical">
						<div hlmResizablePanel [defaultSize]="70">
							<div class="flex h-full items-center justify-center p-4">
								<span class="text-sm font-medium">Content</span>
							</div>
						</div>
						<hlm-resizable-handle withHandle />
						<div hlmResizablePanel [defaultSize]="30">
							<div class="flex h-full items-center justify-center p-4">
								<span class="text-xs text-muted-foreground">Console</span>
							</div>
						</div>
					</div>
				</div>
				<hlm-resizable-handle withHandle />
				<div hlmResizablePanel [defaultSize]="25" [minSize]="15">
					<div class="flex h-full flex-col gap-1 p-4">
						<span class="text-sm font-medium">Inspector</span>
						<span class="text-xs text-muted-foreground">Properties</span>
					</div>
				</div>
			</div>
		`,
  }),
};

/** Handles without the visible grip, for a more minimal seam between panels. */
export const WithoutHandleGrip: Story = {
  render: () => ({
    template: `
			<div hlmResizableGroup class="h-64 w-full max-w-md rounded-lg border">
				<div hlmResizablePanel [defaultSize]="50">
					<div class="flex h-full items-center justify-center p-6">
						<span class="font-mono text-sm">One</span>
					</div>
				</div>
				<hlm-resizable-handle />
				<div hlmResizablePanel [defaultSize]="50">
					<div class="flex h-full items-center justify-center p-6">
						<span class="font-mono text-sm">Two</span>
					</div>
				</div>
			</div>
		`,
  }),
};
