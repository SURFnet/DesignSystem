import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { HlmCard, HlmCardImports } from '..';
import { HlmButton } from '../../../button/src/lib/hlm-button';
import { cardContract } from '@surfnet/contracts';

const meta: Meta<HlmCard> = {
  title: 'Components/Card',
  component: HlmCard,
  decorators: [
    moduleMetadata({
      imports: [HlmButton, HlmCardImports],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: cardContract.description,
      },
    },
  },

  argTypes: {
    size: {
      control: 'radio',
      options: ['default', 'sm'],
      description: 'Spacing density of the card.',
      table: { defaultValue: { summary: 'default' } },
    },
  },
  args: {
    size: 'default',
  },
};

export default meta;
type Story = StoryObj<HlmCard>;

/** Default card with header, content, and footer. */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <hlm-card class="w-80" ${argsToTemplate(args)}>
        <div hlmCardHeader>
          <h3 hlmCardTitle>Card title</h3>
          <p hlmCardDescription>A short description of what this card is about.</p>
        </div>
        <p hlmCardContent class="text-muted-foreground">Card body content goes here.</p>
        <p hlmCardFooter class="justify-end gap-2">
          <button hlmBtn variant="outline">Cancel</button>
          <button hlmBtn>Confirm</button>
        </p>
      </hlm-card>
    `,
  }),
};

/** Compact (`sm`) card with tighter spacing. */
export const Small: Story = {
  render: () => ({
    template: `
      <section hlmCard size="sm" class="w-80">
        <div hlmCardHeader>
          <h3 hlmCardTitle>Small card</h3>
          <p hlmCardDescription>Compact spacing variant.</p>
        </div>
        <p hlmCardContent class="text-muted-foreground">Less padding all round.</p>
      </section>
    `,
  }),
};

/** Card with an action slot in the header (e.g. a menu trigger). */
export const WithHeaderAction: Story = {
  render: () => ({
    template: `
      <section hlmCard class='w-80'>
        <div hlmCardHeader>
          <h3 hlmCardTitle>With action</h3>
          <p hlmCardDescription>
            An action button lives in the header.
          </p>
          <div hlmCardAction>
            <button hlmBtn variant="ghost" size="sm">Edit</button>
          </div>
        </div>
        <p hlmCardContent class="text-muted-foreground">Content area.</p>
      </section>
    `,
  }),
};

/** Card with only a content area — no header or footer. */
export const ContentOnly: Story = {
  render: () => ({
    template: `
      <section hlmCard class='w-80'>
        <p hlmCardContent class="text-muted-foreground">
          Just a card with content and no header or footer.
        </p>
      </section>
    `,
  }),
};
