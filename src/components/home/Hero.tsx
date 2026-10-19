import { Button } from "@/components/ui/Button";
import { SITE } from "@/data/site";
import { HeroSlider } from "./HeroSlider";

export function Hero() {
  return (
    <HeroSlider>
      <div className="relative z-10 mx-auto w-full max-w-container px-5 py-24 sm:py-28">
        <div className="max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-signal-light">
            Proximatech Solutions
          </p>
          <h1 className="mt-6 font-display text-[clamp(2.9rem,8vw,6rem)] uppercase leading-[0.98]">
            <span className="hero-word" style={{ animationDelay: "80ms" }}>
              Securing
            </span>{" "}
            <span className="hero-word" style={{ animationDelay: "200ms" }}>
              Your
            </span>
            <br />
            <span className="text-signal-light">
              <span className="hero-word" style={{ animationDelay: "340ms" }}>
                Future.
              </span>
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-secondary sm:text-lg">
            {SITE.description}
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href="/products">Explore products</Button>
            <Button href="/contact" variant="ghost">
              Book a consultation
            </Button>
          </div>
          <div className="mt-12 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
            </span>
            Serving enterprises across the Philippines
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[9px] font-bold uppercase tracking-[0.4em] text-muted sm:flex">
        Scroll
        <span className="h-10 w-px bg-gradient-to-b from-signal/80 to-transparent" />
      </div>
    </HeroSlider>
  );
}
