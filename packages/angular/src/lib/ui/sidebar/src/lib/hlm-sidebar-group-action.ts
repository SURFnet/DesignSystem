import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: 'button[hlmSidebarGroupAction]',
  host: {
    'data-slot': 'sidebar-group-action',
    'data-sidebar': 'group-action',
  },
})
export class HlmSidebarGroupAction {
  constructor() {
    classes(() => 'curve-sidebar-action curve-sidebar-group-action');
  }
}
