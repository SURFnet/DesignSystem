import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmItemTitle],hlm-item-title',
  host: { 'data-slot': 'item-title' },
})
export class HlmItemTitle {
  constructor() {
    classes(() => 'curve-item-title');
  }
}
