import type { Metadata } from "next";
import Link from "next/link";
import { copy } from "@/lib/copy";
import { linkClass } from "@/lib/ui";
import { DocPage, docText } from "@/components/DocPage";

export const metadata: Metadata = {
  title: copy.flash.title,
  robots: { index: true, follow: true },
};

/*
  How to flash a board yourself, as the buddygotchi README has it: `make flash`
  over USB. There is no web flasher. The README is the full guide.
*/
export default function FlashPage() {
  const flash = copy.flash;
  return (
    <DocPage heading={flash.heading} backHome={flash.backHome}>
      <p className={docText}>{flash.intro}</p>
      <ol className="mt-8 flex flex-col gap-8">
        {flash.steps.map((step, i) => (
          <li key={step.title}>
            <h2 className="text-xl font-semibold">
              {i + 1}. {step.title}
            </h2>
            <pre className="mt-3 overflow-x-auto rounded-2xl bg-bezel px-4 py-3 font-mono text-sm text-white">
              <code>{step.code}</code>
            </pre>
            {"note" in step && <p className="mt-3 leading-relaxed text-ink-soft">{step.note}</p>}
          </li>
        ))}
      </ol>
      <p className={docText}>{flash.needs}</p>
      <p className={`${docText} flex flex-wrap gap-x-6 gap-y-2`}>
        <a href={flash.readme.url} className={linkClass}>
          {flash.readme.label}
        </a>
        <Link href="/help" className={linkClass}>
          {flash.helpLink}
        </Link>
      </p>
    </DocPage>
  );
}
