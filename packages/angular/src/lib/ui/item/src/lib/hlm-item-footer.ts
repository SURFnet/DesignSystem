import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmItemFooter],hlm-item-footer',
  host: { 'data-slot': 'item-footer' },
})
export class HlmItemFooter {
  constructor() {
    classes(() => 'curve-item-footer');
  }
}
