"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

const INTERACTIVE =
  'a, button, [role="button"], input, textarea, select, label, summary';

/**
 * Elev8-style two-ball cursor: a 30px ring that grows to 70px over
 * interactive elements, plus a 7px dot trailing behind. GPU transforms only;
 * the loop stops when the pointer settles or leaves the window.
 */
export function CustomCursor() {
  const reduce = usePrefersReducedMotion();
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;

    const fine = window.matchMedia("(pointer: fine)");
    const hover = window.matchMedia("(hover: hover)");
    if (!fine.matches || !hover.matches) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let targetX = -100;
    let targetY = -100;
    let ringX = -100;
    let ringY = -100;
    let dotX = -100;
    let dotY = -100;
    let frame = 0;
    let active = false;
    let visible = false;

    const lerp = (from: number, to: number, amount: number) =>
      from + (to - from) * amount;

    const render = () => {
      ringX = lerp(ringX, targetX, 0.42);
      ringY = lerp(ringY, targetY, 0.42);
      dotX = lerp(dotX, targetX, 0.2);
      dotY = lerp(dotY, targetY, 0.2);

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;

      const settled =
        Math.abs(ringX - targetX) < 0.2 &&
        Math.abs(ringY - targetY) < 0.2 &&
        Math.abs(dotX - targetX) < 0.2 &&
        Math.abs(dotY - targetY) < 0.2;

      if (settled || !visible) {
        frame = 0;
        return;
      }
      frame = requestAnimationFrame(render);
    };

    const wake = () => {
      if (!frame && visible) frame = requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!visible) {
        visible = true;
        ring.style.opacity = "1";
        dot.style.opacity = "1";
      }
      wake();
    };

    const onOver = (event: PointerEvent) => {
      const element = event.target as Element | null;
      const isInteractive = Boolean(element && element.closest(INTERACTIVE));
      if (isInteractive === active) return;
      active = isInteractive;
      ring.classList.toggle("cursor-ring--active", active);
    };

    const onLeave = () => {
      visible = false;
      ring.style.opacity = "0";
      dot.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onLeave);
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90] hidden [@media(pointer:fine)]:block"
    >
      <div ref={ringRef} className="absolute left-0 top-0 will-change-transform">
        <div className="cursor-ring" />
      </div>
      <div ref={dotRef} className="absolute left-0 top-0 will-change-transform">
        <div className="cursor-dot" />
      </div>
    </div>
  );
}
