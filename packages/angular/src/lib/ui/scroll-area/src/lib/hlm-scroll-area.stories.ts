import { Component, Input } from '@angular/core';
import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';
import { scrollAreaContract } from '@surfnet/curve-contracts';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { HlmSeparatorImports } from '../../../separator/src';
import { HlmScrollArea, HlmScrollAreaImports } from '..';

const meta: Meta<HlmScrollArea> = {
  title: 'Components/ScrollArea',
  component: HlmScrollArea,
  decorators: [
    moduleMetadata({
      imports: [HlmScrollAreaImports, HlmSeparatorImports, NgScrollbarModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: scrollAreaContract.docs.description,
      },
    },
  },
};

export default meta;
type Story = StoryObj<HlmScrollArea>;

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

@Component({
  selector: 'scroll-area-default',
  imports: [HlmScrollAreaImports, HlmSeparatorImports, NgScrollbarModule],
  template: `
    <ng-scrollbar hlm class="h-72 w-48 border" appearance="compact">
      <div class="p-4">
        <h4 class="mb-4 text-sm leading-none font-medium">Tags</h4>
        @for (tag of tags; track tag) {
          <div class="text-sm">
            {{ tag }}
            <div hlmSeparator class="my-2"></div>
          </div>
        }
      </div>
    </ng-scrollbar>
  `,
})
class ScrollAreaDefault {
  @Input() tags: string[] = [];
}

/** A vertical scroll area constraining a long list of tags. */
export const Default: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ScrollAreaDefault],
    },
    props: { tags },
    template: '<scroll-area-default [tags]="tags"></scroll-area-default>',
  }),
};

@Component({
  selector: 'scroll-area-horizontal',
  imports: [HlmScrollAreaImports, NgScrollbarModule],
  template: `
    <ng-scrollbar hlm class="w-96 border whitespace-nowrap">
      <div class="flex w-max gap-4 p-4">
        @for (artist of artists; track artist) {
          <figure class="shrink-0">
            <div
              class="flex aspect-[3/4] h-40 items-center justify-center rounded-md bg-muted text-xs text-muted-foreground"
            >
              Artwork
            </div>
            <figcaption class="pt-2 text-xs text-muted-foreground">
              Photo by <span class="font-semibold text-foreground">{{ artist }}</span>
            </figcaption>
          </figure>
        }
      </div>
    </ng-scrollbar>
  `,
})
class ScrollAreaHorizontal {
  @Input() artists: string[] = [];
}

/**
 * `ngx-scrollbar` auto-detects scroll direction from its content, so there is no
 * `orientation` input to set here — unlike React's `ScrollBar`, which wraps a Base UI
 * primitive that takes one explicitly. Wide, `whitespace-nowrap` content simply
 * overflows horizontally and the scrollbar follows.
 */
export const Horizontal: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [ScrollAreaHorizontal],
    },
    props: { artists: ['Ornella Binni', 'Tom Byrom', 'Vladimir Malyavko'] },
    template: '<scroll-area-horizontal [artists]="artists"></scroll-area-horizontal>',
  }),
};
