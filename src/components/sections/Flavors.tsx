import Image from "next/image";
import { copy } from "@/lib/copy";
import { scribbleClass } from "@/lib/ui";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { MysteryPets } from "@/components/Doodle";

/*
  S5: more flavors coming, then what a ready-made Boop is. The company makes
  desk pets; Boop is the first. Nothing here names or promises a character.
*/
export function Flavors() {
  return (
    <Section id="S5" label={copy.flavors.heading}>
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <Reveal>
          <SectionHeading>{copy.flavors.heading}</SectionHeading>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{copy.flavors.body}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{copy.flavors.open}</p>
        </Reveal>
        <Reveal>
          <div className="flex flex-col items-center gap-4">
            <div className="flex w-full max-w-sm items-end gap-4">
              <Image
                src="/media/boop-happy-peach.webp"
                alt={copy.welcome.avatarAlt}
                width={720}
                height={720}
                sizes="120px"
                className="h-28 w-28 shrink-0 rounded-3xl border-2 border-ink/10"
              />
              <p className="pb-2 font-mono text-sm text-ink-soft">no. 1</p>
            </div>
            <MysteryPets label={copy.flavors.silhouetteAlt} />
            <p className={`${scribbleClass} rotate-1`}>{copy.flavors.scribble}</p>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <h2 className="mt-20 text-2xl font-semibold md:mt-28">{copy.offer.heading}</h2>
        <ul className="mt-6 grid gap-6 md:grid-cols-3">
          {copy.offer.items.map((item) => (
            <li key={item.title} className="rounded-3xl bg-white/70 p-6">
              <h3 className="text-xl font-semibold leading-snug">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{item.body}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
