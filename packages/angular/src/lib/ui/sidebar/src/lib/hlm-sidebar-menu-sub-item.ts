import { Directive } from '@angular/core';
import { classes } from '../../../utils/src/lib/hlm';

@Directive({
  selector: 'li[hlmSidebarMenuSubItem]',
  host: {
    'data-slot': 'sidebar-menu-sub-item',
    'data-sidebar': 'menu-sub-item',
  },
})
export class HlmSidebarMenuSubItem {
  constructor() {
    classes(() => 'group/menu-sub-item relative');
  }
}
