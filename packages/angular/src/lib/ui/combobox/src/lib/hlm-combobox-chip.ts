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
      <button hlmComboboxChipRemove>
        <ng-icon name="phosphorX" />
      </button>
    }
  `,
})
export class HlmComboboxChip {
  public readonly showRemove = input<boolean, BooleanInput>(true, { transform: booleanAttribute });

  constructor() {
    classes(
      () =>
        'bg-muted text-foreground flex h-[calc(--spacing(5.5))] w-fit items-center justify-center gap-1 rounded-sm px-1.5 text-xs font-medium whitespace-nowrap has-data-[slot=combobox-chip-remove]:pe-0 has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50',
    );
  }
}
