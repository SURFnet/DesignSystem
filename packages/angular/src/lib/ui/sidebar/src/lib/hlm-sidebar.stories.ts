import { Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  phosphorGauge,
  phosphorGear,
  phosphorSquaresFour,
  phosphorUser,
} from '@ng-icons/phosphor-icons/regular';
import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { sidebarContract, sidebarMenuButtonContract } from '@surfnet/curve-contracts';
import { HlmSidebar, HlmSidebarImports } from '..';
import type { SidebarVariant as SidebarVariantName } from './hlm-sidebar.service';

const meta: Meta<HlmSidebar> = {
  title: 'Components/Sidebar',
  component: HlmSidebar,
  decorators: [
    moduleMetadata({
      imports: [HlmSidebarImports],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: sidebarContract.docs.description,
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=25594-28607',
    },
  },
  argTypes: {
    side: {
      control: 'inline-radio',
      options: ['left', 'right'],
      description: 'Which edge of the screen the sidebar sits on.',
      table: { defaultValue: { summary: 'left' } },
    },
    variant: {
      control: 'inline-radio',
      options: ['sidebar', 'floating', 'inset'],
      description: 'Visual style: flush against the edge, floating, or inset next to the content.',
      table: { defaultValue: { summary: 'sidebar' } },
    },
    collapsible: {
      control: 'inline-radio',
      options: ['offcanvas', 'icon', 'none'],
      description:
        'How the sidebar collapses: slide off screen, shrink to an icon rail, or not at all.',
      table: { defaultValue: { summary: 'offcanvas' } },
    },
  },
  args: {
    side: 'left',
    variant: 'sidebar',
    collapsible: 'offcanvas',
  },
};

export default meta;
type Story = StoryObj<HlmSidebar>;

@Component({
  selector: 'sidebar',
  imports: [HlmSidebarImports, NgIcon],
  providers: [provideIcons({ phosphorGear, phosphorGauge, phosphorSquaresFour, phosphorUser })],
  template: `
    <div hlmSidebarWrapper>
      <hlm-sidebar [side]="side" [variant]="variant" [collapsible]="collapsible">
        <div hlmSidebarHeader>
          <div hlmSidebarMenu>
            <div hlmSidebarMenuItem>
              <button hlmSidebarMenuButton size="lg">
                <ng-icon name="phosphorSquaresFour" />
                <span>App catalog</span>
              </button>
            </div>
          </div>
        </div>
        <div hlmSidebarContent>
          <div hlmSidebarGroup>
            <div hlmSidebarGroupLabel>Platform</div>
            <div hlmSidebarGroupContent>
              <ul hlmSidebarMenu>
                @for (item of nav; track item.title) {
                  <li hlmSidebarMenuItem>
                    <button hlmSidebarMenuButton [isActive]="item.active" [tooltip]="item.title">
                      <ng-icon [name]="item.icon" />
                      <span>{{ item.title }}</span>
                    </button>
                    @if (item.title === 'Apps') {
                      <ul hlmSidebarMenuSub>
                        <li hlmSidebarMenuSubItem>
                          <button hlmSidebarMenuSubButton>Catalog</button>
                        </li>
                        <li hlmSidebarMenuSubItem>
                          <button hlmSidebarMenuSubButton>Installed</button>
                        </li>
                      </ul>
                    }
                  </li>
                }
              </ul>
            </div>
          </div>
        </div>
        <div hlmSidebarFooter>
          <div hlmSidebarMenu>
            <div hlmSidebarMenuItem>
              <button hlmSidebarMenuButton tooltip="Settings">
                <ng-icon name="phosphorGear" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>
      </hlm-sidebar>
      <main hlmSidebarInset>
        <header class="flex h-12 items-center gap-2 border-b px-4">
          <button hlmSidebarTrigger></button>
          <span class="text-sm font-medium">App catalog</span>
        </header>
        <div class="p-4 text-sm text-muted-foreground">Page content goes here.</div>
      </main>
    </div>
  `,
})
class Sidebar {
  @Input() side: 'left' | 'right' = 'left';
  @Input() variant: SidebarVariantName = 'sidebar';
  @Input() collapsible: 'offcanvas' | 'icon' | 'none' = 'offcanvas';

  public readonly nav = [
    { title: 'Dashboard', icon: 'phosphorGauge', active: true },
    { title: 'Apps', icon: 'phosphorSquaresFour' },
    { title: 'Users', icon: 'phosphorUser' },
  ];
}

/** A full sidebar with a collapsible icon rail, grouped menu, submenu, and trigger. */
export const Default: Story = {
  args: { collapsible: 'icon' },
  render: (args) => ({
    moduleMetadata: {
      imports: [Sidebar],
    },
    props: args,
    template: `<sidebar ${argsToTemplate(args)} />`,
  }),
};

@Component({
  selector: 'sidebar-variant',
  imports: [HlmSidebarImports, NgIcon],
  providers: [provideIcons({ phosphorSquaresFour })],
  template: `
    <div hlmSidebarWrapper>
      <hlm-sidebar collapsible="none" class="w-64 border-r">
        <div hlmSidebarContent>
          <div hlmSidebarGroup>
            <div hlmSidebarGroupLabel>Variants</div>
            <div hlmSidebarGroupContent>
              <ul hlmSidebarMenu>
                @for (variant of contract.props.variants; track variant) {
                  <li hlmSidebarMenuItem>
                    <button
                      hlmSidebarMenuButton
                      [variant]="variant"
                      [title]="contract.docs.variants[variant]"
                    >
                      <ng-icon name="phosphorSquaresFour" />
                      <span>{{ variant }}</span>
                    </button>
                  </li>
                }
              </ul>
            </div>
          </div>
          <div hlmSidebarGroup>
            <div hlmSidebarGroupLabel>Sizes</div>
            <div hlmSidebarGroupContent>
              <ul hlmSidebarMenu>
                @for (size of contract.props.sizes; track size) {
                  <li hlmSidebarMenuItem>
                    <button hlmSidebarMenuButton [size]="size" [title]="contract.docs.sizes[size]">
                      <ng-icon name="phosphorSquaresFour" />
                      <span>{{ size }}</span>
                    </button>
                  </li>
                }
              </ul>
            </div>
          </div>
        </div>
      </hlm-sidebar>
    </div>
  `,
})
class SidebarVariant {
  @Input() contract!: typeof sidebarMenuButtonContract;
}

/** The `SidebarMenuButton` variants and sizes declared in the contract. */
export const MenuButtonVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    moduleMetadata: {
      imports: [SidebarVariant],
    },
    props: { contract: sidebarMenuButtonContract },
    template: '<sidebar-variant [contract]="contract"></sidebar-variant>',
  }),
};
