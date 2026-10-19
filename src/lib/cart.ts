export type CartLine = { slug: string; qty: number };
export type PricedItem = { slug: string; price: number };

type UnknownLine = { slug?: unknown; qty?: unknown };

export function parseStoredCart(
  raw: string | null,
  validSlugs: string[]
): CartLine[] {
  if (!raw) return [];

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];

  const valid = new Set(validSlugs);
  const totals = new Map<string, number>();

  for (const entry of parsed as UnknownLine[]) {
    if (!entry || typeof entry !== "object") continue;
    const slug = typeof entry.slug === "string" ? entry.slug : null;
    if (!slug || !valid.has(slug)) continue;
    const rawQty = typeof entry.qty === "number" ? entry.qty : NaN;
    const qty = Number.isFinite(rawQty) ? Math.floor(rawQty) : NaN;
    if (!Number.isFinite(qty) || qty < 1) continue;
    totals.set(slug, (totals.get(slug) ?? 0) + qty);
  }

  return Array.from(totals, ([slug, qty]) => ({ slug, qty }));
}

export function addToCart(lines: CartLine[], slug: string, qty = 1): CartLine[] {
  const existing = lines.find((line) => line.slug === slug);
  if (existing) {
    return lines.map((line) =>
      line.slug === slug ? { ...line, qty: line.qty + qty } : line
    );
  }
  return [...lines, { slug, qty }];
}

export function setQty(lines: CartLine[], slug: string, qty: number): CartLine[] {
  if (qty <= 0) return removeFromCart(lines, slug);
  return lines.map((line) => (line.slug === slug ? { ...line, qty } : line));
}

export function removeFromCart(lines: CartLine[], slug: string): CartLine[] {
  return lines.filter((line) => line.slug !== slug);
}

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((total, line) => total + line.qty, 0);
}

export function cartSubtotal(lines: CartLine[], products: PricedItem[]): number {
  return lines.reduce((total, line) => {
    const product = products.find((item) => item.slug === line.slug);
    return total + (product ? product.price * line.qty : 0);
  }, 0);
}
