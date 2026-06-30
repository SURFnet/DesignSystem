import { Directive } from '@angular/core';
import { classes } from '../../../utils/src/lib/hlm';
import { HlmInput } from '../../../input/src/lib/hlm-input';

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
    classes(() => 'bg-background h-8 w-full shadow-none');
  }
}
