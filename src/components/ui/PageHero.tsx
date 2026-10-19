import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  crumb: string;
};

export function PageHero({ eyebrow, title, lede, crumb }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/5">
      <div aria-hidden="true" className="circuit-bg absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-signal/15 blur-[120px]"
      />
      <div className="relative mx-auto w-full max-w-container px-5 pb-16 pt-32 sm:pb-20 sm:pt-36">
        <Breadcrumbs items={[{ label: crumb }]} />
        <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.32em] text-signal">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl uppercase leading-[1.02] sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        {lede ? (
          <p className="mt-6 max-w-2xl text-secondary sm:text-lg">{lede}</p>
        ) : null}
      </div>
    </section>
  );
}
