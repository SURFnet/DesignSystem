'use client';

import * as React from 'react';
import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { DotsThreeVerticalIcon, type Icon } from '@phosphor-icons/react';
import type { CurvePageHeaderMediaVariantName } from '@surfnet/curve-contracts';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import pageHeaderStyles from './curve-page-header.module.css';

type PageHeaderModuleClasses = Record<
  | 'root'
  | 'media'
  | 'mediaDefault'
  | 'mediaIcon'
  | 'mediaImage'
  | 'content'
  | 'title'
  | 'badges'
  | 'description'
  | 'actions'
  | 'primaryAction'
  | 'overflowAction'
  | 'moreActions'
  | 'moreActionsMenu'
  | 'tabs'
  | 'tab',
  string
>;

const styles = pageHeaderStyles as PageHeaderModuleClasses;

const mediaVariantClass = {
  default: styles.mediaDefault,
  icon: styles.mediaIcon,
  image: styles.mediaImage,
} satisfies Record<CurvePageHeaderMediaVariantName, string>;

/**
 * The top section of a page. Put the parts inside in this order: `Breadcrumb`,
 * `CurvePageHeaderMedia`, `CurvePageHeaderContent`, `CurvePageHeaderActions`,
 * `CurvePageHeaderTabs`. Only the title is required.
 */
function CurvePageHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="curve-page-header" className={cn(styles.root, className)} {...props} />;
}

/** Image, avatar or icon before the title. */
function CurvePageHeaderMedia({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'div'> & { variant?: CurvePageHeaderMediaVariantName }) {
  return (
    <div
      data-slot="curve-page-header-media"
      data-variant={variant}
      className={cn(styles.media, mediaVariantClass[variant], className)}
      {...props}
    />
  );
}

/** Holds the title, badges and description. */
function CurvePageHeaderContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="curve-page-header-content"
      className={cn(styles.content, className)}
      {...props}
    />
  );
}

/** The page title. Renders an `<h1>`; pass `render={<h2 />}` for another level. */
function CurvePageHeaderTitle({ className, render, ...props }: useRender.ComponentProps<'h1'>) {
  return useRender({
    defaultTagName: 'h1',
    props: mergeProps<'h1'>({ className: cn(styles.title, className) }, props),
    render,
    state: { slot: 'curve-page-header-title' },
  });
}

/** Badges next to the title. Kept outside the heading so they are not part of its name. */
function CurvePageHeaderBadges({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="curve-page-header-badges" className={cn(styles.badges, className)} {...props} />
  );
}

function CurvePageHeaderDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="curve-page-header-description"
      className={cn(styles.description, className)}
      {...props}
    />
  );
}

/** A page action. Mark one as `primary`; the others are shown as ghost buttons. */
interface CurvePageHeaderAction {
  id: string;
  label: string;
  icon?: Icon;
  primary?: boolean;
}

interface CurvePageHeaderActionsProps extends Omit<React.ComponentProps<'div'>, 'children'> {
  actions: CurvePageHeaderAction[];
  /** Accessible name of the overflow menu button on narrow screens. */
  moreActionsLabel?: string;
  /** Called when someone clicks an action button or picks one from the overflow menu. */
  onActionTriggered?: (action: CurvePageHeaderAction) => void;
}

/**
 * The page actions. Wide: secondary actions, then the primary action on the right.
 * Narrow: the primary action, one secondary action, and the rest in a "More actions" menu.
 * Built from a list so both layouts always show the same actions.
 */
function CurvePageHeaderActions({
  actions,
  moreActionsLabel = 'More actions',
  onActionTriggered,
  className,
  ...props
}: CurvePageHeaderActionsProps) {
  const primary = actions.find((action) => action.primary);
  const secondary = actions.filter((action) => action !== primary);
  const overflow = secondary.slice(1);

  return (
    <div data-slot="curve-page-header-actions" className={cn(styles.actions, className)} {...props}>
      {secondary.map((action, index) => {
        const ActionIcon = action.icon;
        return (
          <Button
            key={action.id}
            variant="ghost"
            className={cn(index > 0 && styles.overflowAction)}
            onClick={() => onActionTriggered?.(action)}
          >
            {ActionIcon && <ActionIcon data-icon="inline-start" aria-hidden="true" />}
            {action.label}
          </Button>
        );
      })}
      {primary && (
        <Button className={styles.primaryAction} onClick={() => onActionTriggered?.(primary)}>
          {primary.icon && <primary.icon data-icon="inline-start" aria-hidden="true" />}
          {primary.label}
        </Button>
      )}
      {overflow.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className={styles.moreActions}
                aria-label={moreActionsLabel}
              >
                <DotsThreeVerticalIcon aria-hidden="true" />
              </Button>
            }
          />
          <DropdownMenuContent align="start" className={styles.moreActionsMenu}>
            {overflow.map((action) => {
              const ActionIcon = action.icon;
              return (
                <DropdownMenuItem key={action.id} onClick={() => onActionTriggered?.(action)}>
                  {ActionIcon && <ActionIcon aria-hidden="true" />}
                  {action.label}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}

/** Page-level navigation under the header. Holds `CurvePageHeaderTab` links. */
function CurvePageHeaderTabs({
  className,
  'aria-label': ariaLabel = 'Page navigation',
  ...props
}: React.ComponentProps<'nav'>) {
  return (
    <nav
      data-slot="curve-page-header-tabs"
      aria-label={ariaLabel}
      className={cn(styles.tabs, className)}
      {...props}
    />
  );
}

/**
 * One link in `CurvePageHeaderTabs`. Set `active` on the current page.
 * Pass `render={<Link href="…" />}` to use your router's link.
 */
function CurvePageHeaderTab({
  className,
  active = false,
  render,
  ...props
}: useRender.ComponentProps<'a'> & { active?: boolean }) {
  return useRender({
    defaultTagName: 'a',
    props: mergeProps<'a'>(
      { className: cn(styles.tab, className), 'aria-current': active ? 'page' : undefined },
      props,
    ),
    render,
    state: { slot: 'curve-page-header-tab' },
  });
}

export {
  CurvePageHeader,
  CurvePageHeaderActions,
  CurvePageHeaderBadges,
  CurvePageHeaderContent,
  CurvePageHeaderDescription,
  CurvePageHeaderMedia,
  CurvePageHeaderTab,
  CurvePageHeaderTabs,
  CurvePageHeaderTitle,
};
export type { CurvePageHeaderAction, CurvePageHeaderActionsProps };
