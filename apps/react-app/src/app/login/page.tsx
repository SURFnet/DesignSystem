'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Field,
  FieldDescription,
  FieldLabel,
  Input,
} from '@surfnet/react';

export default function LoginPage() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    router.push('/browse-apps');
  }

  return (
    <main className="grid min-h-screen place-items-center bg-muted p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>SURF Access</CardTitle>
          <CardDescription>Sign in to manage your apps.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                autoComplete="username"
                defaultValue="freek.vonk@universiteitleiden.nl"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                defaultValue="surf"
              />
            </Field>

            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? 'Signing in…' : 'Sign in'}
            </Button>

            <FieldDescription className="text-center">
              Demo credentials: <code>freek.vonk@universiteitleiden.nl</code> / <code>surf</code>
            </FieldDescription>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
