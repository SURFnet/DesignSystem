import type { Preview } from '@storybook/react-vite';

// Pull in Tailwind + the design tokens so stories render with the real styles.
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
