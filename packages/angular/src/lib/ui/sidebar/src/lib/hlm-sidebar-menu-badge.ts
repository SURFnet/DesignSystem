import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmSidebarMenuBadge],hlm-sidebar-menu-badge',
  host: {
    'data-slot': 'sidebar-menu-badge',
    'data-sidebar': 'menu-badge',
  },
})
export class HlmSidebarMenuBadge {
  constructor() {
    classes(() => 'curve-sidebar-menu-badge');
  }
}
