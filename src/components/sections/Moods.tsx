import { copy } from "@/lib/copy";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { BoardScreen } from "@/components/BoardScreen";

/* S4: moods, kept small. A line of text and one row of its real faces. */
export function Moods() {
  return (
    <Section id="S4" label={copy.moods.heading} band className="!py-12 md:!py-16">
      <Reveal>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-12">
          <div>
            <SectionHeading>{copy.moods.heading}</SectionHeading>
            <p className="mt-3 leading-relaxed text-ink-soft">{copy.moods.body}</p>
          </div>
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
