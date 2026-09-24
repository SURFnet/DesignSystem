import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  nativeCheckboxContract,
  nativeInputContract,
  nativeRangeContract,
  nativeRadioContract,
  nativeTextareaContract,
} from '@surfnet/curve-contracts';

import { NativeCheckbox } from '@/components/ui/native-checkbox';
import { NativeInput } from '@/components/ui/native-input';
import { NativeRange } from '@/components/ui/native-range';
import { NativeRadio } from '@/components/ui/native-radio';
import { NativeTextarea } from '@/components/ui/native-textarea';

const meta = {
  title: 'Components/NativeFormControls',
  parameters: {
    docs: {
      description: {
        component: [
          nativeInputContract.docs.description,
          nativeTextareaContract.docs.description,
          nativeCheckboxContract.docs.description,
          nativeRadioContract.docs.description,
          nativeRangeContract.docs.description,
        ].join('\n\n'),
      },
    },
    // TODO: replace with the real Figma frame URL for this component.
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/REPLACE_WITH_FILE_KEY/Curve?node-id=REPLACE_WITH_NODE_ID',
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const TextFields: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 24 * 16 }}>
      <NativeInput placeholder="Text" />
      <NativeInput type="email" placeholder="Email" />
      <NativeInput type="password" placeholder="Password" />
      <NativeInput type="search" placeholder="Search" />
      <NativeInput type="date" />
      <NativeInput type="time" />
      <NativeInput type="number" placeholder="Number" />
      <NativeInput type="file" />
      <NativeInput size="sm" placeholder="Small" />
      <NativeTextarea placeholder="Message" rows={3} />
    </div>
  ),
};

export const ChoiceControls: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <NativeCheckbox defaultChecked />
        Subscribe
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <NativeRadio name="plan" value="free" defaultChecked />
        Free
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <NativeRadio name="plan" value="pro" />
        Pro
      </label>
      <NativeRange defaultValue={40} />
    </div>
  ),
};
