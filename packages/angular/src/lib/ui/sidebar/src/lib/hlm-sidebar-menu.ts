import { Directive } from '@angular/core';
import { classes } from '../../../utils/src/lib/hlm';

@Directive({
  selector: 'ul[hlmSidebarMenu]',
  host: {
    'data-slot': 'sidebar-menu',
    'data-sidebar': 'menu',
  },
})
export class HlmSidebarMenu {
  constructor() {
    classes(() => 'gap-1 flex w-full min-w-0 flex-col');
  }
}
