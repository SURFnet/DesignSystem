import { FolderIcon, MagnifyingGlassIcon, PlusIcon, TrayIcon } from '@phosphor-icons/react';
import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { emptyContract, type EmptyMediaVariantName } from '@surfnet/curve-contracts';

import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from './empty';

/** `variant` is a story arg for the `EmptyMedia` inside the empty state. */
type EmptyArgs = ComponentProps<typeof Empty> & { variant?: EmptyMediaVariantName };

const meta = {
  title: 'Components/Empty',
  component: Empty,
  parameters: {
    docs: {
      description: {
        component: emptyContract.docs.description,
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=18672-1039',
    },
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: emptyContract.props.variants,
      description: emptyContract.props.variants
        .map((variant) => `\`${variant}\` — ${emptyContract.docs.variants[variant]}`)
        .join('\n\n'),
      table: {
        defaultValue: { summary: emptyContract.defaults.variants },
      },
    },
  },
  args: {
    variant: emptyContract.defaults.variants,
  },
} satisfies Meta<EmptyArgs>;

export default meta;

type Story = StoryObj<EmptyArgs>;

/** A "no documents" state with an icon-badged media, title, description, and a call to action. */
export const Default: Story = {
  args: { variant: 'icon' },
  render: ({ variant }) => (
    <Empty className="w-full max-w-sm">
      <EmptyHeader>
        <EmptyMedia variant={variant} title={emptyContract.docs.variants.icon}>
          <FolderIcon />
        </EmptyMedia>
        <EmptyTitle>No documents yet</EmptyTitle>
        <EmptyDescription>Create your first document to get started.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>
          <PlusIcon data-icon="inline-start" />
          New document
        </Button>
      </EmptyContent>
    </Empty>
  ),
};

/** Default media variant — renders the media as-is for a custom illustration. */
export const MediaDefault: Story = {
  args: { variant: 'default' },
  render: ({ variant }) => (
    <Empty className="w-64">
      <EmptyHeader>
        <EmptyMedia variant={variant} title={emptyContract.docs.variants.default}>
          <FolderIcon className="size-10" />
        </EmptyMedia>
        <EmptyTitle>Default</EmptyTitle>
      </EmptyHeader>
    </Empty>
  ),
};

/** Icon media variant — adds a rounded badge background. */
export const MediaIcon: Story = {
  args: { variant: 'icon' },
  render: ({ variant }) => (
    <Empty className="w-64">
      <EmptyHeader>
        <EmptyMedia variant={variant} title={emptyContract.docs.variants.icon}>
          <FolderIcon />
        </EmptyMedia>
        <EmptyTitle>Icon</EmptyTitle>
      </EmptyHeader>
    </Empty>
  ),
};

/** A "no results" search state — plain media lets a larger illustrative icon sit un-badged. */
export const NoResults: Story = {
  render: ({ variant }) => (
    <Empty className="w-full max-w-sm">
      <EmptyHeader>
        <EmptyMedia variant={variant}>
          <MagnifyingGlassIcon className="size-10" />
        </EmptyMedia>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>Try adjusting your search or filters.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
};

/** An empty inbox with two competing actions in `EmptyContent`. */
export const WithMultipleActions: Story = {
  args: { variant: 'icon' },
  render: ({ variant }) => (
    <Empty className="w-full max-w-sm">
      <EmptyHeader>
        <EmptyMedia variant={variant}>
          <TrayIcon />
        </EmptyMedia>
        <EmptyTitle>Inbox zero</EmptyTitle>
        <EmptyDescription>You&apos;re all caught up — nothing left to review.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button variant="outline">Import messages</Button>
          <Button>Compose</Button>
        </div>
      </EmptyContent>
    </Empty>
  ),
};
