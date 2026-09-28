import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmDropdownMenuSeparator],hlm-dropdown-menu-separator',
  host: {
    'data-slot': 'dropdown-menu-separator',
  },
})
export class HlmDropdownMenuSeparator {
  constructor() {
    classes(() => 'curve-dropdown-menu-separator');
  }
}
