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
    disabled: { control: 'boolean' },
  },
  args: {
    size: switchContract.defaults.sizes,
    disabled: false,
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

/**
 * Render an `hlm-switch` inside a clickable label, bound to the story args so the
 * Controls panel drives it. Each story sets its own starting args.
 */
const renderLabelled =
  (label: string, attrs = ''): Story['render'] =>
  (args) => ({
    props: args,
    template: `
      <label class="gap-2" hlmLabel>
        <hlm-switch ${argsToTemplate(args)}${attrs} />
        ${label}
      </label>
    `,
  });

/** A switch paired with a clickable label. */
export const WithLabel: Story = {
  render: renderLabelled('Enable notifications', ' checked'),
};

/** Small size — compact forms and toolbars. */
export const Sm: Story = {
  args: { size: 'sm' },
  render: renderLabelled('Small switch', ` checked title="${switchContract.docs.sizes.sm}"`),
};

/** An unchecked switch. */
export const Unchecked: Story = {
  render: renderLabelled('Unchecked'),
};

/** A checked switch. */
export const Checked: Story = {
  render: renderLabelled('Checked', ' checked'),
};

/** A disabled unchecked switch. */
export const Disabled: Story = {
  args: { disabled: true },
  render: renderLabelled('Disabled'),
};

/** A disabled checked switch. */
export const DisabledChecked: Story = {
  args: { disabled: true },
  render: renderLabelled('Disabled checked', ' checked'),
};

/** A switch that must be on: the field shows its error message. */
export const Invalid: Story = {
  // The reactive form owns the disabled state, so only `size` is controllable here.
  parameters: { controls: { exclude: ['disabled'] } },
  render: ({ size }) => {
    const form = new FormGroup({
      consent: new FormControl(false, { validators: [Validators.requiredTrue] }),
    });
    form.markAllAsTouched();

    return {
      props: { form, size },
      template: `
        <form [formGroup]="form">
          <div hlmField orientation="horizontal">
            <hlm-switch inputId="invalid-consent" formControlName="consent" [size]="size" />
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
