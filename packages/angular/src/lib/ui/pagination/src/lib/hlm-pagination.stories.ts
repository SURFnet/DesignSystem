import { provideLocationMocks } from '@angular/common/testing';
import { Component } from '@angular/core';
import { provideRouter } from '@angular/router';
import { applicationConfig, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { paginationContract } from '@surfnet/curve-contracts';
import { HlmNumberedPagination, HlmPagination, HlmPaginationImports } from '..';

const meta: Meta<HlmPagination> = {
  title: 'Components/Pagination',
  component: HlmPagination,
  decorators: [
    moduleMetadata({
      imports: [HlmPaginationImports],
    }),
    applicationConfig({
      providers: [
        provideRouter([
          { path: '', component: HlmPagination },
          { path: '**', redirectTo: '' },
        ]),
        provideLocationMocks(),
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: paginationContract.docs.description,
      },
    },
  },
};

export default meta;
type Story = StoryObj<HlmPagination>;

/** A typical page trail with previous/next controls and an active page. */
export const Default: Story = {
  render: () => ({
    template: `
			<nav hlmPagination>
				<ul hlmPaginationContent>
					<li hlmPaginationItem>
						<hlm-pagination-previous link="/" />
					</li>
					<li hlmPaginationItem>
						<a hlmPaginationLink link="/">1</a>
					</li>
					<li hlmPaginationItem>
						<a hlmPaginationLink link="/" [isActive]="true">2</a>
					</li>
					<li hlmPaginationItem>
						<a hlmPaginationLink link="/">3</a>
					</li>
					<li hlmPaginationItem>
						<hlm-pagination-ellipsis />
					</li>
					<li hlmPaginationItem>
						<hlm-pagination-next link="/" />
					</li>
				</ul>
			</nav>
		`,
  }),
};

/** A long page trail collapsed with ellipses on both ends. */
export const ManyPages: Story = {
  render: () => ({
    template: `
			<nav hlmPagination>
				<ul hlmPaginationContent>
					<li hlmPaginationItem>
						<hlm-pagination-previous link="/" />
					</li>
					<li hlmPaginationItem>
						<a hlmPaginationLink link="/">1</a>
					</li>
					<li hlmPaginationItem>
						<hlm-pagination-ellipsis />
					</li>
					<li hlmPaginationItem>
						<a hlmPaginationLink link="/">4</a>
					</li>
					<li hlmPaginationItem>
						<a hlmPaginationLink link="/" [isActive]="true">5</a>
					</li>
					<li hlmPaginationItem>
						<a hlmPaginationLink link="/">6</a>
					</li>
					<li hlmPaginationItem>
						<hlm-pagination-ellipsis />
					</li>
					<li hlmPaginationItem>
						<a hlmPaginationLink link="/">10</a>
					</li>
					<li hlmPaginationItem>
						<hlm-pagination-next link="/" />
					</li>
				</ul>
			</nav>
		`,
  }),
};

@Component({
  selector: 'pagination-numbered-demo',
  imports: [HlmNumberedPagination],
  template: `
    <hlm-numbered-pagination
      [(currentPage)]="currentPage"
      [(itemsPerPage)]="itemsPerPage"
      [totalItems]="237"
    />
  `,
})
class PaginationNumberedDemo {
  currentPage = 1;
  itemsPerPage = 10;
}

/**
 * The composed numbered-pagination block: page links, previous/next controls, and a
 * page-size selector, driven by two-way `currentPage` / `itemsPerPage` bindings.
 */
export const NumberedPagination: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [PaginationNumberedDemo],
    },
    template: `<pagination-numbered-demo />`,
  }),
};
