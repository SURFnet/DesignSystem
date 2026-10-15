import { Directive, input } from '@angular/core';
import {
  ariaRequiredAttribute,
  injectAriaRequired,
} from '../../../field/src/lib/hlm-field-required';
import { BrnFieldControlDescribedBy } from '@spartan-ng/brain/field';
import { BrnTextarea } from '@spartan-ng/brain/textarea';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmTextarea]',
  hostDirectives: [
    { directive: BrnTextarea, inputs: ['id', 'forceInvalid'] },
    BrnFieldControlDescribedBy,
  ],
  host: { 'data-slot': 'textarea', '[attr.aria-required]': '_ariaRequired()' },
})
export class HlmTextarea {
  /** Explicit `aria-required`; when absent, the surrounding field decides (required by default). */
  public readonly ariaRequiredOverride = input<boolean | undefined, unknown>(undefined, {
    alias: 'aria-required',
    transform: ariaRequiredAttribute,
  });

  protected readonly _ariaRequired = injectAriaRequired(this.ariaRequiredOverride);

  constructor() {
    classes(() => 'curve-textarea');
  }
}
