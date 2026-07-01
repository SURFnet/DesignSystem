import { Directive } from '@angular/core';
import { HlmSeparator } from '../../../separator/src';
import { classes } from '../../../utils/src';

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
