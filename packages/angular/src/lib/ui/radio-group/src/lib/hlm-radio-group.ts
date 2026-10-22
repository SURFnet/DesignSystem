import { BooleanInput } from '@angular/cdk/coercion';
import { computed, Directive, inject, input } from '@angular/core';
import { BrnFieldControlDescribedBy } from '@spartan-ng/brain/field';
import { BrnRadioGroup } from '@spartan-ng/brain/radio-group';
import { ariaInvalid, ariaInvalidOverride, classes } from '../../../utils/src';
import type { ClassValue } from 'clsx';

@Directive({
  selector: '[hlmRadioGroup],hlm-radio-group',
  hostDirectives: [
    {
      directive: BrnRadioGroup,
      inputs: ['name', 'value', 'disabled', 'required'],
      outputs: ['valueChange'],
    },
    // Expose aria-describedby so a consumer's ids are merged with hlmField's instead of
    // being overwritten by the directive's host binding.
    { directive: BrnFieldControlDescribedBy, inputs: ['aria-describedby'] },
  ],
  host: {
    'data-slot': 'radio-group',
    '[attr.data-invalid]': '_controlInvalid() ? "true" : null',
    '[attr.data-dirty]': '_dirty() ? "true" : null',
    '[attr.data-touched]': '_touched() ? "true" : null',
  },
})
export class HlmRadioGroup {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  private readonly _brnRadioGroup = inject(BrnRadioGroup);
  protected readonly _controlInvalid = computed(
    () => this._brnRadioGroup.controlState?.()?.invalid,
  );

  /** Overrides the form control's invalid state for `aria-invalid`. */
  public readonly ariaInvalid = input<boolean | undefined, BooleanInput>(undefined, {
    alias: 'aria-invalid',
    transform: ariaInvalidOverride,
  });

  protected readonly _touched = computed(() => this._brnRadioGroup.controlState?.()?.touched);
  protected readonly _dirty = computed(() => this._brnRadioGroup.controlState?.()?.dirty);

  protected readonly _errorState = computed(
    () => this._brnRadioGroup.controlState?.()?.spartanInvalid,
  );

  constructor() {
    classes(() => [
      'curve-radio-group',
      this.userClass(),
      this._errorState() ? 'curve-radio-group--invalid' : '',
    ]);
    ariaInvalid(this.ariaInvalid, this._controlInvalid);
  }
}
