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
 * The toaster itself renders nothing visible — render it once in the root of
 * your app, then call `toast()` from anywhere to push a message onto it.
 */
export const Default: Story = {
  render: (args) => ({
    props: { ...args, showToast: () => toast('Event has been created.') },
    template: `
      <div id="root-of-your-app">
        <hlm-toaster ${argsToTemplate(args)} />
        <div id="anywhere-in-your-app">
          <button hlmBtn variant="outline" (click)="showToast()">Show toast</button>
        </div>
      </div>
    `,
  }),
};

/** A success toast using `toast.success()` */
export const Success: Story = {
  render: () => ({
    props: { showSuccess: () => toast.success('Changes saved successfully.') },
    template: `
      <div id="root-of-your-app">
        <hlm-toaster />
        <div id="anywhere-in-your-app">
          <button hlmBtn variant="outline" (click)="showSuccess()">Success</button>
        </div>
      </div>
    `,
  }),
};

/** An info toast using `toast.info()` */
export const InfoToast: Story = {
  render: () => ({
    props: { showInfo: () => toast.info('A new version is available.') },
    template: `
      <div id="root-of-your-app">
        <hlm-toaster />
        <div id="anywhere-in-your-app">
          <button hlmBtn variant="outline" (click)="showInfo()">Info</button>
        </div>
      </div>
    `,
  }),
};

/** A warning toast using `toast.warning()` */
export const Warning: Story = {
  render: () => ({
    props: { showWarning: () => toast.warning('Your session is about to expire.') },
    template: `
      <div id="root-of-your-app">
        <hlm-toaster />
        <div id="anywhere-in-your-app">
          <button hlmBtn variant="outline" (click)="showWarning()">Warning</button>
        </div>
      </div>
    `,
  }),
};

/** An error toast using `toast.error()` */
export const Error: Story = {
  render: () => ({
    props: { showError: () => toast.error('Something went wrong.') },
    template: `
      <div id="root-of-your-app">
        <hlm-toaster />
        <div id="anywhere-in-your-app">
          <button hlmBtn variant="outline" (click)="showError()">Error</button>
        </div>
      </div>
    `,
  }),
};

/** A loading toast with a spinner using `toast.loading()`. Pass an id so you can dismiss the toast later using `toast.dismiss(id)` */
export const Loading: Story = {
  render: () => ({
    props: {
      toggleLoading: () => {
        const id = 'sonner-story-upload';
        const existing = toastState.toasts().find((t) => t.id === id);
        existing ? toast.dismiss(id) : toast.loading('Uploading file…', { id });
      },
    },
    template: `
      <div id="root-of-your-app">
        <hlm-toaster />
        <div id="anywhere-in-your-app">
          <button hlmBtn variant="outline" (click)="toggleLoading()">Loading</button>
        </div>
      </div>
    `,
  }),
};

/** A loading toast with a spinner that automatically updates to a success/error toast using `toast.promise()` */
export const LoadingPromise: Story = {
  render: () => ({
    props: {
      showPromise: () => {
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
      },
    },
    template: `
      <div id="root-of-your-app">
        <hlm-toaster />
        <div id="anywhere-in-your-app">
          <button hlmBtn variant="outline" (click)="showPromise()">Loading</button>
        </div>
      </div>
    `,
  }),
};

/** Setting the `richColors` flag gives each type a distinctive colored background. A green background for 'success'. */
export const RichColorsSuccess: Story = {
  render: () => ({
    props: { showSuccess: () => toast.success('Changes saved successfully.') },
    template: `
      <div id="root-of-your-app">
        <hlm-toaster [richColors]="true" />
        <div id="anywhere-in-your-app">
          <button hlmBtn variant="outline" (click)="showSuccess()">Success</button>
        </div>
      </div>
    `,
  }),
};

/** Setting the `richColors` flag gives each type a distinctive colored background. A blue background for 'info'. */
export const RichColorsInfoToast: Story = {
  render: () => ({
    props: { showInfo: () => toast.info('A new version is available.') },
    template: `
      <div id="root-of-your-app">
        <hlm-toaster [richColors]="true" />
        <div id="anywhere-in-your-app">
          <button hlmBtn variant="outline" (click)="showInfo()">Info</button>
        </div>
      </div>
    `,
  }),
};

