import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { copy } from "@/lib/copy";
import { WelcomeSurvey } from "@/components/WelcomeSurvey";

/*
  The page after a signup. It confirms the signup and asks two optional
  questions. `code` identifies the signup row the answers are saved on.
*/
export const metadata: Metadata = {
  title: copy.welcome.title,
  robots: { index: false, follow: false },
};

export default async function WelcomePage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const params = await searchParams;
  const code = typeof params.code === "string" ? params.code : "";

  return (
    <main className="flex min-h-[100svh] flex-col items-center px-5 py-12 text-center">
      <Image
        src="/media/boop-happy-peach.webp"
        alt={copy.welcome.avatarAlt}
        width={720}
        height={720}
        sizes="160px"
        priority
        className="h-40 w-40 rounded-[2rem] border-2 border-ink/10"
      />
      <h1 className="mt-8 text-[clamp(2.1rem,8vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.02em]">
        {copy.welcome.heading}
      </h1>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-soft">{copy.welcome.subline}</p>

      {code && <WelcomeSurvey code={code} />}

      <Link
        href="/"
        className="mt-14 text-sm text-ink-soft underline-offset-4 hover:text-ink hover:underline"
      >
        {copy.welcome.backHome}
      </Link>
    </main>
  );
}
