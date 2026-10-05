import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmSidebarFooter],hlm-sidebar-footer',
  host: {
    'data-slot': 'sidebar-footer',
    'data-sidebar': 'footer',
  },
})
export class HlmSidebarFooter {
  constructor() {
    classes(() => 'curve-sidebar-footer');
  }
}
