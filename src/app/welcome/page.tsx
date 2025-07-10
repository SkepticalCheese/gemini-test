import { getSession } from '@auth0/nextjs-auth0';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Welcome() {
  const session = await getSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-8 text-4xl font-bold">Welcome, {session?.user.name}</h1>
      <Link href="/api/auth/logout">
        <Button>Logout</Button>
      </Link>
    </main>
  );
}
