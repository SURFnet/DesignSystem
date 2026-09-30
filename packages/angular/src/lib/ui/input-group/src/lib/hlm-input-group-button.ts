import { Directive, input } from '@angular/core';
import { HlmButton, provideBrnButtonConfig } from '../../../button/src';
import { classes } from '../../../utils/src';

// Styling lives in ./hlm-input-group.css (on top of hlmBtn's `curve-button`).
type InputGroupButtonSize = 'xs' | 'sm' | 'icon-xs' | 'icon-sm';

const inputGroupButtonSizeClasses = {
  xs: 'curve-input-group-button--size-xs',
  sm: 'curve-input-group-button--size-sm',
  'icon-xs': 'curve-input-group-button--size-icon-xs',
  'icon-sm': 'curve-input-group-button--size-icon-sm',
} satisfies Record<InputGroupButtonSize, string>;

type InputGroupAddonVariants = { size?: InputGroupButtonSize | null };

@Directive({
  selector: 'button[hlmInputGroupButton]',
  providers: [
    provideBrnButtonConfig({
      variant: 'ghost',
    }),
  ],
  hostDirectives: [
    {
      directive: HlmButton,
      inputs: ['variant'],
    },
  ],
  host: {
    '[attr.data-size]': 'size()',
    '[type]': 'type()',
  },
})
export class HlmInputGroupButton {
  public readonly size = input<InputGroupAddonVariants['size']>('xs');
  public readonly type = input<'button' | 'submit' | 'reset'>('button');

  constructor() {
    classes(() => ['curve-input-group-button', inputGroupButtonSizeClasses[this.size() ?? 'xs']]);
  }
}
