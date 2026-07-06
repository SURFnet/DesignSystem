import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorImage, phosphorPlus } from '@ng-icons/phosphor-icons/regular';
import {
  HlmAvatarImports,
  HlmBreadcrumbImports,
  HlmButtonImports,
  HlmCheckboxImports,
  HlmDataTableImports,
  injectDataTable,
} from '@surfnet/curve-angular';
import { flexRenderComponent, type ColumnDef, type Row, type Table } from '@tanstack/angular-table';
import { getApps, parseCategory, parsePage } from '../lib/apps';
import type { AppCategoryFilter, AppRecord } from '../lib/mock-data';
import { AppsSearchComponent } from './apps-search.component';
import { CategoryFilterComponent } from './category-filter.component';
import { RowActionsComponent } from './row-actions.component';

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

@Component({
  selector: 'app-select-all-cell',
  imports: [HlmCheckboxImports],
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
class SelectAllCell<TRecord> {
  public readonly table = input.required<Table<TRecord>>();
}

@Component({
  selector: 'app-select-row-cell',
  imports: [HlmCheckboxImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <hlm-checkbox
      aria-label="Select row"
      [checked]="row().getIsSelected()"
      (checkedChange)="row().toggleSelected($event)"
    />
  `,
})
class SelectRowCell<TRecord> {
  public readonly row = input.required<Row<TRecord>>();
}

@Component({
  selector: 'app-app-cell',
  imports: [HlmAvatarImports, NgIcon],
  providers: [provideIcons({ phosphorImage })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-center gap-3">
      <hlm-avatar>
        <img hlmAvatarImage [src]="iconUrl()" alt="" />
        <span hlmAvatarFallback>
          <ng-icon name="phosphorImage" />
        </span>
      </hlm-avatar>
      <span class="font-medium">{{ name() }}</span>
    </div>
  `,
})
class AppCell {
  public readonly iconUrl = input<string>();
  public readonly name = input.required<string>();
}

@Component({
  selector: 'app-muted-cell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="text-muted-foreground">{{ value() }}</span>`,
})
class MutedCell {
  public readonly value = input.required<string>();
}

const columns: ColumnDef<AppRecord, unknown>[] = [
  {
    id: 'select',
    header: ({ table }) => flexRenderComponent(SelectAllCell<AppRecord>, { inputs: { table } }),
    cell: ({ row }) => flexRenderComponent(SelectRowCell<AppRecord>, { inputs: { row } }),
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: 'App',
    cell: ({ row }) =>
      flexRenderComponent(AppCell, {
        inputs: { iconUrl: row.original.iconUrl, name: row.original.name },
      }),
  },
  {
    accessorKey: 'vendor',
    header: 'Vendor',
    cell: ({ row }) => flexRenderComponent(MutedCell, { inputs: { value: row.original.vendor } }),
  },
  {
    accessorKey: 'revenue',
    header: 'Revenue',
    cell: ({ row }) => currency.format(row.original.revenue),
  },
  {
    id: 'actions',
    cell: ({ row }) =>
      flexRenderComponent(RowActionsComponent, { inputs: { appName: row.original.name } }),
  },
];

@Component({
  selector: 'app-browse-apps',
  templateUrl: './browse-apps.component.html',
  imports: [
    AppsSearchComponent,
    CategoryFilterComponent,
    HlmBreadcrumbImports,
    HlmButtonImports,
    HlmDataTableImports,
    NgIcon,
    RouterLink,
  ],
  providers: [provideIcons({ phosphorPlus })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseAppsComponent {
  private readonly router = inject(Router);

  public readonly search = input<string | undefined>('');
  public readonly category = input<string | undefined>('');
  public readonly page = input<string | undefined>('');

  protected readonly categoryFilter = computed(() => parseCategory(this.category()));

  protected readonly result = computed(() =>
    getApps({
      search: this.search() ?? '',
      category: this.categoryFilter(),
      page: parsePage(this.page()),
    }),
  );

  protected readonly items = computed(() => this.result().items);
  protected readonly total = computed(() => this.result().total);
  protected readonly hasMore = computed(() => this.result().hasMore);
  protected readonly nextPage = computed(() => parsePage(this.page()) + 1);

  protected readonly columns = columns;
  protected readonly table = injectDataTable(() => ({
    data: this.items(),
    columns: this.columns,
    getRowId: (app: AppRecord) => app.id,
    initialPagination: { pageIndex: 0, pageSize: 1000 },
  }));

  protected onSearchChange(value: string): void {
    this.router.navigate([], {
      queryParams: { search: value || null, page: null },
      queryParamsHandling: 'merge',
    });
  }

  protected onCategoryChange(value: AppCategoryFilter): void {
    this.router.navigate([], {
      queryParams: { category: value === 'All' ? null : value, page: null },
      queryParamsHandling: 'merge',
    });
  }
}
