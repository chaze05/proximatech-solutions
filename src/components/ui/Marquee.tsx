import type { ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  speed?: number;
  className?: string;
};

export function Marquee({ children, speed = 38, className = "" }: MarqueeProps) {
  return (
    <div
      className={`group relative overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className="flex w-max animate-marquee gap-14 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex shrink-0 items-center gap-14">{children}</div>
        <div aria-hidden="true" className="flex shrink-0 items-center gap-14">
          {children}
        </div>
      </div>
    </div>
  );
}
