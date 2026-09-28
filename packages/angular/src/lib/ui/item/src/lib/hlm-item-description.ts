import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmItemDescription],hlm-item-description',
  host: { 'data-slot': 'item-description' },
})
export class HlmItemDescription {
  constructor() {
    classes(() => 'curve-item-description');
  }
}
