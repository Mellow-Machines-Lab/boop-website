import Image from "next/image";
import { copy } from "@/lib/copy";
import { scribbleClass } from "@/lib/ui";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { MysteryPet } from "@/components/Doodle";

/*
  S5: more characters coming, then what you get. The company makes
  desk pets; Boop is the first. Nothing here names or promises a character.
*/
export function Flavors() {
  return (
    <Section id="S5" label={copy.flavors.heading}>
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <Reveal>
          <SectionHeading>{copy.flavors.heading}</SectionHeading>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{copy.flavors.body}</p>
        </Reveal>
        <Reveal>
          <div className="mx-auto max-w-md">
            <ul className="grid grid-cols-2 gap-4">
              <li>
                <Image
                  src="/media/boop-happy-peach.webp"
                  alt={copy.welcome.avatarAlt}
                  width={720}
                  height={720}
                  sizes="(min-width: 768px) 220px, 45vw"
                  className="aspect-square w-full rounded-[2rem] border-2 border-ink/10"
                />
                <p className="mt-2 text-center font-mono text-sm text-ink-soft">
                  {copy.flavors.firstLabel}
                </p>
              </li>
              {[0, 1, 2].map((i) => (
                <li key={i}>
                  <MysteryPet shape={i} label={copy.flavors.silhouetteAlt} />
                  <p className="mt-2 text-center font-mono text-sm text-ink-soft">no. {i + 2}</p>
                </li>
              ))}
            </ul>
            <p className={`${scribbleClass} mt-4 rotate-1 text-center`}>{copy.flavors.scribble}</p>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <h2 className="mt-20 text-2xl font-semibold md:mt-28">{copy.offer.heading}</h2>
        <ul className="mt-6 grid gap-6 md:grid-cols-2">
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
