import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorSpinner } from '@ng-icons/phosphor-icons/regular';
import { classes } from '../../../utils/src';

@Component({
  selector: 'hlm-spinner',
  imports: [NgIcon],
  providers: [provideIcons({ phosphorSpinner })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'status',
    '[attr.aria-label]': 'ariaLabel()',
  },
  template: ` <ng-icon [name]="icon()" /> `,
})
export class HlmSpinner {
  /**
   * The name of the icon to be used as the spinner.
   * Use provideIcons({ ... }) to register custom icons.
   */
  public readonly icon = input<string>('phosphorSpinner');

  /** Aria label for the spinner for accessibility. */
  public readonly ariaLabel = input<string>('Loading', { alias: 'aria-label' });

  constructor() {
    classes(() => 'inline-flex text-[calc(var(--spacing)*4)] motion-safe:animate-spin');
  }
}
