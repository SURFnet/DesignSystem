import * as React from '../../../../../../node_modules/.pnpm/react@19.2.7/node_modules/react';
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
declare function NumberedPagination({ currentPage, onCurrentPageChange, itemsPerPage, onItemsPerPageChange, totalItems, maxSize, showEdges, pageSizes, className, ...props }: NumberedPaginationProps): React.JSX.Element;
/**
 * Checks that the current page is within bounds for the current page range.
 * If not, return a correct value for currentPage, or the current value if OK.
 *
 * Copied from 'ngx-pagination' / Spartan numbered pagination.
 */
export declare function outOfBoundCorrection(totalItems: number, itemsPerPage: number, currentPage: number): number;
/**
 * Returns an array of page numbers (and ellipsis markers) for the pagination controls.
 *
 * Copied from 'ngx-pagination' / Spartan numbered pagination.
 */
export declare function createPageArray(currentPage: number, itemsPerPage: number, totalItems: number, paginationRange: number): Page[];
export { NumberedPagination };
