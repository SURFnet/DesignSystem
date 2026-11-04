import { Directive } from '@angular/core';
import { BrnComboboxChipInput } from '@spartan-ng/brain/combobox';
import { classes } from '../../../utils/src';
import { injectHlmComboboxAria } from './hlm-combobox-listbox-id';

@Directive({
  selector: 'input[hlmComboboxChipInput]',
  hostDirectives: [{ directive: BrnComboboxChipInput, inputs: ['id', 'aria-invalid'] }],
  host: {
    'data-slot': 'combobox-chip-input',
    '[attr.aria-controls]': '_aria.controls()',
    '[attr.aria-activedescendant]': '_aria.activeDescendant()',
  },
})
export class HlmComboboxChipInput {
  protected readonly _aria = injectHlmComboboxAria();

  constructor() {
    classes(() => 'curve-combobox-chip-input');
  }
}
