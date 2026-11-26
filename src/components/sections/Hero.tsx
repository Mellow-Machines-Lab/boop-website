import { existsSync } from "node:fs";
import { join } from "node:path";
import { copy } from "@/lib/copy";
import { scribbleClass } from "@/lib/ui";
import { BoardScreen } from "@/components/BoardScreen";
import { DoodleArrow } from "@/components/Doodle";
import { EmailForm } from "@/components/EmailForm";

/*
  S1: the real creature, one line that says what it is, and the waitlist form.

  HERO FILM SLOT: drop real footage of the board on a desk at
  public/media/hero.mp4 with a poster at public/media/hero-poster.jpg and the
  next build shows it here. Until both files exist, the hero shows the capture
  of Boop's real screen (boop-day.mp4).
*/
function hasHeroFilm(): boolean {
  const media = join(process.cwd(), "public", "media");
  return existsSync(join(media, "hero.mp4")) && existsSync(join(media, "hero-poster.jpg"));
}

export function Hero() {
  const film = hasHeroFilm();

  return (
    <section
      data-section="S1"
      aria-label={copy.brand.wordmark}
      className="flex min-h-[100svh] flex-col px-5 pb-8 pt-5 md:pb-12"
    >
      {/* The hero fills the first screen exactly, so the next section never
          peeks in from below. The content sits in the middle of what is left
          under the wordmark. */}
      <div className="mx-auto flex w-full max-w-[1040px] flex-1 flex-col">
        <p className="flex items-baseline gap-3">
          <span className="font-display text-2xl font-bold tracking-[-0.02em]">
            {copy.brand.wordmark}
          </span>
          <span className="text-sm text-ink-soft">{copy.brand.byline}</span>
        </p>

        <div className="my-auto grid items-center gap-5 py-4 md:grid-cols-[1fr_1.05fr] md:gap-14 md:py-8">
          <div className="relative mx-auto w-full max-w-[min(17rem,34svh)] md:order-2 md:max-w-[min(29rem,62svh)]">
            {film ? (
              <video
                className="block w-full rounded-[1.75rem] bg-bezel shadow-[0_18px_40px_-12px_rgb(11_42_74/0.45)]"
                poster="/media/hero-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                aria-label={copy.hero.filmAlt}
              >
                <source src="/media/hero.mp4" type="video/mp4" />
              </video>
            ) : (
              <>
                <BoardScreen name="boop-day" alt={copy.hero.screenAlt} priority />
                <p
                  className={`${scribbleClass} mt-2 flex items-start justify-center gap-1 !text-xl md:mt-4 md:justify-end md:!text-2xl hide-when-short`}
                >
                  <span className="-rotate-2 whitespace-nowrap">{copy.hero.scribble}</span>
                  <DoodleArrow className="h-8 w-10 shrink-0 -translate-y-2" />
                </p>
              </>
            )}
          </div>

          <div className="md:order-1">
            <h1 className="text-[clamp(2.05rem,7.6vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.025em]">
              {copy.hero.headline}
            </h1>
            <p className="mt-3 max-w-xl leading-relaxed text-ink-soft md:mt-4 md:text-lg">
              {copy.hero.subhead}
            </p>
            <div className="mt-5 max-w-lg md:mt-6">
              <EmailForm
                source="hero"
                buttonLabel={copy.hero.ctaLabel}
                placeholder={copy.hero.placeholder}
              />
              <p className="mt-4 text-sm text-ink-soft">{copy.hero.small}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
