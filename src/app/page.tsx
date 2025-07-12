import { Button } from "@/components/ui/button";
import { auth0 } from '@/lib/auth0'
import { getUser } from "@/lib/server/user";

export default async function Home() {
  const session = await auth0.getSession();
  const user = await getUser(session);

  // If no session, show sign-up and login buttons
  if (!session || !user) {
    return (
      <main>
        <a href="/auth/login?screen_hint=signup">
          <Button>Sign up</Button>
        </a>
        <a href="/auth/login">
          <Button>Log in</Button>
        </a>
      </main>
    );
  }

  // If session exists, show a welcome message and logout button
  return (
    <main>
      <h1>Welcome, {user.name || session.user.name}!</h1>
      <p>
        <a href="/auth/logout">
          <Button>Log out</Button>
        </a>
      </p>
    </main>
  );
}
