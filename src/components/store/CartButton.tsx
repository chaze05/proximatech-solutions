"use client";

import { useCart } from "./CartProvider";

export function CartButton() {
  const { count, open } = useCart();

  return (
    <button
      type="button"
      onClick={open}
      aria-label={`Open cart (${count} ${count === 1 ? "item" : "items"})`}
      className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-secondary transition-colors duration-200 hover:border-signal/60 hover:text-ink"
    >
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 7h12l1.2 12.2a1.8 1.8 0 0 1-1.8 1.8H6.6a1.8 1.8 0 0 1-1.8-1.8L6 7Z" />
        <path d="M9 10V6a3 3 0 0 1 6 0v4" />
      </svg>
      {count > 0 ? (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-signal px-1 font-display text-[10px] text-white">
          {count}
        </span>
      ) : null}
    </button>
  );
}
