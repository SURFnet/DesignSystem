import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCaretDown } from '@ng-icons/phosphor-icons/regular';
import {
  BrnComboboxAnchor,
  BrnComboboxPopoverTrigger,
  BrnComboboxTrigger,
} from '@spartan-ng/brain/combobox';
import { BrnFieldControlDescribedBy } from '@spartan-ng/brain/field';
import { ButtonVariants, HlmButton } from '../../../button/src';
import { hlm } from '../../../utils/src';
import type { ClassValue } from 'clsx';

@Component({
  selector: 'hlm-combobox-trigger',
  imports: [
    NgIcon,
    HlmButton,
    BrnComboboxAnchor,
    BrnComboboxTrigger,
    BrnComboboxPopoverTrigger,
    BrnFieldControlDescribedBy,
  ],
  providers: [provideIcons({ phosphorCaretDown })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      brnComboboxTrigger
      brnComboboxAnchor
      brnComboboxPopoverTrigger
      brnFieldControlDescribedBy
      hlmBtn
      data-slot="combobox-trigger"
      [id]="buttonId()"
      [class]="_computedClass()"
      [variant]="variant()"
    >
      <ng-content />
      <ng-icon
        name="phosphorCaretDown"
        class="text-muted-foreground text-[calc(var(--spacing)*4)]"
      />
    </button>
  `,
})
export class HlmComboboxTrigger {
  private static _id = 0;

  public readonly userClass = input<ClassValue>('', {
    alias: 'class',
  });
  protected readonly _computedClass = computed(() =>
    hlm('data-placeholder:text-muted-foreground', this.userClass()),
  );

  public readonly buttonId = input<string>(`hlm-combobox-trigger-${HlmComboboxTrigger._id++}`);

  public readonly variant = input<ButtonVariants['variant']>('outline');
}
