import { CheckIcon } from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { badgeContract } from '@surfnet/curve-contracts';

import { Badge } from './badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: badgeContract.docs.description,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: badgeContract.props.variants,
      description: 'Visual style of the badge.',
      table: {
        defaultValue: { summary: badgeContract.defaults.variants },
      },
    },
  },
  args: {
    children: 'Badge',
    variant: badgeContract.defaults.variants,
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The default badge — rendered with the default args; tweak them via the controls. */
export const Default: Story = {};

/** Every visual variant side by side. */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {badgeContract.props.variants.map((variant) => (
        <Badge key={variant} variant={variant} title={badgeContract.docs.variants[variant]}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Badge>
      ))}
    </div>
  ),
};

/**
 * Icons alongside text. Tag the icon with `data-icon="inline-start"` or
 * `data-icon="inline-end"` so the badge tightens the padding on that side.
 */
export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="secondary">
        <CheckIcon data-icon="inline-start" />
        Verified
      </Badge>
    </div>
  ),
};

/** Numeric counts, sized to stay circular at one or two digits. */
export const Counts: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">8</Badge>
      <Badge variant="destructive" className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
        99
      </Badge>
      <Badge variant="outline" className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
        20+
      </Badge>
    </div>
  ),
};

/**
 * Base UI's polymorphic `render` prop swaps the underlying element while keeping
 * the badge styling — here the badge renders as an anchor.
 */
export const AsLink: Story = {
  render: () => (
    <Badge variant="link" render={<a href="https://www.surf.nl" />}>
      Visit SURF
    </Badge>
  ),
};

/** Realistic composed usage: status labels attached to a list of items. */
export const StatusList: Story = {
  render: () => (
    <ul className="flex w-80 flex-col gap-2 text-sm">
      <li className="flex items-center justify-between rounded-md border border-border px-3 py-2">
        <span>Deploy to production</span>
        <Badge variant="default">Live</Badge>
      </li>
      <li className="flex items-center justify-between rounded-md border border-border px-3 py-2">
        <span>Migrate database schema</span>
        <Badge variant="secondary">In progress</Badge>
      </li>
      <li className="flex items-center justify-between rounded-md border border-border px-3 py-2">
        <span>Rotate API credentials</span>
        <Badge variant="destructive">Overdue</Badge>
      </li>
      <li className="flex items-center justify-between rounded-md border border-border px-3 py-2">
        <span>Archive old backups</span>
        <Badge variant="outline">Scheduled</Badge>
      </li>
    </ul>
  ),
};
