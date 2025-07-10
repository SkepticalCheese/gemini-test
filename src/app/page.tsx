/* eslint-disable @next/next/no-html-link-for-pages */
import { Button } from "@/components/ui/button";
//import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <a href="/auth/login">
        <Button>Login</Button>
      </a>
    </main>
  );
}
