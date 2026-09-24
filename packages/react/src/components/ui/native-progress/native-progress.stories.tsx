import type { Meta, StoryObj } from '@storybook/react-vite';
import { nativeProgressContract } from '@surfnet/curve-contracts';

import { NativeProgress } from './native-progress';

const meta = {
  title: 'Components/NativeProgress',
  component: NativeProgress,
  parameters: {
    docs: {
      description: {
        component: nativeProgressContract.docs.description,
      },
    },
    // No dedicated Figma frame — links to Progress, the Base UI component this
    // is a lightweight native alternative to.
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=65-441',
    },
  },
} satisfies Meta<typeof NativeProgress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <NativeProgress value={45} max={100} />,
};
