import { Directive, inject, input } from '@angular/core';
import { classes } from '../../../utils/src';
import { HlmSidebarService } from './hlm-sidebar.service';

@Directive({
  selector: 'button[hlmSidebarRail]',
  host: {
    'data-sidebar': 'rail',
    'data-slot': 'sidebar-rail',
    '[attr.aria-label]': 'ariaLabel()',
    tabindex: '-1',
    '(click)': 'onClick()',
  },
})
export class HlmSidebarRail {
  private readonly _sidebarService = inject(HlmSidebarService);

  public readonly ariaLabel = input<string>('Toggle Sidebar', { alias: 'aria-label' });

  constructor() {
    // Styling lives in ./hlm-sidebar.css.
    classes(() => 'curve-sidebar-rail');
  }

  protected onClick(): void {
    this._sidebarService.toggleSidebar();
  }
}
