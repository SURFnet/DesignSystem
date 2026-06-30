import { Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  phosphorGauge,
  phosphorGear,
  phosphorSquaresFour,
  phosphorUser,
} from '@ng-icons/phosphor-icons/regular';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { sidebarContract, sidebarMenuButtonContract } from '@surfnet/contracts';
import { HlmSidebar, HlmSidebarImports } from '..';

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
        component: sidebarContract.description,
      },
    },
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
      <hlm-sidebar>
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
  public readonly nav = [
    { title: 'Dashboard', icon: 'phosphorGauge', active: true },
    { title: 'Apps', icon: 'phosphorSquaresFour' },
    { title: 'Users', icon: 'phosphorUser' },
  ];
}

/** A full sidebar with a collapsible icon rail, grouped menu, submenu, and trigger. */
export const Default: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [Sidebar],
    },
    template: '<sidebar/>',
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
                @for (variant of contract.variants; track variant) {
                  <li hlmSidebarMenuItem>
                    <button
                      hlmSidebarMenuButton
                      [variant]="variant"
                      [title]="contract.variantDocs[variant]"
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
                @for (size of contract.sizes; track size) {
                  <li hlmSidebarMenuItem>
                    <button hlmSidebarMenuButton [size]="size" [title]="contract.sizeDocs[size]">
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
  render: () => ({
    moduleMetadata: {
      imports: [SidebarVariant],
    },
    props: { contract: sidebarMenuButtonContract },
    template: '<sidebar-variant [contract]="contract"></sidebar-variant>',
  }),
};
