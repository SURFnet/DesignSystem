import { Directive, input } from '@angular/core';
import { BrnTabsList } from '@spartan-ng/brain/tabs';
import { classes } from '../../../utils/src';
import type { TabsVariantName } from '@surfnet/curve-contracts';

// Styling lives in ./hlm-tabs.css; `group/tabs-list` stays as a hook for consumers' Tailwind.
const listVariantClasses = {
  default: 'curve-tabs-list--variant-default',
  line: 'curve-tabs-list--variant-line',
} satisfies Record<TabsVariantName, string>;

type ListVariants = { variant?: TabsVariantName | null };

export function listVariants({ variant }: ListVariants = {}): string {
  return `curve-tabs-list group/tabs-list ${listVariantClasses[variant ?? 'default']}`;
}

@Directive({
  selector: '[hlmTabsList],hlm-tabs-list',
  hostDirectives: [BrnTabsList],
  host: {
    'data-slot': 'tabs-list',
    '[attr.data-variant]': 'variant()',
  },
})
export class HlmTabsList {
  public readonly variant = input<ListVariants['variant']>('default');

  constructor() {
    classes(() => listVariants({ variant: this.variant() }));
  }
}
