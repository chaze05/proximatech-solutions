import { TESTIMONIALS } from "@/data/testimonials";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function TestimonialsBand() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto w-full max-w-container px-5">
        <Reveal>
          <SectionHeader
            index="05"
            eyebrow="Client words"
            align="center"
            title={
              <>
                Teams that <span className="text-signal">moved</span> with us
              </>
            }
          />
        </Reveal>
      </div>

      <div className="mt-14">
        <Marquee speed={42}>
          {TESTIMONIALS.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="w-[340px] shrink-0 rounded-2xl border border-white/10 bg-panel/60 p-7 sm:w-[420px]"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-signal/15 font-display text-sm text-signal">
                  {initials(testimonial.name)}
                </span>
                <figcaption>
                  <p className="text-sm font-bold text-ink">{testimonial.name}</p>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-muted">
                    {testimonial.role}
                  </p>
                </figcaption>
              </div>
              <blockquote className="mt-5 text-sm leading-relaxed text-secondary">
                “{testimonial.quote}”
              </blockquote>
            </figure>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
