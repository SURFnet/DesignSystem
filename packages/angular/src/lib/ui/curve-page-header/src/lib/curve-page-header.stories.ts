import { provideLocationMocks } from '@angular/common/testing';
import { provideRouter, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  phosphorEye,
  phosphorGlobe,
  phosphorPencilSimple,
  phosphorShareNetwork,
} from '@ng-icons/phosphor-icons/regular';
import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { curvePageHeaderContract } from '@surfnet/curve-contracts';
import { HlmBadge } from '../../../badge/src';
import { HlmBreadcrumbImports } from '../../../breadcrumb/src';
import { CurvePageHeaderComponent, CurvePageHeaderImports, type CurvePageHeaderAction } from '..';

// ---------------------------------------------------------------------------
// Shared fixtures (same data as the React story)
// ---------------------------------------------------------------------------

const actions: CurvePageHeaderAction[] = [
  { id: 'view', label: 'View', icon: 'phosphorEye' },
  { id: 'share', label: 'Share', icon: 'phosphorShareNetwork' },
  { id: 'edit', label: 'Edit', icon: 'phosphorPencilSimple' },
  { id: 'publish', label: 'Publish', primary: true },
];

const props = {
  actions,
  log: (action: CurvePageHeaderAction) => console.log('Action triggered:', action.id),
};

/**
 * Each story spells out its whole template, so "Show code" in the docs shows the exact,
 * readable markup to copy.
 */
const story = (template: string): Story => ({
  render: () => ({ props, template: template.trim() }),
});

// The full header, shared by Default and Narrow (which wraps it in a small container).
const fullHeader = `
<curve-page-header>
  <nav hlmBreadcrumb>
    <ol hlmBreadcrumbList>
      <li hlmBreadcrumbItem><a hlmBreadcrumbLink link="/">Home</a></li>
      <li hlmBreadcrumbSeparator></li>
      <li hlmBreadcrumbItem><a hlmBreadcrumbLink link="/apps">Apps</a></li>
      <li hlmBreadcrumbSeparator></li>
      <li hlmBreadcrumbItem><span hlmBreadcrumbPage>App catalog</span></li>
    </ol>
  </nav>

  <div curvePageHeaderMedia variant="icon">
    <ng-icon name="phosphorGlobe" aria-hidden="true" />
  </div>

  <div curvePageHeaderContent>
    <h1 curvePageHeaderTitle>App catalog</h1>
    <div curvePageHeaderBadges>
      <span hlmBadge variant="success">Published</span>
      <span hlmBadge variant="secondary">SURFconext</span>
    </div>
    <p curvePageHeaderDescription>
      Browse, connect and manage the applications that are available to your institution.
    </p>
  </div>

  <curve-page-header-actions [actions]="actions" (actionTriggered)="log($event)" />

  <nav curvePageHeaderTabs>
    <a curvePageHeaderTab routerLink="/overview" active>Overview</a>
    <a curvePageHeaderTab routerLink="/settings">Settings</a>
    <a curvePageHeaderTab routerLink="/members">Members</a>
    <a curvePageHeaderTab routerLink="/activity">Activity</a>
  </nav>
</curve-page-header>`;

// ---------------------------------------------------------------------------
// Meta + stories
// ---------------------------------------------------------------------------

const meta: Meta<CurvePageHeaderComponent> = {
  title: 'Components/CurvePageHeader',
  component: CurvePageHeaderComponent,
  decorators: [
    moduleMetadata({
      imports: [CurvePageHeaderImports, HlmBadge, HlmBreadcrumbImports, NgIcon, RouterLink],
    }),
    applicationConfig({
      providers: [
        provideRouter([]),
        provideLocationMocks(),
        provideIcons({ phosphorEye, phosphorGlobe, phosphorPencilSimple, phosphorShareNetwork }),
      ],
    }),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: curvePageHeaderContract.docs.description,
      },
    },
  },
};

export default meta;
type Story = StoryObj<CurvePageHeaderComponent>;

/** Every part in place. */
export const Default: Story = story(fullHeader);

/** Only the title: the one part that is always required. */
export const TitleOnly: Story = story(`
<curve-page-header>
  <div curvePageHeaderContent>
    <h1 curvePageHeaderTitle>App catalog</h1>
  </div>
</curve-page-header>`);

