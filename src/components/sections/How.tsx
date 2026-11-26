import Image from "next/image";
import { copy } from "@/lib/copy";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

/* S3: how it works. Three plain steps and the real menu-bar popover. */
export function How() {
  return (
    <Section id="S3" label={copy.how.heading}>
      <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-start md:gap-16">
        <Reveal>
          <SectionHeading>{copy.how.heading}</SectionHeading>
          <ol className="mt-8 flex flex-col gap-8">
            {copy.how.steps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slime-pale font-display text-lg font-semibold text-slime-deep"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-xl font-semibold leading-snug">{step.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-ink-soft">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-10 rounded-2xl border-2 border-ink/10 bg-white/60 px-5 py-4 font-display text-lg font-medium leading-snug">
            {copy.how.watchOnly}
          </p>
        </Reveal>

        <Reveal>
          <figure className="mx-auto max-w-[22rem]">
            <Image
              src="/media/popover-needs-you.webp"
              alt={copy.how.popoverAlt}
              width={360}
              height={767}
              sizes="(min-width: 768px) 352px, 90vw"
              className="h-auto w-full rounded-2xl border border-ink/10 shadow-[0_18px_40px_-16px_rgb(11_42_74/0.4)]"
            />
            <figcaption className="mt-4 text-center text-sm text-ink-soft">
              {copy.how.popoverCaption}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
