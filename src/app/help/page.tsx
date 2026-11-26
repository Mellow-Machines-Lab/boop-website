import type { Metadata } from "next";
import Link from "next/link";
import { copy } from "@/lib/copy";
import { linkClass } from "@/lib/ui";
import { DocHeading, DocPage, docList, docText } from "@/components/DocPage";

export const metadata: Metadata = {
  title: copy.help.title,
  robots: { index: true, follow: true },
};

/* The basics only. The repository's README is the full, current guide. */
export default function HelpPage() {
  const help = copy.help;
  return (
    <DocPage heading={help.heading} backHome={help.backHome}>
      <p className={docText}>{help.intro}</p>

      <DocHeading>{help.hooks.heading}</DocHeading>
      <ul className={docList}>
        {help.hooks.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <DocHeading>{help.board.heading}</DocHeading>
      <ul className={docList}>
        {help.board.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className={docText}>
        <Link href="/flash" className={linkClass}>
          {help.board.flashLink}
        </Link>
      </p>

      <DocHeading>{help.uninstall.heading}</DocHeading>
      <p className={docText}>{help.uninstall.body}</p>

      <DocHeading>{help.more.heading}</DocHeading>
      <p className={docText}>{help.more.body}</p>
      <p className={`${docText} flex flex-wrap gap-x-6 gap-y-2`}>
        <a href={help.more.readme.url} className={linkClass}>
          {help.more.readme.label}
        </a>
        <a href={help.more.issues.url} className={linkClass}>
          {help.more.issues.label}
        </a>
      </p>

      <p className={docText}>
        {help.contact}{" "}
        <a href={`mailto:${copy.footer.contactEmail}`} className={linkClass}>
          {copy.footer.contactEmail}
        </a>
        .
      </p>
    </DocPage>
  );
}
