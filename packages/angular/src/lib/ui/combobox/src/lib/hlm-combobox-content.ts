import { Directive } from '@angular/core';
import { BrnComboboxContent } from '@spartan-ng/brain/combobox';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmComboboxContent],hlm-combobox-content',
  hostDirectives: [BrnComboboxContent],
})
export class HlmComboboxContent {
  constructor() {
    classes(() => ['curve-combobox-content group/combobox-content']);
  }
}
