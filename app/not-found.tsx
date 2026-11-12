import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 | Andysec",
};

export default function Custom404() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center text-zinc-100">
      <h1 className="text-4xl font-semibold">404 - Page Not Found</h1>
      <p className="mt-4 text-zinc-300">
        The page you are looking for does not exist or may have moved.
      </p>
      <Link href="/" className="mt-8 underline">
        Back to home
      </Link>
    </main>
  );
}
