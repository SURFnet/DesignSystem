import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmAlertDialogMedia],hlm-alert-dialog-media',
  host: { 'data-slot': 'alert-dialog-media' },
})
export class HlmAlertDialogMedia {
  constructor() {
    classes(() => 'curve-alert-dialog-media');
  }
}
