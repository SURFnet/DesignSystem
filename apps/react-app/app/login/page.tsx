'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button, Field, FieldDescription, FieldError, FieldLabel, Input } from '@surfnet/react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('freek.vonk@universiteitleiden.nl');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? 'Something went wrong. Please try again.');
        return;
      }
      router.push('/browse-apps');
      router.refresh();
    } catch {
      setError('Could not reach the server. Please try again.');
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-muted p-4">
      <div className="w-full max-w-sm rounded-lg border bg-background p-8 shadow-sm">
        <div className="mb-6 space-y-1">
          <div className="text-lg font-semibold">SURF Access</div>
          <p className="text-sm text-muted-foreground">Sign in to manage your apps.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field data-invalid={error ? true : undefined}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </Field>

          <Field data-invalid={error ? true : undefined}>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            {error ? <FieldError>{error}</FieldError> : null}
          </Field>

          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? 'Signing in…' : 'Sign in'}
          </Button>

          <FieldDescription className="text-center">
            Demo credentials: <code>freek.vonk@universiteitleiden.nl</code> / <code>surf</code>
          </FieldDescription>
        </form>
      </div>
    </main>
  );
}
