import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCheck } from '@ng-icons/phosphor-icons/regular';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { badgeContract } from '@surfnet/curve-contracts';

import { HlmBadge, HlmBadgeImports } from '..';

const meta: Meta<HlmBadge> = {
  title: 'Components/Badge',
  component: HlmBadge,
  decorators: [
    moduleMetadata({
      imports: [HlmBadgeImports, NgIcon],
      providers: [provideIcons({ phosphorCheck })],
    }),
  ],
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
      options: [...badgeContract.props.variants],
      description: 'Visual style of the badge.',
      table: {
        type: {
          summary: badgeContract.props.variants.join(' | '),
        },
        defaultValue: { summary: badgeContract.defaults.variants },
      },
    },
  },
  args: {
    variant: badgeContract.defaults.variants,
  },
};

export default meta;

type Story = StoryObj<HlmBadge>;

/** The default badge — rendered with the default args; tweak them via the controls. */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<span hlmBadge ${argsToTemplate(args)}>Badge</span>`,
  }),
};

/** Primary brand fill — the most prominent badge style. */
export const DefaultVariant: Story = {
  render: () => ({
    template: `<span hlmBadge variant="default" title="${badgeContract.docs.variants['default']}">Default</span>`,
  }),
};

/** Muted fill — general-purpose secondary label. */
export const Secondary: Story = {
  render: () => ({
    template: `<span hlmBadge variant="secondary" title="${badgeContract.docs.variants['secondary']}">Secondary</span>`,
  }),
};

/** Informational tint — does not require immediate action. */
export const Info: Story = {
  render: () => ({
    template: `<span hlmBadge variant="info" title="${badgeContract.docs.variants['info']}">Info</span>`,
  }),
};

/** Success tint — confirms a successful action or state. */
export const Success: Story = {
  render: () => ({
    template: `<span hlmBadge variant="success" title="${badgeContract.docs.variants['success']}">Success</span>`,
  }),
};

/** Warning tint — highlights something that needs attention. */
export const Warning: Story = {
  render: () => ({
    template: `<span hlmBadge variant="warning" title="${badgeContract.docs.variants['warning']}">Warning</span>`,
  }),
};

/** Danger tint — errors, warnings, or destructive states. */
export const Danger: Story = {
  render: () => ({
    template: `<span hlmBadge variant="danger" title="${badgeContract.docs.variants['danger']}">Danger</span>`,
  }),
};

/** Bordered, transparent fill — low-emphasis label. */
export const Outline: Story = {
  render: () => ({
    template: `<span hlmBadge variant="outline" title="${badgeContract.docs.variants['outline']}">Outline</span>`,
  }),
};

/** No background or border — minimal label. */
export const Ghost: Story = {
  render: () => ({
    template: `<span hlmBadge variant="ghost" title="${badgeContract.docs.variants['ghost']}">Ghost</span>`,
  }),
};

/** Looks like a hyperlink — inline actionable label. */
export const Link: Story = {
  render: () => ({
    template: `<span hlmBadge variant="link" title="${badgeContract.docs.variants['link']}">Link</span>`,
  }),
};

/**
 * Icons alongside text. Tag the icon with `data-icon="inline-start"` or
 * `data-icon="inline-end"` so the badge tightens the padding on that side.
 */
export const WithIcon: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <span hlmBadge variant="secondary">
          <ng-icon name="phosphorCheck" data-icon="inline-start" />
          Verified
        </span>
      </div>`,
  }),
};

/** Single-digit count. */
export const CountSingleDigit: Story = {
  render: () => ({
    template: `<span hlmBadge class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">8</span>`,
  }),
};

/** Double-digit count. */
export const CountDoubleDigit: Story = {
  render: () => ({
    template: `<span hlmBadge variant="danger" class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">99</span>`,
  }),
};

/** Count with plus suffix. */
export const CountPlus: Story = {
  render: () => ({
    template: `<span hlmBadge variant="outline" class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">20+</span>`,
  }),
};

/** The `hlmBadge` directive works on any host element — here it renders as an anchor. */
export const AsLink: Story = {
  render: () => ({
    template: `<a hlmBadge variant="link" href="https://www.surf.nl">Visit SURF</a>`,
  }),
};

/** Realistic composed usage: status labels attached to a list of items. */
export const StatusList: Story = {
  render: () => ({
    template: `
      <ul class="flex w-80 flex-col gap-2 text-sm">
        <li class="flex items-center justify-between rounded-md border border-border px-3 py-2">
          <span>Deploy to production</span>
          <span hlmBadge variant="default">Live</span>
        </li>
        <li class="flex items-center justify-between rounded-md border border-border px-3 py-2">
          <span>Migrate database schema</span>
          <span hlmBadge variant="secondary">In progress</span>
        </li>
        <li class="flex items-center justify-between rounded-md border border-border px-3 py-2">
          <span>Rotate API credentials</span>
          <span hlmBadge variant="danger">Overdue</span>
        </li>
        <li class="flex items-center justify-between rounded-md border border-border px-3 py-2">
          <span>Archive old backups</span>
          <span hlmBadge variant="outline">Scheduled</span>
        </li>
      </ul>`,
  }),
};
