import { type BooleanInput } from '@angular/cdk/coercion';
import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HlmSkeletonImports } from '../../../skeleton/src';
import { classes } from '../../../utils/src';

@Component({
  selector: 'hlm-sidebar-menu-skeleton,div[hlmSidebarMenuSkeleton]',
  imports: [HlmSkeletonImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'sidebar-menu-skeleton',
    'data-sidebar': 'menu-skeleton',
  },
  template: `
    @if (showIcon()) {
      <hlm-skeleton data-sidebar="menu-skeleton-icon" class="curve-sidebar-skeleton-icon" />
    } @else {
      <hlm-skeleton
        data-sidebar="menu-skeleton-text"
        class="curve-sidebar-skeleton-text"
        [style.--skeleton-width]="_width"
      />
    }
  `,
})
export class HlmSidebarMenuSkeleton {
  public readonly showIcon = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
  protected readonly _width = `${Math.floor(Math.random() * 40) + 50}%`;

  constructor() {
    classes(() => 'curve-sidebar-menu-skeleton');
  }
}
