import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { paginationContract } from '@surfnet/curve-contracts';

import { NumberedPagination } from './numbered-pagination';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component: paginationContract.docs.description,
      },
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A typical page trail with previous/next controls and an active page. */
export const Default: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

/** A long page trail collapsed with ellipses on both ends. */
export const ManyPages: Story = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            5
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">6</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

/** A stateful trail — clicking a page or the previous/next controls updates the active page. */
export const Interactive: Story = {
  render: () => {
    const totalPages = 5;
    const [page, setPage] = useState(1);

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              aria-disabled={page === 1}
              className={page === 1 ? 'pointer-events-none opacity-50' : undefined}
              onClick={(event) => {
                event.preventDefault();
                setPage((current) => Math.max(1, current - 1));
              }}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href="#"
                isActive={pageNumber === page}
                onClick={(event) => {
                  event.preventDefault();
                  setPage(pageNumber);
                }}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              aria-disabled={page === totalPages}
              className={page === totalPages ? 'pointer-events-none opacity-50' : undefined}
              onClick={(event) => {
                event.preventDefault();
                setPage((current) => Math.min(totalPages, current + 1));
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  },
};

/**
 * The composed numbered-pagination block: page links, previous/next controls, and a
 * page-size selector, driven by `currentPage` / `itemsPerPage` state.
 */
export const NumberedPaginationStory: Story = {
  name: 'NumberedPagination',
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    return (
      <NumberedPagination
        currentPage={currentPage}
        onCurrentPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
        totalItems={237}
      />
    );
  },
};
