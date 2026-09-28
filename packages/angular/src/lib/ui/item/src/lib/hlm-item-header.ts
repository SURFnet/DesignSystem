import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmItemHeader],hlm-item-header',
  host: { 'data-slot': 'item-header' },
})
export class HlmItemHeader {
  constructor() {
    classes(() => 'curve-item-header');
  }
}
