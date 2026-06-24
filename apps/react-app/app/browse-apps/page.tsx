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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@surfnet/react';
import { getApps, parseCategory, parsePage } from '@/app/lib/apps';
import { buildHref } from '@/app/lib/url';

import { AppsSearch } from './apps-search';
import { CategoryFilter } from './category-filter';
import { LoadMore } from './load-more';
import { RowActions } from './row-actions';
import { RowCheckbox, SelectAllCheckbox, SelectionProvider } from './selection';

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

type SearchParams = Promise<{ search?: string; category?: string; page?: string }>;

export default async function BrowseAppsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const search = params.search ?? '';
  const category = parseCategory(params.category);
  const page = parsePage(params.page);

  const { items, total, hasMore } = await getApps({ search, category, page });
  const ids = items.map((app) => app.id);

  // Build the "load more" href from the current query, bumping the page.
  const nextHref = buildHref('/browse-apps', params, { page: page + 1 });

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
          <Button>Create new application</Button>
        </div>
      </div>

      <SelectionProvider>
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <SelectAllCheckbox ids={ids} />
                </TableHead>
                <TableHead>App</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    No apps found.
                  </TableCell>
                </TableRow>
              ) : (
                items.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell>
                      <RowCheckbox id={app.id} label={app.name} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar size="sm">
                          <AvatarImage src={app.iconUrl} alt="" />
                          <AvatarFallback>{app.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{app.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{app.vendor}</TableCell>
                    <TableCell>{currency.format(app.revenue)}</TableCell>
                    <TableCell>
                      <RowActions appName={app.name} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </SelectionProvider>

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