export const WithDescription: Story = story(`
<curve-page-header>
  <div curvePageHeaderContent>
    <h1 curvePageHeaderTitle>App catalog</h1>
    <p curvePageHeaderDescription>
      Browse, connect and manage the applications that are available to your institution.
    </p>
  </div>
</curve-page-header>`);

export const WithBreadcrumbs: Story = story(`
<curve-page-header>
  <nav hlmBreadcrumb>
    <ol hlmBreadcrumbList>
      <li hlmBreadcrumbItem><a hlmBreadcrumbLink link="/">Home</a></li>
      <li hlmBreadcrumbSeparator></li>
      <li hlmBreadcrumbItem><a hlmBreadcrumbLink link="/apps">Apps</a></li>
      <li hlmBreadcrumbSeparator></li>
      <li hlmBreadcrumbItem><span hlmBreadcrumbPage>App catalog</span></li>
    </ol>
  </nav>

  <div curvePageHeaderContent>
    <h1 curvePageHeaderTitle>App catalog</h1>
    <p curvePageHeaderDescription>
      Browse, connect and manage the applications that are available to your institution.
    </p>
  </div>
</curve-page-header>`);

/** `default` keeps the media as-is, `icon` adds a muted tile, `image` crops a square thumbnail. */
export const MediaVariants: Story = story(`
<div class="flex flex-col gap-8">
  <curve-page-header>
    <div curvePageHeaderMedia variant="default">
      <ng-icon name="phosphorGlobe" size="2rem" aria-hidden="true" />
    </div>
    <div curvePageHeaderContent>
      <h1 curvePageHeaderTitle>Default media</h1>
    </div>
  </curve-page-header>

  <curve-page-header>
    <div curvePageHeaderMedia variant="icon">
      <ng-icon name="phosphorGlobe" aria-hidden="true" />
    </div>
    <div curvePageHeaderContent>
      <h1 curvePageHeaderTitle>Icon media</h1>
    </div>
  </curve-page-header>

  <curve-page-header>
    <div curvePageHeaderMedia variant="image">
      <img src="https://github.com/shadcn.png" alt="" />
    </div>
    <div curvePageHeaderContent>
      <h1 curvePageHeaderTitle>Image media</h1>
    </div>
  </curve-page-header>
</div>`);

export const WithBadges: Story = story(`
<curve-page-header>
  <div curvePageHeaderContent>
    <h1 curvePageHeaderTitle>App catalog</h1>
    <div curvePageHeaderBadges>
      <span hlmBadge variant="success">Published</span>
      <span hlmBadge variant="secondary">SURFconext</span>
    </div>
    <p curvePageHeaderDescription>
      Browse, connect and manage the applications that are available to your institution.
    </p>
  </div>
</curve-page-header>`);

/** Secondary actions are ghost buttons with an icon; the primary action is on the right. */
export const WithActions: Story = story(`
<curve-page-header>
  <div curvePageHeaderContent>
    <h1 curvePageHeaderTitle>App catalog</h1>
    <p curvePageHeaderDescription>
      Browse, connect and manage the applications that are available to your institution.
    </p>
  </div>

  <curve-page-header-actions [actions]="actions" (actionTriggered)="log($event)" />
</curve-page-header>`);

/** Tabs are page-level navigation links. The `active` one gets `aria-current="page"`. */
export const WithTabs: Story = story(`
<curve-page-header>
  <div curvePageHeaderContent>
    <h1 curvePageHeaderTitle>App catalog</h1>
    <p curvePageHeaderDescription>
      Browse, connect and manage the applications that are available to your institution.
    </p>
  </div>

  <nav curvePageHeaderTabs>
    <a curvePageHeaderTab routerLink="/overview">Overview</a>
    <a curvePageHeaderTab routerLink="/settings" active>Settings</a>
    <a curvePageHeaderTab routerLink="/members">Members</a>
    <a curvePageHeaderTab routerLink="/activity">Activity</a>
  </nav>
</curve-page-header>`);

/**
 * In a narrow container the actions move below the description. The primary action comes
 * first, then one secondary action; the rest are in the "More actions" menu.
 */
export const Narrow: Story = story(`
<div class="max-w-sm">
${fullHeader
  .trim()
  .split('\n')
  .map((line) => `  ${line}`)
  .join('\n')}
</div>`);
