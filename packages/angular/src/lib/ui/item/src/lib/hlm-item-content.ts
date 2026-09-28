import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmItemContent],hlm-item-content',
  host: { 'data-slot': 'item-content' },
})
export class HlmItemContent {
  constructor() {
    classes(() => 'curve-item-content');
  }
}
