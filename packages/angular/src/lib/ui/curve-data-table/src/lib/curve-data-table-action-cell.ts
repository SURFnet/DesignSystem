import { Component, ChangeDetectionStrategy, computed, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorDotsThree } from '@ng-icons/phosphor-icons/regular';
import { HlmButton } from '../../../button/src';
import { HlmDropdownMenuImports } from '../../../dropdown-menu/src';
import type { CurveDataTableAlignment } from './model/curve-data-table-column';
import { CurveDataTableRowEvent } from './model/curve-data-table-row-event';

@Component({
  selector: 'data-table-action-cell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HlmButton, HlmDropdownMenuImports, NgIcon],
  providers: [provideIcons({ phosphorDotsThree })],
  template: `
    <div [attr.class]="alignClass()">
      <button
        hlmBtn
        variant="ghost"
        size="icon-sm"
        [hlmDropdownMenuTrigger]="menu"
        aria-label="Open action menu"
      >
        <ng-icon name="phosphorDotsThree" />
      </button>
    </div>
    <ng-template #menu>
      <hlm-dropdown-menu align="start" class="curve-data-table-actions-menu">
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
  public readonly align = input<CurveDataTableAlignment>();
  public actionTriggered = output<CurveDataTableRowEvent<TData>>();

  protected readonly alignClass = computed(() => {
    const align = this.align();
    return align ? `curve-data-table-value--${align}` : null;
  });

  onActionClick(action: string) {
    const event: CurveDataTableRowEvent<TData> = { action: action, record: this.record() };
    this.actionTriggered.emit(event);
  }
}
