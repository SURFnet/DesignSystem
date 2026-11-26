import type { Meta, StoryObj } from '@storybook/react-vite';
import { sonnerContract } from '@surfnet/curve-contracts';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import { Toaster } from './sonner';

const meta: Meta<typeof Toaster> = {
  title: 'Components/Sonner',
  // Unverified: shadcn/ui WCAG 2.2 AA audit (thefrontkit, 2026).
  tags: ['a11y-minor'],
  component: Toaster,
  parameters: {
    docs: {
      description: {
        component: sonnerContract.docs.description,
      },
      story: {
        height: 200,
        inline: false,
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/pEp49benCBB2MYxWvs5A6t/Curve-Design-System?node-id=118-2756',
    },
  },
  argTypes: {
    position: {
      control: false,
      table: {
        type: {
          summary: 'enum',
          detail:
            "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'",
        },
      },
      description: 'Where toasts are rendered on screen.',
    },
    richColors: {
      control: false,
      description: 'Use background colors for success/error/warning toasts.',
    },
    closeButton: {
      control: false,
      description: 'Show a dismiss button on each toast.',
    },
    expand: {
      control: false,
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
 * The toaster itself renders nothing visible — render it once in the root of
 * your app, then call `toast()` from anywhere to push a message onto it.
 */
export const Default: Story = {
  render: (args) => (
    <div id="root-of-your-app">
      <Toaster {...args} />
      <div id="anywhere-in-your-app">
        <Button variant="outline" onClick={() => toast('Event has been created.')}>
          Show toast
        </Button>
      </div>
    </div>
  ),
};

/** A success toast using `toast.success()` */
export const Success: Story = {
  render: () => (
    <div id="root-of-your-app">
      <Toaster />
      <div id="anywhere-in-your-app">
        <Button variant="outline" onClick={() => toast.success('Changes saved successfully.')}>
          Success
        </Button>
      </div>
    </div>
  ),
};

/** An info toast using `toast.info()` */
export const InfoToast: Story = {
  render: () => (
    <div id="root-of-your-app">
      <Toaster />
      <div id="anywhere-in-your-app">
        <Button variant="outline" onClick={() => toast.info('A new version is available.')}>
          Info
        </Button>
      </div>
    </div>
  ),
};

/** A warning toast using `toast.warning()` */
export const Warning: Story = {
  render: () => (
    <div id="root-of-your-app">
      <Toaster />
      <div id="anywhere-in-your-app">
        <Button variant="outline" onClick={() => toast.warning('Your session is about to expire.')}>
          Warning
        </Button>
      </div>
    </div>
  ),
};

/** An error toast using `toast.error()` */
export const Error: Story = {
  render: () => (
    <div id="root-of-your-app">
      <Toaster />
      <div id="anywhere-in-your-app">
        <Button variant="outline" onClick={() => toast.error('Something went wrong.')}>
          Error
        </Button>
      </div>
    </div>
  ),
};

/** A loading toast with a spinner using `toast.loading()`. Pass an id so you can dismiss the toast later using `toast.dismiss(id)` */
export const Loading: Story = {
  render: () => (
    <div id="root-of-your-app">
      <Toaster />
      <div id="anywhere-in-your-app">
        <Button
          variant="outline"
          onClick={() => {
            const id = 'sonner-story-upload';
            toast.getToasts().find((t) => t.id === id)
              ? toast.dismiss(id)
              : toast.loading('Uploading file…', { id: 'sonner-story-upload' });
          }}
        >
          Loading
        </Button>
      </div>
    </div>
  ),
};

/** A loading toast with a spinner that automatically updates to a success/error toast using `toast.promise()` */
export const LoadingPromise: Story = {
  render: () => (
    <div id="root-of-your-app">
      <Toaster />
      <div id="anywhere-in-your-app">
        <Button
          variant="outline"
          onClick={() => {
            const myPromise = new Promise<{ name: string }>((resolve, reject) => {
              setTimeout(() => {
                Math.random() > 0.5
                  ? resolve({ name: 'My toast' })
                  : reject({ error: 'Some error' });
              }, 1000);
            });

            toast.promise(myPromise, {
              loading: 'Loading...',
              success: (data) => {
                return `${data.name} has been added`;
              },
              error: (data) => {
                return `An error occurred: ${data.error}`;
              },
            });
          }}
        >
          Loading
        </Button>
      </div>
    </div>
  ),
};

/** Setting the `richColors` flag gives each type a distinctive colored background. A green background for 'success'. */
export const RichColorsSuccess: Story = {
  render: () => (
    <div id="root-of-your-app">
      <Toaster richColors />
      <div id="anywhere-in-your-app">
        <Button variant="outline" onClick={() => toast.success('Changes saved successfully.')}>
          Success
        </Button>
      </div>
    </div>
  ),
};

/** Setting the `richColors` flag gives each type a distinctive colored background. A blue background for 'info'. */
export const RichColorsInfoToast: Story = {
  render: () => (
    <div id="root-of-your-app">
      <Toaster richColors />
      <div id="anywhere-in-your-app">
        <Button variant="outline" onClick={() => toast.info('A new version is available.')}>
          Info
        </Button>
      </div>
    </div>
  ),
};

/** Setting the `richColors` flag gives each type a distinctive colored background. A yellow background for 'warning'. */
export const RichColorsWarning: Story = {
  render: () => (
    <div id="root-of-your-app">
      <Toaster richColors />
      <div id="anywhere-in-your-app">
        <Button variant="outline" onClick={() => toast.warning('Your session is about to expire.')}>
          Warning
        </Button>
      </div>
    </div>
  ),
};

/** Setting the `richColors` flag gives each type a distinctive colored background. A red background for 'error'. */
export const RichColorsError: Story = {
  render: () => (
    <div id="root-of-your-app">
      <Toaster richColors />
      <div id="anywhere-in-your-app">
        <Button variant="outline" onClick={() => toast.error('Something went wrong.')}>
          Error
        </Button>
      </div>
    </div>
  ),
};

/** Show it in the top-left corner by setting `position="top-left"` */
export const PositionTopLeft: Story = {
  render: () => (
    <div id="root-of-your-app">
      <Toaster position="top-left" />
      <div id="anywhere-in-your-app">
        <Button variant="outline" onClick={() => toast('Event has been created.')}>
          Top Left
        </Button>
      </div>
    </div>
  ),
};

/** Show it in the top-center by setting `position="top-center"` */
export const PositionTopCenter: Story = {
  render: () => (
    <div id="root-of-your-app">
      <Toaster position="top-center" />
      <div id="anywhere-in-your-app">
        <Button variant="outline" onClick={() => toast('Event has been created.')}>
          Top Center
        </Button>
      </div>
    </div>
  ),
};

/** Show it in the top-right corner by setting `position="top-right"` */
export const PositionTopRight: Story = {
  render: () => (
    <div id="root-of-your-app">
      <Toaster position="top-right" />
      <div id="anywhere-in-your-app">
        <Button variant="outline" onClick={() => toast('Event has been created.')}>
          Top Right
        </Button>
      </div>
    </div>
  ),
};

/** Show it in the bottom-left corner by setting `position="bottom-left"` */
export const PositionBottomLeft: Story = {
  render: () => (
    <div id="root-of-your-app">
      <Toaster position="bottom-left" />
      <div id="anywhere-in-your-app">
        <Button variant="outline" onClick={() => toast('Event has been created.')}>
          Bottom Left
        </Button>
      </div>
    </div>
  ),
};

/** Show it in the bottom-center by setting `position="bottom-center"` */
export const PositionBottomCenter: Story = {
  render: () => (
    <div id="root-of-your-app">
      <Toaster position="bottom-center" />
      <div id="anywhere-in-your-app">
        <Button variant="outline" onClick={() => toast('Event has been created.')}>
          Bottom Center
        </Button>
      </div>
    </div>
  ),
};

/** Show it in the bottom-right by setting `position="bottom-right"` */
export const PositionBottomRight: Story = {
  render: () => (
    <div id="root-of-your-app">
      <Toaster position="bottom-right" />
      <div id="anywhere-in-your-app">
        <Button variant="outline" onClick={() => toast('Event has been created.')}>
          Bottom Right
        </Button>
      </div>
    </div>
  ),
};

/** A toast with a title and a description */
export const WithDescription: Story = {
  render: () => (
    <div id="root-of-your-app">
      <Toaster />
      <div id="anywhere-in-your-app">
        <Button
          variant="outline"
          onClick={() =>
            toast('Event has been created.', {
              description: 'Sunday, December 03, 2023 at 9:00 AM',
            })
          }
        >
          Show toast with description
        </Button>
      </div>
    </div>
  ),
};

/** A toast with a title, a description, and an action button */
export const WithAction: Story = {
  render: () => (
    <div id="root-of-your-app">
      <Toaster />
      <div id="anywhere-in-your-app">
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
    </div>
  ),
};
