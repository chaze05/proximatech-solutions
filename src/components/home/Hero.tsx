import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/data/site";

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-76px)] items-center overflow-hidden border-b border-white/5">
      <div aria-hidden="true" className="circuit-bg absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute -left-40 top-0 h-[460px] w-[460px] rounded-full bg-signal/20 blur-[130px] motion-safe:animate-float"
      />
      <div
        aria-hidden="true"
        className="absolute -right-32 bottom-0 h-[520px] w-[520px] rounded-full bg-[#7f1d1d]/30 blur-[140px] motion-safe:animate-float-slow"
      />

      <div className="relative mx-auto grid w-full max-w-container items-center gap-16 px-5 py-24 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-signal">
            Proximatech Solutions
          </p>
          <h1 className="mt-6 font-display text-[clamp(2.9rem,8vw,6rem)] uppercase leading-[0.98]">
            Securing Your
            <br />
            <span className="text-signal">Future.</span>
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

        <div className="relative hidden lg:block" aria-hidden="true">
          <div className="absolute inset-0 -z-10 rounded-full bg-signal/10 blur-[100px]" />
          <div className="relative ml-auto w-[340px] rotate-2 overflow-hidden rounded-3xl border border-white/10 bg-panel p-3 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-elevated">
              <Image
                src="/images/products/product-1.avif"
                alt=""
                fill
                priority
                sizes="340px"
                className="object-contain p-6"
              />
            </div>
          </div>
          <div className="absolute -bottom-10 -left-10 w-[260px] -rotate-3 overflow-hidden rounded-3xl border border-white/10 bg-panel p-3 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-elevated">
              <Image
                src="/images/products/product-5.avif"
                alt=""
                fill
                sizes="260px"
                className="object-contain p-5"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[9px] font-bold uppercase tracking-[0.4em] text-muted sm:flex">
        Scroll
        <span className="h-10 w-px bg-gradient-to-b from-signal/80 to-transparent" />
      </div>
    </section>
  );
}
