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

/* Outlines of desk pets that do not exist yet. Deliberately vague. */
export function MysteryPets({ label }: { label: string }) {
  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 3,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeDasharray: "2 9",
  };
  return (
    <svg viewBox="0 0 360 120" className="w-full max-w-sm text-ink/45" role="img" aria-label={label}>
      <path {...stroke} d="M20 100 C 14 60, 34 26, 62 26 C 92 26, 108 62, 100 100 Z" />
      <path {...stroke} d="M138 100 L 138 56 C 138 30, 222 30, 222 56 L 222 100 Z" />
      <path {...stroke} d="M262 100 C 250 76, 262 60, 276 58 C 270 34, 318 26, 320 54 C 344 58, 346 90, 334 100 Z" />
      <g className="fill-ink/45 font-display" fontSize="34" fontWeight="600" textAnchor="middle">
        <text x="60" y="80">?</text>
        <text x="180" y="82">?</text>
        <text x="300" y="86">?</text>
      </g>
    </svg>
  );
}
