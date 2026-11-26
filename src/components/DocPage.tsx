import Link from "next/link";
import type { ReactNode } from "react";
import { copy } from "@/lib/copy";

/* The shell for the plain text pages: /privacy, /help and /flash. */
export function DocPage({
  heading,
  backHome,
  children,
}: {
  heading: string;
  backHome: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto max-w-2xl px-5 pb-24 pt-5">
      <Link href="/" className="font-display text-2xl font-bold tracking-[-0.02em]">
        {copy.brand.wordmark}
      </Link>
      <h1 className="mt-12 text-[clamp(2rem,7vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.02em]">
        {heading}
      </h1>
      {children}
      <Link
        href="/"
        className="mt-14 inline-block text-sm text-ink-soft underline-offset-4 hover:text-ink hover:underline"
      >
        {backHome}
      </Link>
    </main>
  );
}

export function DocHeading({ children }: { children: ReactNode }) {
  return <h2 className="mt-12 text-2xl font-semibold">{children}</h2>;
}

export const docText = "mt-4 text-lg leading-relaxed text-ink-soft";
export const docList = "mt-4 flex list-disc flex-col gap-3 pl-5 text-lg leading-relaxed text-ink-soft";
