import { Directive } from '@angular/core';
import { BrnNavigationMenuLink } from '@spartan-ng/brain/navigation-menu';
import { classes } from '../../../utils/src';

@Directive({
  selector: 'a[hlmNavigationMenuLink]',
  hostDirectives: [{ directive: BrnNavigationMenuLink, inputs: ['active'] }],
})
export class HlmNavigationMenuLink {
  constructor() {
    classes(() => ['curve-navigation-menu-link']);
  }
}
