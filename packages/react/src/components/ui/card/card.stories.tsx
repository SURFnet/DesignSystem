import type { Meta, StoryObj } from '@storybook/react-vite';
import { cardContract } from '@surfnet/curve-contracts';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component: cardContract.docs.description,
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
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Default card with header, content, and footer. */
export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader>
        <CardTitle>Card title</CardTitle>
        <CardDescription>A short description of what this card is about.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Card body content goes here.</p>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Confirm</Button>
      </CardFooter>
    </Card>
  ),
};

/** Compact (`sm`) card with tighter spacing. */
export const Small: Story = {
  render: () => (
    <Card size="sm" className="w-80">
      <CardHeader>
        <CardTitle>Small card</CardTitle>
        <CardDescription>Compact spacing variant.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Less padding all round.</p>
      </CardContent>
    </Card>
  ),
};

/** Card with an action slot in the header (e.g. a menu trigger). */
export const WithHeaderAction: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>With action</CardTitle>
        <CardDescription>An action button lives in the header.</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm">
            Edit
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Content area.</p>
      </CardContent>
    </Card>
  ),
};

/** Card with only a content area — no header or footer. */
export const ContentOnly: Story = {
  render: () => (
    <Card className="w-80">
      <CardContent>
        <p>Just a card with content and no header or footer.</p>
      </CardContent>
    </Card>
  ),
};
