import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCheck } from '@ng-icons/phosphor-icons/regular';
import { BrnComboboxItem } from '@spartan-ng/brain/combobox';
import { classes } from '../../../utils/src';

@Component({
  selector: 'hlm-combobox-item',
  imports: [NgIcon],
  providers: [provideIcons({ phosphorCheck })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [{ directive: BrnComboboxItem, inputs: ['id', 'disabled', 'value'] }],
  host: { 'data-slot': 'combobox-item' },
  template: `
    <ng-content />
    @if (_active()) {
      <ng-icon name="phosphorCheck" class="curve-combobox-item-indicator" aria-hidden="true" />
    }
  `,
})
export class HlmComboboxItem {
  private readonly _brnComboboxItem = inject(BrnComboboxItem);

  protected readonly _active = this._brnComboboxItem.active;

  constructor() {
    classes(() => 'curve-combobox-item');
  }
}
