import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  phosphorFolder,
  phosphorMagnifyingGlass,
  phosphorPlus,
  phosphorTray,
} from '@ng-icons/phosphor-icons/regular';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { emptyContract, type EmptyMediaVariantName } from '@surfnet/curve-contracts';

import { HlmButton } from '../../../button/src';
import { HlmEmpty, HlmEmptyImports } from '..';

/** `variant` is a story arg for the `hlmEmptyMedia` inside the empty state. */
type EmptyArgs = HlmEmpty & { variant: EmptyMediaVariantName };

const meta: Meta<EmptyArgs> = {
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
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=18672-1039',
    },
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: [...emptyContract.props.variants],
      description: emptyContract.props.variants
        .map((variant) => `\`${variant}\` — ${emptyContract.docs.variants[variant]}`)
        .join('\n\n'),
      table: {
        type: {
          summary: emptyContract.props.variants.join(' | '),
        },
        defaultValue: { summary: emptyContract.defaults.variants },
      },
    },
  },
  args: {
    variant: emptyContract.defaults.variants,
  },
};

export default meta;

type Story = StoryObj<EmptyArgs>;

/** A "no documents" state with an icon-badged media, title, description, and a call to action. */
export const Default: Story = {
  args: { variant: 'icon' },
  render: (args) => ({
    props: args,
    template: `
      <div hlmEmpty class="w-full max-w-sm">
        <div hlmEmptyHeader>
          <div hlmEmptyMedia [variant]="variant" title="${emptyContract.docs.variants.icon}">
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

/** Default media variant — renders the media as-is for a custom illustration. */
export const MediaDefault: Story = {
  args: { variant: 'default' },
  render: (args) => ({
    props: args,
    template: `
      <div hlmEmpty class="w-64">
        <div hlmEmptyHeader>
          <div hlmEmptyMedia [variant]="variant" title="${emptyContract.docs.variants.default}">
            <ng-icon name="phosphorFolder" class="size-10" />
          </div>
          <div hlmEmptyTitle>Default</div>
        </div>
      </div>
    `,
  }),
};

/** Icon media variant — adds a rounded badge background. */
export const MediaIcon: Story = {
  args: { variant: 'icon' },
  render: (args) => ({
    props: args,
    template: `
      <div hlmEmpty class="w-64">
        <div hlmEmptyHeader>
          <div hlmEmptyMedia [variant]="variant" title="${emptyContract.docs.variants.icon}">
            <ng-icon name="phosphorFolder" />
          </div>
          <div hlmEmptyTitle>Icon</div>
        </div>
      </div>
    `,
  }),
};

/** A "no results" search state — plain media lets a larger illustrative icon sit un-badged. */
export const NoResults: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div hlmEmpty class="w-full max-w-sm">
        <div hlmEmptyHeader>
          <div hlmEmptyMedia [variant]="variant">
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
  args: { variant: 'icon' },
  render: (args) => ({
    props: args,
    template: `
      <div hlmEmpty class="w-full max-w-sm">
        <div hlmEmptyHeader>
          <div hlmEmptyMedia [variant]="variant">
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
