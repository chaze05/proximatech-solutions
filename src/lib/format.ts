export function formatPeso(value: number): string {
  const rounded = Math.round(value);
  return "₱" + rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatCountdown(ms: number): string {
  if (ms <= 0) return "Started";

  const total = Math.floor(ms / 1000);
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  const pad = (value: number) => String(value).padStart(2, "0");

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (days > 0 || hours > 0) parts.push(`${pad(hours)}h`);
  if (days > 0 || hours > 0 || minutes > 0) parts.push(`${pad(minutes)}m`);
  parts.push(`${pad(seconds)}s`);

  return parts.join(" ");
}
