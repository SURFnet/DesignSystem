import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { messageContract } from '@surfnet/curve-contracts';
import { HlmMessage, HlmMessageImports } from '..';
import { HlmAvatarImports } from '../../../avatar/src';

// Demo-only bubble; Curve has no Bubble component yet.
const bubble = 'w-fit rounded-xl px-3 py-2 bg-muted';
const ownBubble = 'w-fit rounded-xl px-3 py-2 bg-primary text-primary-foreground';

const meta: Meta<HlmMessage> = {
  title: 'Components/Message',
  component: HlmMessage,
  decorators: [
    moduleMetadata({
      imports: [HlmMessageImports, HlmAvatarImports],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: messageContract.docs.description,
      },
    },
  },
  argTypes: {
    align: {
      control: 'radio',
      options: messageContract.props.aligns,
      description: 'Which edge of the conversation the message sits on.',
      table: { defaultValue: { summary: messageContract.defaults.aligns } },
    },
  },
  args: {
    align: messageContract.defaults.aligns,
  },
};

export default meta;
type Story = StoryObj<HlmMessage>;

/** A single message. Use the `align` control to move it to the other edge. */
export const Default: Story = {
  render: (args) => ({
    props: { ...args, bubble, ownBubble },
    template: `
      <div class="w-80">
        <div hlmMessage ${argsToTemplate(args)}>
          <div hlmMessageContent>
            <div data-slot="bubble" [class]="align === 'end' ? ownBubble : bubble">Can you check the deploy logs?</div>
          </div>
        </div>
      </div>
    `,
  }),
};

/** `start` for others, `end` for the current user. */
export const Alignment: Story = {
  render: () => ({
    props: {
      aligns: messageContract.props.aligns,
      docs: messageContract.docs.aligns,
      bubble,
      ownBubble,
    },
    template: `
      <div class="flex w-80 flex-col gap-4">
        @for (align of aligns; track align) {
          <div hlmMessage [align]="align">
            <div hlmMessageContent>
              <div data-slot="bubble" [class]="align === 'end' ? ownBubble : bubble">{{ docs[align] }}</div>
            </div>
          </div>
        }
      </div>
    `,
  }),
};

/** The avatar sits level with the last line of content. */
export const WithAvatar: Story = {
  render: () => ({
    template: `
      <div class="flex w-80 flex-col gap-4">
        <div hlmMessage>
          <div hlmMessageAvatar>
            <hlm-avatar><span hlmAvatarFallback>AL</span></hlm-avatar>
          </div>
          <div hlmMessageContent>
            <div data-slot="bubble" class="${bubble}">The build failed during dependency installation.</div>
          </div>
        </div>
        <div hlmMessage align="end">
          <div hlmMessageAvatar>
            <hlm-avatar><span hlmAvatarFallback>ME</span></hlm-avatar>
          </div>
          <div hlmMessageContent>
            <div data-slot="bubble" class="${ownBubble}">Can you share the exact error?</div>
          </div>
        </div>
      </div>
    `,
  }),
};

/** Header for the sender, footer for status. The avatar stays level with the bubble. */
export const HeaderAndFooter: Story = {
  render: () => ({
    template: `
      <div class="flex w-80 flex-col gap-4">
        <div hlmMessage>
          <div hlmMessageAvatar>
            <hlm-avatar><span hlmAvatarFallback>OL</span></hlm-avatar>
          </div>
          <div hlmMessageContent>
            <div hlmMessageHeader>Olivia</div>
            <div data-slot="bubble" class="${bubble}">I already checked the logs.</div>
          </div>
        </div>
        <div hlmMessage align="end">
          <div hlmMessageAvatar>
            <hlm-avatar><span hlmAvatarFallback>ME</span></hlm-avatar>
          </div>
          <div hlmMessageContent>
            <div data-slot="bubble" class="${ownBubble}">Send the report to the team.</div>
            <div hlmMessageFooter>Delivered</div>
          </div>
        </div>
      </div>
    `,
  }),
};

/** Consecutive messages from one sender, with tighter spacing. */
export const Group: Story = {
  render: () => ({
    template: `
      <div hlmMessageGroup class="w-80">
        <div hlmMessage>
          <div hlmMessageContent>
            <div data-slot="bubble" class="${bubble}">I checked the registry addresses.</div>
          </div>
        </div>
        <div hlmMessage>
          <div hlmMessageContent>
            <div data-slot="bubble" class="${bubble}">The component files now live under the UI registry.</div>
          </div>
        </div>
      </div>
    `,
  }),
};
