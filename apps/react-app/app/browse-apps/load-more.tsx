'use client';

import Link from 'next/link';
import { Button } from '@surfnet/react';

/**
 * "Load more" as a real link to the next page (`?page=`), so pagination works
 * as plain navigation and stays in the URL. Selection state in the surrounding
 * provider is preserved across the soft navigation.
 */
export function LoadMore({ href }: { href: string }) {
  return (
    <Button variant="outline" nativeButton={false} render={<Link href={href} scroll={false} />}>
      Load more apps…
    </Button>
  );
}
