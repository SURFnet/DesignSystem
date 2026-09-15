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
  },
} satisfies Meta<typeof NativeProgress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <NativeProgress value={45} max={100} />,
};
