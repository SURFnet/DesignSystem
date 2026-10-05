import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCaretDown } from '@ng-icons/phosphor-icons/regular';
import { BrnNavigationMenuTrigger } from '@spartan-ng/brain/navigation-menu';
import { classes } from '../../../utils/src';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[hlmNavigationMenuTrigger]',
  imports: [NgIcon],
  providers: [provideIcons({ phosphorCaretDown })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [{ directive: BrnNavigationMenuTrigger, inputs: ['align'] }],
  host: { 'data-slot': 'navigation-menu-trigger' },
  template: `
    <ng-content />
    <ng-icon
      name="phosphorCaretDown"
      class="curve-navigation-menu-trigger-icon"
      aria-hidden="true"
    />
  `,
})
export class HlmNavigationMenuTrigger {
  constructor() {
    classes(() => 'curve-navigation-menu-trigger group/navigation-menu-trigger');
  }
}
