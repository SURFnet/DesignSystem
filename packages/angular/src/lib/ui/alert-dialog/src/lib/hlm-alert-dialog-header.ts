import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmAlertDialogHeader],hlm-alert-dialog-header',
  host: { 'data-slot': 'alert-dialog-header' },
})
export class HlmAlertDialogHeader {
  constructor() {
    classes(() => 'curve-alert-dialog-header');
  }
}
