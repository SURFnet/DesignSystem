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
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=300-1086&t=vT3gKkMDSpQaeqci-4',
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

/** Primary brand fill — the most prominent badge style. */
export const DefaultVariant: Story = {
  render: () => (
    <Badge variant="default" title={badgeContract.docs.variants['default']}>
      Default
    </Badge>
  ),
};

/** Muted fill — general-purpose secondary label. */
export const Secondary: Story = {
  render: () => (
    <Badge variant="secondary" title={badgeContract.docs.variants['secondary']}>
      Secondary
    </Badge>
  ),
};

/** Informational tint — does not require immediate action. */
export const Info: Story = {
  render: () => (
    <Badge variant="info" title={badgeContract.docs.variants['info']}>
      Info
    </Badge>
  ),
};

/** Success tint — confirms a successful action or state. */
export const Success: Story = {
  render: () => (
    <Badge variant="success" title={badgeContract.docs.variants['success']}>
      Success
    </Badge>
  ),
};

/** Warning tint — highlights something that needs attention. */
export const Warning: Story = {
  render: () => (
    <Badge variant="warning" title={badgeContract.docs.variants['warning']}>
      Warning
    </Badge>
  ),
};

/** Danger tint — errors, warnings, or destructive states. */
export const Danger: Story = {
  render: () => (
    <Badge variant="danger" title={badgeContract.docs.variants['danger']}>
      Danger
    </Badge>
  ),
};

/** Bordered, transparent fill — low-emphasis label. */
export const Outline: Story = {
  render: () => (
    <Badge variant="outline" title={badgeContract.docs.variants['outline']}>
      Outline
    </Badge>
  ),
};

/** No background or border — minimal label. */
export const Ghost: Story = {
  render: () => (
    <Badge variant="ghost" title={badgeContract.docs.variants['ghost']}>
      Ghost
    </Badge>
  ),
};

/** Looks like a hyperlink — inline actionable label. */
export const Link: Story = {
  render: () => (
    <Badge variant="link" title={badgeContract.docs.variants['link']}>
      Link
    </Badge>
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

/** Single-digit count. */
export const CountSingleDigit: Story = {
  render: () => <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">8</Badge>,
};

/** Double-digit count. */
export const CountDoubleDigit: Story = {
  render: () => (
    <Badge variant="danger" className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
      99
    </Badge>
  ),
};

/** Count with plus suffix. */
export const CountPlus: Story = {
  render: () => (
    <Badge variant="outline" className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
      20+
    </Badge>
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
        <Badge variant="danger">Overdue</Badge>
      </li>
      <li className="flex items-center justify-between rounded-md border border-border px-3 py-2">
        <span>Archive old backups</span>
        <Badge variant="outline">Scheduled</Badge>
      </li>
    </ul>
  ),
};
