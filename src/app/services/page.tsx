import type { Metadata } from "next";
import { SERVICES } from "@/data/services";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceRow } from "@/components/services/ServiceRow";
import { ProcessBand } from "@/components/services/ProcessBand";

export const metadata: Metadata = {
  title: "Services — Proximatech Solutions",
  description:
    "RFID, barcode, warehouse and asset management systems, event registration, structured cabling and custom software from Proximatech Solutions.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Solutions that <span className="text-signal">scale</span>
          </>
        }
        lede="Eight services, one accountable team — from RFID and barcode rollouts to fully custom platforms and the cabling underneath them."
        crumb="Services"
      />

      <section className="py-20 sm:py-28">
        <div className="mx-auto w-full max-w-container space-y-24 px-5 sm:space-y-32">
          {SERVICES.map((service, index) => (
            <ServiceRow
              key={service.slug}
              service={service}
              flip={index % 2 === 1}
            />
          ))}
        </div>
      </section>

      <ProcessBand />

      <section className="py-24 text-center sm:py-32">
        <Reveal className="mx-auto max-w-container px-5">
          <h2 className="font-display text-3xl uppercase leading-[1.05] sm:text-5xl">
            Not sure which solution <span className="text-signal">fits?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-secondary">
            Tell us how your team works today and we&apos;ll map the shortest
            path to a system that fits.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href="/contact"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-signal px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-signal-hover"
            >
              Book a consultation
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
