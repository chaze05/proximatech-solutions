"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { STORE_PRODUCTS } from "@/data/store";
import {
  addToCart,
  cartCount,
  cartSubtotal,
  parseStoredCart,
  removeFromCart,
  setQty as setLineQty,
  type CartLine,
} from "@/lib/cart";

const STORAGE_KEY = "proximatech.cart.v1";
const VALID_SLUGS = STORE_PRODUCTS.map((product) => product.slug);

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  add: (slug: string, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setLines(parseStoredCart(window.localStorage.getItem(STORAGE_KEY), VALID_SLUGS));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable — cart still works in memory */
    }
  }, [lines, hydrated]);

  const add = useCallback((slug: string, qty = 1) => {
    setLines((current) => addToCart(current, slug, qty));
    setIsOpen(true);
  }, []);

  const remove = useCallback((slug: string) => {
    setLines((current) => removeFromCart(current, slug));
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setLines((current) => setLineQty(current, slug, qty));
  }, []);

  const clear = useCallback(() => setLines([]), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: cartCount(lines),
      subtotal: cartSubtotal(lines, STORE_PRODUCTS),
      isOpen,
      add,
      remove,
      setQty,
      clear,
      open,
      close,
    }),
    [lines, isOpen, add, remove, setQty, clear, open, close]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
