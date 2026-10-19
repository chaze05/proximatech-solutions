import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const featured = SERVICES.slice(0, 4);

export function ServicesPreview() {
  return (
    <section className="border-y border-white/5 bg-panel/30 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-container px-5">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionHeader
              index="02"
              eyebrow="What we do"
              title={
                <>
                  Solutions that <span className="text-signal">scale</span>
                </>
              }
              lede="RFID, barcode, asset tracking and custom software â€” designed, deployed and supported by one team."
            />
          </Reveal>
          <Reveal delay={100}>
            <Button href="/services" variant="ghost">
              All services
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((service, index) => (
            <Reveal key={service.slug} delay={index * 80}>
              <Link
                href="/services"
                className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-night"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(min-width: 1024px) 280px, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-base via-base/20 to-transparent" />
                  <span className="absolute left-4 top-4 font-display text-xs text-signal">
                    {service.num}
                  </span>
                </div>
                <div className="relative -mt-8 px-5 pb-6">
                  <h3 className="font-display text-lg uppercase tracking-wide">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-secondary">{service.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-signal">
                    Explore
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                      â†’
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
