import { FolderIcon, MagnifyingGlassIcon, PlusIcon, TrayIcon } from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { emptyContract } from '@surfnet/curve-contracts';

import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from './empty';

const meta = {
  title: 'Components/Empty',
  component: Empty,
  parameters: {
    docs: {
      description: {
        component: emptyContract.docs.description,
      },
    },
  },
} satisfies Meta<typeof Empty>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A "no documents" state with an icon-badged media, title, description, and a call to action. */
export const Default: Story = {
  render: () => (
    <Empty className="w-full max-w-sm">
      <EmptyHeader>
        <EmptyMedia variant="icon" title={emptyContract.docs.variants.icon}>
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

/**
 * The two `EmptyMedia` variants side by side — `icon` renders a rounded badge background,
 * `default` renders the media as-is (for a custom illustration), so it needs an explicit icon size.
 */
export const MediaVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8">
      {emptyContract.props.variants.map((variant) => (
        <Empty key={variant} className="w-64">
          <EmptyHeader>
            <EmptyMedia variant={variant} title={emptyContract.docs.variants[variant]}>
              <FolderIcon className={variant === 'default' ? 'size-10' : undefined} />
            </EmptyMedia>
            <EmptyTitle>{variant.charAt(0).toUpperCase() + variant.slice(1)}</EmptyTitle>
            <EmptyDescription>{emptyContract.docs.variants[variant]}</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ))}
    </div>
  ),
};

/** A "no results" search state — plain (`default`) media lets a larger illustrative icon sit un-badged. */
export const NoResults: Story = {
  render: () => (
    <Empty className="w-full max-w-sm">
      <EmptyHeader>
        <EmptyMedia>
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
  render: () => (
    <Empty className="w-full max-w-sm">
      <EmptyHeader>
        <EmptyMedia variant="icon">
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
