import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { messageScrollerContract } from '@surfnet/curve-contracts';

import { Button } from '@/components/ui/button';
import { Message, MessageContent } from '@/components/ui/message';
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from './message-scroller';

const meta = {
  title: 'Components/MessageScroller',
  component: MessageScroller,
  parameters: {
    docs: {
      description: {
        component: messageScrollerContract.docs.description,
      },
    },
  },
} satisfies Meta<typeof MessageScroller>;

export default meta;

type Story = StoryObj<typeof meta>;

interface DemoMessage {
  id: string;
  own: boolean;
  text: string;
}

const conversation: DemoMessage[] = Array.from({ length: 16 }, (_, i) => ({
  id: `m${i}`,
  own: i % 2 === 1,
  text:
    i % 2 === 1
      ? `Question ${(i + 1) / 2}: can you check the next step of the deploy?`
      : `Answer ${i / 2 + 1}: the step finished without errors. The logs are attached to the run.`,
}));

function Transcript({ messages }: { messages: DemoMessage[] }) {
  return (
    <MessageScrollerContent>
      {messages.map((message) => (
        <MessageScrollerItem key={message.id} messageId={message.id}>
          <Message align={message.own ? 'end' : 'start'}>
            <MessageContent>
              <div
                data-slot="bubble"
                className={`w-fit rounded-xl px-3 py-2 ${message.own ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
              >
                {message.text}
              </div>
            </MessageContent>
          </Message>
        </MessageScrollerItem>
      ))}
    </MessageScrollerContent>
  );
}

/** Opens at the newest message. Scroll up to reveal the jump-to-end button. */
export const Default: Story = {
  render: () => (
    <div className="h-80 w-96 rounded-xl border border-border">
      <MessageScrollerProvider>
        <MessageScroller>
          <MessageScrollerViewport aria-label="Conversation" className="p-4">
            <Transcript messages={conversation} />
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>
    </div>
  ),
};

function Growing() {
  const [messages, setMessages] = React.useState(conversation.slice(0, 4));
  const add = () =>
    setMessages((current) => [
      ...current,
      {
        id: `n${current.length}`,
        own: current.length % 2 === 1,
        text: `New message ${current.length + 1}. The view follows it while you are at the end.`,
      },
    ]);

  return (
    <div className="flex flex-col gap-3">
      <div className="h-80 w-96 rounded-xl border border-border">
        <MessageScrollerProvider>
          <MessageScroller>
            <MessageScrollerViewport aria-label="Conversation" className="p-4">
              <Transcript messages={messages} />
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>
      </div>
      <Button variant="outline" className="w-fit" onClick={add}>
        Add message
      </Button>
    </div>
  );
}

/** New messages keep the view pinned to the end, unless the reader scrolled up. */
export const AddingMessages: Story = {
  render: () => <Growing />,
};
