"use client";

import { useEffect, useRef } from "react";

/*
  A capture of Boop's real screen inside a plain black frame, like the AMOLED
  panel it runs on. The loop plays only while it is on screen, and not at all
  for people who ask for reduced motion: they see the poster frame.

  Files live in public/media as <name>.mp4 with a <name>.webp poster.
*/
export function BoardScreen({
  name,
  alt,
  priority = false,
  needsYou = false,
  className = "",
}: {
  name: string;
  alt: string;
  priority?: boolean;
  needsYou?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // Autoplay can be refused (Low Power Mode): the poster stays.
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.25 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`min-w-0 rounded-[1.75rem] bg-bezel p-2.5 shadow-[0_18px_40px_-12px_rgb(11_42_74/0.45)] ${
        needsYou ? "needs-you" : ""
      } ${className}`}
    >
      <video
        ref={ref}
        className="block aspect-[502/410] w-full rounded-[inherit] bg-screen"
        poster={`/media/${name}.webp`}
        width={502}
        height={410}
        muted
        loop
        playsInline
        preload={priority ? "auto" : "none"}
        aria-label={alt}
      >
        <source src={`/media/${name}.mp4`} type="video/mp4" />
      </video>
    </div>
  );
}
