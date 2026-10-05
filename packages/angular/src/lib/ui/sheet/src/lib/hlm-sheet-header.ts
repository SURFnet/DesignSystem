import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmSheetHeader],hlm-sheet-header',
  host: { 'data-slot': 'sheet-header' },
})
export class HlmSheetHeader {
  constructor() {
    classes(() => 'curve-sheet-header');
  }
}
