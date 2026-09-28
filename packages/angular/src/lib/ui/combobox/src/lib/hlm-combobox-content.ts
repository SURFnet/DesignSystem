import { Directive } from '@angular/core';
import { BrnComboboxContent } from '@spartan-ng/brain/combobox';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmComboboxContent],hlm-combobox-content',
  hostDirectives: [BrnComboboxContent],
})
export class HlmComboboxContent {
  constructor() {
    // Styling (incl. enter/exit motion) lives in ./hlm-combobox.css.
    classes(() => ['curve-combobox-content group/combobox-content']);
  }
}
