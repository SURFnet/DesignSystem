import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCheck } from '@ng-icons/phosphor-icons/regular';
import { BrnSelectItem } from '@spartan-ng/brain/select';
import { classes } from '../../../utils/src';

@Component({
  selector: 'hlm-select-item',
  imports: [NgIcon],
  providers: [provideIcons({ phosphorCheck })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [{ directive: BrnSelectItem, inputs: ['id', 'disabled', 'value'] }],
  host: { 'data-slot': 'select-item' },
  template: `
    <ng-content />
    @if (_active()) {
      <ng-icon name="phosphorCheck" class="curve-select-item-indicator" aria-hidden="true" />
    }
  `,
})
export class HlmSelectItem {
  private readonly _brnSelectItem = inject(BrnSelectItem);

  protected readonly _active = this._brnSelectItem.active;

  constructor() {
    classes(() => 'curve-select-item');
  }
}
