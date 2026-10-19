import Image from "next/image";
import type { EventItem } from "@/data/events";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Countdown } from "./Countdown";

export function EventHero({ event }: { event: EventItem }) {
  return (
    <Reveal>
      <article className="grid overflow-hidden rounded-3xl border border-white/10 bg-panel/50 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[280px] lg:min-h-[520px]">
          <Image
            src={event.image}
            alt={event.name}
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent" />
          <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-night/75 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-signal-light backdrop-blur">
            Featured event
          </span>
        </div>

        <div className="flex flex-col justify-center p-7 sm:p-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-signal-light">
            {event.dates}
          </p>
          <h2 className="mt-3 font-display text-3xl uppercase leading-[1.05] sm:text-4xl">
            {event.name}
          </h2>
          <p className="mt-2 text-sm uppercase tracking-[0.18em] text-muted">
            {event.venue}
          </p>
          <p className="mt-5 leading-relaxed text-secondary">
            {event.description}
          </p>

          <div className="mt-7">
            <Countdown to={event.countdownTo} />
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/contact">Register interest</Button>
            <Button href="/services" variant="ghost">
              Event registration system
            </Button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
