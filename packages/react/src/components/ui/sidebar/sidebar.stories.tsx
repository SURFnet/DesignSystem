import type { Meta, StoryObj } from '@storybook/react-vite';
import { sidebarContract, sidebarMenuButtonContract } from '@surfnet/curve-contracts';
import { SquaresFourIcon, GaugeIcon, GearIcon, UsersIcon } from '@phosphor-icons/react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from './sidebar';

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: sidebarContract.docs.description,
      },
    },
  },
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

const nav = [
  { title: 'Dashboard', icon: GaugeIcon, active: true },
  { title: 'Apps', icon: SquaresFourIcon },
  { title: 'Users', icon: UsersIcon },
];

/** A full sidebar with a collapsible icon rail, grouped menu, submenu, and trigger. */
export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <SquaresFourIcon />
                <span>App catalog</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {nav.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton isActive={item.active} tooltip={item.title}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                    {item.title === 'Apps' && (
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton>Catalog</SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton>Installed</SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings">
                <GearIcon />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <span className="text-sm font-medium">App catalog</span>
        </header>
        <div className="p-4 text-sm text-muted-foreground">Page content goes here.</div>
      </SidebarInset>
    </SidebarProvider>
  ),
};

/** The `SidebarMenuButton` variants and sizes declared in the contract. */
export const MenuButtonVariants: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar collapsible="none" className="w-64 border-r">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Variants</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarMenuButtonContract.props.variants.map((variant) => (
                  <SidebarMenuItem key={variant}>
                    <SidebarMenuButton
                      variant={variant}
                      title={sidebarMenuButtonContract.docs.variants[variant]}
                    >
                      <SquaresFourIcon />
                      <span>{variant}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Sizes</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebarMenuButtonContract.props.sizes.map((size) => (
                  <SidebarMenuItem key={size}>
                    <SidebarMenuButton
                      size={size}
                      title={sidebarMenuButtonContract.docs.sizes[size]}
                    >
                      <SquaresFourIcon />
                      <span>{size}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  ),
};
