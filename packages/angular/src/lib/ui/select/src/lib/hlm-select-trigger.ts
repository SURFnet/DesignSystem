import type { BooleanInput } from '@angular/cdk/coercion';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCaretUpDown } from '@ng-icons/phosphor-icons/regular';
import { BrnFieldControlDescribedBy } from '@spartan-ng/brain/field';
import { BrnSelectTrigger } from '@spartan-ng/brain/select';
import { hlm } from '../../../utils/src';
import type { SelectTriggerSizeName } from '@surfnet/curve-contracts';
import type { ClassValue } from 'clsx';
import {
  ariaRequiredAttribute,
  injectAriaRequired,
} from '../../../field/src/lib/hlm-field-required';

@Component({
  selector: 'hlm-select-trigger',
  imports: [NgIcon, BrnSelectTrigger, BrnFieldControlDescribedBy],
  providers: [provideIcons({ phosphorCaretUpDown })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[attr.aria-required]': 'null' },
  template: `
    <button
      brnSelectTrigger
      brnFieldControlDescribedBy
      [forceInvalid]="forceInvalid()"
      [id]="buttonId()"
      [class]="_computedClass()"
      [attr.data-size]="size()"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-required]="_ariaRequired()"
      data-slot="select-trigger"
    >
      <ng-content />
      <ng-icon name="phosphorCaretUpDown" class="curve-select-trigger-icon" />
    </button>
  `,
})
export class HlmSelectTrigger {
  private static _id = 0;

  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  protected readonly _computedClass = computed(() => hlm('curve-select-trigger', this.userClass()));

  public readonly buttonId = input<string>(`hlm-select-trigger-${HlmSelectTrigger._id++}`);

  /** The aria-label for the trigger button. Required when there's no visible, associated label. */
  public readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });

  public readonly size = input<SelectTriggerSizeName>('default');

  /** Explicit `aria-required`; when absent, the surrounding field decides (required by default). */
  public readonly ariaRequiredOverride = input<boolean | undefined, unknown>(undefined, {
    alias: 'aria-required',
    transform: ariaRequiredAttribute,
  });

  protected readonly _ariaRequired = injectAriaRequired(this.ariaRequiredOverride);

  /** Whether to force the trigger into an invalid state. */
  public readonly forceInvalid = input<boolean, BooleanInput>(false, {
    transform: booleanAttribute,
  });
}
