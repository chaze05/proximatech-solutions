import Image from "next/image";
import type { Service } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function ServiceRow({
  service,
  flip,
}: {
  service: Service;
  flip: boolean;
}) {
  return (
    <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal className={flip ? "lg:order-2" : ""}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover"
          />
          <span className="absolute left-5 top-5 rounded-full border border-white/10 bg-night/70 px-3 py-1 font-display text-xs text-signal-light backdrop-blur">
            {service.num}
          </span>
        </div>
      </Reveal>

      <Reveal delay={100} className={flip ? "lg:order-1" : ""}>
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-signal-light">
          Service {service.num}
        </p>
        <h2 className="mt-3 font-display text-3xl uppercase leading-[1.05] sm:text-4xl">
          {service.title}
        </h2>
        <p className="mt-3 text-lg text-ink/80">{service.tagline}</p>
        <p className="mt-4 leading-relaxed text-secondary">
          {service.description}
        </p>

        <ul className="mt-6 space-y-2.5">
          {service.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-start gap-3 text-sm text-secondary"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-signal-light"
              >
                <path d="m5 12 5 5L20 7" />
              </svg>
              {bullet}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Button href="/contact" variant="ghost">
            Discuss this solution
          </Button>
        </div>
      </Reveal>
    </article>
  );
}
