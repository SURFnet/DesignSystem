import { applicationConfig, moduleMetadata } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { breadcrumbContract } from '@surfnet/contracts';
import { HlmBreadcrumb, HlmBreadcrumbImports } from '..';
import { provideRouter } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';

const meta: Meta<HlmBreadcrumb> = {
  title: 'Components/Breadcrumb',
  component: HlmBreadcrumb,
  decorators: [
    moduleMetadata({
      imports: [HlmBreadcrumbImports],
    }),
    applicationConfig({
      providers: [
        provideRouter([
          { path: '', component: HlmBreadcrumb },
          { path: '**', redirectTo: '' },
        ]),
        provideLocationMocks(),
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: breadcrumbContract.description,
      },
    },
  },
};

export default meta;
type Story = StoryObj<HlmBreadcrumb>;

/** A typical trail ending on the current page. */
export const Default: Story = {
  render: () => ({
    template: `
			<nav hlmBreadcrumb>
				<ol hlmBreadcrumbList>
					<li hlmBreadcrumbItem>
						<a hlmBreadcrumbLink link="/home">Home</a>
					</li>
					<li hlmBreadcrumbSeparator></li>
					<li hlmBreadcrumbItem>
						<a hlmBreadcrumbLink link="/components">Apps</a>
					</li>
					<li hlmBreadcrumbSeparator></li>
					<li hlmBreadcrumbItem>
						<span hlmBreadcrumbPage>App catalog</span>
					</li>
				</ol>
			</nav>
		`,
  }),
};

/** A long trail collapsed with an ellipsis. */
export const WithEllipsis: Story = {
  render: () => ({
    template: `
			<nav hlmBreadcrumb>
				<ol hlmBreadcrumbList>
					<li hlmBreadcrumbItem>
						<a hlmBreadcrumbLink link="/home">Home</a>
					</li>
					<li hlmBreadcrumbSeparator></li>
					<li hlmBreadcrumbItem>
						<hlm-breadcrumb-ellipsis />
					</li>
					<li hlmBreadcrumbSeparator></li>
					<li hlmBreadcrumbItem>
						<span hlmBreadcrumbPage>App catalog</span>
					</li>
				</ol>
			</nav>
    `,
  }),
};
