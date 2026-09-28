import { Directive } from '@angular/core';
import { BrnNavigationMenuList } from '@spartan-ng/brain/navigation-menu';
import { classes } from '../../../utils/src';

@Directive({
  selector: 'ul[hlmNavigationMenuList]',
  hostDirectives: [
    {
      directive: BrnNavigationMenuList,
    },
  ],
})
export class HlmNavigationMenuList {
  constructor() {
    classes(() => ['curve-navigation-menu-list group']);
  }
}
