import { Component, signal } from '@angular/core';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { comboboxContract } from '@surfnet/curve-contracts';

import { HlmCombobox } from './hlm-combobox';
import { HlmComboboxImports } from '..';

const meta: Meta<HlmCombobox> = {
  title: 'Components/Combobox',
  component: HlmCombobox,
  decorators: [
    moduleMetadata({
      imports: [HlmComboboxImports],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: comboboxContract.docs.description,
      },
    },
  },
};

export default meta;
type Story = StoryObj<HlmCombobox>;

/** A searchable, filterable select — type to filter, with a trigger and clear button. */
export const Default: Story = {
  render: () => ({
    template: `
			<hlm-combobox>
				<hlm-combobox-input placeholder="Search a country…" showClear class="w-64" />
				<hlm-combobox-content *hlmComboboxPortal>
					<hlm-combobox-empty>No countries found.</hlm-combobox-empty>
					<div hlmComboboxList>
						<hlm-combobox-item value="Belgium">Belgium</hlm-combobox-item>
						<hlm-combobox-item value="Denmark">Denmark</hlm-combobox-item>
						<hlm-combobox-item value="Finland">Finland</hlm-combobox-item>
						<hlm-combobox-item value="France">France</hlm-combobox-item>
						<hlm-combobox-item value="Germany">Germany</hlm-combobox-item>
						<hlm-combobox-item value="Iceland">Iceland</hlm-combobox-item>
						<hlm-combobox-item value="Netherlands">Netherlands</hlm-combobox-item>
						<hlm-combobox-item value="Norway">Norway</hlm-combobox-item>
						<hlm-combobox-item value="Sweden">Sweden</hlm-combobox-item>
						<hlm-combobox-item value="United Kingdom">United Kingdom</hlm-combobox-item>
					</div>
				</hlm-combobox-content>
			</hlm-combobox>
		`,
  }),
};

/** Options organized into labelled groups, separated with a divider. */
export const Grouped: Story = {
  render: () => ({
    template: `
			<hlm-combobox>
				<hlm-combobox-input placeholder="Search a framework…" class="w-64" />
				<hlm-combobox-content *hlmComboboxPortal>
					<hlm-combobox-empty>No frameworks found.</hlm-combobox-empty>
					<div hlmComboboxList>
						<div hlmComboboxGroup>
							<div hlmComboboxLabel>Frontend</div>
							<hlm-combobox-item value="React">React</hlm-combobox-item>
							<hlm-combobox-item value="Angular">Angular</hlm-combobox-item>
							<hlm-combobox-item value="Vue">Vue</hlm-combobox-item>
							<hlm-combobox-item value="Svelte">Svelte</hlm-combobox-item>
						</div>
						<div hlmComboboxSeparator></div>
						<div hlmComboboxGroup>
							<div hlmComboboxLabel>Backend</div>
							<hlm-combobox-item value="Express">Express</hlm-combobox-item>
							<hlm-combobox-item value="NestJS">NestJS</hlm-combobox-item>
							<hlm-combobox-item value="Django">Django</hlm-combobox-item>
							<hlm-combobox-item value="Rails">Rails</hlm-combobox-item>
						</div>
					</div>
				</hlm-combobox-content>
			</hlm-combobox>
		`,
  }),
};

@Component({
  selector: 'combobox-multiple-demo',
  imports: [HlmComboboxImports],
  template: `
    <hlm-combobox-multiple [(value)]="values">
      <hlm-combobox-chips class="w-64">
        <ng-template hlmComboboxValues let-values>
          @for (value of values; track value) {
            <hlm-combobox-chip [value]="value">{{ value }}</hlm-combobox-chip>
          }
        </ng-template>
        <input hlmComboboxChipInput placeholder="Add a language…" />
      </hlm-combobox-chips>
      <hlm-combobox-content *hlmComboboxPortal>
        <hlm-combobox-empty>No languages found.</hlm-combobox-empty>
        <div hlmComboboxList>
          <hlm-combobox-item value="TypeScript">TypeScript</hlm-combobox-item>
          <hlm-combobox-item value="JavaScript">JavaScript</hlm-combobox-item>
          <hlm-combobox-item value="Python">Python</hlm-combobox-item>
          <hlm-combobox-item value="Rust">Rust</hlm-combobox-item>
          <hlm-combobox-item value="Go">Go</hlm-combobox-item>
        </div>
      </hlm-combobox-content>
    </hlm-combobox-multiple>
  `,
})
class ComboboxMultipleDemo {
  public readonly values = signal(['TypeScript']);
}

/** Multi-select with removable chips. */
export const Multiple: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ComboboxMultipleDemo],
    },
    template: '<combobox-multiple-demo />',
  }),
};

/** Disabled state — the input, trigger, and clear button all ignore interaction. */
export const Disabled: Story = {
  render: () => ({
    template: `
			<hlm-combobox disabled>
				<hlm-combobox-input placeholder="Search a country…" class="w-64" />
				<hlm-combobox-content *hlmComboboxPortal>
					<hlm-combobox-item value="Netherlands">Netherlands</hlm-combobox-item>
				</hlm-combobox-content>
			</hlm-combobox>
		`,
  }),
};
