import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: 'ul[hlmSidebarMenuSub]',
  host: {
    'data-slot': 'sidebar-menu-sub',
    'data-sidebar': 'menu-sub',
  },
})
export class HlmSidebarMenuSub {
  constructor() {
    classes(() => 'curve-sidebar-menu-sub');
  }
}
