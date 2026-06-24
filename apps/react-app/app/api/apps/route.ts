import { NextResponse } from 'next/server';

import { getApps } from '@/app/lib/apps';
import { getSessionUser } from '@/app/lib/session';

export async function GET(request: Request) {
  // Browsing apps requires an authenticated session.
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const result = await getApps({
    search: searchParams.get('search') ?? undefined,
    category: searchParams.get('category') ?? undefined,
    page: Number(searchParams.get('page') ?? '1') || 1,
  });

  return NextResponse.json(result);
}
