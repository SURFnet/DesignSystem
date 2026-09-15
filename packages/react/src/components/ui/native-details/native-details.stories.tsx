import type { Meta, StoryObj } from '@storybook/react-vite';
import { nativeDetailsContract } from '@surfnet/curve-contracts';

import { NativeDetails, NativeDetailsContent, NativeSummary } from './native-details';

const meta = {
  title: 'Components/NativeDetails',
  component: NativeDetails,
  parameters: {
    docs: {
      description: {
        component: nativeDetailsContract.docs.description,
      },
    },
  },
} satisfies Meta<typeof NativeDetails>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <NativeDetails>
      <NativeSummary>What is a native details element?</NativeSummary>
      <NativeDetailsContent>
        Browsers provide built-in expand/collapse behavior without JavaScript. Use Accordion when
        you need coordinated single-expand groups.
      </NativeDetailsContent>
    </NativeDetails>
  ),
};
