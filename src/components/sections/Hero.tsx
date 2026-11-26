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
    <section data-section="S1" aria-label={copy.brand.wordmark} className="px-5 pb-14 pt-5 md:pb-24">
      <div className="mx-auto max-w-[1040px]">
        <p className="flex items-baseline gap-3">
          <span className="font-display text-2xl font-semibold tracking-[-0.01em]">
            {copy.brand.wordmark}
          </span>
          <span className="text-sm text-ink-soft">{copy.brand.byline}</span>
        </p>

        <div className="mt-4 grid items-center gap-5 md:mt-14 md:grid-cols-[1fr_1.05fr] md:gap-14">
          <div className="relative mx-auto w-full max-w-[17rem] md:order-2 md:max-w-none">
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
                  className={`${scribbleClass} mt-2 flex items-start justify-center gap-1 !text-xl md:mt-4 md:justify-end md:!text-2xl`}
                >
                  <span className="-rotate-2 whitespace-nowrap">{copy.hero.scribble}</span>
                  <DoodleArrow className="h-8 w-10 shrink-0 -translate-y-2" />
                </p>
              </>
            )}
          </div>

          <div className="md:order-1">
            <h1 className="text-[clamp(2.1rem,8.2vw,3.9rem)] font-semibold leading-[1.04] tracking-[-0.015em]">
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
