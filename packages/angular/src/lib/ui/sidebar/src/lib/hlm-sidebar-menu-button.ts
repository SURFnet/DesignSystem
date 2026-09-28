import { type BooleanInput } from '@angular/cdk/coercion';
import { booleanAttribute, computed, Directive, effect, inject, input } from '@angular/core';
import {
  BrnTooltip,
  BrnTooltipPosition,
  provideBrnTooltipDefaultOptions,
} from '@spartan-ng/brain/tooltip';
import { classes, hlm } from '../../../utils/src';
import type {
  SidebarMenuButtonSizeName,
  SidebarMenuButtonVariantName,
} from '@surfnet/curve-contracts';
import { HlmSidebarService } from './hlm-sidebar.service';
import { injectHlmSidebarConfig } from './hlm-sidebar.token';
import {
  DEFAULT_TOOLTIP_CONTENT_CLASSES,
  DEFAULT_TOOLTIP_SVG_CLASS,
  tooltipPositionVariants,
} from '../../../tooltip/src';

// Styling lives in ./hlm-sidebar.css; `peer/menu-button` and `group/menu-button`
// stay as hooks for consumers' Tailwind.
const sidebarMenuButtonVariantClasses = {
  default: 'curve-sidebar-menu-button--variant-default',
  outline: 'curve-sidebar-menu-button--variant-outline',
} satisfies Record<SidebarMenuButtonVariantName, string>;

const sidebarMenuButtonSizeClasses = {
  default: 'curve-sidebar-menu-button--size-default',
  sm: 'curve-sidebar-menu-button--size-sm',
  lg: 'curve-sidebar-menu-button--size-lg',
} satisfies Record<SidebarMenuButtonSizeName, string>;

@Directive({
  selector: 'button[hlmSidebarMenuButton], a[hlmSidebarMenuButton]',
  providers: [
    provideBrnTooltipDefaultOptions({
      showDelay: 150,
      hideDelay: 0,
      tooltipContentClasses: DEFAULT_TOOLTIP_CONTENT_CLASSES,
      svgClasses: DEFAULT_TOOLTIP_SVG_CLASS,
      arrowClasses: (position: BrnTooltipPosition) => hlm(tooltipPositionVariants({ position })),
      position: 'right',
    }),
  ],
  hostDirectives: [
    {
      directive: BrnTooltip,
      inputs: ['brnTooltip: tooltip'],
    },
  ],
  host: {
    'data-slot': 'sidebar-menu-button',
    'data-sidebar': 'menu-button',
    '[attr.data-size]': 'size()',
    '[attr.data-active]': 'isActive()',
    '(click)': 'onClick()',
  },
})
export class HlmSidebarMenuButton {
  private readonly _config = injectHlmSidebarConfig();
  private readonly _sidebarService = inject(HlmSidebarService);
  private readonly _brnTooltip = inject(BrnTooltip);

  public readonly variant = input<SidebarMenuButtonVariantName>('default');
  public readonly size = input<SidebarMenuButtonSizeName>('default');
  public readonly isActive = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
  public readonly closeMobileSidebarOnClick = input<boolean, BooleanInput>(
    this._config.closeMobileSidebarOnMenuButtonClick,
    { transform: booleanAttribute },
  );

  protected readonly _isTooltipHidden = computed(
    () => this._sidebarService.state() !== 'collapsed' || this._sidebarService.isMobile(),
  );

  constructor() {
    classes(() => [
      'curve-sidebar-menu-button peer/menu-button group/menu-button',
      sidebarMenuButtonVariantClasses[this.variant()],
      sidebarMenuButtonSizeClasses[this.size()],
    ]);
    effect(() => this._brnTooltip.mutableTooltipDisabled.set(this._isTooltipHidden()));
  }

  protected onClick(): void {
    if (this.closeMobileSidebarOnClick()) {
      this._sidebarService.setOpenMobile(false);
    }
  }
}
