import type { Meta, StoryObj } from '@storybook/react-vite';
import { nativePopoverContract } from '@surfnet/curve-contracts';

import { Button } from '@/components/ui/button';

import {
  NativePopover,
  NativePopoverDescription,
  NativePopoverHeader,
  NativePopoverTitle,
} from './native-popover';

const meta = {
  title: 'Components/NativePopover',
  component: NativePopover,
  parameters: {
    docs: {
      description: {
        component: nativePopoverContract.docs.description,
      },
    },
    // No dedicated Figma frame — links to Popover, the Base UI component this
    // is a lightweight native alternative to.
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=193-1388',
    },
  },
} satisfies Meta<typeof NativePopover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <>
      <Button type="button" popoverTarget="curve-native-popover-demo">
        Open popover
      </Button>
      <NativePopover id="curve-native-popover-demo">
        <NativePopoverHeader>
          <NativePopoverTitle>Native popover</NativePopoverTitle>
          <NativePopoverDescription>
            Uses <code>popover</code> and <code>popovertarget</code> — no positioning library.
          </NativePopoverDescription>
        </NativePopoverHeader>
      </NativePopover>
    </>
  ),
};
