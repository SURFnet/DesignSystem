import { NextResponse } from 'next/server';

import { MOCK_USER } from '@/app/lib/mock-data';
import { encodeSession, SESSION_COOKIE } from '@/app/lib/session';

export async function POST(request: Request) {
  const { email, password } = (await request.json().catch(() => ({}))) as {
    email?: string;
    password?: string;
  };

  // Simulate network latency so loading states are visible in the demo.
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (email !== MOCK_USER.email || password !== MOCK_USER.password) {
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
  }

  const { password: _password, ...user } = MOCK_USER;
  const response = NextResponse.json({ user });
  response.cookies.set(SESSION_COOKIE, encodeSession(email), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
  return response;
}
