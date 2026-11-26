import { copy } from "@/lib/copy";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { BoardScreen } from "@/components/BoardScreen";

/* S2: a day with Boop. Eight things it does, each a capture of its real screen. */
export function Day() {
  return (
    <Section id="S2" label={copy.day.heading} band>
      <Reveal>
        <SectionHeading>{copy.day.heading}</SectionHeading>
        <p className="mt-3 max-w-xl text-ink-soft">{copy.day.intro}</p>
      </Reveal>
      <ol className="mt-10 grid gap-x-6 gap-y-9 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-4">
        {copy.day.moments.map((moment) => (
          <li key={moment.id}>
            <Reveal>
              {/* On a phone: screen on the left, words on the right, so eight
                  moments stay a short scroll. */}
              <figure className="flex items-center gap-4 sm:block">
                <BoardScreen
                  name={moment.media}
                  alt={moment.alt}
                  needsYou={"amber" in moment && moment.amber}
                  className="w-[44%] shrink-0 !rounded-[1.1rem] !p-1.5 sm:w-auto sm:!rounded-[1.5rem] sm:!p-2"
                />
                <figcaption className="sm:mt-4">
                  <h3 className="text-lg font-semibold leading-snug">{moment.title}</h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-soft">{moment.body}</p>
                </figcaption>
              </figure>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
