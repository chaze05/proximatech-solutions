"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { STORE_PRODUCTS, getStoreProduct } from "@/data/store";
import { formatPeso } from "@/lib/format";
import { useCart } from "./CartProvider";

export function CartDrawer() {
  const { lines, count, subtotal, isOpen, close, remove, setQty } = useCart();
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "Tab") {
        const panel = panelRef.current;
        if (!panel) return;
        const focusables = Array.from(
          panel.querySelectorAll<HTMLElement>("button, a[href]")
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-[75]">
          <motion.button
            type="button"
            aria-label="Close cart"
            onClick={close}
            className="absolute inset-0 bg-night/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#0b0d12] shadow-[-30px_0_80px_-40px_rgba(0,0,0,0.9)]"
            initial={reduce ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={reduce ? undefined : { x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
          >
            <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="font-display text-lg uppercase tracking-wide">
                  Your cart
                </p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
                  {count} {count === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close cart"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-ink transition-colors hover:border-signal/60"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="m6 6 12 12M18 6 6 18" />
                </svg>
              </button>
            </header>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-panel text-signal-light">
                  <svg
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M6 7h12l1.2 12.2a1.8 1.8 0 0 1-1.8 1.8H6.6a1.8 1.8 0 0 1-1.8-1.8L6 7Z" />
                    <path d="M9 10V6a3 3 0 0 1 6 0v4" />
                  </svg>
                </span>
                <p className="font-display text-lg uppercase">Your cart is empty.</p>
                <p className="text-sm text-secondary">
                  Add hardware from our store to get started.
                </p>
                <Link
                  href="/store"
                  onClick={close}
                  className="mt-2 inline-flex min-h-11 items-center justify-center rounded-full bg-signal px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-signal-hover"
                >
                  Browse products
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
                  {lines.map((line) => {
                    const product = getStoreProduct(line.slug);
                    if (!product) return null;
                    return (
                      <li
                        key={line.slug}
                        className="flex gap-4 rounded-xl border border-white/10 bg-panel/50 p-3"
                      >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-elevated">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="64px"
                            className="object-contain p-1.5"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-bold text-ink">
                            {product.name}
                          </p>
                          <p className="text-xs text-muted">
                            {formatPeso(product.price)} each
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <button
                              type="button"
                              aria-label={`Decrease quantity of ${product.name}`}
                              onClick={() => setQty(line.slug, line.qty - 1)}
                              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-ink transition-colors hover:border-signal/60"
                            >
                              −
                            </button>
                            <span className="w-7 text-center text-sm" aria-live="polite">
                              {line.qty}
                            </span>
                            <button
                              type="button"
                              aria-label={`Increase quantity of ${product.name}`}
                              onClick={() => setQty(line.slug, line.qty + 1)}
                              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-ink transition-colors hover:border-signal/60"
                            >
                              +
                            </button>
                            <button
                              type="button"
                              onClick={() => remove(line.slug)}
                              className="ml-auto min-h-9 text-[10px] font-bold uppercase tracking-[0.14em] text-muted transition-colors hover:text-signal-hover"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <p className="shrink-0 font-display text-sm text-ink">
                          {formatPeso(product.price * line.qty)}
                        </p>
                      </li>
                    );
                  })}
                </ul>

                <footer className="border-t border-white/10 px-5 py-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-secondary">Subtotal</span>
                    <span className="font-display text-xl text-ink">
                      {formatPeso(subtotal)}
                    </span>
                  </div>
                  <Link
                    href="/store/checkout"
                    onClick={close}
                    className="mt-4 flex min-h-11 w-full items-center justify-center rounded-full bg-signal px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-signal-hover"
                  >
                    Checkout
                  </Link>
                  <p className="mt-3 text-center text-[10px] uppercase tracking-[0.14em] text-muted">
                    Demo checkout — no real payment will be taken.
                  </p>
                </footer>
              </>
            )}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
