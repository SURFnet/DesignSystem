import { MagnifyingGlassIcon, InfoIcon, PlusIcon, PaperPlaneTiltIcon } from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { inputGroupContract } from '@surfnet/contracts';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from './input-group';

const meta = {
  title: 'Components/InputGroup',
  component: InputGroup,
  parameters: {
    docs: {
      description: {
        component: inputGroupContract.description,
      },
    },
  },
} satisfies Meta<typeof InputGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Search field with a leading icon and trailing result count. */
export const WithLeadingAndTrailingAddon: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <InputGroup>
        <InputGroupAddon>
          <MagnifyingGlassIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search…" />
        <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

/** URL input with a text prefix on the leading side. */
export const WithTextPrefix: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="example.com" className="pl-1!" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton className="rounded-full" size="icon-xs">
            <InfoIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

/** Category select prefix — a dropdown trigger on the leading side. */
export const WithLeadingDropdown: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <InputGroup>
        <InputGroupAddon>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<InputGroupButton variant="ghost">Category</InputGroupButton>}
            />
            <DropdownMenuContent>
              <DropdownMenuItem>All</DropdownMenuItem>
              <DropdownMenuItem>Articles</DropdownMenuItem>
              <DropdownMenuItem>Pages</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
        <InputGroupInput placeholder="Search…" />
      </InputGroup>
    </div>
  ),
};

/** Chat-style textarea with a block-end toolbar row. */
export const TextareaWithBlockEndToolbar: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <InputGroup>
        <InputGroupTextarea placeholder="Ask, search or chat…" />
        <InputGroupAddon align="block-end">
          <InputGroupButton variant="outline" className="rounded-full" size="icon-xs">
            <PlusIcon />
          </InputGroupButton>
          <InputGroupText className="ml-auto">52% used</InputGroupText>
          <InputGroupButton variant="default" className="rounded-full" size="icon-xs" disabled>
            <PaperPlaneTiltIcon />
            <span className="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};
