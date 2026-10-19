import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "ghost";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
};

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold tracking-wide transition duration-300 disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  solid:
    "bg-signal text-white shadow-[0_18px_40px_-18px_rgba(225,29,46,0.8)] hover:bg-signal-hover hover:-translate-y-0.5",
  ghost:
    "border border-white/15 text-ink hover:border-signal/60 hover:-translate-y-0.5",
};

export function Button({
  children,
  href,
  onClick,
  variant = "solid",
  type = "button",
  disabled,
  className = "",
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