/** Setting the `richColors` flag gives each type a distinctive colored background. A yellow background for 'warning'. */
export const RichColorsWarning: Story = {
  render: () => ({
    props: { showWarning: () => toast.warning('Your session is about to expire.') },
    template: `
      <div id="root-of-your-app">
        <hlm-toaster [richColors]="true" />
        <div id="anywhere-in-your-app">
          <button hlmBtn variant="outline" (click)="showWarning()">Warning</button>
        </div>
      </div>
    `,
  }),
};

/** Setting the `richColors` flag gives each type a distinctive colored background. A red background for 'error'. */
export const RichColorsError: Story = {
  render: () => ({
    props: { showError: () => toast.error('Something went wrong.') },
    template: `
      <div id="root-of-your-app">
        <hlm-toaster [richColors]="true" />
        <div id="anywhere-in-your-app">
          <button hlmBtn variant="outline" (click)="showError()">Error</button>
        </div>
      </div>
    `,
  }),
};

/** Show it in the top-left corner by setting `position="top-left"` */
export const PositionTopLeft: Story = {
  render: () => ({
    props: { showToast: () => toast('Event has been created.') },
    template: `
      <div id="root-of-your-app">
        <hlm-toaster position="top-left" />
        <div id="anywhere-in-your-app">
          <button hlmBtn variant="outline" (click)="showToast()">Top Left</button>
        </div>
      </div>
    `,
  }),
};

/** Show it in the top-center by setting `position="top-center"` */
export const PositionTopCenter: Story = {
  render: () => ({
    props: { showToast: () => toast('Event has been created.') },
    template: `
      <div id="root-of-your-app">
        <hlm-toaster position="top-center" />
        <div id="anywhere-in-your-app">
          <button hlmBtn variant="outline" (click)="showToast()">Top Center</button>
        </div>
      </div>
    `,
  }),
};

/** Show it in the top-right corner by setting `position="top-right"` */
export const PositionTopRight: Story = {
  render: () => ({
    props: { showToast: () => toast('Event has been created.') },
    template: `
      <div id="root-of-your-app">
        <hlm-toaster position="top-right" />
        <div id="anywhere-in-your-app">
          <button hlmBtn variant="outline" (click)="showToast()">Top Right</button>
        </div>
      </div>
    `,
  }),
};

/** Show it in the bottom-left corner by setting `position="bottom-left"` */
export const PositionBottomLeft: Story = {
  render: () => ({
    props: { showToast: () => toast('Event has been created.') },
    template: `
      <div id="root-of-your-app">
        <hlm-toaster position="bottom-left" />
        <div id="anywhere-in-your-app">
          <button hlmBtn variant="outline" (click)="showToast()">Bottom Left</button>
        </div>
      </div>
    `,
  }),
};

/** Show it in the bottom-center by setting `position="bottom-center"` */
export const PositionBottomCenter: Story = {
  render: () => ({
    props: { showToast: () => toast('Event has been created.') },
    template: `
      <div id="root-of-your-app">
        <hlm-toaster position="bottom-center" />
        <div id="anywhere-in-your-app">
          <button hlmBtn variant="outline" (click)="showToast()">Bottom Center</button>
        </div>
      </div>
    `,
  }),
};

/** Show it in the bottom-right by setting `position="bottom-right"` */
export const PositionBottomRight: Story = {
  render: () => ({
    props: { showToast: () => toast('Event has been created.') },
    template: `
      <div id="root-of-your-app">
        <hlm-toaster position="bottom-right" />
        <div id="anywhere-in-your-app">
          <button hlmBtn variant="outline" (click)="showToast()">Bottom Right</button>
        </div>
      </div>
    `,
  }),
};

/** A toast with a title and a description */
export const WithDescription: Story = {
  render: () => ({
    props: {
      showDescription: () =>
        toast('Event has been created.', {
          description: 'Sunday, December 03, 2023 at 9:00 AM',
        }),
    },
    template: `
      <div id="root-of-your-app">
        <hlm-toaster />
        <div id="anywhere-in-your-app">
          <button hlmBtn variant="outline" (click)="showDescription()">Show toast with description</button>
        </div>
      </div>
    `,
  }),
};

/** A toast with a title, a description, and an action button */
export const WithAction: Story = {
  render: () => ({
    props: {
      showAction: () =>
        toast('Event has been created.', {
          description: 'Sunday, December 03, 2023 at 9:00 AM',
          action: {
            label: 'Undo',
            onClick: () => {},
          },
        }),
    },
    template: `
      <div id="root-of-your-app">
        <hlm-toaster />
        <div id="anywhere-in-your-app">
          <button hlmBtn variant="outline" (click)="showAction()">Show toast with action</button>
        </div>
      </div>
    `,
  }),
};
