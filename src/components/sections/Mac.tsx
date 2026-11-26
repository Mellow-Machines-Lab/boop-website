import Image from "next/image";
import { copy } from "@/lib/copy";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

/* S3: the Mac app. The real menu-bar popover, and the few facts people ask for. */
export function Mac() {
  return (
    <Section id="S3" label={copy.mac.heading}>
      <div className="grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-16">
        <Reveal>
          <SectionHeading>{copy.mac.heading}</SectionHeading>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{copy.mac.body}</p>
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5">
            {copy.mac.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-sm text-ink-soft">{fact.label}</dt>
                <dd className="mt-0.5 font-display text-lg font-medium leading-snug">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 border-l-4 border-slime pl-4 leading-relaxed text-ink-soft">
            {copy.mac.watchOnly}
          </p>
        </Reveal>

        <Reveal>
          <figure className="mx-auto max-w-[24rem]">
            <Image
              src="/media/popover-needs-you.webp"
              alt={copy.mac.popoverAlt}
              width={840}
              height={1148}
              sizes="(min-width: 768px) 384px, 90vw"
              className="h-auto w-full rounded-2xl border border-ink/10 shadow-[0_18px_40px_-16px_rgb(11_42_74/0.4)]"
            />
            <figcaption className="mt-4 text-center text-sm text-ink-soft">
              {copy.mac.popoverCaption}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
