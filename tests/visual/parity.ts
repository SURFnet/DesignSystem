import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import type { TestInfo } from '@playwright/test';

/** Allow tiny rasterization differences (antialiasing, subpixel fonts) between frameworks. */
export const MAX_PARITY_DIFF_RATIO = 0.03;

export async function assertParity(
  reactPng: Buffer,
  angularPng: Buffer,
  info: TestInfo,
): Promise<void> {
  const imgA = PNG.sync.read(reactPng);
  const imgB = PNG.sync.read(angularPng);

  if (imgA.width !== imgB.width || imgA.height !== imgB.height) {
    await info.attach('react', { body: reactPng, contentType: 'image/png' });
    await info.attach('angular', { body: angularPng, contentType: 'image/png' });
    throw new Error(
      `Size mismatch: React ${imgA.width}×${imgA.height} vs Angular ${imgB.width}×${imgB.height}`,
    );
  }

  const diff = new PNG({ width: imgA.width, height: imgA.height });
  const mismatched = pixelmatch(imgA.data, imgB.data, diff.data, imgA.width, imgA.height, {
    threshold: 0.1,
  });
  const ratio = mismatched / (imgA.width * imgA.height);

  if (ratio > MAX_PARITY_DIFF_RATIO) {
    await info.attach('react', { body: reactPng, contentType: 'image/png' });
    await info.attach('angular', { body: angularPng, contentType: 'image/png' });
    await info.attach('diff', { body: PNG.sync.write(diff), contentType: 'image/png' });
    throw new Error(
      `Parity mismatch: ${mismatched} pixels (${(ratio * 100).toFixed(2)}%, allowed ${(MAX_PARITY_DIFF_RATIO * 100).toFixed(0)}%)`,
    );
  }
}
