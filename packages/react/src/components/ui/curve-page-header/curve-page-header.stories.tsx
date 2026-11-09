import type { Meta, StoryObj } from '@storybook/react-vite';
import { EyeIcon, GlobeIcon, PencilSimpleIcon, ShareNetworkIcon } from '@phosphor-icons/react';
import { curvePageHeaderContract } from '@surfnet/curve-contracts';

import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import {
  CurvePageHeader,
  CurvePageHeaderActions,
  CurvePageHeaderBadges,
  CurvePageHeaderContent,
  CurvePageHeaderDescription,
  CurvePageHeaderMedia,
  CurvePageHeaderTab,
  CurvePageHeaderTabs,
  CurvePageHeaderTitle,
  type CurvePageHeaderAction,
} from './curve-page-header';

// ---------------------------------------------------------------------------
// Shared fixtures (same data as the Angular story)
// ---------------------------------------------------------------------------

const actions: CurvePageHeaderAction[] = [
  { id: 'view', label: 'View', icon: EyeIcon },
  { id: 'share', label: 'Share', icon: ShareNetworkIcon },
  { id: 'edit', label: 'Edit', icon: PencilSimpleIcon },
  { id: 'publish', label: 'Publish', primary: true },
];

const tabs = [
  { value: 'overview', label: 'Overview' },
  { value: 'settings', label: 'Settings' },
  { value: 'members', label: 'Members' },
  { value: 'activity', label: 'Activity' },
];

const logAction = (action: CurvePageHeaderAction) => console.log('Action triggered:', action.id);

const crumbs = (
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Apps</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>App catalog</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
);

const title = <CurvePageHeaderTitle>App catalog</CurvePageHeaderTitle>;

const badges = (
  <CurvePageHeaderBadges>
    <Badge variant="success">Published</Badge>
    <Badge variant="secondary">SURFconext</Badge>
  </CurvePageHeaderBadges>
);

const description = (
  <CurvePageHeaderDescription>
    Browse, connect and manage the applications that are available to your institution.
  </CurvePageHeaderDescription>
);

const iconMedia = (
  <CurvePageHeaderMedia variant="icon">
    <GlobeIcon aria-hidden="true" />
  </CurvePageHeaderMedia>
);

const tabNav = (active: string) => (
  <CurvePageHeaderTabs>
    {tabs.map((tab) => (
      <CurvePageHeaderTab key={tab.value} href={`#${tab.value}`} active={tab.value === active}>
        {tab.label}
      </CurvePageHeaderTab>
    ))}
  </CurvePageHeaderTabs>
);

const fullHeader = (
  <CurvePageHeader>
    {crumbs}
    {iconMedia}
    <CurvePageHeaderContent>
      {title}
      {badges}
      {description}
    </CurvePageHeaderContent>
    <CurvePageHeaderActions actions={actions} onActionTriggered={logAction} />
    {tabNav('overview')}
  </CurvePageHeader>
);

// ---------------------------------------------------------------------------
// Meta + stories
// ---------------------------------------------------------------------------

const meta = {
  title: 'Components/CurvePageHeader',
  component: CurvePageHeader,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: curvePageHeaderContract.docs.description,
      },
    },
  },
} satisfies Meta<typeof CurvePageHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Every part in place. */
export const Default: Story = {
  render: () => fullHeader,
};

/** Only the title: the one part that is always required. */
export const TitleOnly: Story = {
  render: () => (
    <CurvePageHeader>
      <CurvePageHeaderContent>{title}</CurvePageHeaderContent>
    </CurvePageHeader>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <CurvePageHeader>
      <CurvePageHeaderContent>
        {title}
        {description}
      </CurvePageHeaderContent>
    </CurvePageHeader>
  ),
};

export const WithBreadcrumbs: Story = {
  render: () => (
    <CurvePageHeader>
      {crumbs}
      <CurvePageHeaderContent>
        {title}
        {description}
      </CurvePageHeaderContent>
    </CurvePageHeader>
  ),
};

/** `default` keeps the media as-is, `icon` adds a muted tile, `image` crops a square thumbnail. */
export const MediaVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <CurvePageHeader>
        <CurvePageHeaderMedia variant="default">
          <GlobeIcon className="size-8" aria-hidden="true" />
        </CurvePageHeaderMedia>
        <CurvePageHeaderContent>
          <CurvePageHeaderTitle>Default media</CurvePageHeaderTitle>
        </CurvePageHeaderContent>
      </CurvePageHeader>
      <CurvePageHeader>
        {iconMedia}
        <CurvePageHeaderContent>
          <CurvePageHeaderTitle>Icon media</CurvePageHeaderTitle>
        </CurvePageHeaderContent>
      </CurvePageHeader>
      <CurvePageHeader>
        <CurvePageHeaderMedia variant="image">
          <img src="https://github.com/shadcn.png" alt="" />
        </CurvePageHeaderMedia>
        <CurvePageHeaderContent>
          <CurvePageHeaderTitle>Image media</CurvePageHeaderTitle>
        </CurvePageHeaderContent>
      </CurvePageHeader>
    </div>
  ),
};

export const WithBadges: Story = {
  render: () => (
    <CurvePageHeader>
      <CurvePageHeaderContent>
        {title}
        {badges}
        {description}
      </CurvePageHeaderContent>
    </CurvePageHeader>
  ),
};

/** Secondary actions are ghost buttons with an icon; the primary action is on the right. */
export const WithActions: Story = {
  render: () => (
    <CurvePageHeader>
      <CurvePageHeaderContent>
        {title}
        {description}
      </CurvePageHeaderContent>
      <CurvePageHeaderActions actions={actions} onActionTriggered={logAction} />
    </CurvePageHeader>
  ),
};

/** Tabs are page-level navigation links. The `active` one gets `aria-current="page"`. */
export const WithTabs: Story = {
  render: () => (
    <CurvePageHeader>
      <CurvePageHeaderContent>
        {title}
        {description}
      </CurvePageHeaderContent>
      {tabNav('settings')}
    </CurvePageHeader>
  ),
};

/**
 * In a narrow container the actions move below the description. The primary action comes
 * first, then one secondary action; the rest are in the "More actions" menu.
 */
export const Narrow: Story = {
  render: () => <div className="max-w-sm">{fullHeader}</div>,
};
