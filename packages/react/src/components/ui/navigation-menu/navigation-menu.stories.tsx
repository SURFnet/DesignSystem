import { GaugeIcon, GearSixIcon, UsersIcon } from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { navigationMenuContract } from '@surfnet/curve-contracts';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from './navigation-menu';

const meta = {
  title: 'Components/NavigationMenu',
  component: NavigationMenu,
  parameters: {
    docs: {
      description: {
        component: navigationMenuContract.docs.description,
      },
    },
  },
} satisfies Meta<typeof NavigationMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

const components: { title: string; href: string; description: string }[] = [
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

function ListItem({
  title,
  children,
  href,
}: {
  title: string;
  children: React.ReactNode;
  href: string;
}) {
  return (
    <li>
      <NavigationMenuLink href={href}>
        <div className="text-sm leading-none font-medium">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
      </NavigationMenuLink>
    </li>
  );
}

/**
 * A composed menu with a two-column featured item, a grid of links, and a plain link
 * item styled with `navigationMenuTriggerStyle`.
 */
export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Home</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink
                  href="#"
                  className="flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-4 no-underline select-none"
                >
                  <div className="mb-2 text-lg font-medium">Curve</div>
                  <p className="text-sm leading-tight text-muted-foreground">
                    SURF's design system, built on shadcn/ui and Base UI.
                  </p>
                </NavigationMenuLink>
              </li>
              {components.map((component) => (
                <ListItem key={component.title} title={component.title} href={component.href}>
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-4">
              <li>
                <NavigationMenuLink href="#">
                  <div className="font-medium">Components</div>
                  <div className="text-muted-foreground">Browse all components in the library.</div>
                </NavigationMenuLink>
                <NavigationMenuLink href="#">
                  <div className="font-medium">Documentation</div>
                  <div className="text-muted-foreground">Learn how to use the library.</div>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

/** Sub-items paired with a leading icon. */
export const WithIcon: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Dashboard</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[220px] gap-1">
              <li>
                <NavigationMenuLink href="#" className="flex-row items-center gap-2">
                  <GaugeIcon />
                  Analytics
                </NavigationMenuLink>
                <NavigationMenuLink href="#" className="flex-row items-center gap-2">
                  <UsersIcon />
                  Team
                </NavigationMenuLink>
                <NavigationMenuLink href="#" className="flex-row items-center gap-2">
                  <GearSixIcon />
                  Settings
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

/** A row of plain links with no dropdown content, styled with `navigationMenuTriggerStyle`. */
export const SimpleLinks: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()} active>
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            About
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
            Contact
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

/** The `align` prop controls where the popup is anchored relative to its trigger. */
export const Alignment: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      {(['start', 'center', 'end'] as const).map((align) => (
        <div key={align} className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground">align="{align}"</span>
          <NavigationMenu align={align}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-4">
                    <li>
                      <NavigationMenuLink href="#">Components</NavigationMenuLink>
                      <NavigationMenuLink href="#">Documentation</NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      ))}
    </div>
  ),
};
