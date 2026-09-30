import { useEffect } from 'react';
import { useGlobals } from 'storybook/preview-api';

const FONT_FACES = ['Source Sans 3 Variable', 'Source Sans 3', 'Geist Variable'] as const;

async function preloadCurveFonts(): Promise<void> {
  await document.fonts.ready;
  for (const face of FONT_FACES) {
    for (const weight of ['400', '500', '600']) {
      await document.fonts.load(`${weight} 16px "${face}"`).catch(() => undefined);
    }
  }
  await document.fonts.ready;
}

/** Wait until token CSS and the Storybook preview stylesheet are active. */
function waitForPreviewStyles(timeoutMs = 20_000): Promise<boolean> {
  return new Promise((resolve) => {
    const deadline = performance.now() + timeoutMs;
    const tick = () => {
      const root = document.documentElement;
      const bg = getComputedStyle(root).getPropertyValue('--background').trim();
      const font = getComputedStyle(root).fontFamily.toLowerCase();
      if (!bg || font.includes('times new roman')) {
        if (performance.now() >= deadline) {
          resolve(false);
          return;
        }
        requestAnimationFrame(tick);
        return;
      }

      let ruleCount = 0;
      for (const sheet of document.styleSheets) {
        try {
          ruleCount += sheet.cssRules?.length ?? 0;
        } catch {
          if (performance.now() >= deadline) {
            resolve(false);
            return;
          }
          requestAnimationFrame(tick);
          return;
        }
      }

      if (ruleCount >= 50) {
        resolve(true);
        return;
      }
      if (performance.now() >= deadline) {
        resolve(false);
        return;
      }
      requestAnimationFrame(tick);
    };
    tick();
  });
}

/**
 * Sets `data-curve-visual-ready` on `<html>` once theme classes, tokens, and fonts
 * are ready. Playwright visual tests wait for this instead of brittle font-family checks.
 */
export function visualReadyMarker() {
  return (StoryFn: () => unknown) => {
    const [{ theme, mode }] = useGlobals();

    useEffect(() => {
      const root = document.documentElement;
      delete root.dataset.curveVisualReady;

      let cancelled = false;

      void (async () => {
        await preloadCurveFonts();
        const tokensReady = await waitForPreviewStyles();
        if (cancelled || !tokensReady) {
          return;
        }

        await new Promise<void>((resolve) => {
          requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
        });
        if (cancelled) {
          return;
        }

        root.dataset.curveVisualReady = 'true';
      })();

      return () => {
        cancelled = true;
        delete root.dataset.curveVisualReady;
      };
    }, [theme, mode]);

    return StoryFn();
  };
}
