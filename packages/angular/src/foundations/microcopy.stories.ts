import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import {
  MICROCOPY_KINDS,
  getMicrocopyGroups,
  splitInlineCode,
} from '@surfnet/curve-storybook-config/microcopy';
import { provideCurveMicrocopy } from '../lib/microcopy';
import { HlmFieldImports } from '../lib/ui/field/src';
import { HlmInputImports } from '../lib/ui/input/src';

/** All microcopy entries per component, in English and Dutch, read from the JSON. */
@Component({
  selector: 'surf-microcopy-table',
  standalone: true,
  template: `
    <div class="max-w-5xl text-foreground">
      @for (group of groups; track group.component) {
        <section class="mb-12">
          <h3 class="text-lg font-semibold text-foreground">{{ group.component }}</h3>
          <table class="w-full" style="border-collapse: collapse">
            <thead>
              <tr class="border-b border-border text-xs text-muted-foreground">
                <th [style]="cell" style="width: 22%">Key</th>
                <th [style]="cell" style="width: 28%">Beschrijving</th>
                <th [style]="cell" style="width: 16%">English (default)</th>
                <th [style]="cell" style="width: 16%">Nederlands</th>
                <th [style]="cell" style="width: 18%">Waar pas je de tekst aan</th>
              </tr>
            </thead>
            <tbody>
              @for (row of group.rows; track row.key) {
                <tr class="border-b border-border">
                  <td [style]="cell">
                    <div class="font-mono text-sm">{{ row.key }}</div>
                    <div class="text-xs text-muted-foreground">
                      {{ kinds[row.kind] }}{{ row.example ? ' · example of a format' : '' }}
                    </div>
                  </td>
                  <td [style]="cell" class="text-sm">
                    @for (part of split(row.description); track $index) {
                      @if (part.code) {
                        <code class="font-mono text-xs">{{ part.text }}</code>
                      } @else {
                        {{ part.text }}
                      }
                    }
                  </td>
                  <td [style]="cell" class="text-sm" lang="en">“{{ row.en }}”</td>
                  <td [style]="cell" class="text-sm" lang="nl">“{{ row.nl }}”</td>
                  <td [style]="cell" class="text-xs">
                    @if (row.angular) {
                      <code class="font-mono">{{ row.angular.where }}</code>
                      <div class="text-muted-foreground">
                        @if (row.angular.change) {
                          @for (part of split(row.angular.change); track $index) {
                            @if (part.code) {
                              <code class="font-mono">{{ part.text }}</code>
                            } @else {
                              {{ part.text }}
                            }
                          }
                        } @else {
                          Language only
                        }
                      </div>
                    } @else {
                      <span class="text-muted-foreground">Not in Angular</span>
                    }
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </section>
      }
    </div>
  `,
})
class MicrocopyTableComponent {
  protected readonly groups = getMicrocopyGroups();
  protected readonly kinds = MICROCOPY_KINDS;
  protected readonly split = splitInlineCode;
  protected readonly cell =
    'padding: 0.5rem 0.75rem 0.5rem 0; vertical-align: top; text-align: left';
}

const sampleTemplate = `
  <h3 class="text-lg font-semibold">{{ title }}</h3>
  <div hlmField optional class="w-72">
    <label hlmFieldLabel [for]="'name-' + title">Name</label>
    <input hlmInput [id]="'name-' + title" />
  </div>
  <div hlmField class="w-72">
    <label hlmFieldLabel [for]="'email-' + title">Email</label>
    <input hlmInput [id]="'email-' + title" [formControl]="email" />
    <hlm-field-error />
  </div>
`;

/** A touched, empty required field, so its error message shows right away. */
function touchedRequired() {
  const control = new FormControl('', { validators: [Validators.required] });
  control.markAsTouched();
  return control;
}

@Component({
  selector: 'surf-microcopy-en',
  standalone: true,
  imports: [HlmFieldImports, HlmInputImports, ReactiveFormsModule],
  providers: [provideCurveMicrocopy('en')],
  host: { class: 'flex flex-col gap-4', lang: 'en' },
  template: sampleTemplate,
})
class MicrocopyEnglishComponent {
  protected readonly title = 'English';
  protected readonly email = touchedRequired();
}

@Component({
  selector: 'surf-microcopy-nl',
  standalone: true,
  imports: [HlmFieldImports, HlmInputImports, ReactiveFormsModule],
  providers: [provideCurveMicrocopy('nl')],
  host: { class: 'flex flex-col gap-4', lang: 'nl' },
  template: sampleTemplate,
})
class MicrocopyDutchComponent {
  protected readonly title = 'Nederlands';
  protected readonly email = touchedRequired();
}

const meta: Meta = {
  title: 'Foundations/Microcopy',
  decorators: [
    moduleMetadata({
      imports: [MicrocopyTableComponent, MicrocopyEnglishComponent, MicrocopyDutchComponent],
    }),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Every text Curve’s components show or read out by default, from `@surfnet/curve-microcopy`. ' +
          "English is the default; add `provideCurveMicrocopy('nl')` to your app config for Dutch, " +
          'and pass a second argument to replace single texts. An input on a component still wins.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

/** All texts per component, in English and Dutch, and how to change a single one. */
export const AllTexts: Story = {
  render: () => ({ template: `<surf-microcopy-table />` }),
};

/** The same components with `provideCurveMicrocopy('en')` and `provideCurveMicrocopy('nl')`. */
export const Languages: Story = {
  render: () => ({
    template: `
      <div class="flex flex-wrap gap-10">
        <surf-microcopy-en />
        <surf-microcopy-nl />
      </div>
    `,
  }),
};
