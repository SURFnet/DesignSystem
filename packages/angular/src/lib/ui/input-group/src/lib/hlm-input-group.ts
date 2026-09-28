import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmInputGroup],hlm-input-group',
  host: {
    'data-slot': 'input-group',
    role: 'group',
  },
})
export class HlmInputGroup {
  constructor() {
    // Styling lives in ./hlm-input-group.css; `group/input-group` stays as a hook for consumers' Tailwind.
    classes(() => 'curve-input-group group/input-group');
  }
}
