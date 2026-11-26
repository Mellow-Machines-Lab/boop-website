import { copy } from "@/lib/copy";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { BoardScreen } from "@/components/BoardScreen";

/*
  S4: moods and memory, kept small. A few lines of text, one clip of Boop
  asking a question and bringing the answer up again, and a row of its faces.
*/
export function Moods() {
  return (
    <Section id="S4" label={copy.moods.heading} band className="!py-12 md:!py-16">
      <Reveal>
        <div className="grid gap-8 lg:grid-cols-[1fr_0.62fr_1.15fr] lg:items-center lg:gap-10">
          <div>
            <SectionHeading>{copy.moods.heading}</SectionHeading>
            <p className="mt-3 leading-relaxed text-ink-soft">{copy.moods.body}</p>
          </div>

          <figure className="flex items-center gap-4 lg:block">
            <BoardScreen
              name="moment-remembers"
              alt={copy.moods.memoryAlt}
              className="w-[44%] shrink-0 !rounded-[1.1rem] !p-1.5 lg:w-auto lg:!rounded-[1.5rem] lg:!p-2"
            />
            <figcaption className="text-[0.95rem] leading-relaxed text-ink-soft lg:mt-3">
              {copy.moods.memoryCaption}
            </figcaption>
          </figure>

          <ul className="grid grid-cols-4 gap-x-2.5 gap-y-4 sm:gap-x-4">
            {copy.moods.faces.map((face) => (
              <li key={face.id} className="min-w-0">
                <BoardScreen
                  name={`mood-${face.id}`}
                  alt={copy.moods.faceAltTemplate.replace("{mood}", face.label)}
                  className="!rounded-[0.9rem] !p-1 !shadow-none"
                />
                <p className="mt-1.5 text-center font-mono text-xs text-ink-soft">{face.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
