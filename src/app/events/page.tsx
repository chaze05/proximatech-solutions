import type { Metadata } from "next";
import Link from "next/link";
import { EVENTS } from "@/data/events";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { EventHero } from "@/components/events/EventHero";

export const metadata: Metadata = {
  title: "Events — Proximatech Solutions",
  description:
    "Meet Proximatech Solutions on the floor — upcoming congresses and events we support with registration and asset-tracking systems.",
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title={
          <>
            Where we <span className="text-signal">show up</span>
          </>
        }
        lede="Congresses, exhibits and launches — the moments where our registration and tracking systems meet the people who use them."
        crumb="Events"
      />

      <section className="py-20 sm:py-28">
        <div className="mx-auto w-full max-w-container px-5">
          {EVENTS.map((event) => (
            <EventHero key={event.slug} event={event} />
          ))}

          <Reveal delay={120}>
            <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl border border-white/10 bg-panel/50 p-7 sm:flex-row sm:items-center">
              <div>
                <p className="font-display text-lg uppercase tracking-wide">
                  Running an event?
                </p>
                <p className="mt-1 text-sm text-secondary">
                  We deploy self-service registration, QR check-in and live
                  dashboards for conferences and corporate events.
                </p>
              </div>
              <Link
                href="/services"
                className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-white/15 px-6 py-2.5 text-sm font-bold text-ink transition-colors hover:border-signal/60"
              >
                See the system
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
