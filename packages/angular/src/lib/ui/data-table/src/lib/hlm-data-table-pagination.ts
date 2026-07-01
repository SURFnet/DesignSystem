import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HlmButton } from '../../../button/src';
import { type Table } from '@tanstack/angular-table';

/**
 * Selection summary plus Previous / Next paging controls. Mirrors React's
 * `DataTablePagination`.
 */
@Component({
  selector: 'hlm-data-table-pagination',
  imports: [HlmButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'data-table-pagination',
    class: 'flex items-center justify-end gap-2 py-4',
  },
  template: `
    <div class="text-muted-foreground flex-1 text-sm">
      {{
        selectionLabel()(
          table().getFilteredSelectedRowModel().rows.length,
          table().getFilteredRowModel().rows.length
        )
      }}
    </div>
    <div class="flex gap-2">
      <button
        hlmBtn
        variant="outline"
        size="sm"
        [disabled]="!table().getCanPreviousPage()"
        (click)="table().previousPage()"
      >
        {{ previousLabel() }}
      </button>
      <button
        hlmBtn
        variant="outline"
        size="sm"
        [disabled]="!table().getCanNextPage()"
        (click)="table().nextPage()"
      >
        {{ nextLabel() }}
      </button>
    </div>
  `,
})
export class HlmDataTablePagination<TData> {
  /** The TanStack table instance, e.g. from `injectDataTable`. */
  public readonly table = input.required<Table<TData>>();

  /** Label for the "previous page" button. */
  public readonly previousLabel = input<string>('Previous');

  /** Label for the "next page" button. */
  public readonly nextLabel = input<string>('Next');

  /** Builds the selection-summary text from the selected and total row counts. */
  public readonly selectionLabel = input<(selectedCount: number, totalCount: number) => string>(
    (selectedCount, totalCount) => `${selectedCount} of ${totalCount} row(s) selected.`,
  );
}
