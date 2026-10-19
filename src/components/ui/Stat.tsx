"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type StatProps = {
  value: number | string;
  label: string;
  suffix?: string;
};

export function Stat({ value, label, suffix = "" }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const isNumeric = typeof value === "number";
  const [display, setDisplay] = useState<string>(
    isNumeric && !reduce ? "0" : String(value)
  );

  useEffect(() => {
    if (!isNumeric || reduce) {
      setDisplay(String(value));
      return;
    }

    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const target = value as number;
    const duration = 1400;

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
        <span className="text-signal">{suffix}</span>
      </p>
      <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.22em] text-muted">
        {label}
      </p>
    </div>
  );
}
