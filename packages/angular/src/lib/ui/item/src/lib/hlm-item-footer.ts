import { Directive } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmItemFooter],hlm-item-footer',
  host: { 'data-slot': 'item-footer' },
})
export class HlmItemFooter {
  constructor() {
    classes(() => 'gap-2 flex basis-full items-center justify-between');
  }
}
