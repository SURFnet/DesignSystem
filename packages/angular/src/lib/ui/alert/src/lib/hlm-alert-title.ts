import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmAlertTitle]',
  host: {
    'data-slot': 'alert-title',
  },
})
export class HlmAlertTitle {
  constructor() {
    classes(() => 'curve-alert-title');
  }
}
