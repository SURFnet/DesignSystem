import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  phosphorCaretUpDown,
  phosphorDotsThree,
  phosphorImage,
  phosphorMagnifyingGlass,
  phosphorPlus,
  phosphorSubtractSquare,
  phosphorTerminalWindow,
} from '@ng-icons/phosphor-icons/regular';
import {
  HlmBreadcrumbImports,
  HlmSidebarImports,
  HlmSeparatorImports,
  HlmInputGroupImports,
  HlmDataTableImports,
  HlmButtonImports,
  HlmInputImports,
  HlmDropdownMenuImports,
  HlmCheckbox,
  injectDataTable,
} from '@surfnet/angular';
import { flexRenderComponent, type ColumnDef, type Row, type Table } from '@tanstack/angular-table';

type App = {
  id: string;
  imageUrl?: string;
  app: string;
  vendor: string;
  revenue: number;
};

const data: App[] = [
  {
    id: '1',
    imageUrl: 'https://picsum.photos/seed/123/40',
    app: '10voordeleraar-loa1',
    vendor: '10voordeleraar-loa1',
    revenue: 199,
  },
  {
    id: '2',
    imageUrl: 'https://picsum.photos/seed/321/40',
    app: '10voordeleraar-loa2-without-interaction-with-mail',
    vendor: '10voordeleraar-loa2-without-interaction-with-mail',
    revenue: 199,
  },
  {
    id: '3',
    app: '10voordeleraar-loa2-without-interaction-with-mail',
    vendor: '10voordeleraar-loa2-without-interaction-with-mail',
    revenue: 199,
  },
  {
    id: '4',
    app: '10voordeleraar-loa2-without-interaction-with-mail',
    vendor: '10voordeleraar-loa2-without-interaction-with-mail',
    revenue: 199,
  },
  {
    id: '5',
    imageUrl: 'https://picsum.photos/seed/123/40',
    app: '10voordeleraar-loa1',
    vendor: '10voordeleraar-loa1',
    revenue: 199,
  },
  {
    id: '6',
    app: '10voordeleraar-loa2-without-interaction-with-mail',
    vendor: '10voordeleraar-loa2-without-interaction-with-mail',
    revenue: 199,
  },
  {
    id: '7',
    imageUrl: 'https://picsum.photos/seed/123/40',
    app: '10voordeleraar-loa1',
    vendor: '10voordeleraar-loa1',
    revenue: 199,
  },
  {
    id: '8',
    imageUrl: 'https://picsum.photos/seed/123/40',
    app: '10voordeleraar-loa1',
    vendor: '10voordeleraar-loa1',
    revenue: 199,
  },
];

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

@Component({
  selector: 'data-table-select-all',
  imports: [HlmCheckbox],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <hlm-checkbox
      aria-label="Select all"
      [checked]="table().getIsAllPageRowsSelected()"
      [indeterminate]="table().getIsSomePageRowsSelected()"
      (checkedChange)="table().toggleAllPageRowsSelected($event)"
    />
  `,
})
class DataTableSelectAll<TRecord> {
  public readonly table = input.required<Table<TRecord>>();
}

@Component({
  selector: 'data-table-select-row',
  imports: [HlmCheckbox],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <hlm-checkbox
      aria-label="Select row"
      [checked]="row().getIsSelected()"
      (checkedChange)="row().toggleSelected($event)"
    />
  `,
})
class DataTableSelectRowCell<TRecord> {
  public readonly row = input.required<Row<TRecord>>();
}

@Component({
  selector: 'data-table-string-cell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span>{{ value() }}</span>`,
})
class DataTableStringCell {
  public readonly value = input.required<string>();
}

@Component({
  selector: 'data-table-image-string-cell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon],
  template: `<div class="flex flex-row">
    @if (imageUrl()) {
      <img [src]="imageUrl()" width="40" height="40" class="flex-initial" />
    } @else {
      <ng-icon name="phosphorImage" size="40" class="flex-initial" />
    }
    <div class="grow flex ml-1">
      <span class="my-auto">{{ value() }}</span>
    </div>
  </div>`,
})
class DataTableImageStringCell {
  public readonly imageUrl = input<string>();
  public readonly value = input.required<string>();
}

@Component({
  selector: 'data-table-number-cell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="text-right">{{ formatted() }}</div>`,
})
class DataTableNumberCell {
  public readonly value = input.required<number>();
  public readonly formatter = input<Intl.NumberFormat>();
  protected readonly formatted = computed(() => {
    const formatter = this.formatter();
    const value = this.value();
    return formatter ? formatter.format(value) : value;
  });
}

@Component({
  selector: 'data-table-icon-cell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon],
  template: `<ng-icon [name]="icon()" />`,
})
class DataTableIconCell {
  public readonly icon = input.required<string>();
}

const columns: ColumnDef<App, unknown>[] = [
  {
    id: 'select',
    header: ({ table }) => flexRenderComponent(DataTableSelectAll<App>, { inputs: { table } }),
    cell: ({ row }) => flexRenderComponent(DataTableSelectRowCell<App>, { inputs: { row } }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'app',
    header: 'App',
    cell: ({ row }) =>
      flexRenderComponent(DataTableImageStringCell, {
        inputs: {
          imageUrl: row.original.imageUrl,
          value: row.getValue<string>('app'),
        },
      }),
  },
  {
    accessorKey: 'vendor',
    header: 'Vendor',
    cell: ({ row }) =>
      flexRenderComponent(DataTableStringCell, {
        inputs: { value: row.getValue<string>('vendor') },
      }),
  },
  {
    accessorKey: 'revenue',
    header: 'Revenue',
    cell: ({ row }) =>
      flexRenderComponent(DataTableNumberCell, {
        inputs: { value: row.getValue<number>('revenue'), formatter: currency },
      }),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({}) => flexRenderComponent(DataTableIconCell, { inputs: { icon: 'phosphorDotsThree' } }),
  },
];

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
  imports: [
    HlmBreadcrumbImports,
    HlmButtonImports,
    HlmDropdownMenuImports,
    HlmInputImports,
    HlmInputGroupImports,
    HlmSeparatorImports,
    HlmSidebarImports,
    HlmDataTableImports,
    NgIcon,
  ],
  providers: [
    provideIcons({
      phosphorCaretUpDown,
      phosphorDotsThree,
      phosphorImage,
      phosphorMagnifyingGlass,
      phosphorPlus,
      phosphorSubtractSquare,
      phosphorTerminalWindow,
    }),
  ],
})
export class DemoComponent {
  protected readonly columns = columns;
  protected readonly table = injectDataTable(() => ({ data, columns: this.columns }));
  protected readonly appFilter = signal('');

  protected hideableColumns() {
    return this.table.getAllColumns().filter((column) => column.getCanHide());
  }

  protected setAppFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.appFilter.set(value);
    this.table.getColumn('app')?.setFilterValue(value);
  }
}
