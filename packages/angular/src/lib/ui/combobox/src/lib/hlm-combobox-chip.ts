import type { BooleanInput } from '@angular/cdk/coercion';
import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorX } from '@ng-icons/phosphor-icons/regular';
import { BrnComboboxChip } from '@spartan-ng/brain/combobox';
import { classes } from '../../../utils/src';
import { HlmComboboxChipRemove } from './hlm-combobox-chip-remove';

@Component({
  selector: 'hlm-combobox-chip',
  imports: [NgIcon, HlmComboboxChipRemove],
  providers: [provideIcons({ phosphorX })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [{ directive: BrnComboboxChip, inputs: ['value'] }],
  host: { 'data-slot': 'combobox-chip' },
  template: `
    <ng-content />

    @if (showRemove()) {
      <button hlmComboboxChipRemove [attr.aria-label]="removeLabel()">
        <ng-icon name="phosphorX" />
      </button>
    }
  `,
})
export class HlmComboboxChip {
  public readonly showRemove = input<boolean, BooleanInput>(true, { transform: booleanAttribute });
  /** The aria-label for the chip's remove button. */
  public readonly removeLabel = input<string>('Remove');

  constructor() {
    classes(() => 'curve-combobox-chip');
  }
}
