import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { classes, hlm } from '../../../utils/src';
import type { ClassValue } from 'clsx';
import { HlmSidebarService, type SidebarVariant } from './hlm-sidebar.service';
import { injectHlmSidebarConfig } from './hlm-sidebar.token';
import { HlmSheetImports } from '../../../sheet/src';

@Component({
  selector: 'hlm-sidebar',
  imports: [NgTemplateOutlet, HlmSheetImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-slot]': '_dataSlot()',
    '[attr.data-state]': '_dataState()',
    '[attr.data-collapsible]': '_dataCollapsible()',
    '[attr.data-variant]': '_dataVariant()',
    '[attr.data-side]': '_dataSide()',
  },
  template: `
    <ng-template #contentContainer>
      <ng-content />
    </ng-template>

    @if (collapsible() === 'none') {
      <ng-container *ngTemplateOutlet="contentContainer"></ng-container>
    } @else if (_sidebarService.isMobile()) {
      <hlm-sheet
        [side]="side()"
        [state]="_sidebarService.openMobile() ? 'open' : 'closed'"
        (stateChanged)="_sidebarService.setOpenMobile($event === 'open')"
      >
        <hlm-sheet-content
          *hlmSheetPortal="let ctx"
          data-slot="sidebar"
          data-sidebar="sidebar"
          data-mobile="true"
          class="curve-sidebar-mobile"
          [style.--sidebar-width]="sidebarWidthMobile()"
        >
          <div class="curve-sidebar-mobile-inner">
            <ng-container *ngTemplateOutlet="contentContainer" />
          </div>
        </hlm-sheet-content>
      </hlm-sheet>
    } @else {
      <!-- Sidebar gap on desktop -->
      <div data-slot="sidebar-gap" [class]="_sidebarGapComputedClass()"></div>
      <div
        data-slot="sidebar-container"
        [attr.data-side]="_dataSide()"
        [class]="_sidebarContainerComputedClass()"
      >
        <div data-sidebar="sidebar" data-slot="sidebar-inner" class="curve-sidebar-inner">
          <ng-container *ngTemplateOutlet="contentContainer" />
        </div>
      </div>
    }
  `,
})
export class HlmSidebar {
  protected readonly _sidebarService = inject(HlmSidebarService);
  private readonly _config = injectHlmSidebarConfig();
  public readonly sidebarWidthMobile = input<string>(this._config.sidebarWidthMobile);

  public readonly side = input<'left' | 'right'>('left');
  public readonly variant = input<SidebarVariant>(this._sidebarService.variant());
  public readonly collapsible = input<'offcanvas' | 'icon' | 'none'>('offcanvas');

  protected readonly _sidebarGapComputedClass = computed(() =>
    hlm(
      'curve-sidebar-gap',
      this.variant() === 'floating' || this.variant() === 'inset'
        ? 'curve-sidebar-gap--padded'
        : 'curve-sidebar-gap--flush',
    ),
  );

  public readonly sidebarContainerClass = input<ClassValue>('');
  protected readonly _sidebarContainerComputedClass = computed(() =>
    hlm(
      'curve-sidebar-container',
      this.variant() === 'floating' || this.variant() === 'inset'
        ? 'curve-sidebar-container--padded'
        : 'curve-sidebar-container--flush',
      this.sidebarContainerClass(),
    ),
  );

  protected readonly _dataSlot = computed(() => {
    return !this._sidebarService.isMobile() ? 'sidebar' : undefined;
  });

  private readonly _collapsibleAndNonMobile = computed(() => {
    return this.collapsible() !== 'none' && !this._sidebarService.isMobile();
  });

  protected readonly _dataState = computed(() => {
    return this._collapsibleAndNonMobile() ? this._sidebarService.state() : undefined;
  });

  protected readonly _dataCollapsible = computed(() => {
    if (this._collapsibleAndNonMobile()) {
      return this._sidebarService.state() === 'collapsed' ? this.collapsible() : '';
    }
    return undefined;
  });

  protected readonly _dataVariant = computed(() => {
    return this._collapsibleAndNonMobile() ? this.variant() : undefined;
  });

  protected readonly _dataSide = computed(() => {
    return this._collapsibleAndNonMobile() ? this.side() : undefined;
  });

  constructor() {
    // Sync variant input with service
    effect(() => {
      this._sidebarService.setVariant(this.variant());
    });

    classes(() => {
      if (this.collapsible() === 'none') {
        return 'curve-sidebar-static';
      } else if (this._sidebarService.isMobile()) {
        return '';
      } else {
        // `group` and `peer` stay as hooks for consumers' Tailwind.
        return 'curve-sidebar group peer';
      }
    });
  }
}
