import { Directive, input } from '@angular/core';
import { BrnComboboxList } from '@spartan-ng/brain/combobox';
import { classes } from '../../../utils/src';
import { injectHlmComboboxListboxId } from './hlm-combobox-listbox-id';

@Directive({
  selector: '[hlmComboboxList]',
  hostDirectives: [{ directive: BrnComboboxList, inputs: ['id: listId'] }],
  host: {
    'data-slot': 'combobox-list',
    '[id]': 'listId()',
  },
})
export class HlmComboboxList {
  private static _id = 0;

  private readonly _defaultListId =
    injectHlmComboboxListboxId() ?? `hlm-combobox-listbox-${++HlmComboboxList._id}`;

  public readonly listId = input<string>(this._defaultListId, { alias: 'id' });

  constructor() {
    classes(
      () =>
        'no-scrollbar max-h-[calc(--spacing(72)---spacing(9))] scroll-py-1 p-1 data-empty:p-0 overflow-y-auto overscroll-contain',
    );
  }
}
