import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { FlexRenderDirective, type ColumnDef, type Table } from '@tanstack/angular-table';

/**
 * Renders a TanStack table instance into the styled helm `table` directives. Mirrors React's
 * `DataTableContent`: header groups, body rows (with `data-state="selected"` per selected
 * row), and an empty-state row when there are no rows.
 *
 * String / HTML header and cell defs flow through `*flexRender` + `[innerHTML]`; component
 * cell defs created with `flexRenderComponent()` are mounted in place by `*flexRender`.
 */
@Component({
  selector: 'hlm-data-table-content',
  imports: [HlmTableImports, FlexRenderDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'data-table-content',
    class: 'block overflow-hidden rounded-md border',
  },
  template: `
    <div hlmTableContainer>
      <table hlmTable>
        <thead hlmTableHeader>
          @for (headerGroup of table().getHeaderGroups(); track headerGroup.id) {
            <tr hlmTableRow>
              @for (header of headerGroup.headers; track header.id) {
                <th hlmTableHead>
                  @if (!header.isPlaceholder) {
                    <ng-container
                      *flexRender="
                        header.column.columnDef.header;
                        props: header.getContext();
                        let headerContent
                      "
                    >
                      <span [innerHTML]="headerContent"></span>
                    </ng-container>
                  }
                </th>
              }
            </tr>
          }
        </thead>
        <tbody hlmTableBody>
          @if (table().getRowModel().rows.length) {
            @for (row of table().getRowModel().rows; track row.id) {
              <tr hlmTableRow [attr.data-state]="row.getIsSelected() ? 'selected' : null">
                @for (cell of row.getVisibleCells(); track cell.id) {
                  <td hlmTableCell>
                    <ng-container
                      *flexRender="
                        cell.column.columnDef.cell;
                        props: cell.getContext();
                        let cellContent
                      "
                    >
                      <span [innerHTML]="cellContent"></span>
                    </ng-container>
                  </td>
                }
              </tr>
            }
          } @else {
            <tr hlmTableRow>
              <td hlmTableCell [attr.colspan]="columns().length" class="h-24 text-center">
                {{ noResultsLabel() }}
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
export class HlmDataTableContent<TData> {
  /** The TanStack table instance, e.g. from `injectDataTable`. */
  public readonly table = input.required<Table<TData>>();

  /** The column defs — used to span the empty-state row across all columns. */
  public readonly columns = input.required<ColumnDef<TData, unknown>[]>();

  /** Content shown in the body when there are no rows. */
  public readonly noResultsLabel = input<string>('No results.');
}
