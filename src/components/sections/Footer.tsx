import Image from "next/image";
import Link from "next/link";
import { copy, REPO_URL } from "@/lib/copy";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { EmailForm } from "@/components/EmailForm";

/* S7: the footer signup, small links, sign-off. */
export function Footer() {
  return (
    <Section id="S7" label={copy.footer.heading} className="pb-16">
      <Reveal>
        <div className="mx-auto flex max-w-lg flex-col gap-5 text-center">
          <Image
            src="/media/boop-happy-peach.webp"
            alt=""
            width={720}
            height={720}
            sizes="128px"
            className="mx-auto h-32 w-32 rounded-[2rem]"
          />
          <SectionHeading>{copy.footer.heading}</SectionHeading>
          <p className="text-lg text-ink-soft">{copy.footer.body}</p>
          <div className="text-left">
            <EmailForm
              source="footer"
              buttonLabel={copy.footer.ctaLabel}
              placeholder={copy.footer.placeholder}
            />
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-6 text-center">
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-soft">
            {copy.footer.followBuild.url && (
              <a
                href={copy.footer.followBuild.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ink"
              >
                {copy.footer.followBuild.label}
              </a>
            )}
            <a href={REPO_URL} className="hover:text-ink">
              {copy.footer.source}
            </a>
            <Link href="/help" className="hover:text-ink">
              {copy.footer.help}
            </Link>
            <Link href="/privacy" className="hover:text-ink">
              {copy.footer.privacy}
            </Link>
            {/* LAUNCH BLOCKER: this inbox must exist before launch (see copy.ts). */}
            <a href={`mailto:${copy.footer.contactEmail}`} className="hover:text-ink">
              {copy.footer.contact}
            </a>
          </nav>

          <p className="max-w-md text-sm text-ink-soft">{copy.footer.signoff}</p>
          <p className="text-sm text-ink-soft/80">{copy.footer.copyright}</p>
        </div>
      </Reveal>
    </Section>
  );
}
