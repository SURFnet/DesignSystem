import { Directive, input } from '@angular/core';
import {
  ariaRequiredAttribute,
  injectAriaRequired,
} from '../../../field/src/lib/hlm-field-required';
import { BrnFieldControlDescribedBy } from '@spartan-ng/brain/field';
import { BrnInput } from '@spartan-ng/brain/input';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmInput]',
  hostDirectives: [
    { directive: BrnInput, inputs: ['id', 'forceInvalid'] },
    BrnFieldControlDescribedBy,
  ],
  host: { '[attr.aria-required]': '_ariaRequired()' },
})
export class HlmInput {
  /** Explicit `aria-required`; when absent, the surrounding field decides (required by default). */
  public readonly ariaRequiredOverride = input<boolean | undefined, unknown>(undefined, {
    alias: 'aria-required',
    transform: ariaRequiredAttribute,
  });

  protected readonly _ariaRequired = injectAriaRequired(this.ariaRequiredOverride);

  constructor() {
    classes(() => 'curve-input');
  }
}
