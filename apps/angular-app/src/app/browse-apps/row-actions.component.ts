import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorDotsThreeBold } from '@ng-icons/phosphor-icons/bold';
import { HlmButtonImports, HlmDropdownMenuImports } from '@surfnet/curve-angular';

@Component({
  selector: 'app-row-actions',
  templateUrl: './row-actions.component.html',
  imports: [HlmButtonImports, HlmDropdownMenuImports, NgIcon],
  providers: [provideIcons({ phosphorDotsThreeBold })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RowActionsComponent {
  public readonly appName = input.required<string>();

  protected readonly ariaLabel = computed(() => `Actions for ${this.appName()}`);
}
