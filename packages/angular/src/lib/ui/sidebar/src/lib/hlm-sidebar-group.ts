import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmSidebarGroup],hlm-sidebar-group',
  host: {
    'data-slot': 'sidebar-group',
    'data-sidebar': 'group',
  },
})
export class HlmSidebarGroup {
  constructor() {
    classes(() => 'curve-sidebar-group');
  }
}
