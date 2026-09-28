import { type BooleanInput } from '@angular/cdk/coercion';
import { booleanAttribute, Directive, input } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: 'button[hlmSidebarMenuAction]',
  host: {
    'data-slot': 'sidebar-menu-action',
    'data-sidebar': 'menu-action',
  },
})
export class HlmSidebarMenuAction {
  public readonly showOnHover = input<boolean, BooleanInput>(false, {
    transform: booleanAttribute,
  });

  constructor() {
    // Styling lives in ./hlm-sidebar.css.
    classes(() => [
      'curve-sidebar-action curve-sidebar-menu-action',
      this.showOnHover() && 'curve-sidebar-menu-action--show-on-hover',
    ]);
  }
}
