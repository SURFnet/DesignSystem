import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: 'main[hlmSidebarInset]',
  host: { 'data-slot': 'sidebar-inset' },
})
export class HlmSidebarInset {
  constructor() {
    classes(() => 'curve-sidebar-inset');
  }
}
