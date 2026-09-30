import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: 'li[hlmSidebarMenuSubItem]',
  host: {
    'data-slot': 'sidebar-menu-sub-item',
    'data-sidebar': 'menu-sub-item',
  },
})
export class HlmSidebarMenuSubItem {
  constructor() {
    classes(() => 'curve-sidebar-menu-sub-item group/menu-sub-item');
  }
}
