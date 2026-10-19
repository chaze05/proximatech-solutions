import { SITE } from "@/data/site";

const items = [
  {
    label: "Phone",
    lines: SITE.phones,
    href: `tel:${SITE.phones[0].replace(/\s/g, "")}`,
    icon: (
      <>
        <path d="M5 4h3l2 5-2.5 1.5a12 12 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
      </>
    ),
  },
  {
    label: "Email",
    lines: [SITE.email],
    href: `mailto:${SITE.email}`,
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
  },
  {
    label: "Office",
    lines: [SITE.address],
    href: undefined,
    icon: (
      <>
        <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
  },
  {
    label: "Support",
    lines: ["24/7 support you can trust"],
    href: undefined,
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" />
      </>
    ),
  },
];

export function InfoCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => {
        const content = (
          <>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-signal/10 text-signal">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {item.icon}
              </svg>
            </span>
            <span className="mt-4 block text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
              {item.label}
            </span>
            {item.lines.map((line) => (
              <span
                key={line}
                className="mt-1 block break-words text-sm text-secondary"
              >
                {line}
              </span>
            ))}
          </>
        );

        return item.href ? (
          <a
            key={item.label}
            href={item.href}
            className="min-w-0 rounded-2xl border border-white/10 bg-panel/50 p-5 transition-colors hover:border-signal/40"
          >
            {content}
          </a>
        ) : (
          <div
            key={item.label}
            className="min-w-0 rounded-2xl border border-white/10 bg-panel/50 p-5"
          >
            {content}
          </div>
        );
      })}
    </div>
  );
}

