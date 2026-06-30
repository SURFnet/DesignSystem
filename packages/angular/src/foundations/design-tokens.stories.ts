import { Component, Input, type OnDestroy, type OnInit, signal } from '@angular/core';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import {
  getTokenGroups,
  getTypographyScale,
  readTokenValue,
  type TokenGroupWithTokens,
} from '@surfnet/storybook-config';

/**
 * Renders the named token groups with live swatches. Values are read from the
 * `<html>` computed style and refreshed whenever the theme/mode classes change
 * (the global `themeSwitcher()` decorator toggles them from the toolbar), so the
 * printed values always match the painted theme.
 */
@Component({
  selector: 'surf-design-tokens',
  standalone: true,
  template: `
    <div class="max-w-5xl text-foreground">
      @for (entry of groups; track entry.group.id) {
        <section class="mb-12">
          <h3 class="text-lg font-semibold text-foreground">{{ entry.group.title }}</h3>
          <p class="mb-5 max-w-prose text-sm text-muted-foreground">
            {{ entry.group.description }}
          </p>

          @switch (entry.group.kind) {
            @case ('color') {
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                @for (t of entry.tokens; track t.name) {
                  <div class="flex items-center gap-3">
                    <div
                      class="size-10 shrink-0 overflow-hidden rounded-md border border-border"
                      [style.background-image]="checker.image"
                      [style.background-size]="checker.size"
                    >
                      <div class="size-full" [style.background-color]="cssVar(t.name)"></div>
                    </div>
                    <div class="min-w-0">
                      <div class="truncate font-mono text-sm">{{ t.name }}</div>
                      <div class="truncate font-mono text-xs text-muted-foreground">
                        {{ val(t.name) || '—' }}
                      </div>
                    </div>
                  </div>
                }
              </div>
            }
            @case ('radius') {
              <div class="flex flex-wrap gap-6">
                @for (t of entry.tokens; track t.name) {
                  <div class="flex flex-col items-center gap-2 text-center">
                    <div
                      class="size-16 border-2 border-primary bg-muted"
                      [style.border-radius]="cssVar(t.name)"
                    ></div>
                    <div class="font-mono text-xs">{{ t.name }}</div>
                    <div class="font-mono text-xs text-muted-foreground">{{ val(t.name) }}</div>
                  </div>
                }
              </div>
            }
            @case ('font-family') {
              @for (t of entry.tokens; track t.name) {
                <div class="border-b border-border py-3 last:border-b-0">
                  <div class="flex items-baseline justify-between gap-6">
                    <span class="font-mono text-sm">{{ t.name }}</span>
                    <span class="shrink-0 font-mono text-xs text-muted-foreground">{{
                      val(t.name)
                    }}</span>
                  </div>
                  <p class="mt-1 text-xl" [style.font-family]="cssVar(t.name)">
                    The quick brown fox jumps over the lazy dog
                  </p>
                </div>
              }
            }
            @case ('font-weight') {
              @for (t of entry.tokens; track t.name) {
                <div
                  class="flex items-baseline justify-between gap-6 border-b border-border py-2 last:border-b-0"
                >
                  <span class="text-lg" [style.font-weight]="val(t.name)">{{
                    weightLabel(t.name)
                  }}</span>
                  <span class="shrink-0 font-mono text-xs text-muted-foreground">{{
                    val(t.name)
                  }}</span>
                </div>
              }
            }
            @case ('font-size') {
              @for (s of typeScale; track s.id) {
                <div
                  class="flex items-baseline justify-between gap-6 border-b border-border py-3 last:border-b-0"
                >
                  <span
                    class="truncate"
                    [style.font-size]="cssVar(s.fontSizeName)"
                    [style.line-height]="cssVar(s.lineHeightName)"
                    >{{ s.id }} — Almost before we knew it</span
                  >
                  <span class="shrink-0 font-mono text-xs text-muted-foreground"
                    >{{ val(s.fontSizeName) }} / {{ val(s.lineHeightName) }}</span
                  >
                </div>
              }
            }
            @default {
              @for (t of entry.tokens; track t.name) {
                <div
                  class="flex items-center justify-between gap-6 border-b border-border py-1.5 last:border-b-0"
                >
                  <span class="font-mono text-sm">{{ t.name }}</span>
                  <span class="shrink-0 font-mono text-xs text-muted-foreground">{{
                    val(t.name) || '—'
                  }}</span>
                </div>
              }
            }
          }
        </section>
      }
    </div>
  `,
})
export class DesignTokensComponent implements OnInit, OnDestroy {
  @Input({ required: true }) ids: string[] = [];

  protected groups: TokenGroupWithTokens[] = [];
  protected readonly typeScale = getTypographyScale();
  protected readonly checker = {
    image: 'repeating-conic-gradient(#cbd5e1 0% 25%, #ffffff 0% 50%)',
    size: '12px 12px',
  };

  private readonly values = signal<Record<string, string>>({});
  private observer?: MutationObserver;

  ngOnInit(): void {
    const byId = new Map(getTokenGroups().map((g) => [g.group.id, g]));
    this.groups = this.ids
      .map((id) => byId.get(id))
      .filter((g): g is TokenGroupWithTokens => Boolean(g));

    this.refresh();
    this.observer = new MutationObserver(() => this.refresh());
    this.observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  protected val(name: string): string {
    return this.values()[name] ?? '';
  }

  protected cssVar(name: string): string {
    return `var(--${name})`;
  }

  protected weightLabel(name: string): string {
    return name.replace('font-weight-', '');
  }

  private refresh(): void {
    const map: Record<string, string> = {};
    for (const { tokens } of this.groups) {
      for (const t of tokens) map[t.name] = readTokenValue(t.name);
    }
    this.values.set(map);
  }
}

const meta: Meta<DesignTokensComponent> = {
  title: 'Foundations/Design Tokens',
  component: DesignTokensComponent,
  decorators: [moduleMetadata({ imports: [DesignTokensComponent] })],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The design tokens shipped by `@surfnet/tokens`. Use the **Theme** and **Mode** ' +
          'toolbar selectors to see each token’s resolved value in any theme or in light / dark mode.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<DesignTokensComponent>;

const story = (ids: string[]): Story => ({
  render: () => ({
    props: { ids },
    template: `<surf-design-tokens [ids]="ids"></surf-design-tokens>`,
  }),
});

/** Semantic, chart, sidebar, alpha and internal colour tokens. */
export const Colors: Story = story(['semantic', 'chart', 'sidebar', 'alpha', 'custom']);

/** The type scale, font families and font weights. */
export const Typography: Story = story(['typography', 'font-family', 'font-weight']);

/** Corner radii, container widths and breakpoints. */
export const RadiusAndSpacing: Story = story(['radius', 'container', 'breakpoint']);

/** Shadow primitives and blur radii. */
export const ShadowsAndEffects: Story = story(['shadow', 'blur']);
