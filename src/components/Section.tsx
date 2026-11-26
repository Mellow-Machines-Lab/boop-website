import type { ReactNode } from "react";

/*
  Standard section shell: the data-section hook for scroll-depth tracking and
  the page column. `band` gives a section the deeper peach background.
*/
export function Section({
  id,
  label,
  children,
  band = false,
  className = "",
}: {
  id: string;
  label: string;
  children: ReactNode;
  band?: boolean;
  className?: string;
}) {
  return (
    <section
      data-section={id}
      aria-label={label}
      className={`px-5 py-16 md:py-24 ${band ? "bg-peach-deep" : ""} ${className}`}
    >
      <div className="mx-auto max-w-[1040px]">{children}</div>
    </section>
  );
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[clamp(1.9rem,6vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.01em]">
      {children}
    </h2>
  );
}
