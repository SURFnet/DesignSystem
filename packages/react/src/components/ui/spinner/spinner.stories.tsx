import type { Meta, StoryObj } from '@storybook/react-vite';
import { spinnerContract } from '@surfnet/curve-contracts';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia } from '@/components/ui/empty';

import { Spinner } from './spinner';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    docs: {
      description: {
        component: spinnerContract.docs.description,
      },
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The default spinner at its default `size-4`. */
export const Default: Story = {
  render: () => <Spinner />,
};

/** Sizes are just utility classes — override `size-*` to scale the icon. */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Spinner className="size-4" />
      <Spinner className="size-6" />
      <Spinner className="size-8" />
      <Spinner className="size-10" />
    </div>
  ),
};

/** Paired with text, inline, for a lightweight loading message. */
export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Spinner />
      Loading…
    </div>
  ),
};

/** Inside a disabled `Button` while an action is in flight. */
export const InButton: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button disabled>
        <Spinner data-icon="inline-start" />
        Please wait
      </Button>
      <Button variant="secondary" size="icon" disabled aria-label="Loading">
        <Spinner />
      </Button>
    </div>
  ),
};

/** As the sole content of a `Card`, centering the spinner while data loads. */
export const CardLoading: Story = {
  render: () => (
    <Card className="w-64">
      <CardContent className="flex items-center justify-center py-10">
        <Spinner className="size-6 text-muted-foreground" />
      </CardContent>
    </Card>
  ),
};

/** As the media of an `Empty` state, e.g. while a list is being fetched. */
export const EmptyLoading: Story = {
  render: () => (
    <Empty className="w-full max-w-sm">
      <EmptyHeader>
        <EmptyMedia>
          <Spinner className="size-8" />
        </EmptyMedia>
        <EmptyDescription>Fetching your documents…</EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
};
