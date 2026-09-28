import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmEmptyDescription]',
  host: { 'data-slot': 'empty-description' },
})
export class HlmEmptyDescription {
  constructor() {
    classes(() => 'curve-empty-description');
  }
}
