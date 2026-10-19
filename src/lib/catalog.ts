export type CatalogFilterItem = {
  name: string;
  brand: string;
  category: string;
  blurb: string;
};

export function filterProducts<T extends CatalogFilterItem>(
  items: T[],
  query: string,
  category: string | null
): T[] {
  const needle = query.trim().toLowerCase();

  return items.filter((item) => {
    if (category && item.category !== category) return false;
    if (!needle) return true;

    return [item.name, item.brand, item.blurb].some((field) =>
      field.toLowerCase().includes(needle)
    );
  });
}
