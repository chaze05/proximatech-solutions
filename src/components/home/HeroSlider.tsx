"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { nextIndex, slideCounter } from "@/lib/carousel";
import { usePrefersReducedMotion } from "@/components/ui/use-prefers-reduced-motion";

const SLIDES = [
  {
    src: "/images/gallery/gallery-vision-1.jpg",
    alt: "Proximatech team collaborating in the office",
    position: "center",
  },
  {
    src: "/images/services/barcode-solutions.avif",
    alt: "Barcode scanning workflow in a warehouse",
    position: "center",
  },
  {
    src: "/images/gallery/gallery-vision-2.avif",
    alt: "Proximatech team planning a solution on a whiteboard",
    position: "center",
  },
];

const AUTOPLAY_MS = 3000;
const TRANSITION_MS = 500;

export function HeroSlider({ children }: { children: ReactNode }) {
  const reduce = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const dragStart = useRef<number | null>(null);
  const count = SLIDES.length;

  const go = useCallback(
    (direction: number) => {
      setIndex((current) => nextIndex(current, count, direction));
    },
    [count]
  );

  useEffect(() => {
    if (reduce || paused) return;

    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        setIndex((current) => nextIndex(current, count, 1));
      }
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [count, paused, reduce]);

  const onPointerDown = (event: React.PointerEvent) => {
    dragStart.current = event.clientX;
  };

  const onPointerUp = (event: React.PointerEvent) => {
    if (dragStart.current === null) return;
    const delta = event.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(delta) > 42) go(delta < 0 ? 1 : -1);
  };

  return (
    <section
      className="relative flex min-h-[calc(100svh-76px)] touch-pan-y items-center overflow-hidden border-b border-white/5 select-none"
      aria-roledescription="carousel"
      aria-label="Proximatech highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        dragStart.current = null;
      }}
      onPointerLeave={() => {
        dragStart.current = null;
      }}
    >
      <div
        className="absolute inset-0 flex h-full w-full transition-transform ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transform: `translate3d(-${index * 100}%, 0, 0)`,
          transitionDuration: reduce ? "0ms" : `${TRANSITION_MS}ms`,
        }}
      >
        {SLIDES.map((slide, slideIndex) => (
          <div
            key={slide.src}
            className="relative h-full w-full shrink-0"
            role="group"
            aria-roledescription="slide"
            aria-label={`${slideIndex + 1} of ${count}`}
            aria-hidden={slideIndex !== index}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={slideIndex === 0}
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: slide.position }}
            />
          </div>
        ))}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-night via-night/80 to-night/30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night via-transparent to-night/40"
      />

      {children}

      <div className="absolute bottom-6 right-5 z-20 flex items-center gap-3 sm:bottom-8 sm:right-8">
        <span className="font-display text-xs tracking-[0.2em] text-ink/70">
          {slideCounter(index, count)}
        </span>
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous slide"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-night/50 text-ink backdrop-blur transition-colors hover:border-signal/60"
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next slide"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-night/50 text-ink backdrop-blur transition-colors hover:border-signal/60"
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m9 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
