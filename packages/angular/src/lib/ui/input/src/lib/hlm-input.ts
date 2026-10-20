import { BooleanInput } from '@angular/cdk/coercion';
import { Directive, inject, input } from '@angular/core';
import { BrnFieldControl, BrnFieldControlDescribedBy } from '@spartan-ng/brain/field';
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
})
export class HlmInput {
  private readonly _fieldControl = inject(BrnFieldControl, { optional: true });

  /** Overrides the form control's invalid state for `aria-invalid`. */
  public readonly ariaInvalid = input<boolean | undefined, BooleanInput>(undefined, {
    alias: 'aria-invalid',
    transform: ariaInvalidOverride,
  });

  constructor() {
    classes(() => 'curve-input');
    ariaInvalid(this.ariaInvalid, () => this._fieldControl?.invalid());
  }
}
