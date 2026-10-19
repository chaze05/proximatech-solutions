import type { ReactNode } from "react";

type ChipProps = {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
};

export function Chip({ children, active = false, onClick }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] transition duration-300 ${
        active
          ? "border-signal bg-signal text-white shadow-[0_10px_26px_-12px_rgba(225,29,46,0.9)]"
          : "border-white/12 text-secondary hover:border-white/30 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
