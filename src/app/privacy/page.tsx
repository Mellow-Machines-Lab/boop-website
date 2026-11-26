import type { Metadata } from "next";
import { copy } from "@/lib/copy";
import { linkClass } from "@/lib/ui";
import { DocHeading, DocPage, docText } from "@/components/DocPage";

export const metadata: Metadata = {
  title: copy.privacy.title,
  robots: { index: true, follow: true },
};

/*
  Keep this page true. If you add or remove anything that stores or sends
  visitor data (the database columns, analytics, an ad pixel, the email
  sender), change copy.privacy in the same commit.
*/
export default function PrivacyPage() {
  const privacy = copy.privacy;
  return (
    <DocPage heading={privacy.heading} backHome={privacy.backHome}>
      {privacy.sections.map((section) => (
        <section key={section.heading}>
          <DocHeading>{section.heading}</DocHeading>
          {section.paragraphs.map((p, i) => (
            <p key={i} className={docText}>
              {p}
            </p>
          ))}
        </section>
      ))}
      <p className={docText}>
        <a href={privacy.readmeLink.url} className={linkClass}>
          {privacy.readmeLink.label}
        </a>
      </p>
      <p className={docText}>
        {copy.help.contact}{" "}
        <a href={`mailto:${copy.footer.contactEmail}`} className={linkClass}>
          {copy.footer.contactEmail}
        </a>
        .
      </p>
    </DocPage>
  );
}
