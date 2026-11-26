import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorGauge, phosphorGearSix, phosphorUsers } from '@ng-icons/phosphor-icons/regular';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { navigationMenuContract } from '@surfnet/curve-contracts';

import { HlmNavigationMenu, HlmNavigationMenuImports } from '..';

// `orientation` comes from the BrnNavigationMenu host directive and `align` lives on each
// trigger (BrnNavigationMenuTrigger), so widen the story args to expose both as controls.
type NavigationMenuArgs = HlmNavigationMenu & {
  align: 'start' | 'center' | 'end';
  orientation: 'horizontal' | 'vertical';
};

const meta: Meta<NavigationMenuArgs> = {
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
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=209-1883',
    },
  },
  argTypes: {
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Where the popup is aligned relative to its trigger.',
      table: { defaultValue: { summary: 'start' } },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout direction of the menu and its arrow-key navigation.',
      table: { defaultValue: { summary: 'horizontal' } },
    },
  },
  args: {
    align: 'start',
    orientation: 'horizontal',
  },
};

export default meta;
type Story = StoryObj<NavigationMenuArgs>;

/**
 * A composed menu with a featured item, a grid of links, and a plain link item — the
 * `nav`/`ul`/`li`/`button`/`hlm-navigation-menu-content`/`a` structure every navigation
 * menu is built from.
 */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <nav hlmNavigationMenu [orientation]="orientation">
        <ul hlmNavigationMenuList>
          <li hlmNavigationMenuItem>
            <button hlmNavigationMenuTrigger [align]="align">Home</button>
            <hlm-navigation-menu-content *hlmNavigationMenuPortal>
              <ul class="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li class="row-span-3">
                  <a
                    hlmNavigationMenuLink
                    href="#"
                    class="story-nav-featured"
                  >
                    <div class="mb-2 text-lg font-medium">Curve</div>
                    <p class="text-sm leading-tight text-muted-foreground">
                      SURF's design system, built on Spartan's Brain and Helm layers.
                    </p>
                  </a>
                </li>
                <li>
                  <a hlmNavigationMenuLink href="#alert-dialog">
                    <div class="text-sm leading-none font-medium">Alert Dialog</div>
                    <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      A modal dialog that interrupts the user with important content and expects a response.
                    </p>
                  </a>
                </li>
                <li>
                  <a hlmNavigationMenuLink href="#hover-card">
                    <div class="text-sm leading-none font-medium">Hover Card</div>
                    <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      For sighted users to preview content available behind a link.
                    </p>
                  </a>
                </li>
                <li>
                  <a hlmNavigationMenuLink href="#progress">
                    <div class="text-sm leading-none font-medium">Progress</div>
                    <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Displays an indicator showing the completion progress of a task.
                    </p>
                  </a>
                </li>
                <li>
                  <a hlmNavigationMenuLink href="#tabs">
                    <div class="text-sm leading-none font-medium">Tabs</div>
                    <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      A set of layered sections of content displayed one at a time.
                    </p>
                  </a>
                </li>
              </ul>
            </hlm-navigation-menu-content>
          </li>

          <li hlmNavigationMenuItem>
            <button hlmNavigationMenuTrigger [align]="align">Components</button>
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
  }),
};

/** Sub-items paired with a leading icon. */
export const WithIcon: Story = {
  render: (args) => ({
    props: args,
    template: `
      <nav hlmNavigationMenu [orientation]="orientation">
        <ul hlmNavigationMenuList>
          <li hlmNavigationMenuItem>
            <button hlmNavigationMenuTrigger [align]="align">Dashboard</button>
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
  render: (args) => ({
    props: args,
    template: `
      <nav hlmNavigationMenu [orientation]="orientation">
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

/** The popup is anchored to the start of the trigger. */
export const AlignStart: Story = {
  args: { align: 'start' },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-col items-center gap-2">
        <nav hlmNavigationMenu [orientation]="orientation">
          <ul hlmNavigationMenuList>
            <li hlmNavigationMenuItem>
              <button hlmNavigationMenuTrigger [align]="align">Menu</button>
              <hlm-navigation-menu-content *hlmNavigationMenuPortal>
                <ul class="grid w-[200px] gap-4">
                  <li>
                    <a hlmNavigationMenuLink href="#">Components</a>
                    <a hlmNavigationMenuLink href="#">Documentation</a>
                  </li>
                </ul>
              </hlm-navigation-menu-content>
            </li>
          </ul>
        </nav>
      </div>
    `,
  }),
};

/** The popup is centered relative to the trigger. */
export const AlignCenter: Story = {
  args: { align: 'center' },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-col items-center gap-2">
        <nav hlmNavigationMenu [orientation]="orientation">
          <ul hlmNavigationMenuList>
            <li hlmNavigationMenuItem>
              <button hlmNavigationMenuTrigger [align]="align">Menu</button>
              <hlm-navigation-menu-content *hlmNavigationMenuPortal>
                <ul class="grid w-[200px] gap-4">
                  <li>
                    <a hlmNavigationMenuLink href="#">Components</a>
                    <a hlmNavigationMenuLink href="#">Documentation</a>
                  </li>
                </ul>
              </hlm-navigation-menu-content>
            </li>
          </ul>
        </nav>
      </div>
    `,
  }),
};

/** The popup is anchored to the end of the trigger. */
export const AlignEnd: Story = {
  args: { align: 'end' },
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-col items-center gap-2">
        <nav hlmNavigationMenu [orientation]="orientation">
          <ul hlmNavigationMenuList>
            <li hlmNavigationMenuItem>
              <button hlmNavigationMenuTrigger [align]="align">Menu</button>
              <hlm-navigation-menu-content *hlmNavigationMenuPortal>
                <ul class="grid w-[200px] gap-4">
                  <li>
                    <a hlmNavigationMenuLink href="#">Components</a>
                    <a hlmNavigationMenuLink href="#">Documentation</a>
                  </li>
                </ul>
              </hlm-navigation-menu-content>
            </li>
          </ul>
        </nav>
      </div>
    `,
  }),
};

/** The `orientation` prop switches roving focus to the up/down arrow keys and stacks the list. */
export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => ({
    props: args,
    template: `
      <nav hlmNavigationMenu [orientation]="orientation">
        <ul hlmNavigationMenuList class="w-40">
          <li hlmNavigationMenuItem>
            <button hlmNavigationMenuTrigger [align]="align" class="w-full">Menu</button>
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
