import { Component, Input } from '@angular/core';
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

@Component({
  selector: 'badge-variants',
  imports: [HlmBadgeImports],
  template: `
    <div class="flex flex-wrap items-center gap-3">
      @for (variant of badgeContract.props.variants; track variant) {
        <span hlmBadge [variant]="variant" [title]="badgeContract.docs.variants[variant]">
          {{ variant.charAt(0).toUpperCase() + variant.slice(1) }}
        </span>
      }
    </div>
  `,
})
class BadgeVariants {
  @Input() badgeContract!: typeof badgeContract;
}

/** Every visual variant side by side. */
export const Variants: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [BadgeVariants],
    },
    props: { badgeContract: badgeContract },
    template: '<badge-variants [badgeContract]="badgeContract"></badge-variants>',
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

/** Numeric counts, sized to stay circular at one or two digits. */
export const Counts: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <span hlmBadge class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">8</span>
        <span hlmBadge variant="destructive" class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">99</span>
        <span hlmBadge variant="outline" class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">20+</span>
      </div>`,
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
          <span hlmBadge variant="destructive">Overdue</span>
        </li>
        <li class="flex items-center justify-between rounded-md border border-border px-3 py-2">
          <span>Archive old backups</span>
          <span hlmBadge variant="outline">Scheduled</span>
        </li>
      </ul>`,
  }),
};
