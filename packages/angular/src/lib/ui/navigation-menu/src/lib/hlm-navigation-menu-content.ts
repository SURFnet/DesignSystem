import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmNavigationMenuContent],hlm-navigation-menu-content',
  host: { 'data-slot': 'navigation-menu-content' },
})
export class HlmNavigationMenuContent {
  constructor() {
    // Styling (incl. enter/exit motion) lives in ./hlm-navigation-menu.css.
    classes(() => ['curve-navigation-menu-content']);
  }
}
