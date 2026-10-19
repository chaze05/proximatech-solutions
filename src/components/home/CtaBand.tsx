import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/data/site";

export function CtaBand() {
  return (
    <section className="pb-24 sm:pb-32">
      <div className="mx-auto w-full max-w-container px-5">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#12070a] px-6 py-16 text-center sm:px-16 sm:py-24">
            <div
              aria-hidden="true"
              className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-signal/25 blur-[100px]"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-[#7f1d1d]/40 blur-[110px]"
            />
            <p className="relative text-[11px] font-bold uppercase tracking-[0.32em] text-signal-light">
              Let&apos;s talk
            </p>
            <h2 className="relative mt-5 font-display text-3xl uppercase leading-[1.05] sm:text-5xl">
              Let&apos;s build something <span className="text-signal-light">great</span> together.
            </h2>
            <p className="relative mx-auto mt-5 max-w-xl text-secondary">
              Tell us about your operations and we&apos;ll map the right hardware,
              software and rollout plan.
            </p>
            <div className="relative mt-9 flex flex-wrap items-center justify-center gap-4">
              <Button href="/contact">Get a quote</Button>
              <a
                href={`tel:${SITE.phones[0].replace(/\s/g, "")}`}
                className="text-sm font-semibold text-secondary transition-colors hover:text-ink"
              >
                {SITE.phones[0]}
              </a>
              <span aria-hidden="true" className="hidden text-white/20 sm:inline">
                ·
              </span>
              <a
                href={`mailto:${SITE.email}`}
                className="text-sm font-semibold text-secondary transition-colors hover:text-ink"
              >
                {SITE.email}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
