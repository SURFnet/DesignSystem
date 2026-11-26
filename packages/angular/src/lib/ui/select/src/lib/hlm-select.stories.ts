import {
  componentWrapperDecorator,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { selectContract, type SelectTriggerSizeName } from '@surfnet/curve-contracts';
import { HlmSelectImports } from '..';
import { HlmSelect } from './hlm-select';

// `disabled` is contributed by the BrnSelect host directive and `size` lives on
// hlm-select-trigger, so widen the story args to expose both as controls.
type SelectArgs = HlmSelect & { disabled: boolean; size: SelectTriggerSizeName };

const meta: Meta<SelectArgs> = {
  title: 'Components/Select',
  component: HlmSelect,
  decorators: [
    moduleMetadata({
      imports: [HlmSelectImports, ReactiveFormsModule],
    }),
    componentWrapperDecorator(
      (story) => story,
      () => ({
        items: [
          { label: 'All', value: 'all' },
          { label: 'Identity', value: 'identity' },
          { label: 'Storage', value: 'storage' },
          { label: 'Marketplace', value: 'marketplace' },
        ],
        fruitItems: [
          { label: 'Apple', value: 'apple' },
          { label: 'Banana', value: 'banana' },
          { label: 'Orange', value: 'orange' },
        ],
        veggieItems: [
          { label: 'Carrot', value: 'carrot' },
          { label: 'Cucumber', value: 'cucumber' },
          { label: 'Tomato', value: 'tomato' },
        ],
        valueToLabel: (value: string) => value.toUpperCase(),
      }),
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: selectContract.docs.description,
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=118-1264',
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: [...selectContract.props.sizes],
      description: 'Size of the select trigger.',
      table: {
        type: {
          summary: selectContract.props.sizes.join(' | '),
        },
        defaultValue: { summary: selectContract.defaults.sizes },
      },
    },
    disabled: { control: 'boolean' },
  },
  args: {
    size: selectContract.defaults.sizes,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<SelectArgs>;

/** A select with a placeholder until a value is chosen. */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <hlm-select [value]="items[0]" [disabled]="disabled">
        <hlm-select-trigger class="w-56" [size]="size" aria-label="Category">
          <hlm-select-value placeholder="Pick a category" />
        </hlm-select-trigger>
        <hlm-select-content *hlmSelectPortal>
          @for (item of items; track item.value) {
            <hlm-select-item [value]="item">{{ item.label }}</hlm-select-item>
          }
        </hlm-select-content>
      </hlm-select>
    `,
  }),
};

/** Small size — compact forms and toolbars. */
export const SizeSm: Story = {
  args: { size: 'sm' },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex items-center gap-3">
        <hlm-select [value]="items[0]" [disabled]="disabled">
          <hlm-select-trigger class="w-40" [size]="size" aria-label="Category" title="${selectContract.docs.sizes.sm}">
            <hlm-select-value />
          </hlm-select-trigger>
          <hlm-select-content *hlmSelectPortal>
            @for (item of items; track item.value) {
              <hlm-select-item [value]="item">{{ item.label }}</hlm-select-item>
            }
          </hlm-select-content>
        </hlm-select>
      </div>
    `,
  }),
};

/** A pre-selected value with grouped, labelled options. */
export const Grouped: Story = {
  render: (args) => ({
    props: args,
    template: `
      <hlm-select [disabled]="disabled">
        <hlm-select-trigger class="w-56" [size]="size" aria-label="Category">
          <hlm-select-value placeholder="Pick a food" />
        </hlm-select-trigger>
        <hlm-select-content *hlmSelectPortal>
          <hlm-select-group>
            <hlm-select-label>Fruit</hlm-select-label>
            @for (fruit of fruitItems; track fruit.value) {
              <hlm-select-item [value]="fruit">{{ fruit.label }}</hlm-select-item>
            }
          </hlm-select-group>
          <hlm-select-separator />
          <hlm-select-group>
            <hlm-select-label>Veggies</hlm-select-label>
            @for (veggie of veggieItems; track veggie.value) {
              <hlm-select-item [value]="veggie">{{ veggie.label }}</hlm-select-item>
            }
          </hlm-select-group>
        </hlm-select-content>
      </hlm-select>
    `,
  }),
};

/** Disabled trigger. */
export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => ({
    props: args,
    template: `
      <hlm-select [disabled]="disabled">
        <hlm-select-trigger class="w-56" [size]="size" aria-label="Category">
          <hlm-select-value placeholder="Category: All" />
        </hlm-select-trigger>
        <hlm-select-content *hlmSelectPortal>
          @for (item of items; track item.value) {
            <hlm-select-item [value]="item">{{ item.label }}</hlm-select-item>
          }
        </hlm-select-content>
      </hlm-select>
    `,
  }),
};

/**
 * A required select left empty. tab past it (or open and close it) without
 * choosing to see the invalid state.
 */
export const Invalid: Story = {
  render: (args) => ({
    props: {
      ...args,
      // A reactive-form control owns its disabled state, so feed the `disabled` arg in
      // here instead of binding it on the element.
      form: new FormGroup({
        category: new FormControl<string | null>(
          { value: null, disabled: !!args.disabled },
          { validators: [Validators.required] },
        ),
      }),
    },
    template: `
      <form [formGroup]="form" class="w-fit">
        <div hlmField>
          <label hlmFieldLabel for="invalid-select">Category</label>
          <hlm-select formControlName="category">
            <hlm-select-trigger id="invalid-select" class="w-56" [size]="size" aria-label="Category">
              <hlm-select-value placeholder="Pick a category" />
            </hlm-select-trigger>
            <hlm-select-content *hlmSelectPortal>
              @for (item of items; track item.value) {
                <hlm-select-item [value]="item.value">{{ item.label }}</hlm-select-item>
              }
            </hlm-select-content>
          </hlm-select>
          <hlm-field-error />
        </div>
      </form>
    `,
  }),
};

/** Invalid state via `forceInvalid` on the trigger. */
export const InvalidForce: Story = {
  render: (args) => ({
    props: args,
    template: `
      <hlm-select [disabled]="disabled">
        <hlm-select-trigger class="w-56" [size]="size" aria-label="Category (forced invalid)" forceInvalid>
          <hlm-select-value placeholder="Pick a category" />
        </hlm-select-trigger>
        <hlm-select-content *hlmSelectPortal>
          @for (item of items; track item.value) {
            <hlm-select-item [value]="item.value">{{ item.label }}</hlm-select-item>
          }
        </hlm-select-content>
      </hlm-select>
    `,
  }),
};
