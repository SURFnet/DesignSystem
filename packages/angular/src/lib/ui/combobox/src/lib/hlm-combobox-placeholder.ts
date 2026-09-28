import { Directive } from '@angular/core';
import { BrnComboboxPlaceholder } from '@spartan-ng/brain/combobox';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmComboboxPlaceholder],hlm-combobox-placeholder',
  hostDirectives: [BrnComboboxPlaceholder],
  host: { 'data-slot': 'combobox-placeholder' },
})
export class HlmComboboxPlaceholder {
  constructor() {
    classes(() => 'curve-combobox-placeholder');
  }
}
