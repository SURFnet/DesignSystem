import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmEmptyTitle]',
  host: { 'data-slot': 'empty-title' },
})
export class HlmEmptyTitle {
  constructor() {
    classes(() => 'text-lg font-medium tracking-tight');
  }
}
