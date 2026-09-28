import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmCardAction]',
  host: { 'data-slot': 'card-action' },
})
export class HlmCardAction {
  constructor() {
    classes(() => 'curve-card-action');
  }
}
