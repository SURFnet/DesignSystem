import { Directive } from '@angular/core';
import { BrnAlertDialogTitle } from '@spartan-ng/brain/alert-dialog';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmAlertDialogTitle]',
  hostDirectives: [BrnAlertDialogTitle],
  host: { 'data-slot': 'alert-dialog-title' },
})
export class HlmAlertDialogTitle {
  constructor() {
    classes(() => 'curve-alert-dialog-title');
  }
}
