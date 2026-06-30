import { Directive } from '@angular/core';
import { classes } from '../../../utils/src/lib/hlm';
import { HlmSeparator } from '../../../separator/src/lib/hlm-separator';

@Directive({
  selector: '[hlmSidebarSeparator],hlm-sidebar-separator',
  hostDirectives: [HlmSeparator],
  host: {
    'data-slot': 'sidebar-separator',
    'data-sidebar': 'separator',
  },
})
export class HlmSidebarSeparator {
  constructor() {
    classes(() => 'bg-sidebar-border mx-2 w-auto');
  }
}
