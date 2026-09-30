import { type BooleanInput } from '@angular/cdk/coercion';
import { booleanAttribute, Directive, inject, input } from '@angular/core';
import { classes } from '../../../utils/src';
import { HlmSidebarService } from './hlm-sidebar.service';
import { injectHlmSidebarConfig } from './hlm-sidebar.token';

@Directive({
  selector: 'a[hlmSidebarMenuSubButton], button[hlmSidebarMenuSubButton]',
  host: {
    'data-slot': 'sidebar-menu-sub-button',
    'data-sidebar': 'menu-sub-button',
    '[attr.data-active]': 'isActive()',
    '[attr.data-size]': 'size()',
    '(click)': 'onClick()',
  },
})
export class HlmSidebarMenuSubButton {
  private readonly _sidebarService = inject(HlmSidebarService);
  private readonly _config = injectHlmSidebarConfig();

  public readonly closeMobileSidebarOnClick = input<boolean, BooleanInput>(
    this._config.closeMobileSidebarOnMenuButtonClick,
    { transform: booleanAttribute },
  );

  public readonly size = input<'sm' | 'md'>('md');
  public readonly isActive = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

  constructor() {
    classes(() => 'curve-sidebar-menu-sub-button');
  }

  protected onClick(): void {
    if (this.closeMobileSidebarOnClick()) {
      this._sidebarService.setOpenMobile(false);
    }
  }
}
