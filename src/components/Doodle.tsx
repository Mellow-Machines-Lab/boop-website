/*
  Hand-drawn touches. Kept to a doodled arrow and a few mystery outlines, so
  they stay a surprise.
*/
export function DoodleArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 60"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 50 C 22 52, 50 44, 66 14" />
      <path d="M52 15 L 67 12 L 69 28" />
    </svg>
  );
}

/* A tile for a desk pet that does not exist yet. Deliberately vague. */
const SHAPES = [
  "M22 96 C 14 58, 32 24, 60 24 C 88 24, 106 58, 98 96 Z",
  "M24 96 L 24 54 C 24 26, 96 26, 96 54 L 96 96 Z",
  "M26 96 C 12 74, 24 56, 40 54 C 34 28, 86 22, 86 52 C 108 56, 110 86, 96 96 Z",
];

export function MysteryPet({ shape, label }: { shape: number; label: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className="aspect-square w-full rounded-[2rem] border-2 border-dashed border-ink/20 text-ink/40"
      role="img"
      aria-label={label}
    >
      <path
        d={SHAPES[shape % SHAPES.length]}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="1 8"
      />
      <text
        x="60"
        y="76"
        textAnchor="middle"
        fontSize="30"
        fontWeight="600"
        className="fill-ink/40 font-display"
      >
        ?
      </text>
    </svg>
  );
}
