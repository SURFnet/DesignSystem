import { booleanAttribute, Directive, input } from '@angular/core';
import type { BooleanInput } from '@angular/cdk/coercion';
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

  /**
   * Mark this control optional, e.g. when it isn't inside an `hlmField`. Inside a field, prefer
   * `hlmField optional` so the label gets its "(optioneel)" suffix too.
   */
  public readonly optional = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

  protected readonly _ariaRequired = injectAriaRequired(this.ariaRequiredOverride, this.optional);

  constructor() {
    classes(() => 'curve-input');
  }
}
