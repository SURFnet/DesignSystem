import { defineContract, NewContract } from './define-contract.js';

export const dialogContract = defineContract({
  docs: {
    description:
      'A window overlaid on the page, rendering content that requires attention or actions.',
  },
});

export const newDialogContract: NewContract = {
  name: {
    react: 'Dialog',
    angular: 'hlm-dialog',
  },
  description:
    'A window overlaid on the page, rendering content that requires attention or actions.',
  children: [
    {
      name: {
        react: 'DialogTrigger',
        angular: ['button[hlmDialogTrigger]', 'button[hlmDialogTriggerFor]'],
      },
      description: 'A button that opens the dialog.',
    },
    {
      name: {
        react: 'DialogContent',
        angular: 'hlm-dialog-content',
      },
      description:
        'The content of the dialog itself when it opens. Renders a backdrop on top of the page, on top of which the dialog with the given content is rendered.',
      props: {
        showCloseButton: {
          description: 'Whether or not to show the close button in the top right.',
          type: 'boolean',
          required: false,
          default: false,
          isVisualVariant: true,
        },
      },
      children: [
        {
          name: {
            react: 'DialogHeader',
            angular: ['[hlmDialogHeader]', 'hlm-dialog-header'],
          },
          description: 'Header section of the dialog',
          children: [
            {
              name: {
                react: 'DialogTitle',
                angular: '[hlmDialogTitle]',
              },
              description: 'Title of the dialog',
            },
            {
              name: {
                react: 'DialogDescription',
                angular: '[hlmDialogDescription]',
              },
              description: 'Description of the dialog',
            },
          ],
        },
        'any',
        {
          name: {
            react: 'DialogFooter',
            angular: ['[hlmDialogFooter]', 'hlm-dialog-footer'],
          },
          description: 'Footer section of the dialog. Mostly used for CTA buttons.',
          children: ['any'],
        },
      ],
    },
  ],
};
