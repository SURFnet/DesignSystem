import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { toast, toastState } from '@spartan-ng/brain/sonner';
import { sonnerContract } from '@surfnet/curve-contracts';

import { HlmButton } from '../../../button/src';
import { HlmToaster, HlmToasterImports } from '..';

const meta: Meta<HlmToaster> = {
  title: 'Components/Sonner',
  // Unverified: shadcn/ui WCAG 2.2 AA audit (thefrontkit, 2026).
  tags: ['a11y-minor'],
  component: HlmToaster,
  decorators: [
    moduleMetadata({
      imports: [HlmToasterImports, HlmButton],
    }),
  ],
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
      description: 'Use background colors for success/error/warning toasts.',
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
};

export default meta;
type Story = StoryObj<HlmToaster>;

/**
 * Render an `hlm-toaster` bound to the story args, plus a button that pushes a toast onto it.
 * Each story sets its own starting args (e.g. `richColors: true`).
 */
const renderToaster =
  (label: string, show: () => unknown): Story['render'] =>
  (args) => ({
    props: { ...args, show },
    template: `
      <div id="root-of-your-app">
        <hlm-toaster ${argsToTemplate(args)} />
        <div id="anywhere-in-your-app">
          <button hlmBtn variant="outline" (click)="show()">${label}</button>
        </div>
      </div>
    `,
  });

/**
 * The toaster itself renders nothing visible — render it once in the root of
 * your app, then call `toast()` from anywhere to push a message onto it.
 */
export const Default: Story = {
  render: renderToaster('Show toast', () => toast('Event has been created.')),
};

/** A success toast using `toast.success()` */
export const Success: Story = {
  render: renderToaster('Success', () => toast.success('Changes saved successfully.')),
};

/** An info toast using `toast.info()` */
export const InfoToast: Story = {
  render: renderToaster('Info', () => toast.info('A new version is available.')),
};

/** A warning toast using `toast.warning()` */
export const Warning: Story = {
  render: renderToaster('Warning', () => toast.warning('Your session is about to expire.')),
};

/** An error toast using `toast.error()` */
export const Error: Story = {
  render: renderToaster('Error', () => toast.error('Something went wrong.')),
};

/** A loading toast with a spinner using `toast.loading()`. Pass an id so you can dismiss the toast later using `toast.dismiss(id)` */
export const Loading: Story = {
  render: renderToaster('Loading', () => {
    const id = 'sonner-story-upload';
    const existing = toastState.toasts().find((t) => t.id === id);
    existing ? toast.dismiss(id) : toast.loading('Uploading file…', { id });
  }),
};

/** A loading toast with a spinner that automatically updates to a success/error toast using `toast.promise()` */
export const LoadingPromise: Story = {
  render: renderToaster('Loading', () => {
    const myPromise = new Promise<{ name: string }>((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5 ? resolve({ name: 'My toast' }) : reject({ error: 'Some error' });
      }, 1000);
    });

    toast.promise(myPromise, {
      loading: 'Loading...',
      success: (data) => {
        return `${data.name} has been added`;
      },
      error: (data) => {
        return `An error occurred${data && typeof data === 'object' && 'error' in data ? ` : ${data.error}` : ''}`;
      },
    });
  }),
};

/** Setting the `richColors` flag gives each type a distinctive colored background. A green background for 'success'. */
export const RichColorsSuccess: Story = {
  args: { richColors: true },
  render: renderToaster('Success', () => toast.success('Changes saved successfully.')),
};

/** Setting the `richColors` flag gives each type a distinctive colored background. A blue background for 'info'. */
export const RichColorsInfoToast: Story = {
  args: { richColors: true },
  render: renderToaster('Info', () => toast.info('A new version is available.')),
};

/** Setting the `richColors` flag gives each type a distinctive colored background. A yellow background for 'warning'. */
export const RichColorsWarning: Story = {
  args: { richColors: true },
  render: renderToaster('Warning', () => toast.warning('Your session is about to expire.')),
};

/** Setting the `richColors` flag gives each type a distinctive colored background. A red background for 'error'. */
export const RichColorsError: Story = {
  args: { richColors: true },
  render: renderToaster('Error', () => toast.error('Something went wrong.')),
};

/** Show it in the top-left corner by setting `position="top-left"` */
export const PositionTopLeft: Story = {
  args: { position: 'top-left' },
  render: renderToaster('Top Left', () => toast('Event has been created.')),
};

/** Show it in the top-center by setting `position="top-center"` */
export const PositionTopCenter: Story = {
  args: { position: 'top-center' },
  render: renderToaster('Top Center', () => toast('Event has been created.')),
};

/** Show it in the top-right corner by setting `position="top-right"` */
export const PositionTopRight: Story = {
  args: { position: 'top-right' },
  render: renderToaster('Top Right', () => toast('Event has been created.')),
};

/** Show it in the bottom-left corner by setting `position="bottom-left"` */
export const PositionBottomLeft: Story = {
  args: { position: 'bottom-left' },
  render: renderToaster('Bottom Left', () => toast('Event has been created.')),
};

/** Show it in the bottom-center by setting `position="bottom-center"` */
export const PositionBottomCenter: Story = {
  args: { position: 'bottom-center' },
  render: renderToaster('Bottom Center', () => toast('Event has been created.')),
};

/** Show it in the bottom-right by setting `position="bottom-right"` */
export const PositionBottomRight: Story = {
  args: { position: 'bottom-right' },
  render: renderToaster('Bottom Right', () => toast('Event has been created.')),
};

/** A toast with a title and a description */
export const WithDescription: Story = {
  render: renderToaster('Show toast with description', () =>
    toast('Event has been created.', {
      description: 'Sunday, December 03, 2023 at 9:00 AM',
    }),
  ),
};

/** A toast with a title, a description, and an action button */
export const WithAction: Story = {
  render: renderToaster('Show toast with action', () =>
    toast('Event has been created.', {
      description: 'Sunday, December 03, 2023 at 9:00 AM',
      action: {
        label: 'Undo',
        onClick: () => {},
      },
    }),
  ),
};
