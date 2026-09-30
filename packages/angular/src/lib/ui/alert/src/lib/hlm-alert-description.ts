import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmAlertDescription]',
  host: {
    'data-slot': 'alert-description',
  },
})
export class HlmAlertDescription {
  constructor() {
    classes(() => 'curve-alert-description');
  }
}
