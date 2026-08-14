import { Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCheckCircle, phosphorWarningCircle } from '@ng-icons/phosphor-icons/regular';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { alertContract } from '@surfnet/curve-contracts';

import { HlmButton } from '../../../button/src/lib/hlm-button';
import { HlmAlert, HlmAlertImports } from '..';

const meta: Meta<HlmAlert> = {
  title: 'Components/Alert',
  component: HlmAlert,
  decorators: [
    moduleMetadata({
      imports: [HlmAlertImports, HlmButton, NgIcon],
      providers: [provideIcons({ phosphorCheckCircle, phosphorWarningCircle })],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: alertContract.docs.description,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [...alertContract.props.variants],
      description: 'Visual style of the alert.',
      table: {
        type: {
          summary: alertContract.props.variants.join(' | '),
        },
        defaultValue: { summary: alertContract.defaults.variants },
      },
    },
  },
  args: {
    variant: alertContract.defaults.variants,
  },
};

export default meta;

type Story = StoryObj<HlmAlert>;

/** The default alert — rendered with an icon, title, and description; tweak the variant via controls. */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <hlm-alert class="w-96" ${argsToTemplate(args)}>
        <ng-icon name="phosphorCheckCircle" />
        <h5 hlmAlertTitle>Update available</h5>
        <p hlmAlertDescription>A new version is ready to install.</p>
      </hlm-alert>
    `,
  }),
};

@Component({
  selector: 'alert-variants',
  imports: [HlmAlertImports, NgIcon],
  template: `
    <div class="flex w-96 flex-col gap-3">
      @for (variant of alertContract.props.variants; track variant) {
        <div hlmAlert [variant]="variant" [title]="alertContract.docs.variants[variant]">
          <ng-icon
            [name]="variant === 'destructive' ? 'phosphorWarningCircle' : 'phosphorCheckCircle'"
          />
          <h5 hlmAlertTitle>{{ variant.charAt(0).toUpperCase() + variant.slice(1) }}</h5>
          <p hlmAlertDescription>{{ alertContract.docs.variants[variant] }}</p>
        </div>
      }
    </div>
  `,
})
class AlertVariants {
  @Input() alertContract!: typeof alertContract;
}

/** Every visual variant side by side. */
export const Variants: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [AlertVariants],
    },
    props: { alertContract },
    template: '<alert-variants [alertContract]="alertContract"></alert-variants>',
  }),
};

/** Destructive alert used to surface an error, with title and description. */
export const Destructive: Story = {
  render: () => ({
    template: `
      <div hlmAlert variant="destructive" class="w-96">
        <ng-icon name="phosphorWarningCircle" />
        <h5 hlmAlertTitle>Unable to process payment</h5>
        <p hlmAlertDescription>Please verify your billing details and try again.</p>
      </div>
    `,
  }),
};

/** An action slot (e.g. a button) anchored to the top-right of the alert. */
export const WithAction: Story = {
  render: () => ({
    template: `
      <div hlmAlert class="w-96">
        <ng-icon name="phosphorCheckCircle" />
        <h5 hlmAlertTitle>Update available</h5>
        <p hlmAlertDescription>A new version is ready to install.</p>
        <div hlmAlertAction>
          <button hlmBtn size="sm" variant="outline">Update</button>
        </div>
      </div>
    `,
  }),
};

/** Title only — no icon or description. */
export const TitleOnly: Story = {
  render: () => ({
    template: `
      <div hlmAlert class="w-96">
        <h5 hlmAlertTitle>Heads up, this action can't be undone.</h5>
      </div>
    `,
  }),
};
