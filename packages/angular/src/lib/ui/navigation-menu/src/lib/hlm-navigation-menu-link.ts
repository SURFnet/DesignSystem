import { Directive } from '@angular/core';
import { BrnNavigationMenuLink } from '@spartan-ng/brain/navigation-menu';
import { classes } from '../../../utils/src';

@Directive({
  selector: 'a[hlmNavigationMenuLink]',
  hostDirectives: [{ directive: BrnNavigationMenuLink, inputs: ['active'] }],
})
export class HlmNavigationMenuLink {
  constructor() {
    classes(() => [
      'data-[active=true]:bg-secondary data-[active=true]:text-secondary-foreground data-[active=true]:hover:bg-secondary data-[active=true]:focus:bg-secondary hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground focus-visible:ring-ring/50 [&_ng-icon:not([class*="text-"])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_ng-icon:not([class*="text-"])]:text-base',
      'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
    ]);
  }
}
