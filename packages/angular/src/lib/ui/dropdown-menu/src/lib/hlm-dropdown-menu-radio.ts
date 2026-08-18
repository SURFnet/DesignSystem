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
    classes(
      () =>
        'hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground data-checked:bg-secondary data-checked:text-secondary-foreground group relative flex w-full cursor-default items-center rounded-sm py-1.5 ps-8 pe-2 text-sm transition-colors outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    );
  }
}
