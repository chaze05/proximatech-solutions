export function nextIndex(current: number, count: number, direction: number): number {
  if (count <= 1) return 0;
  return (current + direction + count) % count;
}

export function slideCounter(index: number, count: number): string {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${pad(index + 1)} / ${pad(count)}`;
}
