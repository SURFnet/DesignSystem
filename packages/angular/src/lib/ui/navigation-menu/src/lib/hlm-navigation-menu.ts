import { Directive } from '@angular/core';
import { BrnNavigationMenu } from '@spartan-ng/brain/navigation-menu';
import { classes } from '../../../utils/src';

@Directive({
  selector: 'nav[hlmNavigationMenu]',
  hostDirectives: [
    {
      directive: BrnNavigationMenu,
      inputs: ['value', 'delayDuration', 'skipDelayDuration', 'orientation', 'openOn'],
      outputs: ['valueChange'],
    },
  ],
})
export class HlmNavigationMenu {
  constructor() {
    classes(() => 'curve-navigation-menu group/navigation-menu');
  }
}
