import { copy } from "@/lib/copy";
import { scribbleClass } from "@/lib/ui";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { BoardScreen } from "@/components/BoardScreen";

/* S4: moods. Eight of its real faces, captured from the screen. */
export function Moods() {
  return (
    <Section id="S4" label={copy.moods.heading} band>
      <Reveal>
        <SectionHeading>{copy.moods.heading}</SectionHeading>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">{copy.moods.body}</p>
      </Reveal>
      <Reveal>
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4 md:gap-x-6">
          {copy.moods.faces.map((face) => (
            <li key={face.id}>
              <BoardScreen
                name={`mood-${face.id}`}
                alt={copy.moods.faceAltTemplate.replace("{mood}", face.label)}
                className="!rounded-[1.25rem] !p-1.5"
              />
              <p className="mt-2 text-center font-mono text-sm text-ink-soft">{face.label}</p>
            </li>
          ))}
        </ul>
        <p className={`${scribbleClass} mt-8 -rotate-1 text-center`}>{copy.moods.scribble}</p>
      </Reveal>
    </Section>
  );
}
