'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './pagination';

type Page = number | '...';

export type NumberedPaginationProps = React.ComponentProps<'div'> & {
  /** The current (active) page. */
  currentPage: number;
  /** Called when the active page should change. */
  onCurrentPageChange: (page: number) => void;
  /** The number of items per paginated page. */
  itemsPerPage: number;
  /** Called when the page size should change. */
  onItemsPerPageChange: (itemsPerPage: number) => void;
  /**
   * The total number of items in the collection. Only useful when doing
   * server-side paging, where the collection size is limited to a single
   * page returned by the server API.
   */
  totalItems: number;
  /** The number of page links to show. Defaults to 7. */
  maxSize?: number;
  /** Show the previous/next edge controls. Defaults to true. */
  showEdges?: boolean;
  /** The page sizes to show. Defaults to [10, 20, 50, 100]. */
  pageSizes?: number[];
};

function NumberedPagination({
  currentPage,
  onCurrentPageChange,
  itemsPerPage,
  onItemsPerPageChange,
  totalItems,
  maxSize = 7,
  showEdges = true,
  pageSizes = [10, 20, 50, 100],
  className,
  ...props
}: NumberedPaginationProps) {
  const lastPageNumber = totalItems < 1 ? 1 : Math.ceil(totalItems / itemsPerPage);
  const correctedCurrentPage = outOfBoundCorrection(totalItems, itemsPerPage, currentPage);

  React.useEffect(() => {
    if (correctedCurrentPage !== currentPage) {
      onCurrentPageChange(correctedCurrentPage);
    }
  }, [correctedCurrentPage, currentPage, onCurrentPageChange]);

  const pages = createPageArray(correctedCurrentPage, itemsPerPage, totalItems, maxSize);
  const pageSizesWithCurrent = pageSizes.includes(itemsPerPage)
    ? pageSizes
    : [...pageSizes, itemsPerPage].sort((a, b) => a - b);

  const isFirstPageActive = correctedCurrentPage === 1;
  const isLastPageActive = correctedCurrentPage === lastPageNumber;

  return (
    <div
      data-slot="numbered-pagination"
      className={cn('flex items-center justify-between gap-2 px-4 py-2', className)}
      {...props}
    >
      <div className="flex items-center gap-1 text-sm text-nowrap text-muted-foreground">
        <b>{totalItems}</b>
        total items |<b>{lastPageNumber}</b>
        pages
      </div>

      <Pagination>
        <PaginationContent>
          {showEdges && !isFirstPageActive ? (
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  onCurrentPageChange(correctedCurrentPage - 1);
                }}
              />
            </PaginationItem>
          ) : null}

          {pages.map((page, index) => (
            <PaginationItem key={page === '...' ? `ellipsis-${index}` : page}>
              {page === '...' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  isActive={correctedCurrentPage === page}
                  onClick={(event) => {
                    event.preventDefault();
                    onCurrentPageChange(page);
                  }}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {showEdges && !isLastPageActive ? (
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  onCurrentPageChange(correctedCurrentPage + 1);
                }}
              />
            </PaginationItem>
          ) : null}
        </PaginationContent>
      </Pagination>

      <Select
        value={String(itemsPerPage)}
        onValueChange={(value) => {
          if (value != null) {
            onItemsPerPageChange(Number(value));
          }
        }}
      >
        <SelectTrigger className="ml-auto w-fit">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {pageSizesWithCurrent.map((pageSize) => (
              <SelectItem key={pageSize} value={String(pageSize)}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

/**
 * Checks that the current page is within bounds for the current page range.
 * If not, return a correct value for currentPage, or the current value if OK.
 *
 * Copied from 'ngx-pagination' / Spartan numbered pagination.
 */
export function outOfBoundCorrection(
  totalItems: number,
  itemsPerPage: number,
  currentPage: number,
): number {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages < currentPage && 0 < totalPages) {
    return totalPages;
  }

  if (currentPage < 1) {
    return 1;
  }

  return currentPage;
}

/**
 * Returns an array of page numbers (and ellipsis markers) for the pagination controls.
 *
 * Copied from 'ngx-pagination' / Spartan numbered pagination.
 */
export function createPageArray(
  currentPage: number,
  itemsPerPage: number,
  totalItems: number,
  paginationRange: number,
): Page[] {
  paginationRange = +paginationRange;
  const pages: Page[] = [];

  const totalPages = Math.max(Math.ceil(totalItems / itemsPerPage), 1);
  const halfWay = Math.ceil(paginationRange / 2);

  const isStart = currentPage <= halfWay;
  const isEnd = totalPages - halfWay < currentPage;
  const isMiddle = !isStart && !isEnd;

  const ellipsesNeeded = paginationRange < totalPages;
  let i = 1;

  while (i <= totalPages && i <= paginationRange) {
    let label: Page;
    const pageNumber = calculatePageNumber(i, currentPage, paginationRange, totalPages);
    const openingEllipsesNeeded = i === 2 && (isMiddle || isEnd);
    const closingEllipsesNeeded = i === paginationRange - 1 && (isMiddle || isStart);
    if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
      label = '...';
    } else {
      label = pageNumber;
    }
    pages.push(label);
    i++;
  }

  return pages;
}

function calculatePageNumber(
  i: number,
  currentPage: number,
  paginationRange: number,
  totalPages: number,
) {
  const halfWay = Math.ceil(paginationRange / 2);
  if (i === paginationRange) {
    return totalPages;
  }

  if (i === 1) {
    return i;
  }

  if (paginationRange < totalPages) {
    if (totalPages - halfWay < currentPage) {
      return totalPages - paginationRange + i;
    }
    if (halfWay < currentPage) {
      return currentPage - halfWay + i;
    }
    return i;
  }

  return i;
}

export { NumberedPagination };
