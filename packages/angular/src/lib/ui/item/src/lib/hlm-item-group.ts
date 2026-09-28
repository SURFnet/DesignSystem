import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmItemGroup],hlm-item-group',
  host: { 'data-slot': 'item-group' },
})
export class HlmItemGroup {
  constructor() {
    classes(() => 'curve-item-group group/item-group');
  }
}
