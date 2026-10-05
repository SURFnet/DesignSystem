import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: 'div[hlmSidebarGroupLabel], button[hlmSidebarGroupLabel]',
  host: {
    'data-slot': 'sidebar-group-label',
    'data-sidebar': 'group-label',
  },
})
export class HlmSidebarGroupLabel {
  constructor() {
    classes(() => 'curve-sidebar-group-label');
  }
}
