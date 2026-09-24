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
    // No dedicated Figma frame — links to Accordion, the Base UI component this
    // is a lightweight native alternative to.
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=1-434&p=f&t=vT3gKkMDSpQaeqci-0',
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
