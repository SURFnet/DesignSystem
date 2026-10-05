import { Directive } from '@angular/core';
import { BrnComboboxEmpty } from '@spartan-ng/brain/combobox';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmComboboxEmpty],hlm-combobox-empty',
  hostDirectives: [BrnComboboxEmpty],
  host: { 'data-slot': 'combobox-empty' },
})
export class HlmComboboxEmpty {
  constructor() {
    classes(() => 'curve-combobox-empty');
  }
}
