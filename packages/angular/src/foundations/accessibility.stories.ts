import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorDownloadSimple } from '@ng-icons/phosphor-icons/regular';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import {
  ACCESSIBILITY_LAYERS,
  ACCESSIBILITY_PAGE_INTRO,
  ACCESSIBILITY_SECTIONS,
  ACCESSIBILITY_SKILL_FILE,
  ACCESSIBILITY_SKILL_INSTALL,
  ACCESSIBILITY_SKILL_SUMMARY,
  type AccessibilityDocSection,
  type AccessibilityInstallTarget,
  type AccessibilityLayer,
} from '@surfnet/curve-storybook-config';

import { HlmButton } from '../lib/ui/button/src';
import { HlmCardImports } from '../lib/ui/card/src';

@Component({
  selector: 'surf-accessibility-guide',
  standalone: true,
  imports: [NgIcon, HlmButton, ...HlmCardImports],
  providers: [provideIcons({ phosphorDownloadSimple })],
  template: `
    <article class="max-w-3xl text-foreground">
      <h1 class="text-2xl font-semibold tracking-tight">Accessibility</h1>
      <p class="mt-3 max-w-prose text-muted-foreground">{{ intro }}</p>

      <hlm-card class="mt-8">
        <div hlmCardHeader>
          <h2 hlmCardTitle>Agent skill for coding assistants</h2>
          <p hlmCardDescription>
            A markdown skill you can drop into Cursor, Claude Code, or another coding agent. It
            teaches the agent to apply semantic HTML, accessible names, heading structure, keyboard
            access, skip links, and focus styles whenever it writes or reviews UI.
          </p>
        </div>
        <div hlmCardContent class="flex flex-col gap-4">
          @for (paragraph of skillSummary; track paragraph) {
            <p class="text-sm text-muted-foreground">{{ paragraph }}</p>
          }
          <table class="w-full text-sm">
            <caption class="sr-only">
              Where to install the downloaded skill file
            </caption>
            <thead>
              <tr class="border-b border-border text-left">
                <th class="py-2 pr-4 font-medium" scope="col">Tool</th>
                <th class="py-2 font-medium" scope="col">Save as</th>
              </tr>
            </thead>
            <tbody>
              @for (row of skillInstall; track row.tool) {
                <tr class="border-b border-border last:border-b-0">
                  <th class="py-2 pr-4 font-normal" scope="row">{{ row.tool }}</th>
                  <td class="py-2 font-mono text-xs">{{ row.path }}</td>
                </tr>
              }
            </tbody>
          </table>
          <p>
            <a hlmBtn [href]="skillFile.href" [attr.download]="skillFile.filename">
              <ng-icon name="phosphorDownloadSimple" data-icon="inline-start" />
              Download the accessibility skill
            </a>
          </p>
        </div>
      </hlm-card>

      <section class="mt-12" aria-labelledby="layers-heading">
        <h2 id="layers-heading" class="text-lg font-semibold">A layered process</h2>
        <p class="mt-2 max-w-prose text-sm text-muted-foreground">
          No single tool covers accessibility. Stack a cheap check at write-time, a linter on save,
          axe in Storybook and CI, and a short keyboard pass before you ship.
        </p>
        <table class="mt-5 w-full text-sm">
          <caption class="sr-only">
            Accessibility checks by layer of the developer process
          </caption>
          <thead>
            <tr class="border-b border-border text-left">
              <th class="py-2 pr-4 font-medium" scope="col">Layer</th>
              <th class="py-2 pr-4 font-medium" scope="col">When</th>
              <th class="py-2 font-medium" scope="col">What it catches</th>
            </tr>
          </thead>
          <tbody>
            @for (row of layers; track row.layer) {
              <tr class="border-b border-border align-top last:border-b-0">
                <th class="py-2 pr-4 font-medium" scope="row">{{ row.layer }}</th>
                <td class="py-2 pr-4 text-muted-foreground">{{ row.when }}</td>
                <td class="py-2 text-muted-foreground">{{ row.catches }}</td>
              </tr>
            }
          </tbody>
        </table>
      </section>

      @for (section of sections; track section.id) {
        <section class="mt-12" [attr.aria-labelledby]="section.id + '-heading'">
          <h2 [id]="section.id + '-heading'" class="text-lg font-semibold">{{ section.title }}</h2>
          @for (paragraph of section.paragraphs; track paragraph) {
            <p class="mt-2 max-w-prose text-sm text-muted-foreground">{{ paragraph }}</p>
          }
          @if (section.bullets) {
            <ul class="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              @for (item of section.bullets; track item) {
                <li>{{ item }}</li>
              }
            </ul>
          }
          @if (section.links) {
            <ul class="mt-3 list-disc space-y-1 pl-5 text-sm">
              @for (link of section.links; track link.href) {
                <li>
                  <a
                    class="text-link underline-offset-4 hover:underline"
                    [href]="link.href"
                    rel="noreferrer"
                    target="_blank"
                    >{{ link.label }}</a
                  >
                </li>
              }
            </ul>
          }
        </section>
      }
    </article>
  `,
})
export class AccessibilityGuideComponent {
  protected readonly intro = ACCESSIBILITY_PAGE_INTRO;
  protected readonly skillFile = ACCESSIBILITY_SKILL_FILE;
  protected readonly skillInstall: AccessibilityInstallTarget[] = ACCESSIBILITY_SKILL_INSTALL;
  protected readonly skillSummary = ACCESSIBILITY_SKILL_SUMMARY;
  protected readonly layers: AccessibilityLayer[] = ACCESSIBILITY_LAYERS;
  protected readonly sections: AccessibilityDocSection[] = ACCESSIBILITY_SECTIONS;
}

const meta: Meta<AccessibilityGuideComponent> = {
  title: 'Foundations/Accessibility',
  component: AccessibilityGuideComponent,
  decorators: [
    moduleMetadata({
      imports: [AccessibilityGuideComponent],
    }),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'How to weave accessibility into everyday development: a downloadable agent skill, ' +
          'Storybook’s a11y addon, linting, automated tests, CI, and the manual checks those ' +
          'tools cannot replace.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<AccessibilityGuideComponent>;

/** Process guide plus a downloadable agent skill for Cursor, Claude Code, and similar tools. */
export const Guide: Story = {
  render: () => ({
    template: `<surf-accessibility-guide></surf-accessibility-guide>`,
  }),
};
