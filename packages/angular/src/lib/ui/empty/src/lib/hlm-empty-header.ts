import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmEmptyHeader],hlm-empty-header',
  host: { 'data-slot': 'empty-header' },
})
export class HlmEmptyHeader {
  constructor() {
    classes(() => 'curve-empty-header');
  }
}
