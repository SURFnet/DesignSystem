import { Directive, input } from '@angular/core';
import { BrnTabs } from '@spartan-ng/brain/tabs';
import { classes } from '../../../utils/src';

@Directive({
  selector: '[hlmTabs],hlm-tabs',
  hostDirectives: [
    {
      directive: BrnTabs,
      inputs: ['orientation', 'activationMode', 'brnTabs: tab'],
      outputs: ['tabActivated'],
    },
  ],
  host: {
    'data-slot': 'tabs',
  },
})
export class HlmTabs {
  public readonly tab = input.required<string>();

  constructor() {
    // Styling lives in ./hlm-tabs.css; `group/tabs` stays as a hook for consumers' Tailwind.
    classes(() => 'curve-tabs group/tabs');
  }
}
