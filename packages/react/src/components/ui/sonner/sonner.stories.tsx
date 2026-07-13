import type { Meta, StoryObj } from '@storybook/react-vite';
import { sonnerContract } from '@surfnet/curve-contracts';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import { Toaster } from './sonner';

const meta = {
  title: 'Components/Sonner',
  component: Toaster,
  parameters: {
    docs: {
      description: {
        component: sonnerContract.docs.description,
      },
    },
  },
  argTypes: {
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
      description: 'Where toasts are rendered on screen.',
    },
    richColors: {
      control: 'boolean',
      description: 'Use stronger colors for success/error/warning toasts.',
    },
    closeButton: {
      control: 'boolean',
      description: 'Show a dismiss button on each toast.',
    },
    expand: {
      control: 'boolean',
      description: 'Always expand toasts instead of stacking them.',
    },
  },
  args: {
    position: 'bottom-right',
    richColors: false,
    closeButton: false,
    expand: false,
  },
} satisfies Meta<typeof Toaster>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The toaster itself renders nothing visible — mount it once, then call `toast()` from
 * anywhere to push a message onto it. Tweak the controls and click the button to see them
 * take effect.
 */
export const Default: Story = {
  render: (args) => (
    <div>
      <Toaster {...args} />
      <Button variant="outline" onClick={() => toast('Event has been created.')}>
        Show toast
      </Button>
    </div>
  ),
};

/** Every toast type side by side. */
export const Types: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Toaster />
      <Button variant="outline" onClick={() => toast('Event has been created.')}>
        Default
      </Button>
      <Button variant="outline" onClick={() => toast.success('Changes saved successfully.')}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.info('A new version is available.')}>
        Info
      </Button>
      <Button variant="outline" onClick={() => toast.warning('Your session is about to expire.')}>
        Warning
      </Button>
      <Button variant="outline" onClick={() => toast.error('Something went wrong.')}>
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.loading('Uploading file…', { id: 'sonner-story-upload' })}
      >
        Loading
      </Button>
    </div>
  ),
};

/** A toast with a title, a description, and an action button — the most common composed shape. */
export const WithAction: Story = {
  render: () => (
    <div>
      <Toaster />
      <Button
        variant="outline"
        onClick={() =>
          toast('Event has been created.', {
            description: 'Sunday, December 03, 2023 at 9:00 AM',
            action: {
              label: 'Undo',
              onClick: () => {},
            },
          })
        }
      >
        Show toast with action
      </Button>
    </div>
  ),
};

/** `richColors` gives success/error/warning toasts a stronger, semantic background color. */
export const RichColors: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Toaster richColors />
      <Button variant="outline" onClick={() => toast.success('Changes saved successfully.')}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.error('Something went wrong.')}>
        Error
      </Button>
    </div>
  ),
};
