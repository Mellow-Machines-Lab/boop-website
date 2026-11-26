import { copy } from "@/lib/copy";
import { voiceClass } from "@/lib/ui";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { BoardScreen } from "@/components/BoardScreen";

/* S2: a day with Boop. Real screen captures, with captions in Boop's voice. */
export function Day() {
  return (
    <Section id="S2" label={copy.day.heading} band>
      <Reveal>
        <SectionHeading>{copy.day.heading}</SectionHeading>
        <p className="mt-3 max-w-xl text-ink-soft">{copy.day.intro}</p>
      </Reveal>
      <ol className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {copy.day.moments.map((moment) => (
          <li key={moment.id}>
            <Reveal>
              {/* On a phone: screen on the left, words on the right, so six
                  moments fit in about three screens of scrolling. */}
              <figure className="flex items-start gap-4 sm:block">
                <BoardScreen
                  name={moment.media}
                  alt={moment.alt}
                  needsYou={"amber" in moment && moment.amber}
                  className="w-[44%] shrink-0 !rounded-[1.1rem] !p-1.5 sm:w-auto sm:!rounded-[1.75rem] sm:!p-2.5"
                />
                <figcaption className="sm:mt-5">
                  <h3 className="text-lg font-semibold leading-snug sm:text-xl">{moment.title}</h3>
                  <p className={`mt-2 ${voiceClass}`}>{moment.voice}</p>
                </figcaption>
              </figure>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
