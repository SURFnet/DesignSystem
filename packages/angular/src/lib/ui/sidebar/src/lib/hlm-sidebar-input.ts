import { Directive } from '@angular/core';
import { HlmInput } from '../../../input/src';
import { classes } from '../../../utils/src';

@Directive({
  selector: 'input[hlmSidebarInput]',
  hostDirectives: [HlmInput],
  host: {
    'data-slot': 'sidebar-input',
    'data-sidebar': 'input',
  },
})
export class HlmSidebarInput {
  constructor() {
    classes(() => 'curve-sidebar-input');
  }
}
