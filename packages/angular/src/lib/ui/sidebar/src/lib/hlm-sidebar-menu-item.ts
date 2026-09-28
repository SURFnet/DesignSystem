import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: 'li[hlmSidebarMenuItem]',
  host: {
    'data-slot': 'sidebar-menu-item',
    'data-sidebar': 'menu-item',
  },
})
export class HlmSidebarMenuItem {
  constructor() {
    classes(() => 'curve-sidebar-menu-item group/menu-item');
  }
}
