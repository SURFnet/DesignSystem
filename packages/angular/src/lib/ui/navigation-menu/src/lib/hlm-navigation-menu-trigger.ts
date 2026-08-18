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
      class="relative top-px ml-1 size-3 transition duration-300 group-data-[state=open]/navigation-menu-trigger:rotate-180"
      aria-hidden="true"
    />
  `,
})
export class HlmNavigationMenuTrigger {
  constructor() {
    classes(
      () =>
        'group/navigation-menu-trigger bg-background hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground data-[state=open]:bg-secondary data-[state=open]:text-secondary-foreground data-[state=open]:hover:bg-secondary data-[state=open]:focus:bg-secondary focus-visible:ring-ring/50 inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50',
    );
  }
}
