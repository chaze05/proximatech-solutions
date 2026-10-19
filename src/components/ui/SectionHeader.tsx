import type { ReactNode } from "react";

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  index?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  title,
  lede,
  index,
  align = "left",
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div
      className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}
    >
      <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-signal-light">
        {index ? <span className="text-muted">{index} —</span> : null}
        <span>{eyebrow}</span>
      </p>
      <h2 className="mt-4 font-display text-3xl uppercase leading-[1.05] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {lede ? (
        <p
          className={`mt-4 text-secondary ${centered ? "mx-auto max-w-2xl" : ""}`}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}
