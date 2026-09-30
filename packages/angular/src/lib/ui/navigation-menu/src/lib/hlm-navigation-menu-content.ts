import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmNavigationMenuContent],hlm-navigation-menu-content',
  host: { 'data-slot': 'navigation-menu-content' },
})
export class HlmNavigationMenuContent {
  constructor() {
    classes(() => ['curve-navigation-menu-content']);
  }
}
