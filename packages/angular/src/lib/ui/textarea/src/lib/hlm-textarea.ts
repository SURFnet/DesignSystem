import { BooleanInput } from '@angular/cdk/coercion';
import { Directive, inject, input } from '@angular/core';
import { BrnFieldControl, BrnFieldControlDescribedBy } from '@spartan-ng/brain/field';
import { BrnTextarea } from '@spartan-ng/brain/textarea';
import { ariaInvalid, ariaInvalidOverride, classes } from '../../../utils/src';

@Directive({
  selector: '[hlmTextarea]',
  hostDirectives: [
    { directive: BrnTextarea, inputs: ['id', 'forceInvalid'] },
    // Expose aria-describedby so a consumer's ids are merged with hlmField's instead of
    // being overwritten by the directive's host binding.
    { directive: BrnFieldControlDescribedBy, inputs: ['aria-describedby'] },
  ],
  host: { 'data-slot': 'textarea' },
})
export class HlmTextarea {
  private readonly _fieldControl = inject(BrnFieldControl, { optional: true });

  /** Overrides the form control's invalid state for `aria-invalid`. */
  public readonly ariaInvalid = input<boolean | undefined, BooleanInput>(undefined, {
    alias: 'aria-invalid',
    transform: ariaInvalidOverride,
  });

  constructor() {
    classes(() => 'curve-textarea');
    ariaInvalid(this.ariaInvalid, () => this._fieldControl?.invalid());
  }
}
