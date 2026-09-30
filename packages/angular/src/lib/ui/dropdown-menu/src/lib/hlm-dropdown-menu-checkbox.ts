import { type BooleanInput } from '@angular/cdk/coercion';
import { CdkMenuItemCheckbox } from '@angular/cdk/menu';
import { Directive, booleanAttribute, inject, input } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmDropdownMenuCheckbox]',
  hostDirectives: [
    {
      directive: CdkMenuItemCheckbox,
      inputs: ['cdkMenuItemDisabled: disabled', 'cdkMenuItemChecked: checked'],
      outputs: ['cdkMenuItemTriggered: triggered'],
    },
  ],
  host: {
    'data-slot': 'dropdown-menu-checkbox-item',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-checked]': 'checked() ? "" : null',
  },
})
export class HlmDropdownMenuCheckbox {
  private readonly _cdkMenuItem = inject(CdkMenuItemCheckbox);
  public readonly checked = input<boolean, BooleanInput>(this._cdkMenuItem.checked, {
    transform: booleanAttribute,
  });
  public readonly disabled = input<boolean, BooleanInput>(this._cdkMenuItem.disabled, {
    transform: booleanAttribute,
  });

  constructor() {
    classes(() => 'curve-dropdown-menu-choice curve-dropdown-menu-choice--checkbox group');
  }
}
