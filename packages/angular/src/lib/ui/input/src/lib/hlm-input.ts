import { BooleanInput } from '@angular/cdk/coercion';
import { Directive, inject, input } from '@angular/core';
import { BrnFieldControl, BrnFieldControlDescribedBy } from '@spartan-ng/brain/field';
import {
  ariaRequiredAttribute,
  injectAriaRequired,
} from '../../../field/src/lib/hlm-field-required';
import { BrnInput } from '@spartan-ng/brain/input';
import { ariaInvalid, ariaInvalidOverride, classes } from '../../../utils/src';

@Directive({
  selector: '[hlmInput]',
  hostDirectives: [
    { directive: BrnInput, inputs: ['id', 'forceInvalid'] },
    // Expose aria-describedby so a consumer's ids are merged with hlmField's instead of
    // being overwritten by the directive's host binding.
    { directive: BrnFieldControlDescribedBy, inputs: ['aria-describedby'] },
  ],
  host: { '[attr.aria-required]': '_ariaRequired()' },
})
export class HlmInput {
  private readonly _fieldControl = inject(BrnFieldControl, { optional: true });
  private readonly _brn = inject(BrnInput);

  /** Overrides `forceInvalid` and the form control's invalid state for `aria-invalid`. */
  public readonly ariaInvalid = input<boolean | undefined, BooleanInput>(undefined, {
    alias: 'aria-invalid',
    transform: ariaInvalidOverride,
  });

  /** Explicit `aria-required`; when absent, the surrounding field decides (required by default). */
  public readonly ariaRequiredOverride = input<boolean | undefined, unknown>(undefined, {
    alias: 'aria-required',
    transform: ariaRequiredAttribute,
  });

  protected readonly _ariaRequired = injectAriaRequired(this.ariaRequiredOverride);

  constructor() {
    classes(() => 'curve-input');
    ariaInvalid(this.ariaInvalid, this._brn.forceInvalid, () => this._fieldControl?.invalid());
  }
}
