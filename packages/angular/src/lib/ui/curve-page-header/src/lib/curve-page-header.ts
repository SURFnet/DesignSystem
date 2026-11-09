import type { BooleanInput } from '@angular/cdk/coercion';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  Directive,
  input,
} from '@angular/core';
import type { CurvePageHeaderMediaVariantName } from '@surfnet/curve-contracts';
import { classes } from '../../../utils/src';

const mediaVariantClasses = {
  default: 'curve-page-header-media--variant-default',
  icon: 'curve-page-header-media--variant-icon',
  image: 'curve-page-header-media--variant-image',
} satisfies Record<CurvePageHeaderMediaVariantName, string>;

/**
 * The top section of a page. Put the parts inside in this order: `hlmBreadcrumb`,
 * `curvePageHeaderMedia`, `curvePageHeaderContent`, `curve-page-header-actions`,
 * `curvePageHeaderTabs`. Only the title is required.
 */
@Component({
  selector: 'curve-page-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'curve-page-header',
    'data-slot': 'curve-page-header',
  },
  template: '<ng-content />',
})
export class CurvePageHeaderComponent {}

/** Image, avatar or icon before the title. */
@Directive({
  selector: '[curvePageHeaderMedia]',
  host: {
    'data-slot': 'curve-page-header-media',
    '[attr.data-variant]': 'variant()',
  },
})
export class CurvePageHeaderMedia {
  public readonly variant = input<CurvePageHeaderMediaVariantName>('default');

  constructor() {
    classes(() => ['curve-page-header-media', mediaVariantClasses[this.variant()]]);
  }
}

/** Holds the title, badges and description. */
@Directive({
  selector: '[curvePageHeaderContent]',
  host: { class: 'curve-page-header-content', 'data-slot': 'curve-page-header-content' },
})
export class CurvePageHeaderContent {}

/** The page title. Put it on an `<h1>` (or another heading level). */
@Directive({
  selector: '[curvePageHeaderTitle]',
  host: { class: 'curve-page-header-title', 'data-slot': 'curve-page-header-title' },
})
export class CurvePageHeaderTitle {}

/** Badges next to the title. Kept outside the heading so they are not part of its name. */
@Directive({
  selector: '[curvePageHeaderBadges]',
  host: { class: 'curve-page-header-badges', 'data-slot': 'curve-page-header-badges' },
})
export class CurvePageHeaderBadges {}

@Directive({
  selector: '[curvePageHeaderDescription]',
  host: { class: 'curve-page-header-description', 'data-slot': 'curve-page-header-description' },
})
export class CurvePageHeaderDescription {}

/** Page-level navigation under the header. Put it on a `<nav>` holding `curvePageHeaderTab` links. */
@Directive({
  selector: '[curvePageHeaderTabs]',
  host: {
    class: 'curve-page-header-tabs',
    'data-slot': 'curve-page-header-tabs',
    '[attr.aria-label]': 'ariaLabel()',
  },
})
export class CurvePageHeaderTabs {
  public readonly ariaLabel = input<string>('Page navigation', { alias: 'aria-label' });
}

/** One link in `curvePageHeaderTabs`. Set `active` on the current page; add your own `routerLink`. */
@Directive({
  selector: 'a[curvePageHeaderTab]',
  host: {
    class: 'curve-page-header-tab',
    'data-slot': 'curve-page-header-tab',
    '[attr.aria-current]': 'active() ? "page" : null',
  },
})
export class CurvePageHeaderTab {
  public readonly active = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
}
