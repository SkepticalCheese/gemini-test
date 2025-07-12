import { Button } from "@/components/ui/button";
import { auth0 } from '@/lib/auth0'
import { getUser } from "@/lib/server/user";

export default async function Home() {
  const session = await auth0.getSession();
  const user = await getUser(session);

  // If session exists, show a welcome message and logout button
  return (
    <main className="flex min-h-screen flex-col justify-start p-24">
      <h1 className="mb-8 text-4xl font-bold">Welcome, {user?.name || session?.user.name}!</h1>
      <p>
        <a href="/auth/logout">
          <Button>Log out</Button>
        </a>
      </p>
    </main>
  );
}
