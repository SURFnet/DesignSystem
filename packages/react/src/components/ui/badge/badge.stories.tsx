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
  args: {
    variant: 'default',
    children: 'Default',
    title: badgeContract.docs.variants['default'],
  },
};

/** Muted fill — general-purpose secondary label. */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
    title: badgeContract.docs.variants['secondary'],
  },
};

/** Informational tint — does not require immediate action. */
export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Info',
    title: badgeContract.docs.variants['info'],
  },
};

/** Success tint — confirms a successful action or state. */
export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success',
    title: badgeContract.docs.variants['success'],
  },
};

/** Warning tint — highlights something that needs attention. */
export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning',
    title: badgeContract.docs.variants['warning'],
  },
};

/** Danger tint — errors, warnings, or destructive states. */
export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger',
    title: badgeContract.docs.variants['danger'],
  },
};

/** Bordered, transparent fill — low-emphasis label. */
export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
    title: badgeContract.docs.variants['outline'],
  },
};

/** No background or border — minimal label. */
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
    title: badgeContract.docs.variants['ghost'],
  },
};

/** Looks like a hyperlink — inline actionable label. */
export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link',
    title: badgeContract.docs.variants['link'],
  },
};

/**
 * Icons alongside text. Tag the icon with `data-icon="inline-start"` or
 * `data-icon="inline-end"` so the badge tightens the padding on that side.
 */
export const WithIcon: Story = {
  args: { variant: 'secondary' },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge {...args}>
        <CheckIcon data-icon="inline-start" />
        Verified
      </Badge>
    </div>
  ),
};

/** Single-digit count. */
export const CountSingleDigit: Story = {
  args: { children: '8' },
  render: (args) => (
    <Badge {...args} className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums" />
  ),
};

/** Double-digit count. */
export const CountDoubleDigit: Story = {
  args: { variant: 'danger', children: '99' },
  render: (args) => (
    <Badge {...args} className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums" />
  ),
};

/** Count with plus suffix. */
export const CountPlus: Story = {
  args: { variant: 'outline', children: '20+' },
  render: (args) => (
    <Badge {...args} className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums" />
  ),
};

/**
 * Base UI's polymorphic `render` prop swaps the underlying element while keeping
 * the badge styling — here the badge renders as an anchor.
 */
export const AsLink: Story = {
  args: { variant: 'link', children: 'Visit SURF' },
  render: (args) => <Badge {...args} render={<a href="https://www.surf.nl" />} />,
};

/** Realistic composed usage: status labels attached to a list of items. */
export const StatusList: Story = {
  // Each badge shows a different fixed status variant, so one `variant` control has nothing to drive.
  parameters: { controls: { disable: true } },
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
