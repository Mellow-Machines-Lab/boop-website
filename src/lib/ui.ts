/*
  One button style for the one thing to click: joining the waitlist. It is the
  slime's blue. Amber is kept for "needs you" and is never a button.
*/
export const ctaClass =
  "inline-flex items-center justify-center rounded-full bg-slime-deep px-7 py-3.5 " +
  "font-display text-lg font-semibold text-white " +
  "shadow-[0_6px_0_0_#0b2a4a] transition-transform duration-150 ease-gel " +
  "hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_2px_0_0_#0b2a4a] " +
  "disabled:cursor-not-allowed disabled:opacity-60";

export const inputClass =
  "w-full min-w-0 flex-1 rounded-full border-2 border-ink/15 bg-white px-6 py-3.5 " +
  "text-ink placeholder:text-ink-soft/70 focus-visible:border-slime-deep";

/* Boop's own voice: lower case and monospaced, like the strip on its screen. */
export const voiceClass = "font-mono text-[0.9rem] leading-relaxed text-ink-soft";

/* A scribbled label. Use sparingly: twice or three times on a page. */
export const scribbleClass = "font-hand text-2xl leading-tight text-slime-deep";

export const linkClass = "underline decoration-2 underline-offset-4 hover:text-slime-deep";
