import type { Meta, StoryObj } from '@storybook/react-vite';
import { resizableContract } from '@surfnet/curve-contracts';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './resizable';

const meta = {
  title: 'Components/Resizable',
  component: ResizablePanelGroup,
  parameters: {
    docs: {
      description: {
        component: resizableContract.docs.description,
      },
    },
  },
  argTypes: {
    orientation: {
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
    orientation: resizableContract.defaults.directions,
  },
} satisfies Meta<typeof ResizablePanelGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Two panels split side by side; tweak `orientation` via the controls. */
export const Default: Story = {
  render: (args) => (
    <div className="h-64 w-full max-w-md">
      <ResizablePanelGroup {...args} className="h-full w-full rounded-lg border">
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-mono text-sm">One</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-mono text-sm">Two</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

/** Panels stacked top to bottom instead of side by side. */
export const Vertical: Story = {
  render: () => (
    <div className="h-64 w-full max-w-md">
      <ResizablePanelGroup orientation="vertical" className="h-full w-full rounded-lg border">
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-mono text-sm">Top</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-mono text-sm">Bottom</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

/**
 * A realistic composed layout: a sidebar and inspector flank a main content area, which
 * itself nests a vertical group to split content from a console.
 */
export const ComposedLayout: Story = {
  render: () => (
    <div className="h-80 w-full max-w-3xl">
      <ResizablePanelGroup className="h-full w-full rounded-lg border">
        <ResizablePanel defaultSize={20} minSize={15}>
          <div className="flex h-full flex-col gap-1 p-4">
            <span className="text-sm font-medium">Sidebar</span>
            <span className="text-xs text-muted-foreground">Navigation</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={55}>
          <ResizablePanelGroup orientation="vertical">
            <ResizablePanel defaultSize={70}>
              <div className="flex h-full items-center justify-center p-4">
                <span className="text-sm font-medium">Content</span>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={30}>
              <div className="flex h-full items-center justify-center p-4">
                <span className="text-xs text-muted-foreground">Console</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25} minSize={15}>
          <div className="flex h-full flex-col gap-1 p-4">
            <span className="text-sm font-medium">Inspector</span>
            <span className="text-xs text-muted-foreground">Properties</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

/** Handles without the visible grip, for a more minimal seam between panels. */
export const WithoutHandleGrip: Story = {
  render: () => (
    <div className="h-64 w-full max-w-md">
      <ResizablePanelGroup className="h-full w-full rounded-lg border">
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-mono text-sm">One</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-mono text-sm">Two</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};
