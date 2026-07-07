import { redirect } from 'next/navigation';

import { RootRedirect } from '@/components/root-redirect';

export default function Home() {
  // Static-export build has no server to redirect at request time, so fall back
  // to a client-side redirect. Normal builds keep the server redirect.
  if (process.env.NEXT_PUBLIC_STATIC_EXPORT === '1') {
    return <RootRedirect />;
  }

  redirect('/browse-apps');
}
