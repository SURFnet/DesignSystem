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
    classes(() => [
      'group flex flex-1 list-none items-center justify-center gap-0',
      'data-[orientation=vertical]:flex-col',
    ]);
  }
}
