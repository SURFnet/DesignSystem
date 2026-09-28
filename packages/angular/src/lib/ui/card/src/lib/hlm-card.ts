import { Directive, input } from '@angular/core';
import { classes } from '../../../utils/src';
import { HlmCardConfig, injectHlmCardConfig } from './hlm-card.token';

@Directive({
  selector: '[hlmCard],hlm-card',
  host: {
    'data-slot': 'card',
    '[attr.data-size]': 'size()',
  },
})
export class HlmCard {
  private readonly _defaultConfig = injectHlmCardConfig();
  public readonly size = input<HlmCardConfig['size']>(this._defaultConfig.size);

  constructor() {
    // Styling lives in ./hlm-card.css; `group/card` stays as a hook for consumers' Tailwind.
    classes(() => 'curve-card group/card');
  }
}
