import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { switchContract } from '@surfnet/curve-contracts';

import { HlmSwitch, HlmSwitchImports } from '..';
import { HlmLabel } from '../../../label/src/lib/hlm-label';
import { HlmFieldImports } from '../../../field/src';

const meta: Meta<HlmSwitch> = {
  title: 'Components/Switch',
  component: HlmSwitch,
  decorators: [
    moduleMetadata({
      imports: [HlmSwitchImports, HlmLabel, HlmFieldImports, ReactiveFormsModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: switchContract.docs.description,
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=60-438',
    },
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: [...switchContract.props.sizes],
      description: switchContract.props.sizes
        .map((size) => `\`${size}\` — ${switchContract.docs.sizes[size]}`)
        .join('\n\n'),
      table: {
        type: {
          summary: switchContract.props.sizes.join(' | '),
        },
        defaultValue: { summary: switchContract.defaults.sizes },
      },
    },
  },
  args: {
    size: switchContract.defaults.sizes,
  },
};

export default meta;
type Story = StoryObj<HlmSwitch>;

/** A controlled switch driven by component state — the typical usage pattern. */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<hlm-switch checked aria-label="Enable notifications" ${argsToTemplate(args)} />`,
  }),
};

/** A switch paired with a clickable label. */
export const WithLabel: Story = {
  render: () => ({
    template: `
      <label class="gap-2" hlmLabel>
        <hlm-switch checked />
        Enable notifications
      </label>
    `,
  }),
};

/** Small size — compact forms and toolbars. */
export const Sm: Story = {
  render: () => ({
    template: `
      <label class="gap-2" hlmLabel>
        <hlm-switch size="sm" checked title="${switchContract.docs.sizes.sm}" />
        Small switch
      </label>
    `,
  }),
};

/** An unchecked switch. */
export const Unchecked: Story = {
  render: () => ({
    template: `
      <label class="gap-2" hlmLabel>
        <hlm-switch />
        Unchecked
      </label>
    `,
  }),
};

/** A checked switch. */
export const Checked: Story = {
  render: () => ({
    template: `
      <label class="gap-2" hlmLabel>
        <hlm-switch checked />
        Checked
      </label>
    `,
  }),
};

/** A disabled unchecked switch. */
export const Disabled: Story = {
  render: () => ({
    template: `
      <label class="gap-2" hlmLabel>
        <hlm-switch disabled />
        Disabled
      </label>
    `,
  }),
};

/** A disabled checked switch. */
export const DisabledChecked: Story = {
  render: () => ({
    template: `
      <label class="gap-2" hlmLabel>
        <hlm-switch checked disabled />
        Disabled checked
      </label>
    `,
  }),
};

/** A switch that must be on: the field shows its error message. */
export const Invalid: Story = {
  render: () => {
    const form = new FormGroup({
      consent: new FormControl(false, { validators: [Validators.requiredTrue] }),
    });
    form.markAllAsTouched();

    return {
      props: { form },
      template: `
        <form [formGroup]="form">
          <div hlmField orientation="horizontal">
            <hlm-switch inputId="invalid-consent" formControlName="consent" />
            <div hlmFieldContent>
              <label hlmFieldLabel for="invalid-consent">Share usage data</label>
              <hlm-field-error />
            </div>
          </div>
        </form>
      `,
    };
  },
};
