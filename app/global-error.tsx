"use client";

import "./globals.css";
import Link from "next/link";

export default function Custom500({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center text-zinc-100">
          <h1 className="text-4xl font-semibold">
            500 - Server-side error occurred
          </h1>
          <p className="mt-4 text-zinc-300">
            An unexpected error occurred. Please try again.
          </p>
          <div className="mt-8 flex gap-6">
            <button type="button" onClick={() => reset()} className="underline">
              Try again
            </button>
            <Link href="/" className="underline">
              Back to home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
