import { PlayFunction } from 'storybook/internal/csf';
import { expect, userEvent, within, waitFor } from '@storybook/test';

export const testIds = {
  trigger: 'trigger',
  content: 'content',
  close: 'close',
} as const;

// Test basic behaviour of the dialog;
export const DefaultTest: () => PlayFunction = () => {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.parentNode);

    const trigger = await canvas.findByTestId(testIds.trigger);

    await userEvent.click(trigger);

    const content = await body.findByTestId(testIds.content);
    await expect(content).toBeInTheDocument();

    const close = await within(content).findByTestId(testIds.close);
    await expect(close).toBeInTheDocument();

    await userEvent.click(close);
    await waitFor(() => expect(content).not.toBeInTheDocument());

    // Open again to test closing with esc
    await userEvent.click(trigger);

    const content2 = await body.findByTestId(testIds.content);
    await expect(content2).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(content2).not.toBeInTheDocument());

    // Open again to test closing with click outside
    await userEvent.click(trigger);

    const content3 = await body.findByTestId(testIds.content);
    await expect(content3).toBeInTheDocument();

    await userEvent.click(canvasElement.parentNode);
    await waitFor(() => expect(content3).not.toBeInTheDocument());
  };
};
