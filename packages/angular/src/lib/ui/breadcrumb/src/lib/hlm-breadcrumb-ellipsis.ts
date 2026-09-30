import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorDotsThree } from '@ng-icons/phosphor-icons/regular';
import { HlmIcon } from '../../../icon/src';
import { hlm } from '../../../utils/src';
import type { ClassValue } from 'clsx';

@Component({
  selector: 'hlm-breadcrumb-ellipsis',
  imports: [NgIcon, HlmIcon],
  providers: [provideIcons({ phosphorDotsThree })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span data-slot="breadcrumb-ellipsis" aria-hidden="true" [class]="_computedClass()">
      <ng-icon hlm size="sm" name="phosphorDotsThree" />
    </span>
  `,
})
export class HlmBreadcrumbEllipsis {
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  /** Screen reader only text for the ellipsis */
  public readonly srOnlyText = input<string>('More');

  protected readonly _computedClass = computed(() =>
    hlm('curve-breadcrumb-ellipsis', this.userClass()),
  );
}
