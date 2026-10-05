import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BrnAvatar } from '@spartan-ng/brain/avatar';
import { classes } from '../../../utils/src';
import type { AvatarSizeName } from '@surfnet/curve-contracts';

@Component({
  selector: 'hlm-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'avatar',
    '[attr.data-size]': 'size()',
  },
  template: `
    @if (_image()?.canShow()) {
      <ng-content select="[hlmAvatarImage],[brnAvatarImage]" />
    } @else {
      <ng-content select="[hlmAvatarFallback],[brnAvatarFallback]" />
    }
    <ng-content />
  `,
})
export class HlmAvatar extends BrnAvatar {
  public readonly size = input<AvatarSizeName>('default');

  constructor() {
    super();
    // Styling lives in ./hlm-avatar.css; `group/avatar` stays as a hook for consumers' Tailwind.
    classes(() => 'curve-avatar group/avatar');
  }
}
