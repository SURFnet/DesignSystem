import { type BooleanInput } from '@angular/cdk/coercion';
import { CdkMenuItemRadio } from '@angular/cdk/menu';
import { Directive, booleanAttribute, inject, input } from '@angular/core';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmDropdownMenuRadio]',
  hostDirectives: [
    {
      directive: CdkMenuItemRadio,
      inputs: ['cdkMenuItemDisabled: disabled', 'cdkMenuItemChecked: checked'],
      outputs: ['cdkMenuItemTriggered: triggered'],
    },
  ],
  host: {
    'data-slot': 'dropdown-menu-radio-item',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-checked]': 'checked() ? "" : null',
  },
})
export class HlmDropdownMenuRadio {
  private readonly _cdkMenuItem = inject(CdkMenuItemRadio);
  public readonly checked = input<boolean, BooleanInput>(this._cdkMenuItem.checked, {
    transform: booleanAttribute,
  });
  public readonly disabled = input<boolean, BooleanInput>(this._cdkMenuItem.disabled, {
    transform: booleanAttribute,
  });

  constructor() {
    classes(() => 'curve-dropdown-menu-choice group');
  }
}
