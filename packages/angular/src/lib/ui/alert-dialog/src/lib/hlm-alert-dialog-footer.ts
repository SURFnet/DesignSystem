import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmAlertDialogFooter],hlm-alert-dialog-footer',
  host: { 'data-slot': 'alert-dialog-footer' },
})
export class HlmAlertDialogFooter {
  constructor() {
    classes(() => 'curve-alert-dialog-footer');
  }
}
