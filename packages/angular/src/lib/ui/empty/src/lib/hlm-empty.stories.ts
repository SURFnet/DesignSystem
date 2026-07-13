import { Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  phosphorFolder,
  phosphorMagnifyingGlass,
  phosphorPlus,
  phosphorTray,
} from '@ng-icons/phosphor-icons/regular';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { emptyContract } from '@surfnet/curve-contracts';

import { HlmButton } from '../../../button/src';
import { HlmEmpty, HlmEmptyImports } from '..';

const meta: Meta<HlmEmpty> = {
  title: 'Components/Empty',
  component: HlmEmpty,
  decorators: [
    moduleMetadata({
      imports: [HlmEmptyImports, HlmButton, NgIcon],
      providers: [
        provideIcons({ phosphorFolder, phosphorMagnifyingGlass, phosphorPlus, phosphorTray }),
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: emptyContract.docs.description,
      },
    },
  },
};

export default meta;

type Story = StoryObj<HlmEmpty>;

/** A "no documents" state with an icon-badged media, title, description, and a call to action. */
export const Default: Story = {
  render: () => ({
    template: `
      <div hlmEmpty class="w-full max-w-sm">
        <div hlmEmptyHeader>
          <div hlmEmptyMedia variant="icon" title="${emptyContract.docs.variants.icon}">
            <ng-icon name="phosphorFolder" />
          </div>
          <div hlmEmptyTitle>No documents yet</div>
          <div hlmEmptyDescription>Create your first document to get started.</div>
        </div>
        <div hlmEmptyContent>
          <button hlmBtn>
            <ng-icon name="phosphorPlus" data-icon="inline-start" />
            New document
          </button>
        </div>
      </div>
    `,
  }),
};

@Component({
  selector: 'empty-media-variants',
  imports: [HlmEmptyImports, NgIcon],
  template: `
    <div class="flex flex-wrap gap-8">
      @for (variant of emptyContract.props.variants; track variant) {
        <div hlmEmpty class="w-64">
          <div hlmEmptyHeader>
            <div hlmEmptyMedia [variant]="variant" [title]="emptyContract.docs.variants[variant]">
              <ng-icon name="phosphorFolder" [size]="variant === 'default' ? '2.5rem' : '1.5rem'" />
            </div>
            <div hlmEmptyTitle>{{ variant.charAt(0).toUpperCase() + variant.slice(1) }}</div>
            <div hlmEmptyDescription>{{ emptyContract.docs.variants[variant] }}</div>
          </div>
        </div>
      }
    </div>
  `,
})
class EmptyMediaVariants {
  @Input() emptyContract!: typeof emptyContract;
}

/**
 * The two `EmptyMedia` variants side by side — `icon` renders a rounded badge background,
 * `default` renders the media as-is (for a custom illustration), so it needs an explicit icon size.
 */
export const MediaVariants: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [EmptyMediaVariants],
    },
    props: { emptyContract },
    template: '<empty-media-variants [emptyContract]="emptyContract"></empty-media-variants>',
  }),
};

/** A "no results" search state — plain (`default`) media lets a larger illustrative icon sit un-badged. */
export const NoResults: Story = {
  render: () => ({
    template: `
      <div hlmEmpty class="w-full max-w-sm">
        <div hlmEmptyHeader>
          <div hlmEmptyMedia>
            <ng-icon name="phosphorMagnifyingGlass" size="2.5rem" />
          </div>
          <div hlmEmptyTitle>No results found</div>
          <div hlmEmptyDescription>Try adjusting your search or filters.</div>
        </div>
      </div>
    `,
  }),
};

/** An empty inbox with two competing actions in `hlmEmptyContent`. */
export const WithMultipleActions: Story = {
  render: () => ({
    template: `
      <div hlmEmpty class="w-full max-w-sm">
        <div hlmEmptyHeader>
          <div hlmEmptyMedia variant="icon">
            <ng-icon name="phosphorTray" />
          </div>
          <div hlmEmptyTitle>Inbox zero</div>
          <div hlmEmptyDescription>You're all caught up — nothing left to review.</div>
        </div>
        <div hlmEmptyContent>
          <div class="flex gap-2">
            <button hlmBtn variant="outline">Import messages</button>
            <button hlmBtn>Compose</button>
          </div>
        </div>
      </div>
    `,
  }),
};
