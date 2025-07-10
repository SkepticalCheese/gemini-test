/* eslint-disable @next/next/no-html-link-for-pages */
import { Button } from "@/components/ui/button";
import { auth0 } from '../lib/auth0'
//import Link from "next/link";

export default async function Home() {
  const session = await auth0.getSession();
  
  if (session) {
    return (
      <main>
        <a href="/welcome">Welcome Page</a>
      </main>
    );
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <a href="/auth/login">
        <Button>Login</Button>
      </a>
    </main>
  );
}
