import { PlayFunction } from 'storybook/internal/csf';
import { expect, userEvent, within, waitFor } from '@storybook/test';

export const testIds = {
  trigger: 'trigger',
  content: 'content',
  close: 'close',
} as const;

type TestFactory = (...args: any[]) => PlayFunction;

// Test basic behaviour of the dialog;
export const DefaultTest = ((overlayQuerySelector: string) => {
  return async ({ canvasElement }: Parameters<PlayFunction>[0]) => {
    const canvas = within(canvasElement);
    // const body = within(canvasElement.parentNode);
    const document = within(window.document.documentElement);

    const trigger = await canvas.findByTestId(testIds.trigger);

    await userEvent.click(trigger);

    const content = await document.findByTestId(testIds.content);
    await expect(content).toBeInTheDocument();

    const close = await within(content).findByTestId(testIds.close);
    await expect(close).toBeInTheDocument();

    await userEvent.click(close);
    await waitFor(() => expect(content).not.toBeInTheDocument());

    // Open again to test closing with esc
    await userEvent.click(trigger);

    const content2 = await document.findByTestId(testIds.content);
    await expect(content2).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(content2).not.toBeInTheDocument());

    // Open again to test closing with click outside
    await userEvent.click(trigger);

    const content3 = await document.findByTestId(testIds.content);
    await expect(content3).toBeInTheDocument();

    const overlay = window.document.documentElement.querySelector(overlayQuerySelector);
    expect(overlay).toBeInTheDocument();

    await userEvent.click(overlay!);
    await waitFor(() => expect(content3).not.toBeInTheDocument());
  };
}) satisfies TestFactory;
