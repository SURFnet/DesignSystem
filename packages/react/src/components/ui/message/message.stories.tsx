import type { Meta, StoryObj } from '@storybook/react-vite';
import { messageContract } from '@surfnet/curve-contracts';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from './message';

const meta = {
  title: 'Components/Message',
  component: Message,
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
} satisfies Meta<typeof Message>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Demo-only bubble; Curve has no Bubble component yet. */
function Bubble({ own = false, children }: { own?: boolean; children: React.ReactNode }) {
  return (
    <div
      data-slot="bubble"
      className={`w-fit rounded-xl px-3 py-2 ${own ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
    >
      {children}
    </div>
  );
}

/** A single message. Use the `align` control to move it to the other edge. */
export const Default: Story = {
  render: (args) => (
    <div className="w-80">
      <Message {...args}>
        <MessageContent>
          <Bubble own={args.align === 'end'}>Can you check the deploy logs?</Bubble>
        </MessageContent>
      </Message>
    </div>
  ),
};

/** `start` for others, `end` for the current user. */
export const Alignment: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      {messageContract.props.aligns.map((align) => (
        <Message key={align} align={align}>
          <MessageContent>
            <Bubble own={align === 'end'}>{messageContract.docs.aligns[align]}</Bubble>
          </MessageContent>
        </Message>
      ))}
    </div>
  ),
};

/** The avatar sits level with the last line of content. */
export const WithAvatar: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Message>
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble>The build failed during dependency installation.</Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble own>Can you share the exact error?</Bubble>
        </MessageContent>
      </Message>
    </div>
  ),
};

/** Header for the sender, footer for status. The avatar stays level with the bubble. */
export const HeaderAndFooter: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Message>
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>OL</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Olivia</MessageHeader>
          <Bubble>I already checked the logs.</Bubble>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <Bubble own>Send the report to the team.</Bubble>
          <MessageFooter>Delivered</MessageFooter>
        </MessageContent>
      </Message>
    </div>
  ),
};

/** Consecutive messages from one sender, with tighter spacing. */
export const Group: Story = {
  render: () => (
    <MessageGroup className="w-80">
      <Message>
        <MessageContent>
          <Bubble>I checked the registry addresses.</Bubble>
        </MessageContent>
      </Message>
      <Message>
        <MessageContent>
          <Bubble>The component files now live under the UI registry.</Bubble>
        </MessageContent>
      </Message>
    </MessageGroup>
  ),
};
