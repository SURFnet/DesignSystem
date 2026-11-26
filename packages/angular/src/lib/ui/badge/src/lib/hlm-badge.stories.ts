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

const renderBadge =
  (content: string, attrs = '', tag = 'span'): Story['render'] =>
  (args) => ({
    props: args,
    template: `<${tag} hlmBadge ${argsToTemplate(args)}${attrs}>${content}</${tag}>`,
  });

/** The default badge — rendered with the default args; tweak them via the controls. */
export const Default: Story = {
  render: renderBadge(`Badge`),
};

/** Primary brand fill — the most prominent badge style. */
export const DefaultVariant: Story = {
  args: { variant: 'default' },
  render: renderBadge(`Default`, ` title="${badgeContract.docs.variants['default']}"`),
};

/** Muted fill — general-purpose secondary label. */
export const Secondary: Story = {
  args: { variant: 'secondary' },
  render: renderBadge(`Secondary`, ` title="${badgeContract.docs.variants['secondary']}"`),
};

/** Informational tint — does not require immediate action. */
export const Info: Story = {
  args: { variant: 'info' },
  render: renderBadge(`Info`, ` title="${badgeContract.docs.variants['info']}"`),
};

/** Success tint — confirms a successful action or state. */
export const Success: Story = {
  args: { variant: 'success' },
  render: renderBadge(`Success`, ` title="${badgeContract.docs.variants['success']}"`),
};

/** Warning tint — highlights something that needs attention. */
export const Warning: Story = {
  args: { variant: 'warning' },
  render: renderBadge(`Warning`, ` title="${badgeContract.docs.variants['warning']}"`),
};

/** Danger tint — errors, warnings, or destructive states. */
export const Danger: Story = {
  args: { variant: 'danger' },
  render: renderBadge(`Danger`, ` title="${badgeContract.docs.variants['danger']}"`),
};

/** Bordered, transparent fill — low-emphasis label. */
export const Outline: Story = {
  args: { variant: 'outline' },
  render: renderBadge(`Outline`, ` title="${badgeContract.docs.variants['outline']}"`),
};

/** No background or border — minimal label. */
export const Ghost: Story = {
  args: { variant: 'ghost' },
  render: renderBadge(`Ghost`, ` title="${badgeContract.docs.variants['ghost']}"`),
};

/** Looks like a hyperlink — inline actionable label. */
export const Link: Story = {
  args: { variant: 'link' },
  render: renderBadge(`Link`, ` title="${badgeContract.docs.variants['link']}"`),
};

/**
 * Icons alongside text. Tag the icon with `data-icon="inline-start"` or
 * `data-icon="inline-end"` so the badge tightens the padding on that side.
 */
export const WithIcon: Story = {
  args: { variant: 'secondary' },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <span hlmBadge ${argsToTemplate(args)}>
          <ng-icon name="phosphorCheck" data-icon="inline-start" />
          Verified
        </span>
      </div>`,
  }),
};

/** Single-digit count. */
export const CountSingleDigit: Story = {
  render: renderBadge(`8`, ` class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"`),
};

/** Double-digit count. */
export const CountDoubleDigit: Story = {
  args: { variant: 'danger' },
  render: renderBadge(`99`, ` class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"`),
};

/** Count with plus suffix. */
export const CountPlus: Story = {
  args: { variant: 'outline' },
  render: renderBadge(`20+`, ` class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"`),
};

/** The `hlmBadge` directive works on any host element — here it renders as an anchor. */
export const AsLink: Story = {
  args: { variant: 'link' },
  render: renderBadge(`Visit SURF`, ` href="https://www.surf.nl"`, 'a'),
};

/** Realistic composed usage: status labels attached to a list of items. */
export const StatusList: Story = {
  parameters: { controls: { disable: true } },
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
