import { Directive, input } from '@angular/core';
import { BrnComboboxChipRemove } from '@spartan-ng/brain/combobox';
import { buttonVariants } from '../../../button/src';
import { classes } from '../../../utils/src';
import { injectMicrocopy } from '../../../../microcopy';

@Directive({
  selector: 'button[hlmComboboxChipRemove]',
  hostDirectives: [BrnComboboxChipRemove],
  host: { 'data-slot': 'combobox-chip-remove', '[attr.aria-label]': 'ariaLabel()' },
})
export class HlmComboboxChipRemove {
  /** The aria-label for the remove button. */
  public readonly ariaLabel = input<string>(injectMicrocopy()['combobox.chip-remove'], {
    alias: 'aria-label',
  });

  constructor() {
    classes(() => [
      buttonVariants({ variant: 'ghost', size: 'icon-xs' }),
      'curve-combobox-chip-remove',
    ]);
  }
}
