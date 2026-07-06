import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorImage, phosphorPlus } from '@ng-icons/phosphor-icons/regular';
import {
  HlmAvatarImports,
  HlmBreadcrumbImports,
  HlmButtonImports,
  HlmCheckboxImports,
  HlmTableImports,
} from '@surfnet/curve-angular';
import { getApps, parseCategory, parsePage } from '../lib/apps';
import type { AppCategoryFilter, AppRecord } from '../lib/mock-data';
import { AppsSearchComponent } from './apps-search.component';
import { CategoryFilterComponent } from './category-filter.component';
import { RowActionsComponent } from './row-actions.component';

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

@Component({
  selector: 'app-browse-apps',
  templateUrl: './browse-apps.component.html',
  imports: [
    AppsSearchComponent,
    CategoryFilterComponent,
    RowActionsComponent,
    HlmAvatarImports,
    HlmBreadcrumbImports,
    HlmButtonImports,
    HlmCheckboxImports,
    HlmTableImports,
    NgIcon,
    RouterLink,
  ],
  providers: [provideIcons({ phosphorImage, phosphorPlus })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseAppsComponent {
  private readonly router = inject(Router);

  public readonly search = input<string | undefined>('');
  public readonly category = input<string | undefined>('');
  public readonly page = input<string | undefined>('');

  protected readonly selected = signal(new Set<string>());

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

  protected readonly isAllSelected = computed(() => {
    const items = this.items();
    return items.length > 0 && items.every((app) => this.selected().has(app.id));
  });

  protected readonly isSomeSelected = computed(() => {
    const items = this.items();
    return items.some((app) => this.selected().has(app.id)) && !this.isAllSelected();
  });

  protected formatRevenue(value: number): string {
    return currency.format(value);
  }

  protected isSelected(app: AppRecord): boolean {
    return this.selected().has(app.id);
  }

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

  protected toggleAll(checked: boolean): void {
    const next = new Set(this.selected());
    for (const app of this.items()) {
      if (checked) {
        next.add(app.id);
      } else {
        next.delete(app.id);
      }
    }
    this.selected.set(next);
  }

  protected toggleRow(app: AppRecord, checked: boolean): void {
    const next = new Set(this.selected());
    if (checked) {
      next.add(app.id);
    } else {
      next.delete(app.id);
    }
    this.selected.set(next);
  }
}
