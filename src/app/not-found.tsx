import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[72vh] items-center overflow-hidden">
      <div aria-hidden="true" className="circuit-bg absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/10 blur-[120px]"
      />

      <div className="relative mx-auto w-full max-w-container px-5 py-24 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-signal-light">
          404 — Page not found
        </p>
        <h1 className="mt-4 font-display text-5xl uppercase leading-[1] sm:text-7xl">
          Signal <span className="text-signal-light">lost.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-secondary">
          The page you&apos;re looking for has moved or never existed. Let&apos;s
          get you back on track.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href="/">Back home</Button>
          <Button href="/products" variant="ghost">
            Browse products
          </Button>
        </div>
      </div>
    </section>
  );
}
