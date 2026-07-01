import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorSidebarSimple } from '@ng-icons/phosphor-icons/regular';
import { HlmButton, provideBrnButtonConfig } from '../../../button/src';
import { HlmSidebarService } from './hlm-sidebar.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[hlmSidebarTrigger]',
  imports: [NgIcon],
  providers: [
    provideIcons({ phosphorSidebarSimple }),
    provideBrnButtonConfig({ variant: 'ghost', size: 'icon-sm' }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [{ directive: HlmButton, inputs: ['variant', 'size'] }],
  host: {
    'data-slot': 'sidebar-trigger',
    'data-sidebar': 'trigger',
    '(click)': '_onClick()',
  },
  template: `
    <ng-icon name="phosphorSidebarSimple" />
    <span class="sr-only">{{ srOnlyText() }}</span>
  `,
})
export class HlmSidebarTrigger {
  private readonly _sidebarService = inject(HlmSidebarService);

  public readonly srOnlyText = input('Toggle Sidebar');

  protected _onClick(): void {
    this._sidebarService.toggleSidebar();
  }
}
