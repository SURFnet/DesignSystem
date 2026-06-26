import { ReactiveFormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  phosphorInfo,
  phosphorMagnifyingGlass,
  phosphorPaperPlaneTilt,
  phosphorPlus,
} from '@ng-icons/phosphor-icons/regular';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { inputGroupContract } from '@surfnet/contracts';
import { HlmInputGroup, HlmInputGroupImports } from '..';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';

const meta: Meta<HlmInputGroup> = {
  title: 'Components/Input Group',
  component: HlmInputGroup,
  decorators: [
    moduleMetadata({
      imports: [HlmInputGroupImports, HlmDropdownMenuImports, NgIcon, ReactiveFormsModule],
      providers: [
        provideIcons({
          phosphorInfo,
          phosphorMagnifyingGlass,
          phosphorPaperPlaneTilt,
          phosphorPlus,
        }),
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: inputGroupContract.description,
      },
    },
  },
};

export default meta;
type Story = StoryObj<HlmInputGroup>;

/** Search field with a leading icon and trailing result count. */
export const WithLeadingAndTrailingAddon: Story = {
  render: () => ({
    template: `
			<div class="w-full max-w-sm">
				<div hlmInputGroup>
					<div hlmInputGroupAddon>
						<ng-icon name="phosphorMagnifyingGlass" />
					</div>
					<input hlmInputGroupInput placeholder="Search…" />
					<div hlmInputGroupAddon align="inline-end">12 results</div>
				</div>
			</div>
		`,
  }),
};

/** URL input with a text prefix on the leading side. */
export const WithTextPrefix: Story = {
  render: () => ({
    template: `
			<div class="w-full max-w-sm">
				<div hlmInputGroup>
					<div hlmInputGroupAddon>
						<span hlmInputGroupText>https://</span>
					</div>
					<input hlmInputGroupInput placeholder="example.com" class="!pl-1" />
					<div hlmInputGroupAddon align="inline-end">
						<button hlmInputGroupButton class="rounded-full" size="icon-xs" [hlmTooltip]="'This is content in a tooltip.'">
							<ng-icon name="phosphorInfo" />
						</button>
					</div>
				</div>
			</div>
		`,
  }),
};

/** Category select prefix — a dropdown trigger on the leading side. */
export const WithLeadingDropdown: Story = {
  render: () => ({
    template: `
			<div class="w-full max-w-sm">
				<div hlmInputGroup>
					<div hlmInputGroupAddon>
						<button hlmBtn variant="ghost" [hlmDropdownMenuTrigger]="menu">Category</button>
						<ng-template #menu>
							<hlm-dropdown-menu>
								<button hlmDropdownMenuItem>All</button>
								<button hlmDropdownMenuItem>Articles</button>
								<button hlmDropdownMenuItem>Pages</button>
							</hlm-dropdown-menu>
						</ng-template>
					</div>
					<input hlmInputGroupInput placeholder="Search…" />
				</div>
			</div>
		`,
  }),
};

/** Chat-style textarea with a block-end toolbar row. */
export const TextareaWithBlockEndToolbar: Story = {
  render: () => ({
    template: `
			<div class="w-full max-w-sm">
				<div hlmInputGroup>
					<textarea hlmInputGroupTextarea placeholder="Ask, Search or Chat…"></textarea>
					<div hlmInputGroupAddon align="block-end">
						<button hlmInputGroupButton variant="outline" class="rounded-full" size="icon-xs">
							<ng-icon name="phosphorPlus" />
						</button>
						<span hlmInputGroupText class="ml-auto">52% used</span>
						<hlm-separator orientation="vertical" class="!h-4" />
						<button hlmInputGroupButton variant="default" class="rounded-full" size="icon-xs" disabled>
							<ng-icon name="phosphorPaperPlaneTilt" />
							<span class="sr-only">Send</span>
						</button>
					</div>
				</div>
			</div>
		`,
  }),
};
