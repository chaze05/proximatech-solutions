import { SITE } from "@/data/site";

export function MapCard() {
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    SITE.address
  )}`;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-panel/50">
      <div
        aria-hidden="true"
        className="circuit-bg absolute inset-0 opacity-70"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/15 blur-[60px]"
      />

      <div className="relative flex min-h-[220px] flex-col items-center justify-center p-6 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-signal/30 bg-night/70 text-signal">
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
        </span>
        <p className="mt-4 max-w-[30ch] text-sm text-secondary">{SITE.address}</p>
        <a
          href={directions}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:border-signal/60"
        >
          Get directions
        </a>
      </div>
    </div>
  );
}
