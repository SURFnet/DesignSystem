// Tiny cookie-based mock session. NOT secure — it just demonstrates a login gate for
// the demo. The cookie stores a base64 of the user's email; presence == authenticated.
import { cookies } from 'next/headers';

import { MOCK_USER, type SessionUser } from './mock-data';

export const SESSION_COOKIE = 'surf-access-session';

export function encodeSession(email: string): string {
  return Buffer.from(email).toString('base64');
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  let email: string;
  try {
    email = Buffer.from(token, 'base64').toString('utf8');
  } catch {
    return null;
  }
  if (email !== MOCK_USER.email) return null;
  const { password: _password, ...user } = MOCK_USER;
  return user;
}
