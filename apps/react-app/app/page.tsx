import { redirect } from 'next/navigation';

import { getSessionUser } from '@/app/lib/session';

export default async function Home() {
  const user = await getSessionUser();
  redirect(user ? '/browse-apps' : '/login');
}
