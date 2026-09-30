import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmSheetFooter],hlm-sheet-footer',
  host: { 'data-slot': 'sheet-footer' },
})
export class HlmSheetFooter {
  constructor() {
    classes(() => 'curve-sheet-footer');
  }
}
