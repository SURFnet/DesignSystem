import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorDotsThree } from '@ng-icons/phosphor-icons/regular';
import { HlmDropdownMenuImports } from '../../../dropdown-menu/src';
import { CurveDataTableRowEvent } from './model/curve-data-table-row-event';

@Component({
  selector: 'data-table-icon-cell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HlmDropdownMenuImports, NgIcon],
  providers: [provideIcons({ phosphorDotsThree })],
  template: `
    <button hlmBtn variant="ghost" size="sm" [hlmDropdownMenuTrigger]="menu">
      <ng-icon name="phosphorDotsThree" />
    </button>
    <ng-template #menu>
      <hlm-dropdown-menu align="start" class="w-48">
        @for (action of actions(); track action) {
          <button hlmDropdownMenuItem (click)="onActionClick(action)">
            {{ action }}
          </button>
        }
      </hlm-dropdown-menu>
    </ng-template>
  `,
})
export class DataTableActionCell<TData> {
  public readonly record = input.required<TData>();
  public readonly actions = input.required<string[]>();
  public actionTriggered = output<CurveDataTableRowEvent<TData>>();

  onActionClick(action: string) {
    const event: CurveDataTableRowEvent<TData> = { action: action, record: this.record() };
    this.actionTriggered.emit(event);
  }
}
