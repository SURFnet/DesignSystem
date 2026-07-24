import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorGauge, phosphorGearSix, phosphorUsers } from '@ng-icons/phosphor-icons/regular';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { navigationMenuContract } from '@surfnet/curve-contracts';

import { HlmNavigationMenu, HlmNavigationMenuImports } from '..';

const meta: Meta<HlmNavigationMenu> = {
  title: 'Components/NavigationMenu',
  component: HlmNavigationMenu,
  decorators: [
    moduleMetadata({
      imports: [HlmNavigationMenuImports, NgIcon],
      providers: [provideIcons({ phosphorGauge, phosphorUsers, phosphorGearSix })],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: navigationMenuContract.docs.description,
      },
    },
  },
};

export default meta;
type Story = StoryObj<HlmNavigationMenu>;

const components = [
  {
    title: 'Alert Dialog',
    href: '#alert-dialog',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '#hover-card',
    description: 'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '#progress',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Tabs',
    href: '#tabs',
    description: 'A set of layered sections of content that are displayed one at a time.',
  },
];

@Component({
  selector: 'navigation-menu-demo',
  imports: [HlmNavigationMenuImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav hlmNavigationMenu>
      <ul hlmNavigationMenuList>
        <li hlmNavigationMenuItem>
          <button hlmNavigationMenuTrigger>Home</button>
          <hlm-navigation-menu-content *hlmNavigationMenuPortal>
            <ul class="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li class="row-span-3">
                <a
                  hlmNavigationMenuLink
                  href="#"
                  class="flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-4 no-underline select-none"
                >
                  <div class="mb-2 text-lg font-medium">Curve</div>
                  <p class="text-sm leading-tight text-muted-foreground">
                    SURF's design system, built on Spartan's Brain and Helm layers.
                  </p>
                </a>
              </li>
              @for (component of components; track component.title) {
                <li>
                  <a hlmNavigationMenuLink [href]="component.href">
                    <div class="text-sm leading-none font-medium">{{ component.title }}</div>
                    <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      {{ component.description }}
                    </p>
                  </a>
                </li>
              }
            </ul>
          </hlm-navigation-menu-content>
        </li>

        <li hlmNavigationMenuItem>
          <button hlmNavigationMenuTrigger>Components</button>
          <hlm-navigation-menu-content *hlmNavigationMenuPortal>
            <ul class="grid w-[300px] gap-4">
              <li>
                <a hlmNavigationMenuLink href="#">
                  <div class="font-medium">Components</div>
                  <div class="text-muted-foreground">Browse all components in the library.</div>
                </a>
                <a hlmNavigationMenuLink href="#">
                  <div class="font-medium">Documentation</div>
                  <div class="text-muted-foreground">Learn how to use the library.</div>
                </a>
              </li>
            </ul>
          </hlm-navigation-menu-content>
        </li>

        <li hlmNavigationMenuItem>
          <a hlmNavigationMenuLink href="#">Docs</a>
        </li>
      </ul>
    </nav>
  `,
})
class NavigationMenuDemo {
  @Input() components!: typeof components;
}

/**
 * A composed menu with a featured item, a grid of links, and a plain link item — the
 * `nav`/`ul`/`li`/`button`/`hlm-navigation-menu-content`/`a` structure every navigation
 * menu is built from.
 *
 * Spartan's vendored `hlm-navigation-menu-content` is a styling-only directive and does
 * not expose the `align`/`navOffset` positioning inputs that upstream Spartan docs now
 * list — unlike React's `NavigationMenuContent`, which wraps a Base UI positioner and
 * takes `align`/`alignOffset` explicitly. Content anchors with the helm's built-in
 * offsets; there is no per-menu positioning override here.
 */
export const Default: Story = {
  render: () => ({
    moduleMetadata: { imports: [NavigationMenuDemo] },
    props: { components },
    template: '<navigation-menu-demo [components]="components" />',
  }),
};

/** Sub-items paired with a leading icon. */
export const WithIcon: Story = {
  render: () => ({
    template: `
      <nav hlmNavigationMenu>
        <ul hlmNavigationMenuList>
          <li hlmNavigationMenuItem>
            <button hlmNavigationMenuTrigger>Dashboard</button>
            <hlm-navigation-menu-content *hlmNavigationMenuPortal>
              <ul class="w-[220px]">
                <li>
                  <a hlmNavigationMenuLink href="#" class="flex-row items-center gap-2">
                    <ng-icon name="phosphorGauge" />
                    Analytics
                  </a>
                  <a hlmNavigationMenuLink href="#" class="flex-row items-center gap-2">
                    <ng-icon name="phosphorUsers" />
                    Team
                  </a>
                  <a hlmNavigationMenuLink href="#" class="flex-row items-center gap-2">
                    <ng-icon name="phosphorGearSix" />
                    Settings
                  </a>
                </li>
              </ul>
            </hlm-navigation-menu-content>
          </li>
        </ul>
      </nav>
    `,
  }),
};

/**
 * A row of plain links with no dropdown content. The first link is marked `active` to
 * highlight the current page.
 */
export const SimpleLinks: Story = {
  render: () => ({
    template: `
      <nav hlmNavigationMenu>
        <ul hlmNavigationMenuList>
          <li hlmNavigationMenuItem>
            <a hlmNavigationMenuLink href="#" [active]="true">Home</a>
          </li>
          <li hlmNavigationMenuItem>
            <a hlmNavigationMenuLink href="#">About</a>
          </li>
          <li hlmNavigationMenuItem>
            <a hlmNavigationMenuLink href="#">Contact</a>
          </li>
        </ul>
      </nav>
    `,
  }),
};

/** The `orientation` input switches roving focus to the up/down arrow keys and stacks the list. */
export const Vertical: Story = {
  render: () => ({
    template: `
      <nav hlmNavigationMenu orientation="vertical">
        <ul hlmNavigationMenuList class="w-40">
          <li hlmNavigationMenuItem>
            <button hlmNavigationMenuTrigger class="w-full">Menu</button>
            <hlm-navigation-menu-content *hlmNavigationMenuPortal>
              <ul class="w-[200px]">
                <li>
                  <a hlmNavigationMenuLink href="#">Components</a>
                  <a hlmNavigationMenuLink href="#">Documentation</a>
                </li>
              </ul>
            </hlm-navigation-menu-content>
          </li>
          <li hlmNavigationMenuItem>
            <a hlmNavigationMenuLink href="#" class="w-full">Docs</a>
          </li>
        </ul>
      </nav>
    `,
  }),
};
