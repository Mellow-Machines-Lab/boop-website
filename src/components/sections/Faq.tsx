import { copy } from "@/lib/copy";
import { linkClass } from "@/lib/ui";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { serializeJsonLd } from "@/lib/jsonld";

/*
  S6: a short FAQ. Plain stacked text, with no accordion: six short answers
  are quicker to read than to open. Ships FAQPage JSON-LD for the same text.
*/
export function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <Section id="S6" label={copy.faqHeading} band>
      <Reveal>
        <SectionHeading>{copy.faqHeading}</SectionHeading>
        <dl className="mt-10 grid gap-x-14 gap-y-9 md:grid-cols-2">
          {copy.faq.map((item) => (
            <div key={item.q}>
              <dt className="font-display text-xl font-semibold">{item.q}</dt>
              <dd className="mt-1.5 leading-relaxed text-ink-soft">
                {item.a}
                {"link" in item && (
                  <>
                    {" "}
                    <a href={item.link.url} className={linkClass}>
                      {item.link.label}
                    </a>
                    .
                  </>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
    </Section>
  );
}
