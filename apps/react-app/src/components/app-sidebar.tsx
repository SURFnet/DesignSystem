'use client';

import { useRouter } from 'next/navigation';
import {
  AppWindowIcon,
  BuildingsIcon,
  CaretUpDownIcon,
  ChatCircleDotsIcon,
  CheckCircleIcon,
  HouseIcon,
  LifebuoyIcon,
  ScrollIcon,
  ShieldCheckIcon,
  SignOutIcon,
  SquaresFourIcon,
  UsersIcon,
  UsersThreeIcon,
  type Icon,
} from '@phosphor-icons/react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@surfnet/curve-react';

import type { SessionUser } from '@/lib/mock-data';

type NavItem = { title: string; icon: Icon; active?: boolean };
type NavGroup = { label?: string; items: NavItem[] };

const groups: NavGroup[] = [
  {
    items: [{ title: 'Home', icon: HouseIcon }],
  },
  {
    label: 'Apps',
    items: [
      { title: 'Our apps', icon: SquaresFourIcon },
      { title: 'Enabled apps', icon: CheckCircleIcon },
      { title: 'Browse apps', icon: AppWindowIcon, active: true },
      { title: 'Roles', icon: ShieldCheckIcon },
      { title: 'Collaborative groups', icon: UsersThreeIcon },
    ],
  },
  {
    label: 'Organisation',
    items: [
      { title: 'My organisation', icon: BuildingsIcon },
      { title: 'Users', icon: UsersIcon },
      { title: 'Policies', icon: ScrollIcon },
    ],
  },
  {
    label: 'Support',
    items: [
      { title: 'SURF Service desk', icon: LifebuoyIcon },
      { title: 'Give us feedback', icon: ChatCircleDotsIcon },
    ],
  },
];

export function AppSidebar({ user }: { user: SessionUser }) {
  const router = useRouter();

  const initials = user.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <SquaresFourIcon className="size-4" weight="fill" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">SURF Access</span>
                <span className="text-xs text-muted-foreground">v1.0.1</span>
              </div>
              <CaretUpDownIcon className="ml-auto" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {groups.map((group, index) => (
          <SidebarGroup key={index}>
            {group.label ? <SidebarGroupLabel>{group.label}</SidebarGroupLabel> : null}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton isActive={item.active} tooltip={item.title}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton size="lg">
                    <Avatar size="sm">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0.5 leading-none">
                      <span className="font-semibold">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.organisation}</span>
                    </div>
                    <CaretUpDownIcon className="ml-auto" />
                  </SidebarMenuButton>
                }
              />
              <DropdownMenuContent side="top" align="start" className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-xs font-normal text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/login')}>
                  <SignOutIcon />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
