"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";

const CartDrawer = dynamic(
  () => import("./CartDrawer").then((module) => module.CartDrawer),
  { ssr: false }
);

/**
 * Loads the drawer (and its animation library) on first open, then keeps it
 * mounted so the exit animation can play when the cart closes.
 */
export function CartDrawerMount() {
  const { isOpen } = useCart();
  const [everOpened, setEverOpened] = useState(false);

  useEffect(() => {
    if (isOpen) setEverOpened(true);
  }, [isOpen]);

  return everOpened ? <CartDrawer /> : null;
}
