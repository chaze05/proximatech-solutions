"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

type StatProps = {
  value: number | string;
  label: string;
  suffix?: string;
};

export function Stat({ value, label, suffix = "" }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const isNumeric = typeof value === "number";
  const [display, setDisplay] = useState<string>(String(value));

  useEffect(() => {
    if (!isNumeric || reduce) {
      setDisplay(String(value));
      return;
    }

    const el = ref.current;
    if (!el) return;

    const target = value as number;
    const duration = 1400;
    let frame = 0;

    const run = (start: number) => {
      const step = (ts: number) => {
        const progress = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;
        setDisplay(
          Number.isInteger(target)
            ? String(Math.round(current))
            : current.toFixed(1)
        );
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    // Only animate when the stats begin below the fold; otherwise keep the
    // final value from SSR visible without a reset flash.
    const belowFold = el.getBoundingClientRect().top > window.innerHeight;
    if (!belowFold) return;

    setDisplay("0");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run(performance.now());
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    io.observe(el);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, [isNumeric, reduce, value]);

  return (
    <div ref={ref}>
      <p className="font-display text-4xl text-ink sm:text-5xl">
        {display}
        <span className="text-signal-light">{suffix}</span>
      </p>
      <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.22em] text-muted">
        {label}
      </p>
    </div>
  );
}
