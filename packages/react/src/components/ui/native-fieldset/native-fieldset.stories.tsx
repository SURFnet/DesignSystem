import type { Meta, StoryObj } from '@storybook/react-vite';
import { nativeFieldsetContract } from '@surfnet/curve-contracts';

import { NativeCheckbox } from '@/components/ui/native-checkbox';
import { NativeInput } from '@/components/ui/native-input';
import { NativeRadio } from '@/components/ui/native-radio';

import {
  NativeFieldset,
  NativeFieldsetContent,
  NativeFieldsetHint,
  NativeFieldsetLabel,
  NativeFieldsetRow,
  NativeLegend,
} from './native-fieldset';

const meta = {
  title: 'Components/NativeFieldset',
  component: NativeFieldset,
  parameters: {
    docs: {
      description: {
        component: nativeFieldsetContract.docs.description,
      },
    },
  },
} satisfies Meta<typeof NativeFieldset>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <NativeFieldset>
      <NativeLegend>Notification settings</NativeLegend>
      <NativeFieldsetContent>
        <NativeFieldsetRow>
          <NativeCheckbox id="native-email" name="email" defaultChecked />
          <NativeFieldsetLabel htmlFor="native-email">Email updates</NativeFieldsetLabel>
        </NativeFieldsetRow>
        <NativeFieldsetRow>
          <NativeRadio id="native-daily" name="digest" value="daily" defaultChecked />
          <NativeFieldsetLabel htmlFor="native-daily">Daily digest</NativeFieldsetLabel>
        </NativeFieldsetRow>
        <NativeFieldsetRow>
          <NativeRadio id="native-weekly" name="digest" value="weekly" />
          <NativeFieldsetLabel htmlFor="native-weekly">Weekly digest</NativeFieldsetLabel>
        </NativeFieldsetRow>
        <NativeInput
          id="native-reply-to"
          name="reply-to"
          type="email"
          placeholder="Reply-to email"
        />
        <NativeFieldsetHint>Changes apply to this workspace only.</NativeFieldsetHint>
      </NativeFieldsetContent>
    </NativeFieldset>
  ),
};
