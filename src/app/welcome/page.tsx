/* eslint-disable @next/next/no-html-link-for-pages */
import { auth0 } from '../../lib/auth0'
import { Button } from '@/components/ui/button';
//import Link from 'next/link';

export default async function Welcome() {
  const session = await auth0.getSession();

  if (!session) {
    return (
      <main>
        <a href="/auth/login?screen_hint=signup">Sign up</a>
        <a href="/auth/login">Log in</a>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-8 text-4xl font-bold">Welcome, {session?.user.name}</h1>
      <a href="/auth/logout">
        <Button>Logout</Button>
      </a>
    </main>
  );
}
