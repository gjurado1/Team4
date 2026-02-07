export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function isNonEmpty(s: string) {
  return s.trim().length > 0;
}
