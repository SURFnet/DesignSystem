import { Directive, input } from '@angular/core';
import { BrnComboboxChipRemove } from '@spartan-ng/brain/combobox';
import { buttonVariants } from '../../../button/src';
import { classes } from '../../../utils/src';

@Directive({
  selector: 'button[hlmComboboxChipRemove]',
  hostDirectives: [BrnComboboxChipRemove],
  host: { 'data-slot': 'combobox-chip-remove', '[attr.aria-label]': 'ariaLabel()' },
})
export class HlmComboboxChipRemove {
  /** The aria-label for the remove button. */
  public readonly ariaLabel = input<string>('Remove', { alias: 'aria-label' });

  constructor() {
    classes(() => [
      '-ms-1 opacity-50 hover:opacity-100',
      buttonVariants({ variant: 'ghost', size: 'icon-xs' }),
    ]);
  }
}
