import type { ReactNode } from "react";
import { VALUE_CARDS, type ValueIcon } from "@/data/values";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const icons: Record<ValueIcon, ReactNode> = {
  spark: (
    <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4L12 3Z" />
  ),
  scale: (
    <>
      <path d="M4 20h16" />
      <path d="M7 20V9m5 11V4m5 16v-7" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.8-3.4 3.4-5 7-5s6.2 1.6 7 5" />
    </>
  ),
  bolt: <path d="M13 3 5 13h5l-1 8 8-11h-5l1-7Z" />,
  puzzle: (
    <path d="M10 4a2 2 0 1 1 4 0v1h3a1 1 0 0 1 1 1v3h1a2 2 0 1 1 0 4h-1v3a1 1 0 0 1-1 1h-3v-1a2 2 0 1 0-4 0v1H7a1 1 0 0 1-1-1v-3H5a2 2 0 1 1 0-4h1V6a1 1 0 0 1 1-1h3V4Z" />
  ),
  chip: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M12 3v4m0 10v4M3 12h4m10 0h4M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2" />
    </>
  ),
};

export function CommitmentGrid() {
  return (
    <section className="border-y border-white/5 bg-panel/30 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-container px-5">
        <Reveal>
          <SectionHeader
            index="04"
            eyebrow="Our commitment"
            align="center"
            title={
              <>
                Built on six <span className="text-signal">principles</span>
              </>
            }
            lede="The values behind every system we design, deploy and support."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VALUE_CARDS.map((value, index) => (
            <Reveal key={value.title} delay={index * 60}>
              <div className="group h-full rounded-2xl border border-white/10 bg-night p-7 transition-colors duration-300 hover:border-signal/40">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-signal/10 text-signal">
                  <svg
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {icons[value.icon]}
                  </svg>
                </div>
                <h3 className="mt-6 font-display text-lg uppercase tracking-wide">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary">
                  {value.blurb}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
