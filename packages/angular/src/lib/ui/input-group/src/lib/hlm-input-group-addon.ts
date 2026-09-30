import { Directive, input } from '@angular/core';
import { classes } from '../../../utils/src';

type InputGroupAddonAlign = 'inline-start' | 'inline-end' | 'block-start' | 'block-end';

const inputGroupAddonAlignClasses = {
  'inline-start': 'curve-input-group-addon--inline-start',
  'inline-end': 'curve-input-group-addon--inline-end',
  'block-start': 'curve-input-group-addon--block-start',
  'block-end': 'curve-input-group-addon--block-end',
} satisfies Record<InputGroupAddonAlign, string>;

type InputGroupAddonVariants = { align?: InputGroupAddonAlign | null };

@Directive({
  selector: '[hlmInputGroupAddon],hlm-input-group-addon',
  host: {
    role: 'group',
    'data-slot': 'input-group-addon',
    '[attr.data-align]': 'align()',
  },
})
export class HlmInputGroupAddon {
  public readonly align = input<InputGroupAddonVariants['align']>('inline-start');

  constructor() {
    classes(() => [
      'curve-input-group-addon',
      inputGroupAddonAlignClasses[this.align() ?? 'inline-start'],
    ]);
  }
}
