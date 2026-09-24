import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef } from 'react';
import { nativeDialogContract } from '@surfnet/curve-contracts';

import { Button } from '@/components/ui/button';

import {
  NativeDialog,
  NativeDialogClose,
  NativeDialogDescription,
  NativeDialogFooter,
  NativeDialogHeader,
  NativeDialogTitle,
} from './native-dialog';

const meta = {
  title: 'Components/NativeDialog',
  component: NativeDialog,
  parameters: {
    docs: {
      description: {
        component: nativeDialogContract.docs.description,
      },
    },
    // No dedicated Figma frame — links to Dialog, the Base UI component this
    // is a lightweight native alternative to.
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=424-7365&t=vT3gKkMDSpQaeqci-4',
    },
  },
} satisfies Meta<typeof NativeDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const ref = useRef<HTMLDialogElement>(null);
    return (
      <>
        <Button type="button" onClick={() => ref.current?.showModal()}>
          Open dialog
        </Button>
        <NativeDialog ref={ref}>
          <NativeDialogClose dialogRef={ref} aria-label="Close">
            ×
          </NativeDialogClose>
          <NativeDialogHeader>
            <NativeDialogTitle>Native dialog</NativeDialogTitle>
            <NativeDialogDescription>
              Uses the platform <code>&lt;dialog&gt;</code> element with <code>showModal()</code>.
            </NativeDialogDescription>
          </NativeDialogHeader>
          <NativeDialogFooter>
            <Button type="button" variant="outline" onClick={() => ref.current?.close()}>
              Cancel
            </Button>
            <Button type="button" onClick={() => ref.current?.close()}>
              Confirm
            </Button>
          </NativeDialogFooter>
        </NativeDialog>
      </>
    );
  },
};
