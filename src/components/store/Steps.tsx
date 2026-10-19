const labels = ["Contact", "Shipping", "Payment", "Review"];

export function Steps({ current }: { current: number }) {
  return (
    <ol className="flex flex-wrap items-center gap-3 sm:gap-4">
      {labels.map((label, index) => {
        const state =
          index < current ? "done" : index === current ? "active" : "todo";
        return (
          <li key={label} className="flex items-center gap-2">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full border font-display text-[11px] ${
                state === "active"
                  ? "border-signal bg-signal text-white"
                  : state === "done"
                    ? "border-signal/60 text-signal"
                    : "border-white/15 text-muted"
              }`}
            >
              {state === "done" ? "✓" : index + 1}
            </span>
            <span
              className={`text-[10px] font-bold uppercase tracking-[0.18em] ${
                state === "active"
                  ? "text-ink"
                  : state === "done"
                    ? "text-secondary"
                    : "text-muted"
              }`}
            >
              {label}
            </span>
            {index < labels.length - 1 ? (
              <span aria-hidden="true" className="ml-1 hidden h-px w-6 bg-white/15 sm:block" />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
