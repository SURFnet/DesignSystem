import {
  componentWrapperDecorator,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { selectContract } from '@surfnet/curve-contracts';
import { HlmSelectImports } from '..';
import { HlmSelect } from './hlm-select';

const meta: Meta<HlmSelect> = {
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
};

export default meta;
type Story = StoryObj<HlmSelect>;

/** A select with a placeholder until a value is chosen. */
export const Default: Story = {
  render: () => ({
    template: `
      <hlm-select [value]="items[0]">
        <hlm-select-trigger class="w-56" aria-label="Category">
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
  render: () => ({
    template: `
      <div class="flex items-center gap-3">
        <hlm-select [value]="items[0]">
          <hlm-select-trigger class="w-40" size="sm" aria-label="Category" title="${selectContract.docs.sizes.sm}">
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
  render: () => ({
    template: `
      <hlm-select>
        <hlm-select-trigger class="w-56" aria-label="Category">
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
  render: () => ({
    template: `
      <hlm-select disabled>
        <hlm-select-trigger class="w-56" aria-label="Category">
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
  render: () => ({
    props: {
      form: new FormGroup({
        category: new FormControl<string | null>(null, { validators: [Validators.required] }),
      }),
    },
    template: `
      <form [formGroup]="form" class="w-fit">
        <div hlmField>
          <label hlmFieldLabel for="invalid-select">Category</label>
          <hlm-select formControlName="category">
            <hlm-select-trigger id="invalid-select" class="w-56" aria-label="Category">
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
  render: () => ({
    template: `
      <hlm-select>
        <hlm-select-trigger class="w-56" aria-label="Category (forced invalid)" forceInvalid>
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
