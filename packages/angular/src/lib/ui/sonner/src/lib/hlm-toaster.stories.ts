import { Component } from '@angular/core';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { toast } from '@spartan-ng/brain/sonner';
import { sonnerContract } from '@surfnet/curve-contracts';

import { HlmButton } from '../../../button/src';
import { HlmToaster, HlmToasterImports } from '..';

const meta: Meta<HlmToaster> = {
  title: 'Components/Sonner',
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
};

export default meta;
type Story = StoryObj<HlmToaster>;

/**
 * The toaster itself renders nothing visible — mount it once, then call `toast()` from
 * anywhere to push a message onto it. Tweak the controls and click the button to see them
 * take effect.
 */
export const Default: Story = {
  render: (args) => ({
    props: { ...args, showToast: () => toast('Event has been created.') },
    template: `
      <hlm-toaster ${argsToTemplate(args)} />
      <button hlmBtn variant="outline" (click)="showToast()">Show toast</button>
    `,
  }),
};

@Component({
  selector: 'sonner-types-demo',
  imports: [HlmToasterImports, HlmButton],
  template: `
    <hlm-toaster />
    <div class="flex flex-wrap items-center gap-3">
      <button hlmBtn variant="outline" (click)="showDefault()">Default</button>
      <button hlmBtn variant="outline" (click)="showSuccess()">Success</button>
      <button hlmBtn variant="outline" (click)="showInfo()">Info</button>
      <button hlmBtn variant="outline" (click)="showWarning()">Warning</button>
      <button hlmBtn variant="outline" (click)="showError()">Error</button>
      <button hlmBtn variant="outline" (click)="showLoading()">Loading</button>
    </div>
  `,
})
class SonnerTypesDemo {
  showDefault() {
    toast('Event has been created.');
  }
  showSuccess() {
    toast.success('Changes saved successfully.');
  }
  showInfo() {
    toast.info('A new version is available.');
  }
  showWarning() {
    toast.warning('Your session is about to expire.');
  }
  showError() {
    toast.error('Something went wrong.');
  }
  showLoading() {
    toast.loading('Uploading file…', { id: 'sonner-story-upload' });
  }
}

/** Every toast type side by side. */
export const Types: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [SonnerTypesDemo],
    },
    template: '<sonner-types-demo></sonner-types-demo>',
  }),
};

@Component({
  selector: 'sonner-with-action-demo',
  imports: [HlmToasterImports, HlmButton],
  template: `
    <hlm-toaster />
    <button hlmBtn variant="outline" (click)="show()">Show toast with action</button>
  `,
})
class SonnerWithActionDemo {
  show() {
    toast('Event has been created.', {
      description: 'Sunday, December 03, 2023 at 9:00 AM',
      action: {
        label: 'Undo',
        onClick: () => {},
      },
    });
  }
}

/** A toast with a title, a description, and an action button — the most common composed shape. */
export const WithAction: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [SonnerWithActionDemo],
    },
    template: '<sonner-with-action-demo></sonner-with-action-demo>',
  }),
};

@Component({
  selector: 'sonner-rich-colors-demo',
  imports: [HlmToasterImports, HlmButton],
  template: `
    <hlm-toaster [richColors]="true" />
    <div class="flex flex-wrap items-center gap-3">
      <button hlmBtn variant="outline" (click)="showSuccess()">Success</button>
      <button hlmBtn variant="outline" (click)="showError()">Error</button>
    </div>
  `,
})
class SonnerRichColorsDemo {
  showSuccess() {
    toast.success('Changes saved successfully.');
  }
  showError() {
    toast.error('Something went wrong.');
  }
}

/** `richColors` gives success/error/warning toasts a stronger, semantic background color. */
export const RichColors: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [SonnerRichColorsDemo],
    },
    template: '<sonner-rich-colors-demo></sonner-rich-colors-demo>',
  }),
};
