'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Checkbox,
  DataTableContent,
  useDataTable,
} from '@surfnet/curve-react';
import type { ColumnDef } from '@tanstack/react-table';
import { PlusIcon } from '@phosphor-icons/react/dist/ssr';

import type { AppRecord } from '@/lib/mock-data';

import { AppsSearch } from '@/components/browse-apps/apps-search';
import { CategoryFilter } from '@/components/browse-apps/category-filter';
import { LoadMore } from '@/components/browse-apps/load-more';
import { RowActions } from '@/components/browse-apps/row-actions';

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

const columns: ColumnDef<AppRecord, unknown>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label={`Select ${row.original.name}`}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'App',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar size="sm">
          <AvatarImage src={row.original.iconUrl} alt="" />
          <AvatarFallback>{row.original.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <span className="font-medium">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: 'vendor',
    header: 'Vendor',
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.vendor}</span>,
  },
  {
    accessorKey: 'revenue',
    header: 'Revenue',
    cell: ({ row }) => currency.format(row.original.revenue),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <RowActions appName={row.original.name} />,
  },
];

export type BrowseAppsViewProps = {
  search: string;
  category: string;
  items: AppRecord[];
  total: number;
  hasMore: boolean;
  /** Href for the "load more" link (current query with page bumped). */
  nextHref: string;
};

/**
 * Presentational browse-apps page. The data ({@link items}, {@link total}, …) is
 * computed by the caller — the server component in a normal build, or
 * {@link BrowseAppsClient} in the static-export build — so both render the same
 * markup while differing only in *where* the query runs.
 */
export function BrowseAppsView({
  search,
  category,
  items,
  total,
  hasMore,
  nextHref,
}: BrowseAppsViewProps) {
  // Each page navigation replaces `items` wholesale (pagination is server-driven
  // via `nextHref`, not client-side), so the table doesn't need real pagination —
  // a page size larger than any single page's item count just disables it.
  const table = useDataTable({
    data: items,
    columns,
    initialPagination: { pageIndex: 0, pageSize: 1000 },
  });

  return (
    <div className="mx-auto w-full max-w-6xl px-8 py-6">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Settings</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Profile details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-8 space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">Browse apps</h1>
        <p className="text-muted-foreground">
          Manage access to the apps that the Dummy IdP is connected to.
        </p>
      </div>

      <div className="mb-4 flex items-center justify-between gap-4">
        <AppsSearch defaultValue={search} />
        <div className="flex items-center gap-2">
          <CategoryFilter value={category} />
          <Button variant="secondary">
            <PlusIcon />
            Create new application
          </Button>
        </div>
      </div>

      <DataTableContent table={table} columns={columns} noResultsLabel="No apps found." />

      <div className="mt-4 flex items-center justify-between">
        {hasMore ? (
          <LoadMore href={nextHref} />
        ) : (
          <span className="text-sm text-muted-foreground">No more apps.</span>
        )}
        <span className="text-sm text-muted-foreground">
          Showing {items.length} of {total}
        </span>
      </div>
    </div>
  );
}
