import type { BooleanInput } from '@angular/cdk/coercion';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCaretUpDown } from '@ng-icons/phosphor-icons/regular';
import { BrnFieldControl, BrnFieldControlDescribedBy } from '@spartan-ng/brain/field';
import { BrnSelectTrigger, injectBrnSelectBase } from '@spartan-ng/brain/select';
import { ariaInvalid, ariaInvalidOverride, hlm } from '../../../utils/src';
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
  host: { '[attr.aria-required]': 'null', '[attr.aria-invalid]': 'null' },
  template: `
    <button
      #button
      brnSelectTrigger
      brnFieldControlDescribedBy
      [forceInvalid]="forceInvalid()"
      [id]="buttonId()"
      [class]="_computedClass()"
      [attr.data-size]="size()"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-required]="_ariaRequired()"
      data-slot="select-trigger"
      (blur)="_markTouched()"
    >
      <ng-content />
      <ng-icon name="phosphorCaretUpDown" class="curve-select-trigger-icon" />
    </button>
  `,
})
export class HlmSelectTrigger {
  private static _id = 0;

  private readonly _select = injectBrnSelectBase();
  private readonly _fieldControl = inject(BrnFieldControl, { optional: true });
  private readonly _button = viewChild.required('button', { read: ElementRef<HTMLElement> });

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

  /** Overrides `forceInvalid` and the form control's invalid state for `aria-invalid`. */
  public readonly ariaInvalid = input<boolean | undefined, BooleanInput>(undefined, {
    alias: 'aria-invalid',
    transform: ariaInvalidOverride,
  });

  constructor() {
    ariaInvalid(
      this.ariaInvalid,
      this.forceInvalid,
      () => this._fieldControl?.invalid(),
      () => this._button().nativeElement,
    );
  }

  // CURVE: a11y — Brain only marks the control touched when the popup closes, so tabbing past
  // an empty required select never showed its error. Match native fields: touched on blur.
  protected _markTouched() {
    if (!this._select.isExpanded()) this._fieldControl?.ngControl?.control?.markAsTouched();
  }
}
