import { Directive } from '@angular/core';
import { BrnComboboxStatus } from '@spartan-ng/brain/combobox';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmComboboxStatus],hlm-combobox-status',
  hostDirectives: [BrnComboboxStatus],
  host: { 'data-slot': 'combobox-status' },
})
export class HlmComboboxStatus {
  constructor() {
    classes(() => 'curve-combobox-status');
  }
}
