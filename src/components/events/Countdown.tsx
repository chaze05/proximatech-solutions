"use client";

import { useEffect, useState } from "react";
import { formatCountdown } from "@/lib/format";

export function Countdown({ to }: { to: string }) {
  const [label, setLabel] = useState<string>("--");

  useEffect(() => {
    const deadline = new Date(to).getTime();

    const tick = () => {
      const remaining = deadline - Date.now();
      setLabel(remaining <= 0 ? "Event started" : formatCountdown(remaining));
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [to]);

  return (
    <div className="rounded-xl border border-white/10 bg-night/60 px-5 py-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
        Countdown to the congress
      </p>
      <p
        className="mt-2 font-display text-xl tracking-[0.06em] text-ink sm:text-2xl"
        aria-live="polite"
      >
        {label}
      </p>
    </div>
  );
}
