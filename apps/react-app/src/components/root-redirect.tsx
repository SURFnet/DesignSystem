'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Client-side redirect to `/browse-apps`, used only in the static-export build
 * where there is no server to perform `redirect()` at request time. The router
 * prefixes `basePath` automatically, so this resolves under the Pages sub-path.
 */
export function RootRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/browse-apps');
  }, [router]);

  return null;
}
